const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "akshay_15",
  database: "moviedatabase",
});

app.use(cors()); //bodyparser middleware
app.use(express.json()); //middleware for converting json from frontend to javascript object
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.get("/", (req, res) => {
  res.send("got get");
  console.log("Hey");
});
app.get("/api/get", (req, res) => {
  //db Query
  const sqlSelect = "SELECT * FROM movie_reviews";
  db.query(sqlSelect, (err, result) => {
    // console.log(result);
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  //fetch from frontend
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  //db Query
  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?, ?)";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log("Inserted");
  });
});

app.delete("/api/delete/:movieName", (req, res) => {
  const name = req.params.movieName;
  const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";

  db.query(sqlDelete, name, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("/api/update", (req, res) => {
  const name = req.body.movieName;
  const review = req.body.movieReview;
  const sqlUpdate =
    "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";

  db.query(sqlUpdate, [review, name], (err, result) => {
    if (err) console.log(err);
    console.log("Updated");
  });
});

app.listen(8000, () => {
  console.log("Server started");
});
