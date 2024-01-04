import styled from "styled-components";
import {GitHub, LinkedIn, Description, Email} from '@mui/icons-material';
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
    :hover {
      fill: #7393B3;
    }
  `;

  return (
    <FlexDiv>
      <a 
        href="https://github.com/imreallynameless" 
        target="_blank" 
        rel="noreferrer">
        <Icon>
          <GitHub />
        </Icon>
      </a>

      <a
        href="https://www.linkedin.com/in/leiwuhoo/"
        target="_blank"
        rel="noreferrer"
      >
        <Icon>
          <LinkedIn />
        </Icon>
      </a>

      <a
        href= {resumePDF}
        target="_blank"
        rel="noreferrer"
      >
        <Icon> 
          <Description />
        </Icon>
      </a>
      <a href="mailto:lw2002@hotmail.ca" target="_blank" rel="noreferrer">
        <Icon>
          <Email />
        </Icon>
      </a>
    </FlexDiv>
  );
};

export default Icons;