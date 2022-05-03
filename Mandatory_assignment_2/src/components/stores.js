import { readable, writable } from "svelte/store"
const baseUrlConstant = "http://localhost:3000"

export const baseUrl = readable(baseUrlConstant)

export const companyEmail = readable("furnitureAndYou@outlook.com")

export const mailerUrl = readable(baseUrlConstant + "/mail/send")

export const user = writable( { user : { userInfo : null, isLoggedIn : false } } )

export const cartList = writable([])

//const gotUser = localStorage.getItem("user")