import { sqliteConnnection } from "..";
import { tableTasks } from "./tableTasks";
import { tableUsers } from "./tableUsers";

export async function runMigrations() {
  const schemas = [tableUsers, tableTasks].join("");

  sqliteConnnection()
    .then((db) => db.exec(schemas))
    .catch((error) => console.error(error));
}
