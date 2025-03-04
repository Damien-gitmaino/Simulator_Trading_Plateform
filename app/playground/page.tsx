"use client";
import React, {JSX} from "react";
import Dropdown, {DropdownOption} from "@/components/inputs/dropdown";
import TextField from "@/components/inputs/textField";
import Button from "@/components/inputs/button";
import axios from "axios";
import CandlestickChart, {CandlestickChartData} from "@/components/charts/candlestickChart";

export default function Playground(): JSX.Element {
    const [period, setPeriod] = React.useState<DropdownOption | null>(null);
    const [interval, setInterval] = React.useState<DropdownOption | null>(null);
    const [ticker, setTicker] = React.useState<string | number | readonly string[] | undefined>('');
    const [data, setData] = React.useState<CandlestickChartData[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<unknown>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            if (!ticker || !period || !interval) {
                setError('Please fill out all fields');
                return;
            }
            setIsLoading(true);
            const response = await axios.get(`/api/tickers?ticker=${ticker}&interval=${interval.value}&range=${period.value}`);
            console.log(response);
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error);
        }
    }

    return <div className="max-h-screen p-10 mt-20 grid grid-cols-2 gap-4">
        <div>
            <form className="grid grid-cols-4 gap-4 flex flex-row items-center mb-3" onSubmit={handleSubmit}>
                <div>
                    <Dropdown label={'Period'} value={period} onChange={
                        (opt: DropdownOption) => setPeriod(opt)
                    } options={[
                        {label: '1d', value: '1d'},
                        {label: '5d', value: '5d'},
                        {label: '1mo', value: '1mo'},
                        {label: '3mo', value: '3mo'},
                        {label: '6mo', value: '6mo'},
                        {label: '1y', value: '1y'},
                        {label: '2y', value: '2y'},
                        {label: '5y', value: '5y'},
                        {label: '10y', value: '10y'},
                    ]}/>
                </div>
                <div>
                    <Dropdown label={'Interval'} value={interval} onChange={
                        (opt: DropdownOption) => setInterval(opt)
                    } options={[
                        {label: '1m', value: '1m'},
                        {label: '2m', value: '2m'},
                        {label: '5m', value: '5m'},
                        {label: '15m', value: '15m'},
                        {label: '30m', value: '30m'},
                        {label: '60m', value: '60m'},
                        {label: '90m', value: '90m'},
                        {label: '1h', value: '1h'},
                        {label: '1d', value: '1d'},
                        {label: '5d', value: '5d'},
                        {label: '1wk', value: '1wk'},
                        {label: '1mo', value: '1mo'},
                        {label: '3mo', value: '3mo'},
                    ]}/>
                </div>
                <div>
                    <TextField label={'Ticker'} value={ticker} required onChange={(
                        e: React.ChangeEvent<HTMLInputElement>
                    ) => setTicker(e.target.value)}/>
                </div>
                <div>
                    <Button label={'Submit'} type={"submit"}/>
                </div>
            </form>
            <div className="max-h-96 mb-3 overflow-auto">
                <table
                    className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-10">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Timestamp
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Open
                        </th>
                        <th scope="col" className="px-6 py-3">
                            High
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Low
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Close
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Volume
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((d, i) => (
                        <tr
                            key={i}
                            className="bg-white border-b"
                        >
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                                {d.timestamp.toString()}
                            </th>
                            <td className="px-6 py-4">{d.open ? d.open.toFixed(2) : '-'}</td>
                            <td className="px-6 py-4">{d.high ? d.high.toFixed(2) : '-'}</td>
                            <td className="px-6 py-4">{d.low ? d.low.toFixed(2) : '-'}</td>
                            <td className="px-6 py-4">{d.close ? d.close.toFixed(2) : '-'}</td>
                            <td className="px-6 py-4">{d.volume ? d.volume : '-'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <CandlestickChart data={data}/>
        </div>
        <div>

        </div>
    </div>
}