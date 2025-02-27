import dotenv from 'dotenv'; 
dotenv.config();

export const config = {
    email: process.env.EMAIL,
    username: process.env.USER_NAME,
    password: process.env.PASSWORD, 
    webhook: process.env.WEBHOOK,
    classID: process.env.CLASSID,
};