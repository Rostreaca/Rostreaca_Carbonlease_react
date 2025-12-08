import {
    ArcElement,
    Chart as ChartJS,
    Legend,
    Tooltip
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Doughnut } from 'react-chartjs-2';
import {
    ChartCard,
    ChartInner,
    ChartTitle,
    ChartWrap,
    LegendColor,
    LegendItem,
    LegendLabel,
    LegendRow
} from './DoughnutChart/DoughnutChart.styled';
import { useEffect, useState } from 'react';
import { getUsersAllBoardsCount } from '../../../api/dashboard/adminDashBoard';
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const options = {
    responsive: true,
    cutout: '80%',
    plugins: {
        legend: {
            display: false
        },
        datalabels: {
            color: '#fff',
            font: { size: 12, weight: 'bold' },
            formatter: (value) => value
        },
        tooltip: {
            callbacks: {
                label: function(context) {
                    return `${context.label}: ${context.parsed} counts`;
                }
            }
        }
    }
};

function convertStatsToChartData(stats) {
    return stats.map(item => {
        const labels = [];
        const data = [];
        const backgroundColor = [];

        if (item.TOTAL_CNT > 0) {
            labels.push('정상');
            data.push(item.TOTAL_CNT);
            backgroundColor.push('#9ac6a5ff');
        }
        if (item.HIDDEN_CNT > 0) {
            labels.push('숨김');
            data.push(item.HIDDEN_CNT);
            backgroundColor.push('#ff6f61');
        }
        if (item.COMMENT_CNT !== undefined && item.COMMENT_CNT !== null && item.COMMENT_CNT > 0) {
            labels.push('댓글');
            data.push(item.COMMENT_CNT);
            backgroundColor.push('#8bb0e8ff');
        }
        if (item.LIKE_CNT !== undefined && item.LIKE_CNT !== null && item.LIKE_CNT > 0) {
            labels.push('좋아요');
            data.push(item.LIKE_CNT);
            backgroundColor.push('#f6e393ff');
        }

        let title = item.BOARD_TYPE;
        if (title) {
            title = title.charAt(0).toUpperCase() + title.slice(1);
        }

        return {
            title,
            data: {
                labels,
                datasets: [
                    {
                        data,
                        backgroundColor,
                        borderWidth: 0
                    }
                ]
            }
        };
    });
}

const DoughnutChart = () => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUsersAllBoardsCount()
            .then(res => {
                const stats = res.data;
                setChartData(convertStatsToChartData(stats));
                setLoading(false);
            })
            .catch(() => {
                setError('데이터를 불러오지 못했습니다.');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>로딩중...</div>;
    if (error) return <div>{error}</div>;

    return (
        <ChartWrap>
            {chartData.map(cfg => (
                <ChartCard key={cfg.title}>
                    <ChartTitle>{cfg.title}</ChartTitle>
                    <ChartInner>
                        <Doughnut data={cfg.data} options={options} />
                        <LegendRow>
                            {cfg.data.labels.map((label, i) => (
                                <LegendItem key={label}>
                                    <LegendColor style={{ background: cfg.data.datasets[0].backgroundColor[i] }} />
                                    <LegendLabel>{label}</LegendLabel>
                                </LegendItem>
                            ))}
                        </LegendRow>
                    </ChartInner>
                </ChartCard>
            ))}
        </ChartWrap>
    );
};

export default DoughnutChart;
