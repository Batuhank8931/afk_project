import React, { useEffect, useState, useRef } from "react";

import "./css/Collapse.css";
import "react-phone-input-2/lib/style.css";

const Yetkili_bilgiler = ({
  isCollapsed,
  toggleCollapse,
  uncollapseNext,
  username,
  getFormData,
  files,
  setFiles,
}) => {
  const contentRef = useRef(null);

  const handleFileChange = (event, fieldName) => {
    setFiles({ ...files, [fieldName]: event.target.files[0] });
  };

  const [hasMounted, setHasMounted] = useState(false);

  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const requiredFields = ["ad", "soyad"];
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Lütfen ${field} alanını doldurunuz.`);
        return false;
      }
    }

    const requiredFiles = ["YetkiliKimlikOn", "YetkiliKimlikArka"];
    for (let field of requiredFiles) {
      if (!files[field]) {
        alert(`Lütfen ${field} alanına dosya ekleyiniz`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    if (validateForm()) {

      getFormData({
        ...formData,
      });

      toggleCollapse();
      uncollapseNext();
    }
  };

  return (
    <div className="container mt-3">
      <button
        onClick={toggleCollapse}
        className={`btn btn-block text-left d-flex column justify-content-between ${
          isCollapsed ? "btn-outline-primary" : "btn-primary"
        }`}
      >
        <div>Başvuran Yetkili Bilgileri</div>
        <div>{isCollapsed ? "▲" : "▼"}</div>
      </button>
      <div
        ref={contentRef}
        className={`card mt-3 collapse-content ${
          isCollapsed ? "collapsed" : "expanded"
        }`}
        style={{
          maxHeight: isCollapsed ? "0" : `${contentRef.current.scrollHeight}px`,
        }}
      >
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Ad *</label>
              <input
                type="text"
                className="form-control"
                name="ad"
                pattern="[A-Za-zşŞıİçÇöÖüÜğĞ]+"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Soyad *</label>
              <input
                type="text"
                className="form-control"
                name="soyad"
                pattern="[A-Za-zşŞıİçÇöÖüÜğĞ]+"
                onChange={handleInputChange}
                required
              />
            </div>
            {[
              {
                label: "Ruhsat Sahibi Kimlik Ön Yüz",
                name: "YetkiliKimlikOn",
              },
              {
                label: "Ruhsat Sahibi Kimlik Arka Yüz",
                name: "YetkiliKimlikArka",
              }
            ].map(({ label, name, hint }) => (
              <div className="form-group" key={name}>
                <label>
                  {label} {hint && <small>{hint}</small>}{" "}
                  {name !== "diger" && "*"}
                </label>
                <div className="input-group">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id={name}
                      onChange={(e) => handleFileChange(e, name)}
                      required={name !== "diger"}
                    />
                    <label className="custom-file-label" htmlFor={name}>
                      Dosya Seç
                    </label>
                  </div>
                  <div className="input-group-append">
                    <span className="input-group-text">
                      {files[name] ? files[name].name : "Dosya seçilmedi"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-end align-items-center mb-3 pb-3">
              <button type="submit" className="btn btn-success">
                Devam
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Yetkili_bilgiler;
