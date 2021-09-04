
import { interval, map, timeInterval } from "rxjs";
import { IAsset } from "../@types/types";


const topFxCcy = ["EURUSD", "USDJPY", "GBPUSD", "AUDUSD", "USDCAD", "USDCHF", "NZDUSD", "EURJPY", "GBPJPY", "EURGBP", "AUDJPY", "EURAUD", "EURCHF", "AUDNZD", "NZDJPY", "GBPAUD", "GBPCAD", "EURNZD", "AUDCAD", "GBPCHF", "AUDCHF", "EURCAD", "CADJPY", "GBPNZD", "CADCHF", "CHFJPY", "NZDCAD", "NZDCHF"];
export const getAssets = () => Promise.resolve(topFxCcy as IAsset[]);

/*
const oldPrices = {

};*/

const mapper = (_timer: any) => {
    const val = Math.random() * 500;
    return { buyPrice: val, sellPrice: val + 0.55 }
}
export const getPrice$ = (asset: IAsset) => {
    return interval(1000 + Math.random() * 1000).pipe(timeInterval()).pipe(map(mapper));
}