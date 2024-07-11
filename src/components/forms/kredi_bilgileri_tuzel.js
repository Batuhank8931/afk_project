import React, { useState, useRef } from "react";
import "./css/Collapse.css";

const Kredi_bilgileri = ({
  isCollapsed,
  toggleCollapse,
  uncollapseNext,
  getFormData,
}) => {

  const banks = [
    "AKTİFBANK",
    "TÜRKİYE FİNANS KATILIM",
    "ALJ FİNANS",
    "AKBANK",
    "VOLKSWAGEN DOĞUŞ FİNANS",
    "KOÇFİNANS",
    "YAPI KREDİ",
    "QUICK FİNANS",
  ];


  const [krediTutari, setKrediTutari] = useState("");
  const [krediVadesi, setKrediVadesi] = useState("");
  const [selectedBanks, setSelectedBanks] = useState(banks);
  const contentRef = useRef(null);



  const handleBankChange = (bank) => {
    setSelectedBanks((prevSelectedBanks) => {
      if (prevSelectedBanks.includes(bank)) {
        return prevSelectedBanks.filter(
          (selectedBank) => selectedBank !== bank
        );
      } else {
        return [...prevSelectedBanks, bank];
      }
    });
  };

  const validateForm = () => {
    if (!krediTutari) {
      alert("Kredi Tutarını Giriniz");
      return false;
    }
    if (!krediVadesi) {
      alert("Kredi Vadesini Giriniz");
      return false;
    }
    if (selectedBanks.length === 0) {
      alert("En az bir banka veya kurum seçiniz");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      getFormData({ krediTutari, krediVadesi, selectedBanks });
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
        <div>Kredi Bilgileri</div>
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
              <label>Kredi Tutarı *</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">₺</span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  value={krediTutari}
                  onChange={(e) => setKrediTutari(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Kredi Vadesi *</label>
              <select
                className="form-control"
                value={krediVadesi}
                onChange={(e) => setKrediVadesi(e.target.value)}
                required
              >
                <option value="">Seçin...</option>
                <option value="12">12 Ay</option>
                <option value="24">24 Ay</option>
                <option value="36">36 Ay</option>
                <option value="48">48 Ay</option>
                <option value="60">60 Ay</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                Başvurmak istediğiniz banka ve finans kurumlarını seçiniz.
              </label>
              {banks.map((bank) => (
                <div className="form-check" key={bank}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={bank}
                    id={bank}
                    checked={selectedBanks.includes(bank)}
                    onChange={() => handleBankChange(bank)}
                  />
                  <label className="form-check-label" htmlFor={bank}>
                    {bank}
                  </label>
                </div>
              ))}
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

export default Kredi_bilgileri;
