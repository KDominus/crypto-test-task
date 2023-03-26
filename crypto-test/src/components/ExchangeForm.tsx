// import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useExchangeMarket } from '../hooks/exchagemarket';
import { OutlinedInput } from '@mui/material';
import React, { Component, useEffect, useState } from 'react';
import { IJsonCryptoCurrency, IStreamDummy } from '../models';

const exchangeTheme = createTheme({
  components: {
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
        },
      },
    },
  },
});

export function ExchangeForm() {
  const { loading, error, exchangeValue, setExchangeValue } =
    useExchangeMarket();

  const [fetchedExchange, setFetchedExchange] = useState(exchangeValue.price);

  

  //decompose resp
  // const currentExchangeRatio = exchangeValue.price;

  // console.log(currentExchangeRatio);
  const defaultFormData = {
    price: '',
    quantity: '',
    total: '',
  };
  const [formData, setFormData] = useState(defaultFormData);

    useEffect(() => {
      setFormData((prev) => {...prev,['price']:exchangeValue?.price })
    }, [ exchangeValue?.price]);

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
    console.log(formData);
    // return 0;
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
    console.log(formData);
    // return 0;
  };

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (false) {
      setFormData((prev) => {
        return {
          ...prev,
          [e.target.name]: exchangeValue?.price,
        };
      });
    } else {
      const updatedPrice = e.target.value;
      //  const updatedQuantity = String(
      //    Number(updatedTotal) / Number(formData.price),
      //  );

      setFormData((prev) => {
        return {
          ...prev,
          [e.target.name]: updatedPrice,
        };
      });
    }
    console.log(formData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setFormData((prev) => ({
    //   ...prev,

    //   [event.target.name]: event.target.value,
    // }));

    let recalculate: any = {
      _price: 0,
      _quantity: 0,
      _total: 0,
      //------------
      get price() {
        return this._price;
      },
      set price(recived) {
        console.log('price trigger');
        this._price = Number(recived);
      },
      //---------
      get quantity() {
        return this._quantity;
      },
      set quantity(recived) {
        console.log('quantity triger');
        this._quantity = Number(recived);
        this._total = Number(this._quantity) * Number(this._price);
      },
      //-----------
      get total() {
        return this._total;
      },
      set total(recived) {
        console.log('totaal triger');
        this._total = recived;
        this._quantity = String(Number(this._total) / Number(this._price));
      },
    };

    setFormData((prev) => {
      // switch (event.target.name) {
      //   case 'price':
      //     res;
      //     //
      //     return { ...prev };
      //     break;
      //   case 'quantity':
      //     //
      //     break;
      //   case 'total':
      //     //
      //     break;

      //   default:
      //     break;
      // }
      // recalculate = { ...prev };
      // recalculate[event.target.name] = event.target.value;
      // console.log(event.target.name, event.target.value)

      // console.log(prev);
      // console.log(recalculate, '!!');
      // const { price, quantity, total } = recalculate;
      return { ...prev, [event.target.name]: event.target.value };
    });
    // console.log(formData);
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.name === 'price') {
  //     setExchangeValue(prev)
  //   }
  //   return 0;
  // }

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
            <Box component='form' onSubmit={handleSubmit} noValidate>
              <TextField
                inputProps={{
                  step: 0.01,
                  min: 0.01,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>Цена</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>USDT</InputAdornment>
                  ),
                }}
                onChange={handlePrice}
                fullWidth
                type='number'
                value={formData.price}
                id='price'
                name='price'
                autoFocus
                placeholder='btc price'
              />
              <TextField
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
                onChange={handleQuantity}
                fullWidth
                name='quantity'
                value={formData.quantity}
                type='number'
                id='quantity'
                placeholder='usdt'
              />
              <TextField
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
                value={formData.total}
                onChange={handleTotal}
                fullWidth
                name='total'
                type='number'
                id='total'
              />

              <Button type='submit' fullWidth variant='contained'>
                Купить BTC
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
function setValue(value: string) {
  throw new Error('Function not implemented.');
}
