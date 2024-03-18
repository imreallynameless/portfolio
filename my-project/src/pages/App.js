import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "./About";
import Projects from "./Projects";
import NoPage from "./404";
import Home from "./Home";
import ResumeComponent from "./Resume"; // Assuming you have a ResumeComponent to render the PDF

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
    element: <ResumeComponent />, // Render your ResumeComponent here
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
