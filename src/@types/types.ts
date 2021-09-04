export type IAsset = string;
export enum TradeDirection {
    Sell = 'Sell',
    Buy = 'Buy'
}
export type IPriceResult = {
    asset: IAsset;
    buyPrice: number;
    sellPrice: number;
}

export type ITrade = {
    asset: IAsset;
    direction: TradeDirection;
    price: number;
    timestamp: number;
    user?: string;
}