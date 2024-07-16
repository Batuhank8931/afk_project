import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/login.css";
import reklam from "./reklam.jpeg";
import afk from "./afk.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (email) {
      try {
        // Fetch user data
        const userResponse = await fetch('https://direct.afkmotorsfinans.com/get_user.php');
        if (!userResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const users = await userResponse.json();
        const user = users.find(user => user.email === email);

        if (!user) {
          toast.error("Böyle bir kullanıcı yok.");
          setError("");
          setSuccess("");
          setIsSubmitting(false);
          return;
        }

        // Prepare and post data
        const data = new URLSearchParams();
        data.append('email', email);

        const response = await fetch('https://direct.afkmotorsfinans.com/forget_password.php', {
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        if (user.sifre === "") {
          toast.error("Üyeliğiniz onay aşamasında");
          setError("");
          setSuccess("");
        } else {
          toast.success("Şifre sıfırlama talebi başarıyla gönderildi.");
          setError("");
          setSuccess("");
        }

        setEmail("");
      } catch (error) {
        console.error('Error posting data:', error);
        toast.error('Bir hata oluştu, lütfen tekrar deneyin.');
        setError("");
        setSuccess("");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error("Lütfen email adresinizi giriniz.");
      setError("");
      setSuccess("");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="row justify-content-center">
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
                      <h1 className="h4 text-gray-900 mb-4">
                        Şifrenizi mi unuttunuz?
                      </h1>
                    </div>
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}
                    {success && (
                      <div className="alert alert-success" role="alert">
                        {success}
                      </div>
                    )}
                    <form className="user" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          id="forgetPasswordInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Mail Adresinizi Giriniz..."
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Gönderiliyor...' : 'Şifreyi Sıfırlama Talebi Gönder'}
                      </button>
                    </form>
                    <hr />
                    <div className="text-center">
                      <button
                        className="btn btn-link small"
                        onClick={() => (window.location.href = "/login")}
                      >
                        Giriş Yap
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
                <div className="reklam_image"><img src={reklam} alt="reklam" className="reklam"/></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
