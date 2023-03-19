import React, { useMemo } from 'react';

import './DealsEntry.css';

interface DealEntryProperty {
  performedDeal: {
    e: string;
    E: number;
    a: number;
    s: string;
    p: string;
    q: string;
    f: number;
    l: number;
    T: number;
    m: boolean;
  };
}

export function DealsEntry({ performedDeal }: DealEntryProperty) {

  let dealTypeCssClass = performedDeal.m
    ? 'deal-entity-sell'
    : 'deal-entity-buy';
  dealTypeCssClass += ' deal-entity-price';

  const dealTimestamp = useMemo(() => {
    const convertDealTime = (recivedTimeString: number): string => {
      const dateObjectFromString = new Date(recivedTimeString);
      const convertedTime = dateObjectFromString.toLocaleTimeString('en-US', {
        hour12: false,
      });
      return convertedTime;
    };
    return convertDealTime(performedDeal.T);
  }, [performedDeal.T]);

  return (
    <li className='deal-entity'>
      <div className={dealTypeCssClass}>{performedDeal.p}</div>
      <div className='deal-entity-amount'>{performedDeal.q}</div>
      <div className='deal-entity-time'>{dealTimestamp}</div>
    </li>
  );
}
