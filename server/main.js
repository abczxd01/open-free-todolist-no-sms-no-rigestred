import express from "express"
import mongoose from "mongoose"

import router from "./router.js"

const DB_URL = `mongodb+srv://user:user@cluster0.hbmaa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const PORT = 5000
const app = express()

app.use(express.json())
app.use('/api',router)


async function startApp() {
    try {
        await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        app.listen(PORT, '127.0.0.1', () => console.log("server start"))
    } catch (err) {
        console.log(err);
    }
}

startApp()