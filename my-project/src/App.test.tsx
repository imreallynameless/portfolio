import React from "react";
import { render } from "@testing-library/react";
import App from "./pages/App";

test("renders app without crashing", () => {
  expect(() => render(<App />)).not.toThrow();
});

