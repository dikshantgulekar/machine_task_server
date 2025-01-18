import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import db from "./database/db.js"
import categoryRoute from "./routes/categoryRoute.js"
import productRoute from "./routes/productRoute.js"


const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false}))

app.use(cors())

db.getConnection().then((connection)=>{ console.log("MySql Connected"); connection.release()})

app.use('/', categoryRoute);
app.use('/', productRoute)

app.listen(8000, ()=>{
    console.log('Server running on 8000')
})