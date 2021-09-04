
import { useEffect, useState } from 'react';
import { IAsset, IPriceResult, ITrade, TradeDirection } from '../../@types/types';

import 'antd/dist/antd.css'
import { getAssets, getPrice$ } from '../../services/fx-prices';
import { formatPrice } from '../../common/format-utils';

import { Button, Card, Dropdown, Menu } from "antd";
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

export const TradeTile = ({ asset = 'EUR USD', trade }: ITradeTileProps) => {
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

    const tradeWithAsset = (val: Partial<ITrade>) => trade({ asset, ...val });

    const menu = (
        <Menu>
            <Menu.Item>
                <a href="#">
                    Remove
                </a>
            </Menu.Item>
        </Menu>);

    const extraMenu = <Dropdown overlay={menu} placement="bottomRight">
        <Button>...</Button>
    </Dropdown>

    return (<Card size="small" title={asset} extra={extraMenu} className="trade-tile">
        <div className="trade-tile-buttons">
            <TradeBtn price={(priceResult.buyPrice)} trade={tradeWithAsset} />
            <TradeBtn price={priceResult.sellPrice} direction={TradeDirection.Sell} trade={tradeWithAsset} />
        </div>
    </Card>
    );
}

type ITradingTileProps = {
    trade: (trade: Partial<ITrade>) => void;
}

export const TradingTiles = ({ trade }: ITradingTileProps) => {
    const [assets, setAssets] = useState([] as IAsset[]);
    useEffect(() => {
        getAssets().then(setAssets);
    }, []);

    return <div className="trade-tiles-container">{assets.map(asset => <TradeTile trade={trade} asset={asset} />)}</div>
}