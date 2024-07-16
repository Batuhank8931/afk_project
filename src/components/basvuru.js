import React, { useState, useMemo  } from "react";
import Popup from "./popup"; // Adjust the path as needed
import "./css/basvuru.css";
import { saveAs } from "file-saver";
import { useAuth } from "./AuthContext";
import axios from "axios";

import NavBar from "./navbar";
import Kisisel_bilgiler from "./forms/kisisel_bilgiler";
import Calisma_bilgileri from "./forms/calisma_bilgileri";
import Arac_bilgileri from "./forms/arac_bilgileri";
import Kredi_bilgileri from "./forms/kredi_bilgileri";
import Evraklar from "./forms/evraklar";
import Kefil_bilgileri from "./forms/kefil_bilgileri";
import Eklenen_kefil from "./forms/eklenen_kefil";
import Firma_bilgileri from "./forms/firma_bilgileri";
import Yetkili_bilgiler from "./forms/yetkili_bilgiler_tuzel";
import Arac_bilgileri_tuzel from "./forms/arac_bilgileri_tuzel";
import Kredi_bilgileri_tuzel from "./forms/kredi_bilgileri_tuzel";
import Evraklar_tuzel from "./forms/evraklar_tuzel";

const Basvuru = () => {
  const { username } = useAuth();

  const [isPopupVisible, setPopupVisible] = useState(true);
  const [zIndex, setZIndex] = useState(2);
  const [displayStyle, setDisplayStyle] = useState("display-block");
  const [eklenenKefilComponents, setEklenenKefilComponents] = useState([]);

  const [kisiselBilgilerData, setKisiselBilgilerData] = useState(null);
  const [calismaBilgilerData, setCalismaBilgilerData] = useState(null);
  const [aracbilgileriData, setAracBilgileriData] = useState(null);
  const [kredibilgileriData, setKrediBilgileriData] = useState(null);
  const [eklenenKefilData, setEklenenKefilData] = useState([]);

  const [firmaBilgilerData, setFirmaBilgilerData] = useState(null);
  const [yetkiliBilgilerData, setYetkiliBilgilerData] = useState(null);
  const [aracbilgilerituzelData, setAracBilgileriTuzelData] = useState(null);
  const [kredibilgilerituzelData, setKrediBilgileriTuzelData] = useState(null);

  const [activeTab, setActiveTab] = useState("bilgiler"); // Default to 'bilgiler' tab

  const [bireyselFiles, setBireyselFiles] = useState({
    ruhsat: null,
    ruhsatSahibiKimlikOn: null,
    ruhsatSahibiKimlikArka: null,
    diger: null,
  });

  const [tuzelFiles, setTuzelFiles] = useState({
    ruhsat: null,
    imzaSirkusu: null,
    faaliyetBelgesi: null,
    sicilGazetesi: null,
    yillikGelirBelgesi: null,
    vergiLevhasi: null,
    diger: null,
  });

  const [yetkiliFiles, setYetkiliFiles] = useState({
    YetkiliKimlikOn: null,
    YetkiliKimlikArka: null,
  });

  const all_tuzel_files = useMemo(() => ({
    ...tuzelFiles,
    ...yetkiliFiles
  }), [tuzelFiles, yetkiliFiles]);

  const handleFileUpload = async (files) => {
    const formData = new FormData();
    formData.append("username", username);
    Object.keys(files).forEach((key) => {
      if (files[key]) {
        formData.append(key, files[key]);
      }
    });

    try {
      const response = await axios.post(
        "https://direct.afkmotorsfinans.com/upload.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Files uploaded successfully");
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "bilgiler") {
      setIsFirmaBilgileriCollapsed(true);
      setIsYetkiliBilgileriCollapsed(true);
      setIsAracBilgileriTuzelCollapsed(true);
      setIsKrediBilgileriTuzelCollapsed(true);
      setIsEvraklarTuzelCollapsed(true);
      setIsKisiselBilgilerCollapsed(false);
    } else if (tab === "tuzelform") {
      setIsKisiselBilgilerCollapsed(true);
      setIsCalismaBilgileriCollapsed(true);
      setIsAracBilgileriCollapsed(true);
      setIsKrediBilgileriCollapsed(true);
      setIsEvraklarCollapsed(true);
      setIsFirmaBilgileriCollapsed(false);
    }
  };

  const [isKisiselBilgilerCollapsed, setIsKisiselBilgilerCollapsed] = useState(
    false
  );
  const [
    isCalismaBilgileriCollapsed,
    setIsCalismaBilgileriCollapsed,
  ] = useState(true);
  const [isAracBilgileriCollapsed, setIsAracBilgileriCollapsed] = useState(
    true
  );
  const [isKrediBilgileriCollapsed, setIsKrediBilgileriCollapsed] = useState(
    true
  );
  const [isEvraklarCollapsed, setIsEvraklarCollapsed] = useState(true);

  const [isFirmaBilgileriCollapsed, setIsFirmaBilgileriCollapsed] = useState(
    false
  );
  const [
    isYetkiliBilgileriCollapsed,
    setIsYetkiliBilgileriCollapsed,
  ] = useState(true);
  const [
    isAracBilgileriTuzelCollapsed,
    setIsAracBilgileriTuzelCollapsed,
  ] = useState(true);
  const [
    isKrediBilgileriTuzelCollapsed,
    setIsKrediBilgileriTuzelCollapsed,
  ] = useState(true);
  const [isEvraklarTuzelCollapsed, setIsEvraklarTuzelCollapsed] = useState(
    true
  );

  const closePopup = () => {
    setPopupVisible(false);
    setZIndex(-5);
    setDisplayStyle("display-none");
  };

  const addEklenenKefil = () => {
    const newKey = eklenenKefilComponents.length + 1;
    setEklenenKefilComponents([...eklenenKefilComponents, newKey]);
    setEklenenKefilData([...eklenenKefilData, {}]);
  };

  const removeEklenenKefil = () => {
    setEklenenKefilComponents(eklenenKefilComponents.slice(0, -1));
    setEklenenKefilData(eklenenKefilData.slice(0, -1));
  };

  const updateEklenenKefilData = (index, data) => {
    const newData = [...eklenenKefilData];
    newData[index] = data;
    setEklenenKefilData(newData);
  };

  // Function to handle file uploads and data posting
  const handleFileUploadAndPostData = async (files, formData) => {
    const formDataObj = new FormData();
    formDataObj.append("username", username);

    // Append files to FormData
    Object.keys(files).forEach((key) => {
      if (files[key]) {
        formDataObj.append(key, files[key]);
      }
    });

    // Append formData as a JSON string
    formDataObj.append("formData", JSON.stringify(formData));

    try {
      const response = await axios.post(
        "https://direct.afkmotorsfinans.com/upload_and_post.php",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Data and files uploaded successfully");
    } catch (error) {
      console.error("Error uploading data and files:", error);
    }
  };

  const sendmail = (formData) => {
    fetch("https://direct.afkmotorsfinans.com/yeni_basvuru.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
  };

  const handleSaveToJson_bireysel = () => {
    if (
      !kisiselBilgilerData ||
      !calismaBilgilerData ||
      !aracbilgileriData ||
      !kredibilgileriData
    ) {
      alert("Formu Tamamlayınız");
      return;
    }

    const formData = {
      type: "bireysel",
      kisiselBilgiler: kisiselBilgilerData,
      calismaBilgiler: calismaBilgilerData,
      aracBilgileri: aracbilgileriData,
      krediBilgileri: kredibilgileriData,
      eklenenKefil: eklenenKefilData,
    };
    handleFileUploadAndPostData(bireyselFiles, formData);
    const formDataObj = new FormData();
    formDataObj.append("username", username);
    sendmail(formData); // Call sendmail function here
  };

  const handleSaveToJson_tuzel = () => {
    if (
      !firmaBilgilerData ||
      !yetkiliBilgilerData ||
      !aracbilgilerituzelData ||
      !kredibilgilerituzelData
    ) {
      alert("Formu Tamamlayınız");
      return;
    }

    const formData = {
      type: "tuzel",
      firmaBilgiler: firmaBilgilerData,
      yetkiliBilgiler: yetkiliBilgilerData,
      aracBilgileriTuzel: aracbilgilerituzelData,
      krediBilgileriTuzel: kredibilgilerituzelData,
    };

    handleFileUploadAndPostData(all_tuzel_files, formData);
    const formDataObj = new FormData();
    formDataObj.append("username", username);
    sendmail(formData); // Call sendmail function here
  };

  return (
    <div>
      <Popup
        show={isPopupVisible}
        handleClose={closePopup}
        zIndex={zIndex}
        displayStyle={displayStyle}
      />
      <NavBar />
      <div name="main" className="row container mx-auto">
        <div className="col-12 col-md-10 mx-auto">
          <div className="container mt-5 px-0">
            <div className="card">
              <div className="card-header">
                <ul
                  className="nav nav-tabs card-header-tabs"
                  id="form-tabs"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeTab === "bilgiler" ? "active" : ""
                      }`}
                      id="bilgiler-tab"
                      data-bs-toggle="tab"
                      href="#bilgiler"
                      role="tab"
                      aria-controls="bilgiler"
                      aria-selected={activeTab === "bilgiler"}
                      onClick={() => handleTabChange("bilgiler")}
                    >
                      Bireysel Başvuru
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeTab === "tuzelform" ? "active" : ""
                      }`}
                      id="tuzelForm-tab"
                      data-bs-toggle="tab"
                      href="#tuzelform"
                      role="tab"
                      aria-controls="tuzelform"
                      aria-selected={activeTab === "tuzelform"}
                      onClick={() => handleTabChange("tuzelform")}
                    >
                      Tüzel Başvuru
                    </a>
                  </li>
                </ul>
              </div>
              <div className="card-body px-0">
                <div className="tab-content" id="form-tabs-content">
                  <div
                    className="tab-pane fade show active"
                    id="bilgiler"
                    role="tabpanel"
                    aria-labelledby="bilgiler-tab"
                  >
                    <div className="accordion" id="bireyselForm">
                      <Kisisel_bilgiler
                        isCollapsed={isKisiselBilgilerCollapsed}
                        toggleCollapse={() =>
                          setIsKisiselBilgilerCollapsed(
                            !isKisiselBilgilerCollapsed
                          )
                        }
                        uncollapseNext={() =>
                          setIsCalismaBilgileriCollapsed(false)
                        }
                        getFormData={setKisiselBilgilerData}
                      />
                      <Calisma_bilgileri
                        isCollapsed={isCalismaBilgileriCollapsed}
                        toggleCollapse={() =>
                          setIsCalismaBilgileriCollapsed(
                            !isCalismaBilgileriCollapsed
                          )
                        }
                        uncollapseNext={() =>
                          setIsAracBilgileriCollapsed(false)
                        }
                        getFormData={setCalismaBilgilerData}
                      />
                      <Arac_bilgileri
                        isCollapsed={isAracBilgileriCollapsed}
                        toggleCollapse={() =>
                          setIsAracBilgileriCollapsed(!isAracBilgileriCollapsed)
                        }
                        uncollapseNext={() =>
                          setIsKrediBilgileriCollapsed(false)
                        }
                        getFormData={setAracBilgileriData}
                      />
                      <Kredi_bilgileri
                        isCollapsed={isKrediBilgileriCollapsed}
                        toggleCollapse={() =>
                          setIsKrediBilgileriCollapsed(
                            !isKrediBilgileriCollapsed
                          )
                        }
                        uncollapseNext={() => setIsEvraklarCollapsed(false)}
                        getFormData={setKrediBilgileriData}
                      />
                      <Evraklar
                        isCollapsed={isEvraklarCollapsed}
                        toggleCollapse={() =>
                          setIsEvraklarCollapsed(!isEvraklarCollapsed)
                        }
                        files={bireyselFiles} // Add this line
                        setFiles={setBireyselFiles} // Add this line
                        handleFileUpload={() => handleFileUpload(bireyselFiles)} // Add this line
                      />

                      <Kefil_bilgileri
                        addEklenenKefil={addEklenenKefil}
                        removeEklenenKefil={() => removeEklenenKefil()}
                      />
                      {eklenenKefilComponents.map((key, index) => (
                        <Eklenen_kefil
                          key={key}
                          id={`eklenenKefil${key}`}
                          index={index + 1}
                          isCollapsed={index === 0}
                          getFormData={(data) =>
                            updateEklenenKefilData(index, data)
                          }
                        />
                      ))}
                    </div>
                    <div className="mt-3 d-flex justify-content-center align-items-center">
                      <button
                        onClick={handleSaveToJson_bireysel}
                        className="btn btn-success"
                      >
                        Başvur
                      </button>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="tuzelform"
                    role="tabpanel"
                    aria-labelledby="tuzelform-tab"
                  >
                    <div className="accordion" id="tuzelForm">
                      <Firma_bilgileri
                        isCollapsed={isFirmaBilgileriCollapsed}
                        toggleCollapse={() =>
                          setIsFirmaBilgileriCollapsed(
                            !isFirmaBilgileriCollapsed
                          )
                        }
                        uncollapseNext={() =>
                          setIsYetkiliBilgileriCollapsed(false)
                        }
                        getFormData={setFirmaBilgilerData}
                      />
                      <Yetkili_bilgiler
                        isCollapsed={isYetkiliBilgileriCollapsed}
                        toggleCollapse={() =>
                          setIsYetkiliBilgileriCollapsed(
                            !isYetkiliBilgileriCollapsed
                          )
                        }
                        uncollapseNext={() =>
                          setIsAracBilgileriTuzelCollapsed(false)
                        }
                        getFormData={setYetkiliBilgilerData}

                        files={yetkiliFiles} // Add this line
                        setFiles={setYetkiliFiles} // Add this line
                        handleFileUpload={() => handleFileUpload(yetkiliFiles)} // Add this line
                        
                      />
                      <Arac_bilgileri_tuzel
                        isCollapsed={isAracBilgileriTuzelCollapsed}
                        toggleCollapse={() =>
                          setIsAracBilgileriTuzelCollapsed(
                            !isAracBilgileriTuzelCollapsed
                          )
                        }
                        uncollapseNext={() =>
                          setIsKrediBilgileriTuzelCollapsed(false)
                        }
                        getFormData={setAracBilgileriTuzelData}
                      />
                      <Kredi_bilgileri_tuzel
                        isCollapsed={isKrediBilgileriTuzelCollapsed}
                        toggleCollapse={() =>
                          setIsKrediBilgileriTuzelCollapsed(
                            !isKrediBilgileriTuzelCollapsed
                          )
                        }
                        uncollapseNext={() =>
                          setIsEvraklarTuzelCollapsed(false)
                        }
                        getFormData={setKrediBilgileriTuzelData}
                      />
                      <Evraklar_tuzel
                        isCollapsed={isEvraklarTuzelCollapsed}
                        toggleCollapse={() =>
                          setIsEvraklarTuzelCollapsed(!isEvraklarTuzelCollapsed)
                        }
                        files={tuzelFiles} // Add this line
                        setFiles={setTuzelFiles} // Add this line
                        handleFileUpload={() => handleFileUpload(tuzelFiles)} // Add this line
                      />
                    </div>
                    <div className="mt-3 d-flex justify-content-center align-items-center">
                      <button
                        onClick={handleSaveToJson_tuzel}
                        className="btn btn-success"
                      >
                        Başvur
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basvuru;
