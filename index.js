import { createApp } from "./config.js";

const app = createApp({
  user: "proud_dust_4174",
  host: "bbz.cloud",
  database: "proud_dust_4174",
  password: "52303fae1091453148d41ce26da59273",
  port: 30211,
});

/* Startseite */
app.get("/", async function (req, res) {
  res.render("start", {});
});

app.get("/home", async function (req, res) {
  res.render("home", {});
});

app.get("/posts", async function (req, res) {
  const posts = await app.locals.pool.query("select * from posts");
  res.render("posts", { posts: posts.rows });
});

app.get("/post/:id", async function (req, res) {
  const posts = await app.locals.pool.query(
    `select * from posts WHERE id = ${req.params.id}`
  );
  res.render("post", { posts: posts.rows });
});

app.get("/create", async function (req, res) {
  res.render("create", {});
});

app.get("/saved", async function (req, res) {
  // const saved = await app.locals.pool.query("select * from user_post_saved");
  res.render("saved", {});
});

/* Wichtig! Diese Zeilen müssen immer am Schluss der Website stehen! */
app.listen(3010, () => {
  console.log(`Example app listening at http://localhost:3010`);
});
