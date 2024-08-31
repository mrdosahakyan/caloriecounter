import React, { useState, useEffect } from "react";
import Picker from "react-mobile-picker";

import "./styles/pickerStyle.css";
import { pickerItemStyles, pickerStyles } from "./styles/style";
import {
  generateHeightOptions,
  generateImperialHeightOptions,
  generateWeightOptions,
} from "./pickerData";
import { IOSSwitch } from "../IOSswitch";

interface HeightWeightPickerProps {
  defaultValue?: {
    height: string;
    weight: string;
    isMetric: boolean;
  };
  onChange: (selectedData: {
    height: string;
    weight: string;
    isMetric: boolean;
  }) => void;
}

const metricOptions = {
  height: generateHeightOptions(150, 200, "cm"),
  weight: generateWeightOptions(40, 100, "kg"),
};

const imperialOptions = {
  height: generateImperialHeightOptions(59, 78),
  weight: generateWeightOptions(88, 128, "lbs"),
};

const HeightWeightPicker: React.FC<HeightWeightPickerProps> = ({
  defaultValue = {
    height: metricOptions.height[7],
    weight: metricOptions.weight[7],
    isMetric: true,
  },
  onChange,
}) => {
  const [pickerValue, setPickerValue] = useState({
    height: defaultValue.height,
    weight: defaultValue.weight,
  });
  const [isMetric, setIsMetric] = useState(defaultValue.isMetric);

  useEffect(() => {
    if (!defaultValue) return;
    setPickerValue({
      height: defaultValue.height,
      weight: defaultValue.weight,
    });
    setIsMetric(defaultValue.isMetric);
  }, [defaultValue]);

  useEffect(() => {
    onChange({ ...pickerValue, isMetric });
  }, [pickerValue, isMetric]);

  useEffect(() => {
    // Disable scroll when the component mounts (picker is active)
    document.body.classList.add('no-scroll');
  
    // Re-enable scroll when the component unmounts (picker is closed)
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const handleChange = (newPickerValue: { [key: string]: string }) => {
    setPickerValue((prev) => ({
      ...prev,
      ...newPickerValue,
    }));
  };

  const handleToggleMetric = () => {
    const newIsMetric = !isMetric;
    setIsMetric(newIsMetric);

    const options = newIsMetric ? metricOptions : imperialOptions;

    setPickerValue({
      height: options.height[7],
      weight: options.weight[7],
    });
  };

  const options = isMetric ? metricOptions : imperialOptions;

  return (
    <div className="flex flex-col items-center bg-[#FFF5E5] py-4 w-full">
      <div className="flex items-center justify-center mb-10">
        <span
          className={`text-[20px] font-semibold mr-4 ${
            isMetric ? "text-[#D7D0CA]" : "text-[#021533]"
          }`}
        >
          Imperial
        </span>
        <IOSSwitch checked={isMetric} onChange={handleToggleMetric} />

        <span
          className={`text-[20px] font-semibold ml-4 ${
            !isMetric ? "text-[#D7D0CA]" : "text-[#021533]"
          }`}
        >
          Metric
        </span>
      </div>

      <div className="picker-wrapper flex flex-col justify-center items-center w-full">
        <div className="flex mb-2 justify-evenly w-full">
          <div className="text-[16px] font-semibold leading-[20px] text-center ">
            Height
          </div>
          <div className="text-[16px] font-semibold leading-[20px] text-center">
            Weight
          </div>
        </div>
        <Picker
          value={pickerValue}
          onChange={handleChange}
          style={{
            ...pickerStyles,
            fontSize: "23px",
          }}
          className="picker-container"
          itemHeight={50}
          height={240}
        >
          <Picker.Column name="height">
            {options.height.map((height) => (
              <Picker.Item key={height} value={height}>
                {({ selected }) => (
                  <div style={pickerItemStyles(selected)}>{height}</div>
                )}
              </Picker.Item>
            ))}
          </Picker.Column>

          <Picker.Column name="weight">
            {options.weight.map((weight) => (
              <Picker.Item key={weight} value={weight}>
                {({ selected }) => (
                  <div style={pickerItemStyles(selected)}>{weight}</div>
                )}
              </Picker.Item>
            ))}
          </Picker.Column>
        </Picker>
      </div>
    </div>
  );
};

export default HeightWeightPicker;
