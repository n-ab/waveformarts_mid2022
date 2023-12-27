export const config = {
    PORT: 8000,
    database: 'mongodb://localhost:27017/wfa',
    email: {
        username: process.env.PROTON_EMAIL,
        password: process.env.PROTON_PASSWORD
    }
}