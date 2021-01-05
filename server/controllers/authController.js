import { hash, compare } from 'bcrypt'
import dotenv from "dotenv"
import nodemailer from "nodemailer"
import crypto from "crypto"
dotenv.config();

const registerUser = async (req, res) => {
  const db = req.app.get("db");
  const { email, password } = req.body;

  const [foundEmail] = await db.user.check_email(email);
  if (foundEmail) res.status(401).send("Email already in use");

  const hashedPass = await hash(password, 10)
  req.body.password = hashedPass

  const [newUser] = await db.user.register_user(req.body)
  .catch((err) => { console.log(err); res.sendStatus(400)})

  await db.user.insert_default_resources(newUser.user_id)
  .catch((err) => {
    console.log(err)
    res.status(400).send("err in resource defaults", err)
  })

  req.session.user = newUser

  return res.status(200).send(req.session.user)
}

const loginUser = async (req, res) => {
  const db = req.app.get("db");
  const { email, password } = req.body;

  const [foundUser] = await db.user.check_email(email);
  if (!foundUser) return res.status(401).send("Invalid email or password");


  const passwordCheck = await compare(password, foundUser.password)
  if (!passwordCheck) return res.status(401).send("Invalid email or password.")

  delete foundUser.password
  foundUser.api_key = foundUser.api_key ? true : false

  req.session.user = foundUser
  return res.status(200).send(req.session.user)
}

const editUser = async (req, res) => {
  const db = req.app.get("db");
  const { user_id } = req.session.user;

  req.body.user_id = user_id;
  const [updatedUser] = await db.user.edit_user(req.body)
  .catch((err) => {
    console.log(err);
    res.sendStatus(400);
  });

  req.session.user = updatedUser;
  res.status(200).send(req.session.user);
};

const logoutUser = async (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
};

const getUserSession = async (req, res) => {
  const db = req.app.get("db")
  const { user_id } = req.session.user

  const [currentUser] = await db.user.check_user_id(user_id)

  currentUser ? res.status(200).send(req.session.user)
  : res.status(404).send("Please login")
}

const resetUserPassword = async (req, res) => {
  const db = req.app.get("db");
  let { password, resetPasswordToken } = req.body;

  const [tokenValidator] = await db.user
    .check_user_reset_token([resetPasswordToken])
    .catch((err) => {
      console.log(err, "error in tokenValidator");
      res.sendStatus(400);
    })

  if (!tokenValidator) {
    return res.status(401).send("This link is invalid or expired.");
  } else if (Date.now() > tokenValidator.resetPasswordExpires) {
    return res.status(401).send("This link is expired.");
  } else {

    const hashed = await hash(password, 10)
    password = hashed

    await db.user.reset_password({ password, resetPasswordToken })
      .catch((err) => {
        console.log(err, "Error in updatedUser");
        res.sendStatus(400);
      });
    res.status(200).send({ success: true });
  }
};

//import environment variables nodemailer
const { authEmailer, authEmailerPassword } = process.env; //nodemailer credentials

const emailUser = async (req, res) => {
  const db = req.app.get("db")
  const { email } = req.body
  const [foundUser] = await db.user.check_email(email)
  if (!foundUser) {
    res.sendStatus(500);
  }

  const resetPasswordToken = crypto.randomBytes(20).toString("hex");
  const resetPasswordExpires = Date.now() + 3600000 * 24; // 1 day

  await db.user.insert_reset_token([resetPasswordToken, resetPasswordExpires, email])
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });

  try {
    //invoke the createTransport function passing in your email information.
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: authEmailer,
        pass: authEmailerPassword,
      },
    });

    //invoke the sendMail function with the info in the email
    await transporter.sendMail(
      {
        from: `'The Budgewit Team' <${authEmailer}>`, //From field with our name.
        to: email, //user's email address
        subject: "Your Budgewit Account", //This will show on the subject of the email
        text:
          `Dear User,\n\n` +
          "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
          "Please click on the following link, or paste this into your browser to complete the process within one day of receiving it:\n\n" +
          `http://localhost:3000/reset/${resetPasswordToken}\n\n` +
          "If you did not request this, please ignore this email and your password will remain unchanged.\n",
      },
      (err, res) => {
        if (err) {
          console.log("err", err)
        } else {
          console.log("res", res)
          res.status(200).send(res)
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.sendStatus(500)
  }
  res.sendStatus(200)
}

export {
  registerUser,
  loginUser,
  logoutUser,
  getUserSession,
  editUser,
  emailUser,
  resetUserPassword,
}
