import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoType } from "../types/todo";

//redux1: actionを持つ
export const SET_TODO_LIST = "todo/INIT_TODO_LIST";

//action 생성자를 함수형태로 export
export const setTodo = (payload: TodoType[]) => {
  return {
    type: SET_TODO_LIST,
    payload
  };
};

// export const todoActions = { setTodo };

//초기상태
interface TodoReduxState {
  todos: TodoType[],
}

const initialState: TodoReduxState = {
  todos: [],
};

const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodo(state, action: PayloadAction<TodoType[]>) {
      state.todos = action.payload;
    },
  },
});

export const todoActions = { ...todo.actions };

export default todo;

//reducer란 이름의 함수를 export default
// export default function reducer(state = initialState, action: any) {
//   switch (action.type) {
//     case SET_TODO_LIST:
//       // eslint-disable-next-line no-case-declarations
//       const newState = { ...state, todos: action.payload };
//       return newState;
//     default:
//       return state;
//   }
// }
