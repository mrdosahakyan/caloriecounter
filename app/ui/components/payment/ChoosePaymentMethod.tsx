import React, { FC } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  Box,
  Typography,
  InputBase,
} from "@mui/material";
import ApplePay from "../../../../public/icons/ApplePay.svg";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";
import { CiCreditCard1 } from "react-icons/ci";

export enum EPaymentMethod {
  CARD = "card",
  APPLE_PAY = "apple_pay",
}

const options = [
  {
    label: "Credit Card",
    value: EPaymentMethod.CARD,
    icon: <CiCreditCard1 fontSize={60} />, // Increase icon size: ;
  },
  {
    label: "Apple Pay",
    value: EPaymentMethod.APPLE_PAY,
    icon: <Image width={60} height={40} src={ApplePay} alt="apple pay" />, // Increase icon size: ;
  },
];

type TChoosePaymentMethodProps = {
  selectedPaymentMethod: EPaymentMethod;
  setSelectedPaymentMethod: (paymentMethod: EPaymentMethod) => void;
};

const ChoosePaymentMethod: FC<TChoosePaymentMethodProps> = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}) => {
  const handleSelect = (event: any) => {
    setSelectedPaymentMethod(event.target.value as EPaymentMethod);
  };

  return (
    <FormControl fullWidth>
      <Select
        value={selectedPaymentMethod}
        onChange={handleSelect}
        input={
          <InputBase
            style={{
              backgroundColor: "#FFF5E5",
              padding: "8px 8px", // Add padding to the select box
              border: "none", // Remove border
              outline: "none", // Remove outline on focus
              boxShadow: "none", // Remove box-shadow
            }}
          />
        }
        MenuProps={{
          anchorOrigin: {
            vertical: "top",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          PaperProps: {
            style: {
              maxHeight: 350, // Increase the dropdown size
              width: "300px",
              marginTop: "10px", // Add space between select and dropdown
              borderRadius: "8px", // Add border radius to dropdown container
            },
          },
        }}
        renderValue={(selected) => (
          <Box display="flex" alignItems="center">
            {options.find((option) => option.value === selected)?.icon}
            <Typography
              fontWeight="bold"
              style={{
                paddingLeft: "18px",
                fontSize: "20px",
                color: "#021533",
              }}
            >
              {options.find((option) => option.value === selected)?.label}
            </Typography>
          </Box>
        )}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            style={{
              backgroundColor: "transparent", // Remove background color of selected option
              padding: "12px 10px", // Add padding to the options
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Box display="flex" alignItems="center">
                {option.icon}
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  style={{ marginLeft: "18px" }}
                >
                  {option.label}
                </Typography>
              </Box>
              {option.value === selectedPaymentMethod && (
                <FaCheck size={16} className="text-green-500" />
              )}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ChoosePaymentMethod;
