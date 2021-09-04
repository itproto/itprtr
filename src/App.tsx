import React, { useEffect, useState } from 'react';
import { IAsset } from './@types/types';

import './App.css';
import { getAssets } from './services/fx-prices';

enum TradeDirection {
  Sell = 'Sell',
  Buy = 'Buy'
}
type ITradeBtnProps = {
  direction?: TradeDirection,
  trade?: () => void;
  price: number;
};
function TradeBtn(props: ITradeBtnProps) {
  const { direction = TradeDirection.Buy, trade, price } = props;
  return <button onClick={trade}><div>{direction}</div><div>{price}</div></button>
}

type ITradeTileProps = {
  asset?: string;
  buyPrice?: number;
  sellPrice?: number;
}
const TradeTile = ({ asset = 'EUR USD', buyPrice = 19.7812, sellPrice = 20.2013 }: ITradeTileProps) => {
  return (<div className="trade-tile">
    <h3>{asset}</h3>
    <div className="trade-tile-buttons">
      <TradeBtn price={buyPrice} />
      <TradeBtn price={sellPrice} direction={TradeDirection.Sell} />
    </div>
  </div>
  );
}




function App() {
  const [assets, setAssets] = useState([] as IAsset[]);
  useEffect(() => {
    getAssets().then(setAssets);
  }, [])
  return (
    <div className="App">
      <div className="trade-tiles-container">{assets.map(asset => <TradeTile asset={asset} />)}</div>
    </div>
  );
}

export default App;
