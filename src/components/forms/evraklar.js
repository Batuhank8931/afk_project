import React, { useRef } from "react";
import "./css/Collapse.css";

const Evraklar = ({
  isCollapsed,
  toggleCollapse,
  files,
  setFiles,
  handleFileUpload,
}) => {
  const handleFileChange = (event, fieldName) => {
    setFiles({ ...files, [fieldName]: event.target.files[0] });
  };

  const contentRef = useRef(null);

  const validateForm = () => {
    const requiredFields = [
      "ruhsat",
      "ruhsatSahibiKimlikOn",
      "ruhsatSahibiKimlikArka",
    ];
    for (let field of requiredFields) {
      if (!files[field]) {
        alert(`Lütfen ${field} alanına dosya ekleyiniz`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      toggleCollapse(); // Just toggle collapse without uploading files
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
        <div>Evraklar</div>
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
            {[
              { label: "Ruhsat", name: "ruhsat" },
              {
                label: "Ruhsat Sahibi Kimlik Ön Yüz",
                name: "ruhsatSahibiKimlikOn",
              },
              {
                label: "Ruhsat Sahibi Kimlik Arka Yüz",
                name: "ruhsatSahibiKimlikArka",
              },
              { label: "Diğer", name: "diger", hint: "(Diğer Dosyalar)" },
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

export default Evraklar;
