import styled from "styled-components";
import Icons from "./Icons";


const Footer = () => {
  const FooterPage = styled.footer`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
  `;

  const Author = styled.p`
  `
  
  return (
    <FooterPage id="connect">
      <Author>lei wu 2023</Author>
      <Icons/>
    </FooterPage>
  );
};

export default Footer;