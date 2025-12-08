import { useEffect, useState } from 'react';
import { getUsersAllBoardsCount } from '../../../api/dashboard/adminDashBoard';

function convertStatsToChartData(stats) {
    return stats.map(item => {
        const labels = [];
        const data = [];
        const backgroundColor = [];

        if (item.total_cnt > 0) {
            labels.push('정상');
            data.push(item.total_cnt);
            backgroundColor.push('#9ac6a5ff');
        }
        if (item.hidden_cnt > 0) {
            labels.push('숨김');
            data.push(item.hidden_cnt);
            backgroundColor.push('#ff6f61');
        }
        if (item.comment_cnt !== undefined && item.comment_cnt !== null && item.comment_cnt > 0) {
            labels.push('댓글');
            data.push(item.comment_cnt);
            backgroundColor.push('#8bb0e8ff');
        }
        if (item.like_cnt !== undefined && item.like_cnt !== null && item.like_cnt > 0) {
            labels.push('좋아요');
            data.push(item.like_cnt);
            backgroundColor.push('#f6e393ff');
        }

        let title = item.board_type;
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

const useDoughnutChart = (onShowToast) => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getChartData = () => {
        setLoading(true);
        getUsersAllBoardsCount()
            .then(res => {
                const stats = res.data;
                setChartData(convertStatsToChartData(stats));
            })
            .catch(() => {
                setError('도넛 차트 데이터 조회 실패');
                if (onShowToast) {
                    onShowToast('도넛 차트 데이터 조회 실패', 'error');
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getChartData();
        // eslint-disable-next-line
    }, []);

    return {
        chartData,
        loading,
        error,
        getChartData,
    };
};

export default useDoughnutChart;
