import React from "react";
import ResumePDF from "../static/resume-lei.pdf";

const ResumeComponent = () => {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <embed src={ResumePDF} type="application/pdf" style={{ width: '100%', height: '100vh' }} />
    </div>
  );
};

export default ResumeComponent;

