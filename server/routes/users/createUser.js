const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const supabase = require("../../config/supabase");
require("dotenv").config();

const generateUserId = () => Math.floor(Math.random() * 1000000000000);

const avatars = [
  "/assets/avatar-bee.png",
  "/assets/avatar-beeswax.png",
  "/assets/avatar-cactus.png",
  "/assets/avatar-cloud.png",
  "/assets/avatar-glove.png",
  "/assets/avatar-lupine.png",
  "/assets/avatar-sun.png",
  "/assets/avatar-sunflower.png",
  "/assets/avatar-tulip.png",
];

const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * avatars.length);
  return avatars[randomIndex];
};

// const checkUniqueUserId = async () => {
//   const userId = generateUserId();
//   const { data, error } = await supabase
//     .from("users")
//     .select("userId", { count: "exact" })
//     .eq("userId", userId);

//   if (error) {
//     console.log("Database error:", error);
//     throw error;
//   }

//   if (data.length > 0) {
//     return checkUniqueUserId();
//   }

//   return userId;
// };
const checkUniqueUserId = async (retry = 0) => {
  if (retry > 5) throw new Error("Kunde inte generera unikt userId");

  const userId = generateUserId();
  const { data, error } = await supabase
    .from("users")
    .select("userId")
    .eq("userId", userId);

  if (error) {
    console.log("Database error:", error);
    throw error;
  }

  return data.length > 0 ? checkUniqueUserId(retry + 1) : userId;
};


const checkUniqueUserName = async (userName) => {
  const { data, error } = await supabase
    .from("users")
    .select("userId")
    .eq("userName", userName);

  if (error) {
    console.log("Database error:", error);
    throw error;
  }
  return data.length === 0;
};

const checkUniqueEmail = async (email) => {
  const { data, error } = await supabase
    .from("users")
    .select("userId")
    .eq("email", email);

  if (error) {
    console.log("Database error:", error);
    throw error;
  }
  return data.length === 0;
};

router.post("/", async (req, res) => {
  try {
    const salt = process.env.SALT_KEY;
    const { userName, email, password, userMunicipality, associationId } = req.body;

    if (/\s/.test(userName)) {
      return res.status(400).json({ message: "Ta bort mellanslaget." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(userName)) {
      return res.status(400).json({ message: "Användarnamn får inte vara en e-postadress." });
    }

    const isUserNameUnique = await checkUniqueUserName(userName);
    if (!isUserNameUnique) {
      return res.status(400).json({ message: "Användarnamn upptaget, välj ett annat." });
    }
    
    const isEmailUnique = await checkUniqueEmail(email);
    if (!isEmailUnique) {
      return res.status(400).json({ message: "E-postadressen finns redan registrerad." });
    }
    

    const encryptedPassword = CryptoJS.AES.encrypt(password, salt).toString();
    const userId = await checkUniqueUserId();
    const avatar = getRandomAvatar();

    const { data: newUser, error } = await supabase.from("users").insert([
      {
        userId,
        userName,
        password: encryptedPassword,
        email,
        userMunicipality,
        userAssociation: associationId,
        avatar,
      },
    ]).select("*").single(); 
    
    if (error || !newUser) {
      console.error("Error saving user:", error);
      return res.status(500).json({ message: "Error saving user" });
    }

    res.status(200).json({ message: "User saved successfully", userId, avatar });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;