
import dotenv from "dotenv"
import express from "express"
import massive from "massive"
import session from "express-session"
import path from "path"
import { editUser, getUserSession, loginUser, logoutUser, registerUser, emailUser, resetUserPassword } from "./controllers/authController.js"
import { getData, addData, deleteData, editData } from "./controllers/dataController.js"
import { createPlaidLinkToken, getPlaidTransactions, createAccessToken, getCategories } from "./controllers/plaidController.js"
import { checkSession } from "./middleware.js"
const app = express()
dotenv.config()

const __dirname = path.resolve(path.dirname(''))
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

app.use(express.static(`${__dirname}/build`))
app.use(express.json())

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"))
})

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then((db) => {
    app.set("db", db);
    console.log("Connected to database!");
  })
  .catch((err) => console.log(err));


//# Data endpoints

app.get("/api/data/:tableName", checkSession, getData)
app.post("/api/data/:tableName", checkSession, addData)
app.put("/api/data/:tableName/:dataId", checkSession, editData)
app.delete("/api/data/:tableName/:dataId", checkSession, deleteData)

//# User endpoints
app.post("/api/user/register", registerUser)
app.post("/api/user/login", loginUser)
app.post("/api/user/update", checkSession, editUser)
app.post("/api/user/logout", checkSession, logoutUser)
app.post("/api/user/session", checkSession, getUserSession)
app.post("/api/user/forgotpassword", emailUser);
app.put("/api/user/reset/:resetPasswordToken", resetUserPassword);

//# Plaid endpoints
app.post("/api/plaid/create-link-token", checkSession, createPlaidLinkToken)
app.post("/api/plaid/create-access-token", checkSession, createAccessToken)
app.post("/api/plaid/transactions", checkSession, getPlaidTransactions)
app.get("/api/plaid/categories", checkSession, getCategories)

app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}.`))