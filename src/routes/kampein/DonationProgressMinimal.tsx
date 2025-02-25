import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './DonationProgressMinimal.scss';

const DonationProgressMinimal: React.FC = () => {
  const goal = 770000; // יעד התרומות
  const [raised, setRaised] = useState<number>(0); // סכום שהושג
  const [percentage, setPercentage] = useState<number>(0); // אחוז מהיעד שהושג

  // שליפת נתוני תרומות מה-API
  const fetchDonationData = async () => {
    try {
      const response = await axios.get('https://matara.pro/nedarimplus/Reports/Manage3.aspx', {
        params: {
          Action: 'GetKevaNew',
          MosadNumber: '7013920', // הכנס את מזהה המוסד שלך
          ApiPassword: 'fp203',  // הכנס את סיסמת ה-API שלך
        },
      });

      console.log('Response from API:', response); // הוספת console.log ל-response

      if (response.data && Array.isArray(response.data)) {
        const totalRaised = response.data.reduce((acc, donation) => acc + parseFloat(donation.Amount), 0);
        setRaised(totalRaised); // עדכון הסטייט עם הסכום המחושב
      } else {
        console.error('לא נמצאו נתונים תקינים בתגובה');
      }
    } catch (error) {
      console.error('שגיאה בעת שליפת הנתונים מה-API:', error);
    }
  };

  useEffect(() => {
    fetchDonationData(); // קריאה ל-API בעת טעינת הקומפוננטה
  }, []);

  useEffect(() => {
    // חישוב האחוזים רק כאשר raised או goal משתנים
    const calculatedPercentage = Math.min(Math.floor((raised / goal) * 100), 100);
    setPercentage(calculatedPercentage);
  }, [raised, goal]);

  const progressPathLength = 223; // אורך המסלול לגרף

  return (
    <div className="donation-progress-container" dir="rtl">
      <h2 className="donation-title">הסכום שהושג</h2>

      {/* גרף ההתקדמות */}
      <div className="graph-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 187 79" className="graph-svg">
          {/* קו רקע אפור */}
          <polyline 
            fill="none" 
            strokeWidth="7.06422" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            points="183.392 75.2523 128.291 45.2293 54.4703 41.6972 3.60791 6.02289" 
            style={{ stroke: '#E5E5E5' }}
          />

          {/* קו מתקדם עם אנימציה */}
          <motion.polyline
            fill="none"
            strokeWidth="7.06422"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="183.392 75.2522 128.291 45.2293 54.47 41.6972 47.4058 36.7424"
            stroke="#6B4B9A"
            strokeDasharray={progressPathLength}
            strokeDashoffset={progressPathLength * (1 - percentage / 100)}
            initial={{ strokeDashoffset: progressPathLength }}
            animate={{ strokeDashoffset: progressPathLength * (1 - percentage / 100) }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
      </div>

      {/* סכום שהושג */}
      <div className="amount-container">
        <span className="amount-text">₪{raised.toLocaleString()}</span>
      </div>

      {/* אחוז השגת היעד */}
      <div className="percentage-text">
        {percentage}% מהיעד {goal.toLocaleString()}₪
      </div>
    </div>
  );
};

export default DonationProgressMinimal;