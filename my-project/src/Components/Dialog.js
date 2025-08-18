import React from 'react'
import styled from 'styled-components'
import { Dialog } from '@mui/material';
// Import only the icons that are actually used
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

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

function ContactDialog() {
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <ContactContainer>
      <ContactButton onClick={handleClickOpen}>contact</ContactButton>
    </ContactContainer>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="contact-dialog-title"
    >
      <ContactTitle id="contact-dialog-title">{"contact"}</ContactTitle>
      <ContactDetailContainer href="https://www.linkedin.com/in/leiwuhoo/">
          <ContactDetailIcon>
            <LinkedInIcon/>
          </ContactDetailIcon>
          <ContactDetailLabel>LinkedIn</ContactDetailLabel>
        </ContactDetailContainer>
        <ContactDetailContainer href="mailto:stephenhwang156@outlook.com">
          <ContactDetailIcon>
            <EmailIcon />
          </ContactDetailIcon>
          <ContactDetailLabel>lw2002@hotmail.ca</ContactDetailLabel>
        </ContactDetailContainer>
        {/* <ContactDetailContainer>
          <ContactDetailIcon>
            <Smartphone />
          </ContactDetailIcon>
          <ContactDetailLabel>+1 (226) 920-6464</ContactDetailLabel>
        </ContactDetailContainer> */}
    </Dialog>
  </>
  )
}

export default ContactDialog