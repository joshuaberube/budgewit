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

    req.session.user = {
        userId: newUser.user_id,
        email: newUser.email,
        firstName: newUser.first_name,
        lastName: newUser.last_name,
        phoneNum: newUser.phone_num
    }

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

export {registerUser, loginUser, logoutUser, getUserSession}