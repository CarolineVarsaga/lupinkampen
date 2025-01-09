const express = require("express");
const router = express.Router();
const connection = require("../../lib/conn");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
require("dotenv").config();

router.post("/", (req, res) => {
  const salt = process.env.SALT_KEY;
  const userName = req.body.userName;
  const password = req.body.password;

  if (!userName || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  connection.connect((err) => {
    if (err) {
      console.log(err, "error");
      return res.status(500).json({ message: "Database connection error" });
    }

    const query = "SELECT * FROM users WHERE userName = ?";
    const values = [userName];

    connection.query(query, values, (err, data) => {
      if (err) {
        console.log(err, "error");
        return res.status(500).json({ message: "Database query error" });
      }

      if (data.length > 0) {
        const user = data[0];
        const decryptedPassword = CryptoJS.AES.decrypt(user.password, salt).toString(CryptoJS.enc.Utf8);
        
        if (decryptedPassword === password) {
          const token = jwt.sign(
            { id: user.userId, userName: user.userName },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" } 
          );

          res.status(200).json({ user: data[0].userId, message: "logged in", token });
         // res.status(200).json({ message: "Logged in successfully", token });
        } else {
          res.status(401).json({ message: "Wrong username or password" });
        }
      } else {
        res.status(401).json({ message: "Wrong username or password" });
      }
    });
  });
});

// router.post("/", (req, res) => {
//   const salt = process.env.SALT_KEY;

//   const userName = req.body.userName;
//   const password = req.body.password;

//   connection.connect((err) => {
//     if (err) console.log(err, "error");

//     const query = "SELECT * FROM users WHERE userName = ?";
//     const values = [userName];

//     connection.query(query, values, (err, data) => {
//       if (err) console.log(err, "error");

//       if (data.length > 0) {
//         console.log("user", data[0]);
//         const decryptedPassword = CryptoJS.AES.decrypt(
//           data[0].password,
//           salt
//         ).toString(CryptoJS.enc.Utf8);
//         if (decryptedPassword === password) {
//           res.status(200).json({ user: data[0].userId, message: "logged in" });
//         } else {
//           res.status(401).json({ message: "wrong username or password" });
//         }
//       } else {
//         res.status(401).json({ message: "wrong username or password" });
//       }
//     });
//   });
// });

module.exports = router;
