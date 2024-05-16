import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const userControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userSchema = z
        .object({
          name: z
            .string({
              required_error: "name is required",
              invalid_type_error: "name must be a string!",
            })
            .min(3, "name must have at least 3 characters!")
            .max(255, "max name length exceeded!"),

          email: z
            .string({
              required_error: "email is required",
              invalid_type_error: "email must be a string!",
            })
            .email("email porrly formatted!")
            .max(255, "max email length exceeded!"),

          password: z
            .string({
              required_error: "password is required",
              invalid_type_error: "password must be a string!",
            })
            .min(7, "password must have at least 7 characters!")
            .max(255, "max password length exceeded!")
            .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{7,}$/, {
              message:
                "the password must contain at least one capital letter, one number and one special character!",
            }),
        })
        .strict();
      const { name, email, password } = userSchema.parse(req.body);

      return res.status(200).json({ message: "user created!" });
    } catch (error) {
      return next(error);
    }
  },
};
