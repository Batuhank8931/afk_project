import React, { useEffect, useState, useRef } from "react";
import { getCities, getDistrictsByCityCode } from "turkey-neighbourhoods";

import $ from "jquery";
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.min.js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";

const calismaSekliOptions = ["Özel", "Kamu", "Serbest Meslek", "Emekli"];
const sigortaTuruOptions = ["SGK", "Bağ-Kur", "Emekli Sandığı"];

const normalizeString = (str) => {
  const map = {
    İ: "i",
    I: "ı",
    Ş: "s",
    Ğ: "g",
    Ü: "u",
    Ö: "o",
    Ç: "c",
    i: "i",
    ı: "i",
    ş: "s",
    ğ: "g",
    ü: "u",
    ö: "o",
    ç: "c",
  };

  return str
    .split("")
    .map((char) => map[char] || char)
    .join("")
    .toLowerCase();
};

const customFilter = (option, inputValue) => {
  const normalizedOption = normalizeString(option.label);
  const normalizedInput = normalizeString(inputValue);
  return normalizedOption.includes(normalizedInput);
};

const Calisma_bilgileri = ({
  isCollapsed,
  toggleCollapse,
  uncollapseNext,
  getFormData,
}) => {
  const [formData, setFormData] = useState({
    calismaSekli: "",
    aylikGelir: "",
    calistigiKurumAdi: "",
    meslek: "",
    unvan: "",
    calistigiKurumAdresi: "",
    calistigisehir: "",
    calistigisemt: "",
    istelefon: "",
    ekGelir: "",
    ekGelirAciklamasi: "",
    sigortaTuru: "",
  });

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [isphone, setisPhone] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);


  const contentRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    // Fetch cities on component mount
    const fetchCities = async () => {
      const cityList = await getCities();
      const cityOptions = cityList.map((city) => ({
        value: city.code,
        label: city.name,
      }));
      setCities(cityOptions);
    };

    fetchCities();
  }, []);

  useEffect(() => {
    // Fetch districts whenever the selected city changes
    if (selectedCity) {
      const fetchDistricts = async () => {
        const districtList = await getDistrictsByCityCode(selectedCity.value);
        const districtOptions = districtList.map((district) => ({
          value: district,
          label: district,
        }));
        setDistricts(districtOptions);
      };

      fetchDistricts();
      setSelectedDistrict(null); // Reset the selected district when the city changes
    } else {
      setDistricts([]);
    }
  }, [selectedCity]);

  const validateForm = () => {
    const requiredFields = [
      "calismaSekli",
      "aylikGelir",
      "calistigiKurumAdi",
      "meslek",
      "unvan",
      "calistigiKurumAdresi",
      "istelefon",
      "ekGelir",
      "ekGelirAciklamasi",
      "sigortaTuru",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Lütfen ${field} alanını doldurunuz.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      getFormData({
        ...formData,
        kurumcity: selectedCity,
        kurumdistrict: selectedDistrict,
      });
      setIsSubmitted(true);

      // I want to add a big "✔" at right border of the "Kişisel Bilgiler" toggle button  !!!!!!!!!!!!
      toggleCollapse();
      uncollapseNext();
    }
  };

  return (
    <div className="container mt-3">
      <button
        onClick={toggleCollapse}
        className={`btn btn-block text-left d-flex column justify-content-between ${isCollapsed ? "btn-outline-primary" : "btn-primary"
          }`}
      >
        <div>Çalışma Bilgileri</div>
        <div className="d-flex align-items-center">
          {isSubmitted && (
            <span className="text-success mr-2" style={{ fontSize: '1rem', border: 'none' }}>&#x2714;</span>
          )}
          <div>{isCollapsed ? "▲" : "▼"}</div>
        </div>
      </button>
      <div
        ref={contentRef}
        className={`card mt-3 collapse-content ${isCollapsed ? "collapsed" : "expanded"
          }`}
        style={{
          maxHeight: isCollapsed ? "0" : `${contentRef.current.scrollHeight}px`,
        }}
      >
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Çalışma Şekli *</label>
              <select
                className="form-control"
                name="calismaSekli"
                value={formData.calismaSekli}
                onChange={handleInputChange}
                required
              >
                <option value="">Seçin...</option>
                {calismaSekliOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Aylık Gelir *</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">₺</span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  name="aylikGelir"
                  value={formData.aylikGelir}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Çalıştığı Kurum Adı *</label>
              <input
                type="text"
                className="form-control"
                name="calistigiKurumAdi"
                value={formData.calistigiKurumAdi}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Mesleği *</label>
              <input
                type="text"
                className="form-control"
                name="meslek"
                value={formData.meslek}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Ünvanı *</label>
              <input
                type="text"
                className="form-control"
                name="unvan"
                value={formData.unvan}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Çalıştığı Kurum Adresi *</label>
              <input
                type="text"
                className="form-control"
                name="calistigiKurumAdresi"
                value={formData.calistigiKurumAdresi}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Şehir *</label>
              <Select
                name="calistigisehir"
                value={selectedCity}
                onChange={(selectedOption) => setSelectedCity(selectedOption)}
                options={cities}
                placeholder="Seçin..."
                filterOption={customFilter}
                required
              />
            </div>
            <div className="form-group">
              <label>Semt *</label>
              <Select
                name="calistigisemt"
                value={selectedDistrict}
                onChange={(selectedOption) =>
                  setSelectedDistrict(selectedOption)
                }
                options={districts}
                placeholder="Seçin..."
                isDisabled={!selectedCity}
                filterOption={customFilter}
                required
              />
            </div>
            <div className="form-group">
              <label>Telefon *</label>
              <PhoneInput
                country={"tr"}
                value={formData.istelefon}
                onChange={(isphone) => {
                  if (isphone.length > 5) {
                    setFormData({ ...formData, istelefon: isphone });
                  } else {
                    setFormData({ ...formData, istelefon: "" });
                  }
                }}
                inputProps={{
                  name: "istelefon",
                  required: true,
                  className: "form-control",
                }}
                required
              />
            </div>

            <div className="form-group">
              <label>Ek Gelir</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">₺</span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  name="ekGelir"
                  value={formData.ekGelir}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Ek Gelir Açıklaması</label>
              <input
                type="text"
                className="form-control"
                name="ekGelirAciklamasi"
                value={formData.ekGelirAciklamasi}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Sigorta Türü *</label>
              <select
                className="form-control"
                name="sigortaTuru"
                value={formData.sigortaTuru}
                onChange={handleInputChange}
                required
              >
                <option value="">Seçin...</option>
                {sigortaTuruOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
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

export default Calisma_bilgileri;
