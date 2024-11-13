
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    scales,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useCrypto } from '../context/crypto-context';
import { useState } from 'react';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
    scales: {
        x:{
            title: {
                display: true,
                text:"Time"
            },
            ticks: {
                callback: (value, index, ticks) => {
                    return `${value} ${getTimePeriodLabel(index)}`
                }
            }
        }
    }
};

const labels = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

export const CoinPage = ({ coin }) => {
    const { assets, crypto } = useCrypto()
    const [timePeriod, setTimePeriod] = useState("1w")

    const data = {
        labels: labels,
        datasets: [
            {
                fill: true,
                label: coin.name,
                data: getTimePeriodData(coin, timePeriod).number({min:0,max:1000}),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const handleTimePeriodChange  = (newTimePeriod) => {
        setTimePeriod(newTimePeriod)
    }

    return (
        <div>
            <Line options={options} data={data} />
            <div>
                <button onClick={() =>handleTimePeriodChange("1h") }>1 hour</button>
                <button onClick={() =>handleTimePeriodChange("1d")}>1 day</button>
                <button onClick={() =>handleTimePeriodChange("1w")} >1 week</button>
            </div>
        </div>

    )
}

const getTimePeriodData = (coin, timePeriod) => {
    switch(timePeriod){
        case "1h": 
        return [coin.priceChange1h]
        case "1d": 
        return [coin.priceChange1d]
        case "1w": 
        return [coin.priceChange1w]
        default:
            return []
    }
}