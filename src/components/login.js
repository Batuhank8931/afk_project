// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/login.css";
import { useAuth } from "./AuthContext";

import reklam from "./reklam.jpeg";

import afk from "./afk.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (login(email, password)) {
      // Redirect to the Basvuru page on successful login
      navigate("/basvuru");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center d-flex">
        <div className="p-3 d-flex justify-content-center">
          <img src={afk} alt="afk" className="afk" />
        </div>
        <div className="col-12 col-md-6">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-12 p-0">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Hoş Geldiniz</h1>
                    </div>
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}
                    <form className="user" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          id="LoginInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Mail Adresinizi Giriniz..."
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="LoginInputPassword"
                          placeholder="Şifre..."
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="form-group"></div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Giriş Yap
                      </button>
                    </form>
                    <hr />
                    <div className="text-center">
                      <button
                        className="btn btn-link small"
                        onClick={() =>
                          (window.location.href = "/forgetpassword")
                        }
                      >
                        Şifreni mi Unuttun?
                      </button>
                    </div>
                    <div className="text-center">
                      <button
                        className="btn btn-link small"
                        onClick={() => (window.location.href = "/signin")}
                      >
                        Yeni Hesap Oluştur!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="reklam_image">
                  <img src={reklam} alt="reklam" className="reklam" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
