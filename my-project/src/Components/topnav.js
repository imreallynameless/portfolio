import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowBack } from '@mui/icons-material';

const Nav = styled.nav`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  z-index: 10;
`;

const BackButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: 2px solid #fc4c02;
    outline-offset: 2px;
  }
`;

function TopNav() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <Nav>
      <BackButton 
        onClick={handleBackClick}
        aria-label="Go back to home page"
        title="Back to home"
      >
        <ArrowBack style={{ fontSize: 40, color: "black" }} />
      </BackButton>
    </Nav>
  );
}

export default TopNav
