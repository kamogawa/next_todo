import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector as useReactSelector } from "react-redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import todo from "./todo";

declare module "react-redux" {
  interface DefaultRootState extends RootState {}
}

export const useSelector: TypedUseSelectorHook<RootState> = useReactSelector;

const rootReduser = combineReducers({
  todo: todo.reducer,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload
    };
    if (state.count) nextState.count = state.count;
    return nextState;
  }
  return rootReduser(state, action);
};

//store 타입
export type RootState = ReturnType<typeof rootReduser>;

export const initStore = () => configureStore({
  reducer,
  devTools: true
});

export const wrapper = createWrapper(initStore, { debug: true });
