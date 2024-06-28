const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");
const port = process.env.PORT || 6001;
app.use(express.json());
app.use(bodyParser.json());
const Comment = require("./Schemas/createComment");
const json = require("body-parser/lib/types/json");
//database config
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.STRING);
    console.log("database connected", connect.connection.name);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectDB();
//app listening server
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

//send comment
app.use(cors());
app.post("/api/comments/send", async (req, res) => {
  const { comment } = req.body;
  if (!comment) {
    res.status(400).json({ err: "please add a comment" });
  }
  const comm = await Comment.create({ comment });
  res.status(201).json(comm);
});
//get comment
app.get("/api/comments", async (req, res) => {
  const comms = await Comment.find();
  if (!comms) {
    res.status(404).json({ msg: "there arent any comments yet" });
  }
  res.status(200).json(comms);
});

//send email
app.post("/api/send-email", async (req, res) => {
  const { firstname, secondname, email, message } = req.body;
  if (!firstname || !secondname || !email || !message) {
    res.status(400).json({ msg: "Boss!,all the fields are required" });
  }
  //email transporter
  const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "visacciallanz14@gmail.com",
      pass: "kyengera",
    },
  });
  //email options
  const mailOptions = {
    from: email,
    to: "visacciallanz14@gmail.com",
    subject: `new message from ${firstname} ${secondname}`,
    text: message,
  };
  //send the email
  transpoter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("err", err);
      return res.status(500).json({
        msg: "there was an error sending your message, please try agian!",
        err,
      });
    }
    res.status(200).json({
      msg: "Thank you boss!, your message was sent succesfully",
      info,
    });
  });
});
