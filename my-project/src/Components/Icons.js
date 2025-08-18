import styled from "styled-components";
// Import icons individually for better tree shaking
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DescriptionIcon from '@mui/icons-material/Description';
import EmailIcon from '@mui/icons-material/Email';
import resumePDF from '../static/resume-lei.pdf';
const Icons = () => {
  const FlexDiv = styled.div`
    display: flex;
    margin-bottom: 1%;
    gap: 1rem;
  `;

  const Icon = styled.svg`
    width: 100%;
    max-width: 30px;
    height: 30px;
    transition: fill 0.2s ease;
    :hover,
    :focus {
      fill: #7393B3;
    }
  `;

  const StyledLink = styled.a`
    border-radius: 4px;
    padding: 4px;
    transition: all 0.2s ease;
    
    :focus {
      outline: 2px solid #7393B3;
      outline-offset: 2px;
    }
    
    :hover {
      transform: translateY(-2px);
    }
  `;

  return (
    <FlexDiv>
      <StyledLink 
        href="https://github.com/imreallynameless" 
        target="_blank" 
        rel="noreferrer"
        aria-label="Visit Lei Wu's GitHub profile">
        <Icon>
          <GitHubIcon />
        </Icon>
      </StyledLink>

      <StyledLink
        href="https://www.linkedin.com/in/leiwuhoo/"
        target="_blank"
        rel="noreferrer"
        aria-label="Visit Lei Wu's LinkedIn profile"
      >
        <Icon>
          <LinkedInIcon />
        </Icon>
      </StyledLink>

      <StyledLink
        href={resumePDF}
        target="_blank"
        rel="noreferrer"
        aria-label="Download Lei Wu's resume (PDF)"
      >
        <Icon> 
          <DescriptionIcon />
        </Icon>
      </StyledLink>
      
      <StyledLink 
        href="mailto:lw2002@hotmail.ca" 
        target="_blank" 
        rel="noreferrer"
        aria-label="Send email to Lei Wu">
        <Icon>
          <EmailIcon />
        </Icon>
      </StyledLink>
    </FlexDiv>
  );
};

export default Icons;