import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/Patchnotes.css';

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
    );
};

export default Patch; 