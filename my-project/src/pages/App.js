import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "./About";
import Projects from "./Projects";
import NoPage from "./404";
import Home from "./Home";
import ResumeComponent from "./Resume"; // Assuming you have a ResumeComponent to render the PDF
import Food from "./Food";

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
    path: "/food",
    element: <Food />,
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
