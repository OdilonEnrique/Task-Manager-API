import { sqliteConnnection } from "../database/sqlite3";
import { CreateTaskDataTypes } from "../services/taskServices";

export type CreateTaskType = CreateTaskDataTypes & { id: string };

export const taskRepository = {
  async createTask(data: CreateTaskType) {
    try {
      const { id, title, description, date, status, idUser } = data;

      const db = await sqliteConnnection();

      const querySQL =
        "INSERT INTO tasks (id, title, description, date, status, id_user) VALUES (?,?,?,?,?,?);";

      await db.run(querySQL, [id, title, description, date, status, idUser]);

      return { id };
    } catch (error) {
      throw error;
    }
  },

  async getTask(id: string) {
    try {
      const db = await sqliteConnnection();

      const querySQL = "SELECT * FROM tasks WHERE id = ?;";

      const task = await db.get(querySQL, [id]);

      return task;
    } catch (error) {
      throw error;
    }
  },
};
