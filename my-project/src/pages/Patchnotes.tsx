import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Patchnotes.css";

type PatchNote = {
  patchVersion: string;
  date: string;
  title: string;
  summary: string;
};

const Patchnotes: React.FC = () => {
  const [patchData, setPatchData] = useState<PatchNote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPatchNotes = async (): Promise<void> => {
      try {
        const response = await fetch("/patchnotes-data.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: PatchNote[] = await response.json();
        setPatchData(data);
      } catch (error) {
        console.error("Error fetching patch notes data:", error);
        setPatchData([]);
      } finally {
        setLoading(false);
      }
    };

    void fetchPatchNotes();
  }, []);

  const sortedPatchNotes = useMemo(() => {
    return [...patchData].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [patchData]);

  if (loading) {
    return <div className="loading-screen">Loading patch notes...</div>;
  }

  return (
    <div className="patch-notes-container">
      <h1>Patch Notes</h1>
      <div className="patches-grid">
        {sortedPatchNotes.length > 0 ? (
          sortedPatchNotes.map((patch) => (
            <Link
              to={`/patchnotes/${patch.patchVersion}`}
              key={patch.patchVersion}
              className="patch-tile-link"
            >
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

