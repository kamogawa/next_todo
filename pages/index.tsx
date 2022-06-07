import { GetServerSideProps, NextPage } from "next";
import TodoList from "../components/TodoList";
import { getTodosAPI } from "../lib/api/todo";
import { TodoType } from "../types/todo";

interface IProps {
  todos: TodoType[];
}

const app: NextPage<IProps> = ({ todos }) => {
  return (
    <TodoList todos={todos} />
  );
};
//페이지의 데이터를 서버로부터 제공
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await getTodosAPI();
    return { props: { todos: data } };
  } catch {
    return { props: { todos: [] } };
  }
};

export default app;
