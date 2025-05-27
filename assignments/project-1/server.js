const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Welcome to home page")
});



app.get("/posts", async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
});
 

app.post("/post", async (req, res) => {
  const { title, content } = req.body;
  const newPost = await prisma.post.create({ data: { title,content} });
  res.status(201).json(newPost);
});

const PORT = process.env.PORT ;
app.listen(PORT, () =>
     console.log(`Server running on port ${PORT}`));
