import { Card } from "antd";

export const WidgetCard = ({ children, ...props }: any) => {
    return (
        <Card size="small" {...props}>{children}</Card>
    );
};