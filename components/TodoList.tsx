import React, { useMemo, useState } from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import { TodoType } from "../types/todo";

import TrashCanIcon from "../public/static/svg/trash-can.svg";
import CheckMarkIcon from "../public/static/svg/check-mark.svg";

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

const ToDoItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 52px;
  border-bottom: 1px solid ${palette.gray};
`;

const TodoLeftSide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const TodoColorBlock = styled.div`
  background-color: ${(props) => palette[props.color]};
  width: 12px;
  height: 100%;
`;

const TodoText = styled.p`
  margin-left: 12px;
  font-size: 16px;
`;

const CheckedTodoText = styled.p`
  color: ${palette.gray};
  text-decoration: line-through;
  margin-left: 12px;
  font-size: 16px;
`;

const TodoRightSide = styled.div`
  display: flex;
  margin-right: 12px;
  svg {
    &:first-child {
      margin-right: 16px;
    }
  }
`;

const TodoTrashCanIcon = styled(TrashCanIcon)`
  path: {
    fill: ${palette.deep_red}
  }
`;

const TodoCheckMark = styled(CheckMarkIcon)`
  fill: ${palette.deep_green};
`;

const TodoButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  border: 1px solid ${palette.gray};
  background-color: transparent;
  outline: none;
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
              <TodoListHeaderRoundColor color={color} />
              <p>{todoColorNums[color]}個</p>
            </TodoListHeaderColorsNum>
          ))}
        </TodoListHeaderColors>
      </TodoListHeader>
      <ul>
        {todos.map((todo) => (
          <ToDoItem key={todo.id}>
            <TodoLeftSide>
              <TodoColorBlock color={todo.color} />
              {
                todo.checked
                  ? <TodoText>{todo.text}</TodoText>
                  : <CheckedTodoText>{todo.text}</CheckedTodoText>
              }
            </TodoLeftSide>
            <TodoRightSide>
              {
                todo.checked
                  ? <TodoButton />
                  : (
                    <>
                      <TodoTrashCanIcon />
                      <TodoCheckMark />
                    </>
                  )
              }
            </TodoRightSide>
          </ToDoItem>
        ))}
      </ul>
    </Container>
  );
};

export default TodoList;
