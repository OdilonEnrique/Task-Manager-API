import { randomUUID } from "node:crypto";
import { TaskDataType } from "../validations/taskSchema";
import { appError } from "../errors/appError";
import { PaginationDataType } from "../validations/paginationSchema";

export type CreateTaskDataTypes = TaskDataType & { idUser: string };

export type UpdateTaskDataTypes = TaskDataType & { id_user: string };

export type UserTasksPagination = PaginationDataType & { userID: string };

export type TaskRepositoryTypes = {
  createTask(data: CreateTaskDataTypes): Promise<{} | undefined>;
  getTask(id: string): Promise<UpdateTaskDataTypes | undefined>;
  getTasks(
    data: UserTasksPagination
  ): Promise<CreateTaskDataTypes[] | undefined>;
  updateTask(data: CreateTaskDataTypes): Promise<{} | undefined>;
  deleteTask(id: string): Promise<{} | undefined>;
};

export const taskServices = {
  async create(data: CreateTaskDataTypes, repository: TaskRepositoryTypes) {
    try {
      const { title, description, date, status, idUser } = data;

      const task = {
        id: randomUUID(),
        title,
        description,
        date,
        status,
        idUser,
      };

      const taskCreated = await repository.createTask(task);
      return taskCreated;
    } catch (error) {
      throw error;
    }
  },
  async update(
    taskID: string,
    data: CreateTaskDataTypes,
    repository: TaskRepositoryTypes
  ) {
    try {
      const { title, description, date, status, idUser } = data;

      const task = {
        id: taskID,
        title,
        description,
        date,
        status,
        idUser,
      };

      const userTask = await repository.getTask(taskID);

      if (!userTask) throw appError("task not found", 404);

      if (userTask.id_user != idUser) {
        throw appError("user not authorizated to update task", 401);
      }

      const taskUpdated = await repository.updateTask(task);
      return taskUpdated;
    } catch (error) {
      throw error;
    }
  },
  async delete(
    taskID: string,
    userID: string,
    repository: TaskRepositoryTypes
  ) {
    try {
      const userTask = await repository.getTask(taskID);

      if (!userTask) throw appError("task not found", 404);

      if (userTask.id_user != userID) {
        throw appError("user not authorizated to delete task", 401);
      }

      const taskDelete = await repository.deleteTask(taskID);
      if (!taskDelete) throw appError("task not deleted!", 500);

      return taskDelete;
    } catch (error) {
      throw error;
    }
  },
  async read(data: UserTasksPagination, repository: TaskRepositoryTypes) {
    try {
      const { userID, limit, offset, filter } = data;

      if (!filter || !offset || !limit) {
        throw appError("please inform filter, limit and offset", 400);
      }

      const userTasks = await repository.getTasks({
        userID,
        limit,
        offset,
        filter,
      });

      return userTasks;
    } catch (error) {
      throw error;
    }
  },
};
