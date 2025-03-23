import React, { useEffect, useState } from "react";

interface Parasha {
  date: string;
  parasha: string;
}

export const fetchParashot = async (): Promise<Parasha[]> => {
  try {
    const response = await fetch(
      "https://www.hebcal.com/shabbat?cfg=json&geonameid=293397&M=on"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch parashot");
    }
    const json = await response.json();

    return json.items
      .filter((item: any) => item.category === "parashat")
      .map((item: any) => ({
        date: new Date(item.date).toLocaleDateString("he-IL"),
        parasha: item.hebrew,
      }));
  } catch (err) {
    console.error(err);
    return [];
  }
};

const ParashaCarousel: React.FC = () => {
  const [parashot, setParashot] = useState<Parasha[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchParashot().then(setParashot);
  }, []);

  const next = () => {
    if (index + 3 < parashot.length) {
      setIndex(index + 3);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 3);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={prev} disabled={index === 0}>
        ◀
      </button>
      {parashot.slice(index, index + 3).map((parasha) => (
        <div key={parasha.date} style={{ display: "inline-block", margin: "10px", padding: "10px", border: "1px solid gray", borderRadius: "5px" }}>
          <h3>{parasha.parasha}</h3>
          <p>{parasha.date}</p>
        </div>
      ))}
      <button onClick={next} disabled={index + 3 >= parashot.length}>
        ▶
      </button>
    </div>
  );
};

export default ParashaCarousel;
