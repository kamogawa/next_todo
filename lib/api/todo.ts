import axios from ".";
import { TodoType } from "../../types/todo";

export const getTodosAPI = () => axios.get<TodoType[]>("api/todos");

// todo 체크
export const checkTodoAPI = (id: number) => axios.patch(`api/todos/${id}`);
