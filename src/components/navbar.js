import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-md  bg-warning p-4 ">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          AFK MOTORS
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          {" "}
          <button
            className="btn btn-primary"
            onClick={() => (window.location.href = "/login")}
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
