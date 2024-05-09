import express from "express";
import 'dotenv/config'
import mongoose from "mongoose";
import bookRoute from './routes/bookRoute.js'
import cors from 'cors'
const app = express();
const PORT = process.env.PORT
const mongoURL =process.env.mongoURL

app.use(express.json());
app.use(cors())
app.use('/books',bookRoute)


// app.use(cors({
//   orign:'http://localhost:3000',
//   methods:['GET','POST','PUT','DELETE'],
//   allowedHeader:['Content-Type']
// }))

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("App connected to database");
    app.get("/", (req, res) => {
      return res.status(234).send("Welcome To Mern Stack");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server sarted Successfully on PORT ${PORT}`);
});
