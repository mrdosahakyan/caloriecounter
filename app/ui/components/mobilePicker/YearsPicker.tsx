import React, { useEffect, useState } from "react";
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

  const [pickerValue, setPickerValue] = useState({
    year: defaultValue || currentYear.toString(),
  });

  useEffect(() => {
    if (defaultValue) {
      setPickerValue({ year: defaultValue });
    }
  }, [defaultValue]);

  const handleChange = (newPickerValue: { year: string }, key: string) => {
    setPickerValue(newPickerValue);
    onYearChange(newPickerValue.year);
  };

  return (
    <div className="picker-wrapper flex justify-center items-center bg-[#FFF5E5] w-full">
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
