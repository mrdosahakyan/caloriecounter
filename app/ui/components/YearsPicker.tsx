import React, { useState } from "react";
import Picker from "react-mobile-picker";

interface YearsPickerProps {
  defaultValue?: string;
  onYearChange: (year: string) => void;
}

const YearsPicker: React.FC<YearsPickerProps> = ({
  defaultValue,
  onYearChange,
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) =>
    (1900 + i).toString()
  );

  const [pickerValue, setPickerValue] = useState({
    year: defaultValue || currentYear.toString(),
  });

  const handleChange = (newPickerValue: { year: string }, key: string) => {
    setPickerValue(newPickerValue);
    onYearChange(newPickerValue.year);
  };

  return (
    <div className="picker-wrapper flex justify-center items-center bg-[#FFF5E5]">
      <Picker
        value={pickerValue}
        onChange={handleChange}
        style={{
          width: "100%",
        }}
        itemHeight={60}
        height={350}
      >
        <Picker.Column name="year">
          {years.map((year) => (
            <Picker.Item key={year} value={year}>
              {({ selected }) => (
                <div
                  style={{
                    color: selected ? "#021533" : "#ccc",
                    fontWeight: selected ? "bold" : "normal",
                    backgroundColor: selected ? "#FFEAC5" : "transparent",
                    padding: "28px 0",
                    height: "40px",
                    fontSize: "28px",
                    lineHeight: "0px",
                    textAlign: "center",
                    borderRadius: "33px",
                    width: "100%",
                    transition: "all 0.3s ease",
                  }}
                >
                  {year}
                </div>
              )}
            </Picker.Item>
          ))}
        </Picker.Column>
      </Picker>
    </div>
  );
};

export default YearsPicker;
