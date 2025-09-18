import React from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import LinkIcon from '@mui/icons-material/Link';

const ProjectTile = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 20px;
  justify-items: start;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  background-color: #f0f2f575;
  -webkit-box-shadow: 5px 5px 10px 0px rgba(191,191,191,0.75);
  -moz-box-shadow: 5px 5px 10px 0px rgba(191,191,191,0.75);
  box-shadow: 5px 5px 10px 0px rgba(191,191,191,0.75);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

const ProjectInfo = styled.div`
  padding: 0 15px 20px 0;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const ProjectLink = styled.a`
  text-decoration: none;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const ProjectTitle = styled.h2`
  font-size: 2.0rem;
  height: 2.5rem;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`

const ProjectDesc = styled.p`
  font-size: 1.6rem;
  line-height: 2.5rem;
`

export default function Project({ title, description, image, url, imageAlt }) {
  return (
    <ProjectTile>
      <ProjectImage 
        alt={imageAlt || `Screenshot of ${title} project`} 
        src={image}
        loading="lazy"
        decoding="async"
      />
      <ProjectInfo>
        <ProjectTitle>
          {url ? (
            <ProjectLink 
              target="_blank" 
              href={url}
              rel="noopener noreferrer"
              aria-label={`Visit ${title} project`}
            >
              {title} <LinkIcon aria-hidden="true" />
            </ProjectLink>
          ) : (
            title
          )}
        </ProjectTitle>
        <br />
        <ProjectDesc>
          {description}
        </ProjectDesc>
      </ProjectInfo>
    </ProjectTile>
  );
}

Project.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string,
  imageAlt: PropTypes.string
};