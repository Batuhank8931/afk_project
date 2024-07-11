import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import { getCities, getDistrictsByCityCode } from "turkey-neighbourhoods";
import "./css/Collapse.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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

const Eklenen_kefil = ({
  index,
  isCollapsed: initialCollapsed,
  getFormData,
}) => {
  const [cities, setCities] = useState([]);
  const [iscities, setisCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [isdistricts, setisDistricts] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedisCity, setSelectedisCity] = useState(null);
  const [selectedisDistrict, setSelectedisDistrict] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

  const [phone, setPhone] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [isphone, setisPhone] = useState("");

  const contentRef = useRef(null);
  const [hasMounted, setHasMounted] = useState(false);

  const [formData, setFormData] = useState({
    gender: "",
    yakinlik: "",
    dogumTarihi: "",
    tcKimlikNo: "",
    ad: "",
    soyad: "",
    maritalStatus: "",
    evAdresi: "",
    cepTelefonu: "",
    email: "",
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

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
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
      setSelectedDistrict(null);
    } else {
      setDistricts([]);
    }
  }, [selectedCity]);


  useEffect(() => {
    const fetchisCities = async () => {
      const iscityList = await getCities();
      const iscityOptions = iscityList.map((iscity) => ({
        value: iscity.code,
        label: iscity.name,
      }));
      setisCities(iscityOptions);
    };

    fetchisCities();
  }, []);

  useEffect(() => {
    if (selectedisCity) {
      const fetchisDistricts = async () => {
        const isdistrictList = await getDistrictsByCityCode(selectedisCity.value);
        const isdistrictOptions = isdistrictList.map((isdistrict) => ({
          value: isdistrict,
          label: isdistrict,
        }));
        setisDistricts(isdistrictOptions);
      };

      fetchisDistricts();
      setSelectedisDistrict(null);
    } else {
      setisDistricts([]);
    }
  }, [selectedisCity]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    getFormData(newFormData);
  };

  const handleSelectChange = (selectedOption, name) => {
    const newFormData = { ...formData, [name]: selectedOption };
    setFormData(newFormData);
    getFormData(newFormData);
  };

  const validateForm = () => {
    const requiredFields = [
      "gender",
      "yakinlik",
      "dogumTarihi",
      "tcKimlikNo",
      "ad",
      "soyad",
      "maritalStatus",
      "evAdresi",
      "cepTelefonu",
      "email",
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
        alert(`Please fill in the ${field} field.`);
        return false;
      }
    }
    if (!selectedCity) {
      alert("Please select a city.");
      return false;
    }
    if (!selectedDistrict) {
      alert("Please select a district.");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      // If the form is valid, call getFormData to pass the data to the parent component
      getFormData({
        ...formData,
        city: selectedCity,
        district: selectedDistrict,
        kurumcity: selectedisCity,
        kurumdistrict: selectedisDistrict,
      });

      // Collapse the current section and uncollapse the next one
      toggleCollapse();
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
    <div className="container mt-3 mb-3">
      <button
        onClick={toggleCollapse}
        className={`btn btn-block text-left d-flex column justify-content-between ${
          isCollapsed ? "btn-outline-primary" : "btn-primary"
        }`}
      >
        <div>Eklenen Kefil - {index}</div>
        <div>{isCollapsed ? "▼" : "▲"}</div>
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
                    id={`genderMale${index}`}
                    onChange={handleInputChange}
                    required
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`genderMale${index}`}
                  >
                    Erkek
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="Kadın"
                    id={`genderFemale${index}`}
                    onChange={handleInputChange}
                    required
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`genderFemale${index}`}
                  >
                    Kadın
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Alıcıyla Yakınlık Derecesi *</label>
              <input
                type="text"
                className="form-control"
                name="yakinlik"
                onChange={handleInputChange}
                required
              />
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
                type="text"
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
                    id={`maritalStatusMarried${index}`}
                    onChange={handleInputChange}
                    required
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`maritalStatusMarried${index}`}
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
                    id={`maritalStatusSingle${index}`}
                    onChange={handleInputChange}
                    required
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`maritalStatusSingle${index}`}
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
                onChange={(selectedOption) => {
                  setSelectedCity(selectedOption);
                  handleSelectChange(selectedOption, "sehir");
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
                name="semt"
                value={selectedDistrict}
                onChange={(selectedOption) => {
                  setSelectedDistrict(selectedOption);
                  handleSelectChange(selectedOption, "semt");
                }}
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
                value={altPhone}
                onChange={(altPhone) => setAltPhone(altPhone)}
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
                value={selectedisCity}
                onChange={(selectedOption) => setSelectedisCity(selectedOption)}
                options={iscities}
                placeholder="Seçin..."
                filterOption={customFilter}
                required
              />
            </div>
            <div className="form-group">
              <label>Semt *</label>
              <Select
                name="calistigisemt"
                value={selectedisDistrict}
                onChange={(selectedOption) =>
                  setSelectedisDistrict(selectedOption)
                }
                options={isdistricts}
                placeholder="Seçin..."
                isDisabled={!selectedisCity}
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

export default Eklenen_kefil;
