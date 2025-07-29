import React from 'react';
import { Outlet } from 'react-router-dom';
import PlayNav from './playNav';
import Footer from './Footer';

const PlaygroundLayout = () => {
  return (
    <>
      <PlayNav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PlaygroundLayout; 