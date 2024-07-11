import React, { useState, useRef } from "react";
import Select from "react-select";
import kaskoData from "./kasko.json";
import "./css/Collapse.css";

const yakitBilgisiOptions = [
  "Benzin",
  "Benzin & LPG",
  "Dizel",
  "Hybrid",
  "Elektrik",
];
const vitesBilgisiOptions = ["Manuel", "Otomatik"];
const kasaTipiOptions = [
  "Cabrio",
  "Coupe",
  "Coupe 4 kapı",
  "Hatchback 3 kapı",
  "Hatchback 5 kapı",
  "Sedan",
  "Station Wagon",
  "MPV",
  "Roadster",
];
const motorGucuOptions = [
  "50 HP'ye kadar",
  "51 - 75 HP",
  "76 - 100 HP",
  "101 - 125 HP",
  "126 - 150 HP",
  "151 - 175 HP",
  "176 - 200 HP",
  "201 - 225 HP",
  "226 - 250 HP",
  "251 - 275 HP",
  "276 - 300 HP",
  "301 - 325 HP",
  "326 - 350 HP",
  "351 - 375 HP",
  "376 - 400 HP",
  "401 - 425 HP",
  "426 - 450 HP",
  "451 - 475 HP",
  "476 - 500 HP",
  "501 - 525 HP",
  "526 - 550 HP",
  "551 - 575 HP",
  "576 - 600 HP",
  "601 HP ve üzeri",
];
const motorHacmiOptions = [
  "1300 cm3'e kadar",
  "1301 - 1600 cm3",
  "1601 - 1800 cm3",
  "1801 - 2000 cm3",
  "2001 - 2500 cm3",
  "2501 - 3000 cm3",
  "3001 - 3500 cm3",
  "3501 - 4000 cm3",
  "4001 - 4500 cm3",
  "4501 - 5000 cm3",
  "5001 - 5500 cm3",
  "5501 - 6000 cm3",
  "6001 cm3 ve üzeri",
];

