import express from "express";
import "dotenv/config";
import { routes } from "./routes";
import { appErrors } from "./errors/appErrors";
import { pageNotFound } from "./errors/pageNotFound";
import { sqliteConnnection } from "./database/sqlite3";
import { runMigrations } from "./database/sqlite3/migrations";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);

app.use(pageNotFound);
app.use(appErrors);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

sqliteConnnection()
  .then(() => {
    console.log("Database is connected...");
  })
  .catch((error) => console.error("Database is not connected - ", error));

runMigrations();
