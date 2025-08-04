import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "./About";
import Projects from "./Projects";
import NoPage from "./404";
import Home from "./Home";
import ResumeComponent from "./Resume";
import Food from "./Playground/Food";
import Playground from "./Playground";
import Music from "./Playground/Music";
import Tft from "./Playground/Tft";
import Bookbar from "./Playground/Bookbar";
import Patchnotes from './Patchnotes';
import Patch from './Patch';
import Layout from "../Components/Layout";
import PlaygroundLayout from "../Components/PlaygroundLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/resume",
    element: <ResumeComponent />,
  },
  {
    element: <Layout />,
    children: [
      { path: "/about", element: <About /> },
      { path: "/projects", element: <Projects /> },
      { path: "/patchnotes", element: <Patchnotes /> },
      { path: "/patchnotes/:patchVersion", element: <Patch /> },
    ]
  },
  {
    element: <PlaygroundLayout />,
    children: [
      { path: "/playground", element: <Playground /> },
      { path: "/playground/food", element: <Food /> },
      { path: "/playground/music", element: <Music /> },
      { path: "/playground/Tft", element: <Tft /> },
      { path: "/playground/bookbar", element: <Bookbar /> },
    ]
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
