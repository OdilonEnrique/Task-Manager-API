import { sqliteConnnection } from "../database/sqlite3";
import {
  CreateTaskDataTypes,
  UserTasksPagination,
} from "../services/taskServices";

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

  async updateTask(data: CreateTaskType) {
    try {
      const { id, title, description, date, status } = data;

      const db = await sqliteConnnection();

      const querySQL = `UPDATE tasks 
        SET title = ?, description = ?, date = ?, status = ? 
        WHERE id = ?;`;

      await db.run(querySQL, [title, description, date, status, id]);

      return { id };
    } catch (error) {
      throw error;
    }
  },

  async deleteTask(id: string) {
    try {
      const db = await sqliteConnnection();

      const querySQL = "DELETE FROM tasks WHERE id = ?;";

      await db.run(querySQL, [id]);

      return { id };
    } catch (error) {
      throw error;
    }
  },

  async getTasks(data: UserTasksPagination) {
    try {
      const { userID, limit, offset, filter } = data;

      const db = await sqliteConnnection();

      if (filter == "all") {
        const querySQL = `
        SELECT * FROM tasks 
        WHERE id_user = ?
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?;
        `;

        const userTasks = await db.all(querySQL, [userID, limit, offset]);

        return userTasks;
      } else {
        const querySQL = `
      SELECT * FROM tasks 
      WHERE id_user = ? AND status = ?
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?;
      `;

        const userTasks = await db.all(querySQL, [
          userID,
          filter,
          limit,
          offset,
        ]);

        return userTasks;
      }
    } catch (error) {
      throw error;
    }
  },
};
