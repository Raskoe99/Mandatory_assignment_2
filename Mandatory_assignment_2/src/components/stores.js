import { readable, writable } from "svelte/store"

export const baseUrl = readable("http://localhost:3000")

export const companyEmail = readable("furnitureAndYou@outlook.com")

export const mailerUrl = readable("/mail/send")

export const user = writable( { user : { userInfo : null, isLoggedIn : false} } )

export const cartList = writable([])