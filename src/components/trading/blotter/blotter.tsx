import { List } from "antd";
import { ITrade } from "../../../@types/types";
import { formatPrice } from "../../../common/format-utils";
import { WidgetCard } from "../../shell/widget-card";

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
        <div className="trades-blotter">
            <List
                size="small"
                bordered
                dataSource={data}
                renderItem={trade => <List.Item><BlotterItem data={trade} /></List.Item>}
            />
        </div>
    );
};