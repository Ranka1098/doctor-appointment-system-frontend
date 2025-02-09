import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({ loading }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-amber-300">
      <ClipLoader color="#36d7b7" loading={loading} size={50} />
    </div>
  );
};

export default Spinner;
