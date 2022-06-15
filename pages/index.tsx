import { NextPage } from "next";
import TodoList from "../components/TodoList";
import { getTodosAPI } from "../lib/api/todo";
import { wrapper } from "../store";
import { todoActions } from "../store/todo";
import { TodoType } from "../types/todo";

interface IProps {
  todos: TodoType[];
}

const app: NextPage<IProps> = () => {
  return (
    <TodoList todos={[]} />
  );
};
//페이지의 데이터를 서버로부터 제공
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      const { data } = await getTodosAPI();
      store.dispatch(todoActions.setTodo(data));
      return { props: { } };
    } catch (e) {
      return { props: {} };
    }
  }
);

export default app;
