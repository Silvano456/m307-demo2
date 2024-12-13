import express from "express";
import { engine } from "express-handlebars";
import pg from "pg";
const { Pool } = pg;
import cookieParser from "cookie-parser";
import multer from "multer";
const upload = multer({ dest: "public/uploads/" });
import sessions from "express-session";
import bcrypt from "bcrypt";

export function createApp(dbconfig) {
  const app = express();

  const pool = new Pool(dbconfig);

  app.engine("handlebars", engine());
  app.set("view engine", "handlebars");
  app.set("views", "./views");

  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(
    sessions({
      secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
      saveUninitialized: true,
      cookie: { maxAge: 86400000, secure: false },
      resave: false,
    })
  );

  app.locals.pool = pool;
  app.get("/register", function (req, res) {
    res.render("register");
  });

// Mit diesem Code wird ein neuer User angelegt und in die Datenbank gespeichert
  app.post("/register", function (req, res) {
    var password = bcrypt.hashSync(req.body.password, 10);
    pool.query(
      "INSERT INTO users (name, password) VALUES ($1, $2)",
      [req.body.name, password],
      (error, result) => {
        if (error) {
          console.log(error);
        }
        res.redirect("/login");
      }
    );
  });

  app.get("/login", function (req, res) {
    res.render("login");
  });

// Mit diesem Code wird das Login Formular mit der Datenbank abgeglichen und schaut ob dieser User schon gegeben ist oder nicht, oder ob etwas Flasch eingegeben sit
  app.post("/login", function (req, res) {
    pool.query(
      "SELECT * FROM users WHERE name = $1",
      [req.body.name],
      (error, result) => {
        if (error) {
          console.log(error);
        }
        if (bcrypt.compareSync(req.body.password, result.rows[0].password)) {
          req.session.userid = result.rows[0].id;
          res.redirect("/");
        } else {
          res.redirect("/login");
        }
      }
    );
  });

// Mit diesem Code werden die Gespeichrten Posts angeziegt die ein User mit gespeichrt hat.
  app.get("/events/:id", async function (req, res) {
    const event = await app.locals.pool.query(
      "SELECT * FROM events WHERE id = $1",
      [req.params.id]
    );
    const user_post_saved = await app.locals.pool.query(
      "SELECT COUNT(user_id) FROM user_post_saved WHERE post_id = $1",
      [req.params.id]
    );
    res.render("details", {
      event: event.rows[0],
      user_post_saved: user_post_saved.rows[0],
    });
  });

  return app;
}

export { upload };
