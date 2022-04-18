import express from "express"
import cors from "cors"
import session from "express-session"
import helmet from "helmet"
import userRouter from "./routers/userRouter.js"
import mailRouter from "./routers/mailRouter.js"

const app = express()

app.use(session({
    secret : "keyboard cat",
    resave : false,
    saveUninitialized : true,
    cookie : { secure : false } //Only with https
}))

app.use(cors())
app.use(helmet())
app.use(express.json())


app.use(userRouter)

app.use(mailRouter)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("Successfully connected to port ", PORT)
})