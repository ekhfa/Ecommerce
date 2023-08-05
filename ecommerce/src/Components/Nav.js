import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CgMenu, CgCloseR } from "react-icons/cg";
import LogoutButton from "../User/LogoutButton";

const Nav = () => {
  // Passing isLoggedIn and userName as props
  const [openMenu, setOpenMenu] = useState(false);

  const StyledNav = styled.nav`
    .navbar-list {
      display: flex;
      gap: 4.8rem;

      li {
        list-style: none;

        .navbar-link {
          &:link,
          &:visited {
            display: inline-block;
            text-decoration: none;
            font-size: 1.8rem;
            text-transform: uppercase;
            color: #000000;
            transition: color 0.3s linear;
          }

          &:hover,
          &:active {
            color: #ff0000;
          }
        }
      }
    }

    .mobile-navbar-btn {
      display: none;

      .close-outline {
        display: none;
      }
    }

    .mobile-navbar-btn.open {
      .mobile-nav-icon {
        display: none;
      }

      .close-outline {
        display: inline-block;
      }
    }

    @media (max-width: 768px) {
      .mobile-navbar-btn {
        display: inline-block;
        z-index: 999;

        .mobile-nav-icon {
          font-size: 4.2rem;
          color: #000000;
        }
      }

      .navbar-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: 2rem;
        padding: 2rem;
        background-color: #f2f2f2;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        visibility: ${openMenu ? "visible" : "hidden"};
        opacity: ${openMenu ? "1" : "0"};
        transform: translateY(${openMenu ? "0" : "-100vh"});
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 999;

        li {
          .navbar-link {
            font-size: 2rem;
          }
        }
      }
    }
  `;

  const handleMenuToggle = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <StyledNav>
      <div className={`menuIcon ${openMenu ? "open" : ""}`}>
        <ul className={`navbar-list ${openMenu ? "open" : ""}`}>
          <li>
            <NavLink
              className="navbar-link"
              onClick={handleMenuToggle}
              to="/product/1"
            >
              Product
            </NavLink>
          </li>

          <li>
            <NavLink
              className="navbar-link"
              onClick={handleMenuToggle}
              to="/register"
            >
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink
              className="navbar-link"
              onClick={handleMenuToggle}
              to="/login"
            >
              Sign In
            </NavLink>
          </li>
        </ul>
        <div className={`mobile-navbar-btn ${openMenu ? "open" : ""}`}>
          <CgMenu className="mobile-nav-icon" onClick={handleMenuToggle} />
          <CgCloseR
            className="close-outline mobile-nav-icon"
            onClick={handleMenuToggle}
          />
        </div>
      </div>
    </StyledNav>
  );
};

export default Nav;
