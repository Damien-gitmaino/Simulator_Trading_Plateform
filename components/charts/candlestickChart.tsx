import React, {JSX, useEffect} from "react";
import ReactApexChart from "react-apexcharts";

export interface CandlestickChartData {
    timestamp: Date;
    open: number | null;
    high: number | null;
    low: number | null;
    close: number | null;
    volume: number | null;
}

interface CandlestickChartProps {
    height?: number;
    data: CandlestickChartData[];
}

interface CandlestickChartState {
    x: Date;
    y: number[];
}

export default function CandlestickChart({height = 350, data}: CandlestickChartProps): JSX.Element {
    const [state, setState] = React.useState<CandlestickChartState[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    useEffect(() => {
        if (data.length === 0) {
            return;
        }
        setIsLoading(true);
        const newState: any[] = data.map((d) => {
            const open: number | null = d.open ? parseFloat(d.open.toFixed(2)) : null;
            const high: number | null = d.high ? parseFloat(d.high.toFixed(2)) : null;
            const low: number | null = d.low ? parseFloat(d.low.toFixed(2)) : null;
            const close: number | null = d.close ? parseFloat(d.close.toFixed(2)) : null;

            return {
                x: d.timestamp,
                y: [open, high, low, close]
            }
        });
        setState(newState);
        setIsLoading(false);
    }, [data]);

    if (data.length === 0) {
        return <div></div>
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div style={{ width: "100%", margin: "0 auto" }}>
            <ReactApexChart options={{
                chart: {
                    type: 'candlestick',
                    height: height
                },
                xaxis: {
                    type: 'datetime'
                },
                yaxis: {
                    tooltip: {
                        enabled: false
                    }
                }
            }} series={[{
                data: state,
            }]} type="candlestick" height={height} />
        </div>
    );
}