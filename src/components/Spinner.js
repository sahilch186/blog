import React from "react";

const Spinner = () => {
  return (
    <div className="w-100 d-flex h-100 align-items-center justify-content-center">
        <div className="spinner-border text-primary mt-5 spinner" role="status">
        <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  );
};

export default Spinner;