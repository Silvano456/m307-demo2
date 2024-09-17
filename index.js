import { createApp } from "./config.js";

const app = createApp({
  user: "autumn_star_7622",
  host: "168.119.168.41",
  database: "demo",
  password: "uaioysdfjoysfdf",
  port: 18324,
});

/* Startseite */
app.get("/", async function (req, res) {
  res.render("start", {});
});

app.get("/home", async function (req, res) {
  res.render("home", {});
});

app.get("/posts", async function (req, res) {
  res.render("posts", {});
});

app.get("/create", async function (req, res) {
  res.render("create", {});
});

app.get("/saved", async function (req, res) {
  res.render("saved", {});
});

/* Wichtig! Diese Zeilen müssen immer am Schluss der Website stehen! */
app.listen(3010, () => {
  console.log(`Example app listening at http://localhost:3010`);
});
