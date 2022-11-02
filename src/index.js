

// const express = require("express");

import express from "express";

import dotenv from "dotenv";
import cors from "cors";
import { connectDatabase } from '../config/database.js';
import userRoutes from "../routes/user.routes.js";


const app = express();

dotenv.config();
// middleware  handlers  express routes


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.get("/",async (req,res)=>{

  try {
    
    res.status(200).send({
      success:true,
      message:"all set"
    })

  } catch (error) {
    res.status(500).send({
      success:false,
      message:"not good"
    })
  }

})


app.use("/api/v1" , userRoutes);




app.listen(process.env.PORT|| '5050', async () => {
  try {

    await connectDatabase();

    console.log(`http://localhost:${process.env.PORT|| '5050'}`);
  } catch (error) {
    console.log(`${error.message}`);
  }
});
