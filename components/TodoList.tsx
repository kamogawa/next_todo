import React, { useMemo, useCallback, useState } from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import { TodoType } from "../types/todo";

const Container = styled.div`
  width: 100%;
`;

const TodoListHeader = styled.div`
  padding: 12px;
  position: relative;
  border-bottom: 1px solid ${palette.gray};
`;

const TodoListLastTodo = styled.div`
  font-size: 14px;
  margin: 0 0 8px;
  span {
    margin-left: 12px;
  }
`;

const TodoListHeaderColors = styled.div`
  display: flex;
`;

const TodoListHeaderColorsNum = styled.div`
  display: flex;
  margin-right: 8px;
  p {
    font-size: 14px;
    line-height: 16px;
    margin: 0;
    margin-left: 6px;
  }
`;

const TodoListHeaderRoundColor = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${(props) => palette[props.color]};
`;

interface IProps {
  todos: TodoType[];
}

interface ObjectIndexType {
  [key: string]: number | undefined;
}

const TodoList: React.FC<IProps> = ({ todos }) => {
  const [localTodos, setLocalTodos] = useState(todos);
  const todoColorNums = useMemo(() => {
    const colors: ObjectIndexType = {};
    localTodos.forEach((todo) => {
      const value = colors[todo.color];
      if (!value) {
        //존재하지않던 key라면
        colors[`${todo.color}`] = 1;
      } else {
        //존재하는 키라면
        colors[`${todo.color}`] = value + 1;
      }
    });
    return colors;
  }, [localTodos]);

  return (
    <Container>
      <TodoListHeader>
        <TodoListLastTodo>
          残りのTODO <span>{todos.length}</span>
        </TodoListLastTodo>
        <TodoListHeaderColors>
          {Object.keys(todoColorNums).map((color, index) => (
            <TodoListHeaderColorsNum key={index}>
              <TodoListHeaderRoundColor color={color}/>
              <p>{todoColorNums[color]}個</p>
            </TodoListHeaderColorsNum>
          ))}
        </TodoListHeaderColors>
      </TodoListHeader>
    </Container>
  );
};

export default TodoList;
