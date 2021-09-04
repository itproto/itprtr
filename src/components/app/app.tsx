import { useState } from 'react';
import { ITrade } from '../../@types/types';
import './app.css';
import 'antd/dist/antd.css'
import { TradingTiles } from '../trading/trading-tile';
import { Blotter } from '../trading/blotter/blotter';


function App() {
  const [trades, setTrades] = useState([] as ITrade[]);
  const onTrade = (val: Partial<ITrade>) => {
    const newTrade = {
      ...val
    } as ITrade;
    setTrades(trades.concat([newTrade]));
  };

  return (
    <div className="App">
      <Blotter data={trades} />
      <TradingTiles trade={onTrade} />
    </div>
  );
}

export default App;
