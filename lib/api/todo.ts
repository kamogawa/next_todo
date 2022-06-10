import axios from ".";
import { TodoType } from "../../types/todo";

interface AddTodoAPIBody {
  text: string;
  color: TodoType["color"];
}

// todo 追加
export const addTodoAPI = (body: AddTodoAPIBody) => axios.post("api/todos", body);

export const getTodosAPI = () => axios.get<TodoType[]>("api/todos");

// todo 체크
export const checkTodoAPI = (id: number) => axios.patch(`api/todos/${id}`);

// todo 削除
export const deleteTodoAPI = (id: number) => axios.delete(`api/todos/${id}`);
