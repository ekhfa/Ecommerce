import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";
import LogoutButton from "../User/LogoutButton";

const Header = () => {
  return (
    <MainHeader>
      <NavLink to="/"></NavLink>
      <Nav />
    </MainHeader>
  );
};

const MainHeader = styled.header`
  padding: 0 4.8rem;
  height: 7.5rem;
  background-color: #d3d3d3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .logo {
    height: 5rem;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;

  p {
    margin-right: 1rem;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-weight: bold;
  }
`;

export default Header;
