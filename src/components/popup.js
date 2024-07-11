import React, { useState, useEffect } from "react";
import "./css/popup.css";

const Popup = ({ handleClose, show, zIndex, displayStyle, children }) => {
  const [checkboxes, setCheckboxes] = useState({
    konsinye1: false,
    konsinye2: false,
    konsinye3: false,
    konsinye4: false,
    konsinye5: false,
    konsinye6: false,
    okudumAnladim: false,
  });

  const [highlighted, setHighlighted] = useState([]);

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setCheckboxes((prev) => ({
      ...prev,
      [id]: checked,
    }));
    setHighlighted((prev) => prev.filter((highlight) => highlight !== id));
  };

  const handleSubmit = () => {
    const unchecked = Object.keys(checkboxes).filter(
      (key) => !checkboxes[key]
    );
    if (unchecked.length > 0) {
      setHighlighted(unchecked);
      setTimeout(() => {
        setHighlighted([]);
      }, 1000); // Remove highlight after 1 second
    } else {
      handleClose();
    }
  };

  const allChecked = Object.values(checkboxes).every((value) => value);

  const showHideClassName = displayStyle;

  return (
    <div className={showHideClassName} style={{ zIndex }}>
      <section className="popup-main">
        <div className="col-10 col-md-2 mx-auto">
          <div
            className="popup"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="popup-content" style={{ maxWidth: "450px" }}>
              <form action="" id="pop-up" className="fw-medium text-start">
                <div className="mb-1 fs-3 fw-bold text-center">Araç Beyanı</div>
                <div className="mb-3 fs-6 fw-light text-center">
                  Krediye konu aracın;
                </div>

                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className={`form-check-input ${
                        highlighted.includes("konsinye1") ? "highlighted" : ""
                      }`}
                      type="checkbox"
                      id="konsinye1"
                      checked={checkboxes.konsinye1}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="konsinye1">
                      Tramer kayıtlarında, <strong> Ağır Hasar Kaydı </strong>{" "}
                      yoktur.
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className={`form-check-input ${
                        highlighted.includes("konsinye2") ? "highlighted" : ""
                      }`}
                      type="checkbox"
                      id="konsinye2"
                      checked={checkboxes.konsinye2}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="konsinye2">
                      Şasi, podye ve direklerinde işlem yoktur.
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className={`form-check-input ${
                        highlighted.includes("konsinye3") ? "highlighted" : ""
                      }`}
                      type="checkbox"
                      id="konsinye3"
                      checked={checkboxes.konsinye3}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="konsinye3">
                      Hava yastıkları orijinaldir.
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className={`form-check-input ${
                        highlighted.includes("konsinye4") ? "highlighted" : ""
                      }`}
                      type="checkbox"
                      id="konsinye4"
                      checked={checkboxes.konsinye4}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="konsinye4">
                      Ticari taksi olarak kullanılmamıştır.
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className={`form-check-input ${
                        highlighted.includes("konsinye5") ? "highlighted" : ""
                      }`}
                      type="checkbox"
                      id="konsinye5"
                      checked={checkboxes.konsinye5}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="konsinye5">
                      Km'si orijinaldir.
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className={`form-check-input ${
                        highlighted.includes("konsinye6") ? "highlighted" : ""
                      }`}
                      type="checkbox"
                      id="konsinye6"
                      checked={checkboxes.konsinye6}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="konsinye6">
                      Tramer hasar bedeli, kasko bedelinin %30'unu
                      geçmemektedir.
                    </label>
                  </div>
                </div>

                <p className="fs-6 fw-light">
                  Beyan edilen araç bilgilerinin yukarıda belirtilen hususlara
                  uygun olduğunu, Finans kuruluşları ve bankaların, ilgili
                  kontrolleri para transferi aşamasında yaptığını bildiğimi,
                  yukarıdaki maddelerden herhangi birinin banka veya finans
                  kuruluşu tarafından tespit edilmesi durumunda, kredinin iptal
                  edileceğini bildiğimi ve kullandırımının yapılmayacağını
                  kabul, beyan ve taahhüt ederim. Bu aşamaya kadar doğan her
                  türlü masraftan AFK Motors’un, bankaların ve finans
                  kuruluşlarının sorumlu olmadığını bildiğimi ve konu ile ilgili
                  herhangi bir talepte bulunmayacağımı kabul, beyan ve taahhüt
                  ederim.
                </p>

                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className={`form-check-input ${
                        highlighted.includes("okudumAnladim") ? "highlighted" : ""
                      }`}
                      type="checkbox"
                      id="okudumAnladim"
                      checked={checkboxes.okudumAnladim}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="okudumAnladim">
                      Okudum, Anladım.
                    </label>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    className="btn btn-outline-primary btn-block"
                    type="button"
                    onClick={handleSubmit}
                  >
                    ONAYLIYORUM
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {children}
      </section>
    </div>
  );
};

export default Popup;
