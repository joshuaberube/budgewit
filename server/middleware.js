const checkSession = (req, res, next) => {
    try {
        if (req.session.user.user_id) next()
    } catch (err) {
        res.status(403).send("No user logged in")
    } 
}

export { checkSession }

