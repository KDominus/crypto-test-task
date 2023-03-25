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
import { Component } from 'react';
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
  const { loading, error, exchangeValue } = useExchangeMarket();

  //decompose resp
  // const currentExchangeRatio = exchangeValue.price;

  // console.log(currentExchangeRatio);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      payload: data.get('total'),
    });
  };

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
                fullWidth
                type='number'
                defaultValue={exchangeValue.price}
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
                fullWidth
                name='quantity'
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
                fullWidth
                name='quantity'
                type='number'
                id='quantity'
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
