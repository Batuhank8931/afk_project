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

const Kisisel_bilgiler = ({
  isCollapsed,
  toggleCollapse,
  uncollapseNext,
  getFormData,
}) => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [phone, setPhone] = useState("");
  const [aphone, setAltPhone] = useState("");

  const contentRef = useRef(null);

  const [hasMounted, setHasMounted] = useState(false);

  const [formData, setFormData] = useState({
    gender: "",
    dogumTarihi: "",
    tcKimlikNo: "",
    ad: "",
    soyad: "",
    maritalStatus: "",
    evAdresi: "",
    cepTelefonu: "",
    acepTelefonu:"",
    email: "",
  });

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

  const validateForm = () => {
    const requiredFields = [
      "gender",
      "dogumTarihi",
      "tcKimlikNo",
      "ad",
      "soyad",
      "maritalStatus",
      "evAdresi",
      "cepTelefonu",
      "email",
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Lütfen ${field} alanını doldurunuz.`);
        return false;
      }
    }
    if (!selectedCity) {
      alert("Lütfen Şehir Seçiniz");
      return false;
    }
    if (!selectedDistrict) {
      alert("Lütfen İlçe Seçiniz");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    if (validateForm()) {
      // If the form is valid, call getFormData to pass the data to the parent component
      getFormData({
        ...formData,
        city: selectedCity,
        district: selectedDistrict,
      });

      // Collapse the current section and uncollapse the next one
      toggleCollapse();
      uncollapseNext();
    }
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isCollapsed
        ? "0"
        : `${contentRef.current.scrollHeight}px`;
    }
  }, [isCollapsed, hasMounted]);

  return (
    <div className="container mt-2">
      <button
        onClick={toggleCollapse}
        className={`btn btn-block text-left d-flex column justify-content-between ${
          isCollapsed ? "btn-outline-primary" : "btn-primary"
        }`}
      >
        <div>Kişisel Bilgiler</div>
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
            : "0",
        }}
      >
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Cinsiyet *</label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="Erkek"
                    id="genderMale"
                    onChange={handleInputChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="genderMale">
                    Erkek
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="Kadın"
                    id="genderFemale"
                    onChange={handleInputChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="genderFemale">
                    Kadın
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Doğum Tarihi *</label>
              <input
                type="date"
                className="form-control"
                name="dogumTarihi"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>TC Kimlik No *</label>
              <input
                type="number"
                className="form-control"
                name="tcKimlikNo"
                onChange={handleInputChange}
                required
              />
            </div>
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
            <div className="form-group">
              <label>Medeni Durum *</label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="maritalStatus"
                    value="Evli"
                    id="maritalStatusMarried"
                    onChange={handleInputChange}
                    required
                  />
                  <label
                    className="form-check-label"
                    htmlFor="maritalStatusMarried"
                  >
                    Evli
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="maritalStatus"
                    value="Bekar"
                    id="maritalStatusSingle"
                    onChange={handleInputChange}
                    required
                  />
                  <label
                    className="form-check-label"
                    htmlFor="maritalStatusSingle"
                  >
                    Bekar
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Ev Adresi *</label>
              <input
                type="text"
                className="form-control"
                name="evAdresi"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Şehir *</label>
              <Select
                name="sehir"
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
                name="semt"
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
              <label>Cep Telefonu *</label>
              <PhoneInput
                country={"tr"}
                value={formData.cepTelefonu}
                onChange={(phone) => {
                  if (phone.length > 5) {
                    setFormData({ ...formData, cepTelefonu: phone });
                  } else {
                    setFormData({ ...formData, cepTelefonu: "" });
                  }
                }}
                inputProps={{
                  name: "cepTelefonu",
                  required: true,
                  className: "form-control",
                }}
              />
            </div>

            <div className="form-group">
              <label>Alternatif Telefon Numarası</label>
              <PhoneInput
                country={"tr"}
                value={formData.acepTelefonu}
                onChange={(aphone) => {
                  if (aphone.length > 5) {
                    setFormData({ ...formData, acepTelefonu: aphone });
                  } else {
                    setFormData({ ...formData, acepTelefonu: "" });
                  }
                }}
                inputProps={{
                  name: "alternatifTelefonNumarasi",
                  className: "form-control",
                }}
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                className="form-control"
                name="email"
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

export default Kisisel_bilgiler;
