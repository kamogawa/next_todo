import { NextPage } from "next";
import styled from "styled-components";

const Container = styled.div`
  font-style: italic;
`;

const index: NextPage = () => {
  return (
    <Container>
      <h1>hello Typescript</h1>
      <h2>hello Typescript</h2>
      <h3>hello Typescript</h3>
    </Container>
  );
};

export default index;
