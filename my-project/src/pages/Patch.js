import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowBack } from '@mui/icons-material';
import '../css/Patchnotes.css';

const Nav = styled.nav`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  z-index: 10;
`;

const BackButton = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
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

const Patch = () => {
    const { patchVersion } = useParams();
    const [patch, setPatch] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/patchnotes-data.json')
            .then(response => response.json())
            .then(data => {
                const foundPatch = data.find(p => p.patchVersion === patchVersion);
                setPatch(foundPatch);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching patch notes data:', error);
                setLoading(false);
            });
    }, [patchVersion]);

    if (loading) {
        return <div className="loading-screen">Loading patch...</div>;
    }

    if (!patch) {
        return <div>Patch not found.</div>;
    }

    return (
        <>
            <Nav>
                <BackButton 
                    to="/patchnotes"
                    aria-label="Back to patch notes list"
                    title="Back to patch notes"
                >
                    <ArrowBack style={{ fontSize: 40, color: "black" }} />
                </BackButton>
            </Nav>
            <div className="patch-notes-container">
                <div className="patch">
                <header className="patch-header">
                    <h1>Patch {patch.patchVersion}</h1>
                    <p className="patch-date">{new Date(patch.date).toLocaleDateString()}</p>
                    <h2>{patch.title}</h2>
                    <p className="patch-summary">{patch.summary}</p>
                </header>
                {patch.sections.map(section => (
                    <section key={section.title} className="patch-section">
                        <h3>{section.title}</h3>
                        {section.changes.map(change => (
                            <div key={change.name} className={`change ${change.type}`}>
                                <h4>{change.name}</h4>
                                <p>{change.description}</p>
                            </div>
                        ))}
                    </section>
                ))}
            </div>
        </div>
        </>
    );
};

export default Patch; 