import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "./About";
import Projects from "./Projects";
import NoPage from "./404";
import Home from "./Home";
import ResumeComponent from "./Resume"; // Assuming you have a ResumeComponent to render the PDF
import Food from "./Playground/Food";
import Playground from "./Playground";

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
    path: "/food",
    element: <Food />, // Food as the child route
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
