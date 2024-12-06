import express from "express";
import { createClient } from "redis";

const app = express();

app.use(express.json());

const client = createClient();
client.connect();

app.post("/submit", async (req, res) => {
  try {
    const { problemId, userId, code, language } = req.body;

    // Idealy Push to DB
    // ....

    //  Pushing to Redis

    await client.lPush(
      "submissions",
      JSON.stringify({ problemId, userId, code, language })
    );

    res.json({
      message: "Submission Received",
    });
  } catch (error) {
    res.json({
      message: "Submission Failed",
    });
  }
});

app.listen(5000, () => console.log("Server Running"));
