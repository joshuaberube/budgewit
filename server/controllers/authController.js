import {compareSync, genSaltSync, hashSync} from 'bcrypt';
import nodemailer from 'nodemailer';



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
    if (!foundUser) res.status(401).send("Invalid email or password")

    const passwordCheck = compareSync(password, foundUser.password)
    if (!passwordCheck) return res.status(401).send("Invalid email or password.")

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
const { authEmailer, authEmailerPassword } = process.env

const email = async (req, res) => {
    const { firstName, lastName, email, } = req.body  //user variables from the front end 
    let passwordResetUrl = '' 
    //icebox add conditional mailer for verify user.

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
        text: `Hello ${firstName} ${lastName},
        We see you are having some trouble with your account.
        Use the link below to reset it.
        ${passwordResetUrl}`, //for clients with plaintext support only
        html: `<div>${message}<div>`, 
              //<img src="cid:budgewit@gmail.com"/>`,  if we want to include a logo or attachments later.
        /*attachments: [
          { //this is the attachment of the document
            filename: '',
            path: ''
          },
          { //this is the embedded image
            cid: 'budgewit@gmail.com', 
            path:''
          }
        ]*/
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