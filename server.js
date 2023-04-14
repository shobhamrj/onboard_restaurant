const express = require("express");
const pgp = require("pg-promise")();
const cn = {
  host: "localhost",
  port: 5432,
  database: "restaurant",
  user: "shobham",
  password: "",
  allowExitOnIdle: true,
};

const db = pgp(cn);
const app = express();

app.use(express.json());
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/api/restaurant", async (req, res) => {
  try {
    const {
      restaurant_name,
      contact_name,
      pincode,
      location,
      website,
      phone_number,
      avg_daily_transactions,
    } = req.body;
    await db.none(
      "INSERT INTO restaurant (restaurant_name, contact_name, pincode, location, website, phone_number, avg_daily_transactions) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        restaurant_name,
        contact_name,
        pincode,
        location,
        website,
        phone_number,
        avg_daily_transactions,
      ]
    );

    res.json({
      status: "success",
      message: "Restaurant details submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting restaurant details:", error);
    res
      .status(500)
      .json({
        status: "failure",
        message: "Failed to submit restaurant details",
      });
  }
});

app.listen("3001", () => {
  console.log("Listening on port 3001");
});
