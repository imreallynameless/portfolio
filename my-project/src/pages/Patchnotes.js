import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Patchnotes.css';

const Patchnotes = () => {
    const [patchData, setPatchData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/patchnotes-data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
                setPatchData(sortedData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching patch notes data:', error);
                setPatchData([]);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="loading-screen">Loading patch notes...</div>;
    }

    return (
        <div className="patch-notes-container">
            <h1>Patch Notes</h1>
            <div className="patches-grid">
                {patchData.length > 0 ? (
                    patchData.map(patch => (
                        <Link to={`/patchnotes/${patch.patchVersion}`} key={patch.patchVersion} className="patch-tile-link">
                            <div className="patch-tile">
                                <header className="patch-header">
                                    <h2>Patch {patch.patchVersion}</h2>
                                    <p className="patch-date">{new Date(patch.date).toLocaleDateString()}</p>
                                    <h3>{patch.title}</h3>
                                </header>
                                <div className="patch-summary">
                                    <p>{patch.summary}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No patch notes data available. Write some in `public/patchnotes-data.json`!</p>
                )}
            </div>
        </div>
    );
};

export default Patchnotes; 