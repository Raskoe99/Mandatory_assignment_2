import bcrypt from "bcrypt"

export const saltRounds = 12

export async function loginRouter(plainTextPassword, hashedPassword) {
    return await bcrypt.compare(plainTextPassword, hashedPassword)
}

export async function signUpRouter(plainTextPassword) {
    return await bcrypt.hash(plainTextPassword, saltRounds) 
}