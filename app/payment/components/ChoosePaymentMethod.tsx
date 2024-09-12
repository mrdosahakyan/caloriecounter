import React, { FC } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  Box,
  Typography,
  InputBase,
} from "@mui/material";
import { FaCheck } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
import { SiApplepay } from "react-icons/si";

export enum EPaymentMethod {
  CARD = "card",
  APPLE_PAY = "apple_pay",
}

const options = [
  {
    label: "Credit Card",
    value: EPaymentMethod.CARD,
    icon: <CiCreditCard1 fontSize={45} />,
  },
  {
    label: "Apple Pay",
    value: EPaymentMethod.APPLE_PAY,
    icon: <SiApplepay fontSize={45} />,
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
              padding: "4px 12px",
              border: "none",
              outline: "none",
              boxShadow: "none",
              height: "30px",
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
              width: "100%",
              marginTop: "30px",
              borderRadius: "8px",
              marginRight: "14px",
              maxWidth: "300px",
            },
          },
          MenuListProps: {
            style: {
              paddingTop: 0,
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
                fontSize: "18px",
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
              backgroundColor: "transparent",
              padding: "6px 14px",
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
                  fontWeight="bold"
                  style={{
                    paddingLeft: "18px",
                    fontSize: "18px",
                    color: "#021533",
                  }}
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
