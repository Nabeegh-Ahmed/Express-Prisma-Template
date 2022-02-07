import jwt from 'jsonwebtoken'

export const generateToken = (id: string) => {
    if (process.env.JWT_SECRET) {
        return jwt.sign({id}, process.env.JWT_SECRET, {
            expiresIn: '30d'
        })
    } else {
        return null
    }
}