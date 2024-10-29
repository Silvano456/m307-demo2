import { createApp, upload } from "./config.js";

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

app.post("/create", upload.single("image"), async function (req, res) {
  const result = await app.locals.pool.query(
    "INSERT INTO posts (post_title, post_content, post_description, maps_link, user_id) VALUES ($1, $2, $3, $4, 1)",
    [
      req.body.post_title,
      req.body.post_content,
      req.body.post_description,
      req.body.maps_link,
    ]
  );
  console.log(result);
  res.redirect("/");
});

app.get("/saved", async function (req, res) {
  // const saved = await app.locals.pool.query("select * from user_post_saved");
  res.render("saved", {});
});

/* Wichtig! Diese Zeilen müssen immer am Schluss der Website stehen! */
app.listen(3010, () => {
  console.log(`Example app listening at http://localhost:3010`);
});
