import dotenv from "dotenv"
import express from "express"
import massive from "massive"
import { getData, addData, deleteData, editData } from "./controllers/dataController.js"
const app = express()
dotenv.config()

const { SERVER_PORT, CONNECTION_STRING } = process.env

app.use(express.json())
// app.use(session())

massive({connectionString: CONNECTION_STRING, ssl: {rejectUnauthorized: false}})
.then(db => {app.set("db", db); console.log("Connected to database!")})
.catch(err => console.log(err))

app.get("/api/data/:tableName", getData)
app.post("/api/data/:tableName", addData)
app.put("/api/data/:tableName/:dataId", editData)
app.delete("/api/data/:tableName/:dataId", deleteData)

app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}.`))