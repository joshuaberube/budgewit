import {compareSync, genSaltSync, hashSync} from 'bcrypt';
import nodemailer from 'nodemailer';
import crypto from "crypto";



const registerUser = async (req, res) => {
    const db = req.app.get('db')
    const {email, password} = req.body

    const [foundEmail] = await db.user.check_email(email)
    if (foundEmail) res.status(401).send("Email already in use")

    const salt = genSaltSync(10)
    const hash = hashSync(password, salt)
    req.body.password = hash

    const [newUser] = await db.user.register_user(req.body)
    .catch(err => {console.log(err); res.sendStatus(400)})

    req.session.user = newUser

    return res.status(200).send(req.session.user)
}

const loginUser = async (req, res) => {
    const db = req.app.get('db')
    const {email, password} = req.body

    const [foundUser] = await db.user.check_email(email)
    if (!foundUser) {return res.status(401).send("Invalid email or password")}

    const passwordCheck = compareSync(password, foundUser.password)
    if (!passwordCheck) {return res.status(401).send("Invalid email or password.")}

    delete foundUser.password
    req.session.user = foundUser
    return res.status(200).send(req.session.user)
}

const logoutUser = async (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
}

const getUserSession = async (req, res) => {
    const db = req.app.get("db")
    const {user_id} = req.session.user

    const [currentUser] = await db.auth.check_user_id(user_id)

    currentUser ? res.status(200).send(req.session.user)
    : res.status(404).send("Please login")
}

//import environment variables nodemailer
const { authEmailer, authEmailerPassword } = process.env  //nodemailer credentials


const email = async (req, res) => {
     const { email } = req.body  
     const db = req.app.get('db')
     const [foundUser] = await db.user.check_email(email)
    if (!foundUser) {res.sendStatus(500)}
    
    const token = crypto.randomBytes(20).toString('hex');   
    const tokenContainer = {resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000*24}
    
    const [insertContainer] = await db.user.insert_reset_token(email, tokenContainer.resetPasswordToken, tokenContainer.resetPasswordExpires)
    .catch(err => {console.log(err); res.sendStatus(400)})
  
    try {
      //invoke the createTransport function passing in your email information. 
      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: authEmailer,
          pass: authEmailerPassword
        }
      });

      //invoke the sendMail function with the info in the email
      let resetPasswordEmail = await transporter.sendMail({
        from: `'The Budgewit Team' <${authEmailer}>`, //From field with our name.
        to: email, //user's email address
        subject: 'Your Budgewit Account', //This will show on the subject of the email
        text:
          `Dear ${firstName} ${lastName},`
        + 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
        + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
        + `http://localhost:3000/reset/${token}\n\n`
        + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
    }, (err, res) => {
        if (err) {
          console.log('err', err)
        } else {
          console.log('res', res)
          res.status(200).send(resetPasswordEmail)
        }
      })
    } catch (err) {
      console.log(err)
      res.sendStatus(500)
    }
   
    
  }


export {registerUser, loginUser, logoutUser, getUserSession, email}