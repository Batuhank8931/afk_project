import React, { useState, useEffect } from "react";

import "select2/dist/css/select2.min.css";
import "select2";


const Kefil_bilgileri = ({ addEklenenKefil, removeEklenenKefil }) => {



  return (
    <div className="container mt-3 d-flex">
      <div className="btn btn-outline-primary text-left col-10">
        <div className="d-flex column">
          <div className="d-flex align-items-center">Kefil Bilgileri</div>
        </div>
      </div>
      <div className="p-0 col-2 d-flex justify-content-end">
        <button className="btn btn-primary w-100" onClick={addEklenenKefil}>
          +
        </button>
        <button
          className="btn btn-danger w-100"
          onClick={() => removeEklenenKefil()}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default Kefil_bilgileri;
