import axios from "axios";

export async function GET(request: Request) {
    const params = new URLSearchParams(request.url.split('?')[1]);
    console.log(params);

    const response = await axios.get(
        `https://query1.finance.yahoo.com/v8/finance/chart/${params.get('ticker')}?interval=${params.get('interval')}&range=${params.get('range')}`
    )

    const data: unknown[] = []

    for (let i = 0; i < response.data.chart.result[0].timestamp.length; i++) {
        data.push({
            timestamp: new Date(response.data.chart.result[0].timestamp[i]),
            open: response.data.chart.result[0].indicators.quote[0].open[i],
            high: response.data.chart.result[0].indicators.quote[0].high[i],
            low: response.data.chart.result[0].indicators.quote[0].low[i],
            close: response.data.chart.result[0].indicators.quote[0].close[i],
            volume: response.data.chart.result[0].indicators.quote[0].volume[i],
        })
    }

    return Response.json(data);
}