import React, { useEffect, useState, useRef } from "react";
import Picker from "react-mobile-picker";
import "./styles/pickerStyle.css";
import { getYearsTillCurrent } from "./pickerData";
import { pickerItemStyles, pickerStyles } from "./styles/style";

interface YearsPickerProps {
  defaultValue?: string;
  onYearChange: (year: string) => void;
}

const YearsPicker: React.FC<YearsPickerProps> = ({
  defaultValue,
  onYearChange,
}) => {
  const currentYear = new Date().getFullYear();
  const years = getYearsTillCurrent(1900);
  const pickerRef = useRef<HTMLDivElement>(null);

  const [pickerValue, setPickerValue] = useState({
    year: defaultValue || currentYear.toString(),
  });

  useEffect(() => {
    if (defaultValue) {
      setPickerValue({ year: defaultValue });
    }
  }, [defaultValue]);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (pickerRef.current && pickerRef.current.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    // Attach the event listener
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    // Cleanup the event listener
    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const handleChange = (newPickerValue: { year: string }, key: string) => {
    setPickerValue(newPickerValue);
    onYearChange(newPickerValue.year);
  };

  return (
    <div
      className="picker-wrapper flex justify-center items-center bg-primaryBgColor w-full"
      ref={pickerRef}
    >
      <Picker
        value={pickerValue}
        onChange={handleChange}
        style={{
          ...pickerStyles,
          fontSize: "28px",
        }}
        className="picker-container"
        itemHeight={60}
        height={350}
      >
        <Picker.Column name="year">
          {years.map((year) => (
            <Picker.Item key={year} value={year}>
              {({ selected }) => (
                <div style={pickerItemStyles(selected)}>{year}</div>
              )}
            </Picker.Item>
          ))}
        </Picker.Column>
      </Picker>
    </div>
  );
};

export default YearsPicker;
