import { useEffect, useState } from 'react';
import { IStreamDummy, IJsonCryptoCurrency } from '../models';
import axios, { AxiosError } from 'axios';

export function useExchangeMarket() {
  const defaultExchangeValueState = {
    symbol: 'BTCUSDT',
    price: '0',
    time: 0,
  };

  const cryptoCurrencyUrl =
    'https://fapi.binance.com/fapi/v1/ticker/price?symbol=BTCUSDT';

  const [exchangeValue, setExchangeValue] = useState<IJsonCryptoCurrency>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function exchangeInputsHandler() {
    return 0;
  }

  async function fetchExchangeValue() {
    try {
      setError('');
      setLoading(true);
      const response = await axios.get<IJsonCryptoCurrency>(cryptoCurrencyUrl);
      // console.log(response.data, '!!resp');
      setExchangeValue(response.data as IJsonCryptoCurrency);
      setLoading(false);
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

  return { exchangeValue, error, loading };
}
