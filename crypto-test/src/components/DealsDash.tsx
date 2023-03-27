import React from 'react';
import { useDealDash } from '../hooks/dealdash';

import { DealsEntry } from './DealsEntry';

import './DealsDash.css';

export function DealsDash() {
  //custom hook
  const { dealsDashHistory, connectionStatus } = useDealDash();

  return (
    <div className='App'>
      <div className='deals-block'>
        <div className='deals-title'>Сделки на рынке</div>
        <div className='deals-description-title'>
          <div className='deal-price'>Цена(USDT)</div>
          <div className='deal-amount'>Количество(BTC)</div>
          <div className='deal-time'>Время</div>
        </div>
        {connectionStatus === 'Connecting' && <div>Connecting to Sream</div>}
        {connectionStatus === 'Closing' && <div>Closing sream</div>}
        {connectionStatus === 'Closed' && <div>Stream is closed</div>}
        {connectionStatus === 'Uninstantiated' && (
          <div>Stream is Uninstantiated</div>
        )}
        {connectionStatus === 'Open' && (
          <ul className='deals-list'>
            {dealsDashHistory.length !== 0 &&
              dealsDashHistory.map((currentDeal) => (
                <DealsEntry
                  performedDeal={currentDeal.data}
                  key={currentDeal.data.a}
                />
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
