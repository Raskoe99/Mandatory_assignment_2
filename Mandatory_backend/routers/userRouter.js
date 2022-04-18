import { Router } from "express"
import {  loginRouter, signUpRouter } from "../encryption/password.js"
import db from "../databases/createMySQLTable.js"

const userRouter = Router()

userRouter.post("/auth/login", async (req, res) => {
    db.query(`SELECT * FROM users WHERE username = ?`, [req.body.username], async (error, data) => {
        let foundUser = data[0]

        if (foundUser !== undefined && await loginRouter(req.body.password, foundUser.hashedPassword)) {
            req.session.isLoggedIn = true
            res.send( { userInfo : { username : foundUser.username, email : foundUser.email }, isLoggedIn : req.session.isLoggedIn } )
        } else {
            res.send( { isLoggedIn : false } )
        }
    })
})

userRouter.get("/auth/logout", async (req, res) => {
    res.send( { user : { userInfo : null, isLoggedIn : false } } )
})

userRouter.post("/auth/signup", async (req, res) => {
    req.body.password = await signUpRouter(req.body.password) //hashes psasword

    db.query(`SELECT * FROM users WHERE username = ?`, [req.body.username], (error, data) => {
        let foundUser = data[0]
              
        if (foundUser == undefined) {
            db.query(`INSERT INTO users (username, hashedpassword, email) VALUES (?, ?, ?)`, [req.body.username, req.body.password, req.body.email], (error, data) => {
            })
            req.session.isLoggedIn = true
            res.send( { userInfo : { username : req.body.username, email : req.body.email }, isLoggedIn : req.session.isLoggedIn } )
        } else {
            res.send( { isLoggedIn : false } )
        }
    })
})

userRouter.post("/auth/changeEmail", async (req, res) => {
    db.query(`SELECT * FROM users WHERE username = ?`, [req.body.username], async (error, data) => {
        let foundUser = data[0]

        if (foundUser !== undefined && await loginRouter(req.body.password, foundUser.hashedPassword)) {
            db.query(`UPDATE users SET email = ? WHERE username = ?`, [req.body.email, req.body.username], (error, data) => {
            })
            res.send( { isUpdated : true } )
        } else {
            res.send( { isUpdated : false } )
            console.log(error)
        }
    })
})

userRouter.post("/auth/delete", async (req, res) => {
    db.query(`SELECT * FROM users WHERE username = ?`, [req.body.username], async (error, data) => {
        let foundUser = data[0]

        if (foundUser !== undefined && await loginRouter(req.body.password, foundUser.hashedPassword)) {
            db.query(`DELETE FROM users WHERE username = ?`, [req.body.username], (error, data) => {
            })
            res.send( { isDeleted : true } )
            req.session.destroy()
        } else {
            res.send( { isDeleted : false } )
            console.log(error)
        }
    })
})

export default userRouter