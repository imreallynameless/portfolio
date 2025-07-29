import React from 'react';
import { Outlet } from 'react-router-dom';
import Topnav from '../Components/topnav';
import Footer from '../Components/Footer';

const Layout = () => {
  return (
    <>
      <Topnav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout; 