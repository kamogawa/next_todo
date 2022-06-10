import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import styled from "styled-components";
import { addTodoAPI } from "../lib/api/todo";
import BrushIcon from "../public/static/svg/brush.svg";
import palette from "../styles/palette";
import { TodoType } from "../types/todo";

const AddTodoColorWrapper = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
`;

const AddTodoColorList = styled.div`
  display: flex;
`;

const AddTodoColorButton = styled.button<{ selected: boolean }>`
  width: 24px;
  height: 24px;
  margin-right: 16px;
  outline: 0;
  border-radius: 50%;
  border: ${(props) => (props.selected ? "2px solid gray !important" : 0)};
  background-color: ${(props) => palette[props.color]};
  &:last-child {
    margin: 0;
  }
`;

const Container = styled.div`
  padding: 16px;
`;

const AddTodoHeaderTitle = styled.h1`
  font-size: 21px;
`;

const AddTodoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddTodoSubmitButton = styled.button`
  padding: 4px 8px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;
  outline: none;
  font-size: 14px;
`;

const TodoTextarea = styled.textarea`
  width: 100%;
  border-radius: 5px;
  height: 300px;
  border-color: ${palette.gray};
  margin-top: 12px;
  resize: none;
  outline: none;
  padding: 12px;
  font-size: 16px;
`;

const AddTodo: React.FC = () => {
  const [text, setText] = useState("");
  const [selectedColor, setSelectedColor] = useState<TodoType["color"]>();
  const router = useRouter();

  const addTodo = async () => {
    try {
      if (!text || !selectedColor) {
        alert("色とTodoを入力してください。");
        return;
      }
      await addTodoAPI({ text, color: selectedColor });
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <AddTodoHeader>
        <AddTodoHeaderTitle>Todo追加</AddTodoHeaderTitle>
        <AddTodoSubmitButton type="button" onClick={addTodo}>
          追加する
        </AddTodoSubmitButton>
      </AddTodoHeader>
      <AddTodoColorWrapper>
        <AddTodoColorList>
          {["red", "orange", "yellow", "green", "blue", "navy"].map((color, index) => {
            return (
              <AddTodoColorButton
                key={index}
                type="button"
                color={color}
                selected={color === selectedColor}
                onClick={() => setSelectedColor(color as TodoType["color"])}
              />
            );
          })}
        </AddTodoColorList>
        <BrushIcon />
      </AddTodoColorWrapper>
      <TodoTextarea
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        placeholder="Todoを入力"
      />
    </Container>
  );
};

export default AddTodo;
