import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import { getCities, getDistrictsByCityCode } from "turkey-neighbourhoods";
import "./css/Collapse.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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

// Custom filter function
const customFilter = (option, inputValue) => {
  const normalizedOption = normalizeString(option.label);
  const normalizedInput = normalizeString(inputValue);
  return normalizedOption.includes(normalizedInput);
};

const Firma_bilgiler = ({
  isCollapsed,
  toggleCollapse,
  uncollapseNext,
  getFormData,
}) => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [formData, setFormData] = useState({
    vergiNo: "",
    SirketUnvani: "",
    FaaliyetKonusu: "",
    AylikKazanc: "",
    evAdresi: "",
    istelefon: "",
    email_firma: "",
  });

  const contentRef = useRef(null);
  const [hasMounted, setHasMounted] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (selectedOption, name) => {
    setFormData({
      ...formData,
      [name]: selectedOption,
    });
  };

  const validateForm = () => {
    const requiredFields = [
      "vergiNo",
      "SirketUnvani",
      "FaaliyetKonusu",
      "AylikKazanc",
      "evAdresi",
      "sehir_firma",
      "semt_firma",
      "istelefon",
      "email_firma",
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
      getFormData({ ...formData, sehir: selectedCity, semt: selectedDistrict });
      toggleCollapse();
      uncollapseNext();
    }
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (contentRef.current && hasMounted) {
      contentRef.current.style.maxHeight = isCollapsed
        ? "0"
        : `${contentRef.current.scrollHeight}px`;
    }
  }, [isCollapsed, hasMounted]);

  return (
    <div className="container mt-3">
      <button
        onClick={toggleCollapse}
        className={`btn btn-block text-left d-flex column justify-content-between ${
          isCollapsed ? "btn-outline-primary" : "btn-primary"
        }`}
      >
        <div>Firma Bilgileri</div>
        <div>{isCollapsed ? "▲" : "▼"}</div>
      </button>
      <div
        ref={contentRef}
        className={`card mt-3 collapse-content ${
          isCollapsed ? "collapsed" : "expanded"
        }`}
        style={{
          maxHeight: hasMounted
            ? isCollapsed
              ? "0"
              : `${contentRef.current.scrollHeight}px`
            : isCollapsed
            ? "0"
            : "auto",
        }}
      >
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Vergi No *</label>
              <input
                type="number"
                className="form-control"
                name="vergiNo"
                value={formData.vergiNo}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Şirket Ünvanı *</label>
              <input
                type="text"
                className="form-control"
                name="SirketUnvani"
                value={formData.SirketUnvani}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Faaliyet Konusu *</label>
              <input
                type="text"
                className="form-control"
                name="FaaliyetKonusu"
                value={formData.FaaliyetKonusu}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Aylık Kazanç</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">₺</span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  name="AylikKazanc"
                  value={formData.AylikKazanc}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>İş Adresi *</label>
              <input
                type="text"
                className="form-control"
                name="evAdresi"
                value={formData.evAdresi}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Şehir *</label>
              <Select
                name="sehir_firma"
                value={selectedCity}
                onChange={(selectedOption) => {
                  setSelectedCity(selectedOption);
                  handleSelectChange(selectedOption, "sehir_firma");
                }}
                options={cities}
                placeholder="Seçin..."
                filterOption={customFilter}
                required
              />
            </div>
            <div className="form-group">
              <label>Semt *</label>
              <Select
                name="semt_firma"
                value={selectedDistrict}
                onChange={(selectedOption) => {
                  setSelectedDistrict(selectedOption);
                  handleSelectChange(selectedOption, "semt_firma");
                }}
                options={districts}
                placeholder="Seçin..."
                isDisabled={!selectedCity}
                filterOption={customFilter}
                required
              />
            </div>
            <div className="form-group">
              <label>İş Telefonu *</label>
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
              <label>Email *</label>
              <input
                type="email"
                className="form-control"
                name="email_firma"
                value={formData.email_firma}
                onChange={handleInputChange}
                required
              />
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
export default Firma_bilgiler;
