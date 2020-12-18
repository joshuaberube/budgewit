import dotenv from "dotenv"
import express from "express"
import massive from "massive"
const app = express()
dotenv.config()

const { SERVER_PORT, CONNECTION_STRING } = process.env

app.use(express.json())

massive({connectionString: CONNECTION_STRING, ssl: {rejectUnauthorized: false}})
.then(db => {app.set("db", db); console.log("Connected to database!")})
.catch(err => console.log(err))



app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}.`))