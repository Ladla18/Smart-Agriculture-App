import React from 'react'

const BackButton = ({ onResetFeature }) => {
    const resetFeature = ()=>{
        onResetFeature();
    }
  return (
    <div>
      <button onClick={resetFeature} className="bg-blue-600 text-white p-2 rounded-md ">
        Go Back
      </button>
    </div>
  );
};

export default BackButton