const Arac_bilgileri = ({
  isCollapsed,
  toggleCollapse,
  uncollapseNext,
  getFormData,
}) => {
  const [selectedMarka, setSelectedMarka] = useState(null);
  const [selectedAracTipi, setSelectedAracTipi] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [formData, setFormData] = useState({
    noterSatisBedeli: "",
    konsinyeArac: false,
    ruhsatSahibiSirket: false,
    plaka: "",
    kilometre: "",
    yakitBilgisi: "",
    vitesBilgisi: "",
    kasaTipi: "",
    motorGucu: "",
    motorHacmi: "",
    ilanNumarasi: "",
  });

  const contentRef = useRef(null);

  const handleMarkaChange = (selectedOption) => {
    setSelectedMarka(selectedOption);
    setSelectedAracTipi(null);
    setSelectedCar(null);
  };

  const handleAracTipiChange = (selectedOption) => {
    setSelectedAracTipi(selectedOption);
    const car = kaskoData.find(
      (item) =>
        item["Marka Adı"] === selectedMarka.value &&
        item["Tip Adı"] === selectedOption.value
    );
    setSelectedCar(car);
  };

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const requiredFields = [
      "noterSatisBedeli",
      "plaka",
      "kilometre",
      "yakitBilgisi",
      "vitesBilgisi",
      "kasaTipi",
      "motorGucu",
      "motorHacmi",
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Lütfen ${field} alanını doldurunuz.`);
        return false;
      }
    }
    if (!selectedYear) {
      alert("Model Yılı Giriniz");
      return false;
    }
    if (!selectedMarka) {
      alert("Marka Giriniz");
      return false;
    }
    if (!selectedAracTipi) {
      alert("Araç Tipi Giriniz");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      getFormData({
        ...formData,
        marka: selectedMarka,
        aracTipi: selectedAracTipi,
        year: selectedYear,
        kaskoKodu: selectedCar ? selectedCar["Tip Kodu"] : null,
        kaskoDegeri:
          selectedCar && selectedYear ? selectedCar[selectedYear.value] : null,
      });
      toggleCollapse();
      uncollapseNext();
    }
  };

  const markaOptions = [
    ...new Set(kaskoData.map((item) => item["Marka Adı"])),
  ].map((marka) => ({ value: marka, label: marka }));
  const aracTipiOptions = kaskoData
    .filter(
      (item) => item["Marka Adı"] === (selectedMarka ? selectedMarka.value : "")
    )
    .map((item) => ({ value: item["Tip Adı"], label: item["Tip Adı"] }));

  const yearOptions = [...Array(2024 - 2010 + 1).keys()].map((i) => ({
    value: i + 2010,
    label: (i + 2010).toString(),
  }));

  return (
    <div className="container mt-3">
      <button
        onClick={toggleCollapse}
        className={`btn btn-block text-left d-flex column justify-content-between ${
          isCollapsed ? "btn-outline-primary" : "btn-primary"
        }`}
      >
        <div>Araç Bilgileri</div>
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
              <label htmlFor="modelYili_tuzel">Model Yılı *</label>
              <Select
                options={yearOptions}
                value={selectedYear}
                onChange={handleYearChange}
                placeholder="Seçin..."
                inputId="modelYili_tuzel"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="marka_tuzel">Marka *</label>
              <Select
                options={markaOptions}
                value={selectedMarka}
                onChange={handleMarkaChange}
                placeholder="Seçin..."
                inputId="marka_tuzel"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="aracTipi_tuzel">Araç Tipi *</label>
              <Select
                options={aracTipiOptions}
                value={selectedAracTipi}
                onChange={handleAracTipiChange}
                placeholder="Seçin..."
                isDisabled={!selectedMarka}
                inputId="aracTipi_tuzel"
                required
              />
            </div>

            <div className="form-group">
              <label>Seçilen Araç</label>
              <p className="form-control-static">
                {selectedMarka ? selectedMarka.label : "..."} /{" "}
                {selectedAracTipi ? selectedAracTipi.label : "..."}
              </p>
            </div>
            <div className="form-group">
              <label>Kasko Kodu</label>
              <p className="form-control-static">
                {selectedCar ? selectedCar["Tip Kodu"] : "..."}
              </p>
            </div>
            <div className="form-group">
              <label>Kasko Değeri</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">₺</span>
                </div>
                <div className="d-flex align-items-center mx-3">
                  <label className="m-0">
                    {selectedCar && selectedYear
                      ? selectedCar[selectedYear.value]
                      : "..."}
                  </label>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Yakıt Bilgisi *</label>
              <select
                className="form-control"
                name="yakitBilgisi"
                value={formData.yakitBilgisi}
                onChange={handleInputChange}
                required
              >
                <option value="">Seçin...</option>
                {yakitBilgisiOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Vites Bilgisi *</label>
              <select
                className="form-control"
                name="vitesBilgisi"
                value={formData.vitesBilgisi}
                onChange={handleInputChange}
                required
              >
                <option value="">Seçin...</option>
                {vitesBilgisiOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Kasa Tipi *</label>
              <select
                className="form-control"
                name="kasaTipi"
                value={formData.kasaTipi}
                onChange={handleInputChange}
                required
              >
                <option value="">Seçin...</option>
                {kasaTipiOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Motor Gücü *</label>
              <select
                className="form-control"
                name="motorGucu"
                value={formData.motorGucu}
                onChange={handleInputChange}
                required
              >
                <option value="">Seçin...</option>
                {motorGucuOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Motor Hacmi *</label>
              <select
                className="form-control"
                name="motorHacmi"
                value={formData.motorHacmi}
                onChange={handleInputChange}
                required
              >
                <option value="">Seçin...</option>
                {motorHacmiOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>İlan Numarası</label>
              <input
                type="text"
                className="form-control"
                name="ilanNumarasi"
                value={formData.ilanNumarasi}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="noterSatisBedeli_tuzel">
                Noter Satış Bedeli *
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">₺</span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  id="noterSatisBedeli_tuzel"
                  name="noterSatisBedeli"
                  value={formData.noterSatisBedeli}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="konsinyeArac_tuzel"
                name="konsinyeArac"
                checked={formData.konsinyeArac}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="konsinyeArac_tuzel">
                Konsinye Araç mı?
              </label>
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="ruhsatSahibiSirket_tuzel"
                name="ruhsatSahibiSirket"
                checked={formData.ruhsatSahibiSirket}
                onChange={handleInputChange}
              />
              <label
                className="form-check-label"
                htmlFor="ruhsatSahibiSirket_tuzel"
              >
                Ruhsat Sahibi Şirket mi?
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="plaka_tuzel">Plaka *</label>
              <input
                type="text"
                className="form-control"
                id="plaka_tuzel"
                name="plaka"
                value={formData.plaka}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="kilometre_tuzel">Kilometre *</label>
              <input
                type="number"
                className="form-control"
                id="kilometre_tuzel"
                name="kilometre"
                value={formData.kilometre}
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

export default Arac_bilgileri;
