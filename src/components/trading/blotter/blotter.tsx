import { ITrade } from "../../../@types/types";
import { formatPrice } from "../../../common/format-utils";

type IBlotterItem<T = ITrade> = {
    data: T
}
export const BlotterItem = ({ data }: IBlotterItem) => {
    const { asset, direction, price } = data;
    return (<div>
        {asset} {direction} {formatPrice(price)}
    </div>);
}


type IBlotterProps<T = ITrade> = {
    data: T[]
}
export const Blotter = ({ data }: IBlotterProps) => {
    return (
        <div className="trades-blotter">{data.map(trade => <BlotterItem data={trade} />)}</div>
    );
};