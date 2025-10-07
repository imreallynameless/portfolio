import React from "react";
import { Outlet } from "react-router-dom";
import PlayNav from "./playNav";
import Footer from "./Footer";

const PlaygroundLayout: React.FC = () => (
  <>
    <PlayNav />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

export default PlaygroundLayout;

