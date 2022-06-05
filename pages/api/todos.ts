import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { TodoType } from "../../types/todo";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const todos = await new Promise<TodoType[]>((resolve, reject) => {
        fs.readFile("data/todos.json", (err, data) => {
          if (err) {
            return reject(err.message);
          }
          const todoString = data.toString();
          if (!todoString) {
            return resolve([]);
          }
          const todos = JSON.parse(data.toString());
          return resolve(todos);
        });
      });
      res.statusCode = 200;
      return res.send(todos);
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      return res.send(e);
    }
  }
  return false;
};
