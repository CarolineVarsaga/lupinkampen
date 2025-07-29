const express = require("express");
const router = express.Router();
const supabase = require("../../config/supabase");

router.get("/username", async (req, res) => {
  try {
    const { value } = req.query;

    const { data, error } = await supabase
      .from("users") 
      .select("userId")
      .eq("userName", value)
      .maybeSingle();

      if (error) {
        console.error("Supabase Error:", error);
        return res.status(500).json({ error: error.message });
      }

      res.json({ available: data === null }); 
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/email", async (req, res) => {
  try {
    const { value } = req.query;

    const { data, error } = await supabase
      .from("users") 
      .select("userId")  
      .eq("email", value)
      .maybeSingle(); 

    if (error) {
      console.error("Supabase Error:", error);
      return res.status(500).json({ error: error.message });
    }

    res.json({ available: data === null });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
