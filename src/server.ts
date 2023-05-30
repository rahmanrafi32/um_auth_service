import mongoose from "mongoose";
import 'dotenv/config'
import config from "./config"
import {app} from "./app";

async function connectDB() {
    try {
        await mongoose.connect(config.dbUrl as string);
        console.log('Successfully Connected To DB')
    } catch (err) {
        console.error('Failed to connect database')
    }
}

connectDB().then(() => {
    app.listen(config.port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${config.port}`);
    });
})
