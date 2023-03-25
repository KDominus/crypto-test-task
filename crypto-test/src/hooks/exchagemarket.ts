import { useEffect, useState } from 'react';
import { IStreamDummy } from '../models';
import axios, { AxiosError } from 'axios';

export function useExchangeMarket() {
  const defaultExchangeValueState = {
    exchangeRatio: 0,
    usdtCount: 0,
    bitcoinCount: 0,
  };

  const [exchangeValue, setExchangeValue] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function exchangeInputsHandler() {
    return 0;
  }

  //TODO: interface for responce

  async function fetchExchangeValue() {
    try {
      setError('');
      setLoading(true);
      const response = await axios.get<any>(
        'https://fapi.binance.com/fapi/v1/ticker/price?symbol=BTCUSDT',
      );
      console.log(response.data, '!!resp');
      setExchangeValue(response.data);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchExchangeValue();
  }, []);

  return { exchangeValue, error, loading };
}
