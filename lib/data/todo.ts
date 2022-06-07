import { readFileSync, writeFileSync } from "fs";
import { TodoType } from "../../types/todo";

//todolist데이터 불러오기
const getList = () => {
  const todosBuffer = readFileSync("data/todos.json");
  const todosString = todosBuffer.toString();
  if (!todosString) {
    return [];
  }
  const todos: TodoType[] = JSON.parse(todosString);
  return todos;
};

//리스트에 id확인
const exist = ({ id }: { id: number}) => {
  const todos = getList();
  const todo = todos.some((todo) => todo.id === id);
  return todo;
};

//리스트 파일 저장
const write = async (todos: TodoType[]) => {
  writeFileSync("data/todos.json", JSON.stringify(todos));
};

export default { getList, exist, write };
