import React from "react";
import styled from "styled-components";
import { Dialog } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const TwitterIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);

const ContactContainer = styled.div`
  grid-column: span 1;
  text-align: right;

  @media (max-width: 768px) {
    grid-column: span 2;
    text-align: left;
  }
`;

const ContactButton = styled.button`
  all: unset;
  cursor: pointer;
  font-family: "Inter", sans-serif;
  font-size: 2rem;
  letter-spacing: 0.4rem;
`;

const ContactTitle = styled.h2`
  padding: 16px 0;
  margin: 0 24px;
  font-size: 2rem;
  font-family: "Inter", sans-serif;
  font-weight: unset;
  letter-spacing: 0.4rem;
  border-bottom: solid 1px rgba(0, 0, 0, 0.87);
`;

const ContactDetailContainer = styled.a`
  display: grid;
  grid-template-columns: 50px 1fr;
  transition: 0.3s;

  &:hover {
    background-color: aliceblue;
  }
`;

const ContactDetailIcon = styled.span`
  padding: 10px;

  & > svg {
    height: 100%;
    width: 100%;
  }
`;

const ContactDetailLabel = styled.p`
  display: inline-block;
  font-family: "Inter", sans-serif;
  font-size: 1.5rem;
  margin: 16px 24px 16px 0;
`;

const ContactDialog: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <ContactContainer>
        <ContactButton onClick={handleClickOpen}>contact</ContactButton>
      </ContactContainer>
      <Dialog open={open} onClose={handleClose} aria-labelledby="contact-dialog-title">
        <ContactTitle id="contact-dialog-title">contact</ContactTitle>
        <ContactDetailContainer href="https://www.linkedin.com/in/leiwuhoo/">
          <ContactDetailIcon>
            <LinkedInIcon />
          </ContactDetailIcon>
          <ContactDetailLabel>leiwuhoo</ContactDetailLabel>
        </ContactDetailContainer>
        <ContactDetailContainer href="mailto:lw2002@hotmail.ca">
          <ContactDetailIcon>
            <EmailIcon />
          </ContactDetailIcon>
          <ContactDetailLabel>lw2002@hotmail.ca</ContactDetailLabel>
        </ContactDetailContainer>
        <ContactDetailContainer href="https://x.com/ujustgotleid">
          <ContactDetailIcon>
            <TwitterIcon />
          </ContactDetailIcon>
          <ContactDetailLabel>@ujustgotleid</ContactDetailLabel>
        </ContactDetailContainer>
      </Dialog>
    </>
  );
};

export default ContactDialog;

