import React from "react";
import ReactDOM from "react-dom";
import App from "./App"; // Import komponen utama aplikasi

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
