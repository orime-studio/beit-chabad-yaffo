import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Aboutkampein from './AboutKampein';
import PaymentForm from './paymentForm/PaymentForm';
import './KampeinBanner.scss';

const KampeinBanner = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  return (
    <div className="kampein-banner">
      <Helmet>
        <title>פותחים בית חב״ד חדש ביפו – הצטרפו לשליחות</title>
        <meta
          name="description"
          content="בונים בית חב״ד בלב שוק הפשפשים. תרמו היום והביאו אור יהודי לכל עובר ושב."
        />
        <meta
          name="keywords"
          content="בית חב״ד יפו, קמפיין תרומה, שוק הפשפשים, שליחות חב״ד, תרומה צדקה"
        />
        <meta property="og:title" content="בית חב״ד יפו – לב פתוח בלב השוק" />
        <meta
          property="og:description"
          content="הצטרפו לבניית נקודת אור יהודית ראשונה בשוק הפשפשים. כל תרומה מקרבת אותנו לפתיחה."
        />
        <meta
          property="og:image"
          content="https://beit-chabad-yaffo.onrender.com/img/kampein/banner-u.png"
        />
      </Helmet>

      <h1 className="kampein-banner-title">
        בונים את הלב היהודי של יפו – יחד איתכם
      </h1>

      <p className="kampein-banner-description">
        בלב שוק הפשפשים קם בית חם לכל יהודי. לחצו ותרמו כדי לפתוח את הדלת.
      </p>


      <div className="kampein-buttons">
        <button
          className="donate-button"
          onClick={() => setShowPaymentForm(true)}
        >
          תורמים ופותחים דלתות
        </button>

        <button
          className="info-button"
          onClick={() => setShowInfo(true)}
        >
          לפרטים על הקמפיין
        </button>
      </div>

      {showInfo && (
        <div className="overlay" onClick={() => setShowInfo(false)}>
          <div
            className="info-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setShowInfo(false)}
              aria-label="סגור מידע"
            >
              <img src="/img/kampein/x.svg" alt="סגור חלון" />
            </button>
            <div className="info-content">
              <Aboutkampein />
            </div>
          </div>
        </div>
      )}

      {showPaymentForm && (
        <div className="overlay" onClick={() => setShowPaymentForm(false)}>
          <div
            className="payment-form-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setShowPaymentForm(false)}
              aria-label="סגור טופס תרומה"
            >
              <img src="/img/kampein/x.svg" alt="סגור חלון" />
            </button>
            <PaymentForm monthlyAmount={0} />
          </div>
        </div>
      )}
    </div>
  );
};

export default KampeinBanner;
