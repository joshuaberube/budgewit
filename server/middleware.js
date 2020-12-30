const camelToSnake = (req, res, next) => {
    const newReqBody = {}
    for (const key in req.body) {

        const camelCase = key
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map(key => key.toLowerCase())
            .join("_")

        newReqBody[camelCase] = req.body[key]
    }

    req.body = newReqBody
    next()
}

const checkSession = (req, res, next) => {
    if (req.session.user.userId) next()
    .catch(() => res.status(403).send("No user logged in"))
}

export {camelToSnake, checkSession}

