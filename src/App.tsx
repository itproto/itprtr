import React, { useEffect, useState } from 'react';
import { IAsset, IPriceResult, ITrade, TradeDirection } from './@types/types';

import './App.css';
import { getAssets, getPrice$ } from './services/fx-prices';


type ITradeBtnProps = {
  direction?: TradeDirection,
  trade: (val: Partial<ITrade>) => void;
  price: number;
};
function TradeBtn(props: ITradeBtnProps) {
  const { direction = TradeDirection.Buy, trade, price } = props;
  const className = direction === TradeDirection.Sell ? `trade-btn trade-btn-sell` : 'trade-btn';
  return <button className={className} onClick={() => trade({ direction, price })}><div > {direction}</div > <div>{formatPrice(price)}</div></button >
}

type ITradeTileProps = {
  asset?: string;
  buyPrice?: number;
  sellPrice?: number;
  trade: (val: Partial<ITrade>) => void;
}

const formatPrice = (val: number) => {
  return val.toFixed(4);
};

const trades = [];
const TradeTile = ({ asset = 'EUR USD', trade }: ITradeTileProps) => {
  const [priceResult, setPriceResult] = useState({ asset, buyPrice: -1, sellPrice: -1 } as IPriceResult);
  useEffect(() => {
    const greeting$ = getPrice$(asset);
    const subscription = greeting$.subscribe(({ buyPrice, sellPrice }) => {
      setPriceResult({ buyPrice, sellPrice, asset });
    });

    return () => {
      subscription.unsubscribe();
    }
  }, [asset]);

  const foo = (val: Partial<ITrade>) => trade({ asset, ...val });

  return (<div className="trade-tile">
    <h3>{asset}</h3>
    <div className="trade-tile-buttons">
      <TradeBtn price={(priceResult.buyPrice)} trade={foo} />
      <TradeBtn price={priceResult.sellPrice} direction={TradeDirection.Sell} trade={foo} />
    </div>
  </div>
  );
}


const TradeItem = ({ trade }: any) => {
  const { asset, direction, price, timestamp } = trade;
  return (<div>
    {asset} {direction} {formatPrice(price)}
  </div>);
}

function App() {
  const [assets, setAssets] = useState([] as IAsset[]);
  const [trades, setTrades] = useState([] as ITrade[]);
  useEffect(() => {
    getAssets().then(setAssets);
  }, []);

  const onTrade = (val: Partial<ITrade>) => {
    const newTrade = {
      ...val
    } as ITrade;
    setTrades(trades.concat([newTrade]));
  };
  return (
    <div className="App">
      <div className="trades-blotter">{trades.map(trade => <TradeItem trade={trade} />)}</div>
      <div className="trade-tiles-container">{assets.map(asset => <TradeTile trade={onTrade} asset={asset} />)}</div>
    </div>
  );
}

export default App;
