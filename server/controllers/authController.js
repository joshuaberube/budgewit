import {compareSync, genSaltSync, hashSync} from 'bcrypt'

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

    res.status(200).send(req.session.user)
}

const loginUser = async (req, res) => {
    const db = req.app.get('db')
    const {email, password} = req.body
}

export {registerUser, loginUser}