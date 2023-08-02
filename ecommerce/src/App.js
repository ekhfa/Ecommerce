import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import ProductPage from "./product/ProductPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderSummaryPage from "./product/OrderSummaryPage";

const App = () => {
  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29 ,29 ,0.8)",
      white: "#fff",
      black: "#212529",
      helper: "#8490ff",

      bg: "F6F8FA",
      footer_bg: "#0a1435",
      btn: "rgb(98  84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100% )",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px; ",
      shadowsupport: "rgba(0 , 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/order-summary/:id/:quantity"
          element={<OrderSummaryPage />}
        />
      </Routes>
      {/* <ToastContainer /> */}
    </ThemeProvider>
  );
};

export default App;
