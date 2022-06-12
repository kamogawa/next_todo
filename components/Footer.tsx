import { useRouter } from "next/dist/client/router";
import React from "react";
import styled from "styled-components";
import palette from "../styles/palette";

const Container = styled.footer`
  width: 100%;
  height: 53px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid ${palette.gray};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const FooterButton = styled.button`
  font-size: 32px;
  width: 32px;
  height: 32px;
  border-radius: 5px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 0;
  line-height: 0;
  outline: none;
`;

const Footer: React.FC = () => {
  const router = useRouter();
  const isMain = router.pathname === "/";
  return (
    <Container>
      <FooterButton type="button" onClick={() => router.push(isMain ? "/todo/add" : "/")}>
        {isMain ? "+" : "-"}
      </FooterButton>
    </Container>
  );
};

export default Footer;
