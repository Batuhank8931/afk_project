import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/login.css";
import reklam from "./reklam.jpeg";

import afk from "./afk.png";

const SignUp = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Check if all required fields are filled
    if (name && surname && email && phone) {
      // Prepare data to send
      const formData = new FormData();
      formData.append("isim", name);
      formData.append("soyisim", surname);
      formData.append("e_mail", email);
      formData.append("telefon", phone);
      
      try {
        const response = await fetch('https://direct.afkmotorsfinans.com/post_user.php', { // Changed to HTTPS
          method: 'POST',
          body: formData
        });
  
        // Check if response is okay
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        // If successful, reset form fields and handle success state
        setName("");
        setSurname("");
        setEmail("");
        setPhone("");
        setError(""); // Reset error state if there was any
        
        // Redirect or handle success based on your application flow
        alert('Kayıt Başvurunuz Gönderildi');
      } catch (error) {
        console.error('Error posting data:', error);
        setError('Bir hata oluştu, lütfen tekrar deneyin.');
      }
    } else {
      setError("Lütfen tüm alanları doldurun");
    }
  };
  
  

  return (
    <div className="container">
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
                        Yeni Hesap Oluştur
                      </h1>
                    </div>
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}
                    <form className="user" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="SignUpInputName"
                          placeholder="Adınızı Giriniz..."
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="SignUpInputSurname"
                          placeholder="Soyadınızı Giriniz..."
                          value={surname}
                          onChange={(e) => setSurname(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          id="SignUpInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Mail Adresinizi Giriniz..."
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="tel"
                          className="form-control form-control-user"
                          id="SignUpInputPhone"
                          placeholder="Telefon Numaranızı Giriniz..."
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Kayıt Başvurusu Yap
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
                        onClick={() => (window.location.href = "/login")}
                      >
                        Zaten bir hesabın var mı? Giriş Yap!
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

export default SignUp;
