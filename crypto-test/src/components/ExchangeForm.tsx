// import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import { alpha, styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
// import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, ThemeOptions } from '@mui/material/styles';

import { useExchangeMarket } from '../hooks/exchagemarket';
// import { OutlinedInput } from '@mui/material';
import React, { Component, useEffect, useState } from 'react';
import { IJsonCryptoCurrency, IStreamDummy } from '../models';
import axios, { AxiosError } from 'axios';

//theme customization
const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    // ccolor: {
    //   main: 'red',
    // },
  },
};

const exchangeTheme = createTheme(
  {
    components: {
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            '&.MuiInputAdornment-positionEnd': {
              color: 'rgb(132, 142, 156)',
            },
            '& .MuiTypography-root': {
              color: 'rgb(132, 142, 156)',
            },
          },
        },
      },
      //
      MuiTextField: {
        styleOverrides: {
          root: {
            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
              {
                display: 'none',
              },
            '& input[type=number]': {
              MozAppearance: 'textfield',
            },
            '& input': {
              textAlign: 'end',
            },
          },
        },
      },
    },
  },
  themeOptions,
);

// MUI input customization customization
const CustomTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'rgb(240, 185, 11)',
  },
  '& .MuiInput': {
    color: 'red',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'rgb(240, 185, 11)',
  },
  '& .MuiOutlinedInput-root': {
    color: 'rgb(234, 236, 239)',
    textAlign: 'right',
    backgroundColor: 'rgba(43, 47, 54, 0.8)',
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'rgb(240, 185, 11)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgb(240, 185, 11)',
    },
  },
});

export function ExchangeForm() {
  // const { loading, error, exchangeValue, setExchangeValue } =
  //   useExchangeMarket();
  const cryptoCurrencyUrl =
    'https://fapi.binance.com/fapi/v1/ticker/price?symbol=BTCUSDT';

  // const defaultExchangeValueState: IJsonCryptoCurrency = {
  //   symbol: 'BTCUSDT',
  //   price: '0',
  //   time: 0,
  // };

  const [exchangeValue, setExchangeValue] = useState<IJsonCryptoCurrency>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchExchangeValue() {
    try {
      setError('');
      setLoading(true);
      const response = await axios.get<IJsonCryptoCurrency>(cryptoCurrencyUrl);
      setExchangeValue(response.data as IJsonCryptoCurrency);
      setLoading(false);
      // return response.data as IJsonCryptoCurrency;
      setFormData((prev) => {
        return {
          ...prev,
          ['price']: response.data.price,
        };
      });
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    if (!exchangeValue) {
      fetchExchangeValue();
    }
  }, [exchangeValue]);

  const defaultFormData = {
    price: '',
    quantity: '',
    total: '',
  };
  const [formData, setFormData] = useState(defaultFormData);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      price: data.get('price'),
      quantity: data.get('quantity'),
      total: data.get('total'),
    });
  };

  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuantity = e.target.value;
    const updatedTotal = String(
      Number(updatedQuantity) * Number(formData.price),
    );

    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: updatedQuantity,
        ['total']: updatedTotal,
      };
    });
    // console.log(formData);
  };

  const handleTotal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedTotal = e.target.value;
    const updatedQuantity = String(
      Number(updatedTotal) / Number(formData.price),
    );

    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: updatedTotal,
        ['quantity']: updatedQuantity,
      };
    });
    // console.log(formData);
  };

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === '') {
      setFormData((prev) => {
        return {
          ...prev,
          [e.target.name]: exchangeValue!.price,
        };
      });
    } else {
      const updatedPrice = e.target.value;

      setFormData((prev) => {
        return {
          ...prev,
          [e.target.name]: updatedPrice,
        };
      });
    }
    console.log(formData);
  };

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData((prev) => {
  //     return { ...prev, [event.target.name]: event.target.value };
  //   });
  // };

  return (
    <ThemeProvider theme={exchangeTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {exchangeValue && (
            <Box
              sx={{
                backgroundColor: 'rgb(30, 33, 38)',
                padding: '5px',
                borderRadius: '5px',

                textAlign: 'right',
              }}
              component='form'
              onSubmit={handleSubmit}
              noValidate
            >
              <CustomTextField
                inputProps={{
                  step: 0.01,
                  min: 0.01,
                }}
                InputProps={{
                  style: { textAlign: 'end' },
                  startAdornment: (
                    <InputAdornment sx={{ color: 'red' }} position='start'>
                      Цена
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>USDT</InputAdornment>
                  ),
                }}
                margin='dense'
                size='small'
                onChange={handlePrice}
                fullWidth
                type='number'
                value={formData.price}
                id='price'
                name='price'
                autoFocus
                placeholder='btc price'
              />
              <CustomTextField
                inputProps={{
                  step: 0.00001,
                  min: 0.00001,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>Количество</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>BTC</InputAdornment>
                  ),
                }}
                size='small'
                onChange={handleQuantity}
                fullWidth
                name='quantity'
                value={formData.quantity}
                type='number'
                id='quantity'
              />
              <CustomTextField
                inputProps={{
                  step: 0.0000001,
                  min: 0.0000001,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>Всего</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>USDT</InputAdornment>
                  ),
                }}
                margin='dense'
                size='small'
                value={formData.total}
                onChange={handleTotal}
                fullWidth
                name='total'
                type='number'
                id='total'
              />

              <Button
                color='success'
                variant='contained'
                type='submit'
                fullWidth
              >
                Купить BTC
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
