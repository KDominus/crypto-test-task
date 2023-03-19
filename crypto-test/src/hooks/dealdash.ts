import { useCallback, useEffect, useState } from 'react';
import { IStreamDummy, IStreamBTCUSDT } from '../models';

import useWebSocket, { ReadyState } from 'react-use-websocket';

export function useDealDash() {
  //local state hooks
  const [dealsDashHistory, setDealsDashHistory] = useState<IStreamBTCUSDT[]>(
    [],
  );

  //connect to socket url
  // const socketUrl = 'wss://fstream.binance.com/ws/btcusdt@aggTrade';
  const socketUrl =
    'wss://fstream.binance.com/stream?streams=btcusdt@aggTrade/btcusdt@aggTrade';
  const { sendJsonMessage, lastJsonMessage, readyState } =
    useWebSocket<IStreamDummy>(socketUrl);

  //connection function
  const connectToDealsStream = useCallback(
    async () =>
      await sendJsonMessage({
        method: 'SUBSCRIBE',
        params: ['btcusdt@aggTrade'],
      }),
    [sendJsonMessage],
  );

  //conection state section
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  // New Deal handler with memoization
  const addDealToDash = useCallback(
    (performedDeal: IStreamBTCUSDT) => {
      setDealsDashHistory((prev) => {
        const changedHistory = [performedDeal, ...prev];
        if (changedHistory.length > 100) {
          changedHistory.length -= 1;
        }
        return changedHistory;
      });
    },
    [setDealsDashHistory],
  );

  useEffect(() => {
    if (lastJsonMessage !== null) {
      addDealToDash(lastJsonMessage as IStreamBTCUSDT);
    }
  }, [lastJsonMessage, addDealToDash, connectToDealsStream]);

  return {
    dealsDashHistory,
    lastJsonMessage,
    addDealToDash,
    connectionStatus,
    ReadyState,
  };
}
