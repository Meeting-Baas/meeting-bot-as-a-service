import { Client } from "@notionhq/client";
import "dotenv/config";

import express, { Express, Request, Response } from "express";
import { checkEnvironmentVariables, listDatabases } from "./lib/utils";

import formRouter from "./routes/form";
import webhookRouter from "./routes/webhook";

const app: Express = express();

// SANITY CHWECK
// ENV variables
const missingEnvVars = checkEnvironmentVariables();
// NOTION DATABASES (easy source of error)
if (process.env.NOTION_API_KEY) {
  try {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });
    listDatabases(notion);
  } catch {
    console.log("⚠️ Could not access Notion.");
  }
}

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  var url = req.protocol + "://" + req.get("host");
  res.locals.title = "Home";

  // res.render("pages/index", { url });
  res.render("pages/index", { url, missingEnvVars });
});
app.use("/form", formRouter);
app.use("/webhook", webhookRouter);

// webhook setup
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
console.log(`\n\n[server]: 🟢🟢 Server is running at \u001b]8;;${url}\u001b\\${url}\u001b]8;;\u001b\\ 🟢🟢`);
});
