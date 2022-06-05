import { NextPage } from "next";
import TodoList from "../components/TodoList";
import { TodoType } from "../types/todo";

const todos: TodoType[] = [
  { id: 1, text: "마트가서 장보기", color: "red", checked: false },
  { id: 2, text: "수학 숙제하기", color: "orange", checked: true },
  { id: 5, text: "요리 연습하기", color: "blue", checked: false },
  { id: 6, text: "분리수거 하기", color: "navy", checked: false },
];

const app: NextPage = () => {
  return (
    <TodoList todos={todos} />
  );
};

export default app;
