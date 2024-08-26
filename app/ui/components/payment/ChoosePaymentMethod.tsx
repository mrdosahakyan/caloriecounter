import React, { FC } from 'react';
import { Select, MenuItem, FormControl, Box, Typography, InputBase } from '@mui/material';
import { SiApplepay } from 'react-icons/si';
import { CiCreditCard2 } from 'react-icons/ci';
import { FaCheck } from 'react-icons/fa';

export enum EPaymentMethod {
  CARD = 'card',
  APPLE_PAY = 'apple_pay',
}

const options = [
  {
    label: 'Credit Card',
    value: EPaymentMethod.CARD,
    icon: <CiCreditCard2 size={42} />, // Increase icon size
  },
  {
    label: 'Apple Pay',
    value: EPaymentMethod.APPLE_PAY,
    icon: <SiApplepay size={42} />, // Increase icon size
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
              backgroundColor: '#fff9f1',
              padding: '12px 16px', // Add padding to the select box
              border: 'none', // Remove border
              outline: 'none', // Remove outline on focus
              boxShadow: 'none', // Remove box-shadow
            }}
          />
        }
        MenuProps={{
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          PaperProps: {
            style: {
              maxHeight: 350, // Increase the dropdown size
              width: '300px',
              marginTop: '10px', // Add space between select and dropdown
              borderRadius: '8px', // Add border radius to dropdown container
            },
          },
        }}
        renderValue={(selected) => (
          <Box display="flex" alignItems="center">
            {options.find(option => option.value === selected)?.icon}
            <Typography variant="h5" fontWeight="bold" style={{ marginLeft: '10px' }}>
              {options.find(option => option.value === selected)?.label}
            </Typography>
          </Box>
        )}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            style={{
              backgroundColor: 'transparent', // Remove background color of selected option
              padding: '18px 16px', // Add padding to the options
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
              <Box display="flex" alignItems="center">
                {option.icon}
                <Typography variant="h5" fontWeight="bold" style={{ marginLeft: '8px' }}>
                  {option.label}
                </Typography>
              </Box>
              {option.value === selectedPaymentMethod && <FaCheck size={16} className="text-green-500" />}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ChoosePaymentMethod;
