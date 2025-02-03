import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "./About";
import Projects from "./Projects";
import NoPage from "./404";
import Home from "./Home";
import ResumeComponent from "./Resume"; // Assuming you have a ResumeComponent to render the PDF
import Food from "./Playground/Food";
import Playground from "./Playground";
import Music from "./Playground/Music";
import Tft from "./Playground/Tft";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/resume",
    element: <ResumeComponent />, 
  },
  {
    path: "/playground",
    element: <Playground />, // Playground as the parent route
  },
  {
    path: "/playground/food", // Changed from "/food" to "/playground/food"
    element: <Food />,
  },
  {
    path: "/playground/music",
    element: <Music />,
  },
  {
    path: "/playground/Tft",
    element: <Tft />,
  },
  {
    path: "*",
    element: <NoPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
