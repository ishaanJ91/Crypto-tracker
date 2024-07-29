import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Filler, CategoryScale, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { useRef } from 'react';

ChartJS.register(LinearScale, TimeScale, CategoryScale, PointElement, Filler, LineElement, Tooltip);

const LineChartComp = ({ coinHistory1, coinHistory2, coinName1, coinName2, timePeriod }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const chartRef = useRef(null);


  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  }, [width, coinHistory1, coinHistory2]); 

  const processData = (coinHistory1, coinHistory2) => {
    const coinPrice1 = [];
    const coinPrice2 = [];
    const coinTimestamp1 = [];
    const coinTimestamp2 = [];

    if (coinHistory1?.data?.history && coinHistory2?.data?.history) {
      for (let i = 0; i < coinHistory1.data.history.length; i += 1) {
        const price1 = parseFloat(coinHistory1.data.history[i].price);
        if (price1 > 0) {
          coinPrice1.push(price1);
          coinTimestamp1.push(new Date(coinHistory1.data.history[i].timestamp * 1000));
        }
      }
      for (let i = 0; i < coinHistory2.data.history.length; i += 1) {
        const price2 = parseFloat(coinHistory2.data.history[i].price);
        if (price2 > 0) {
          coinPrice2.push(price2);
          coinTimestamp2.push(new Date(coinHistory2.data.history[i].timestamp * 1000));
        }
      }
    }
    return { coinPrice1, coinPrice2, coinTimestamp1, coinTimestamp2 };
  };

  const { coinPrice1, coinPrice2, coinTimestamp1, coinTimestamp2 } = processData(coinHistory1, coinHistory2);

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const timeUnit = {
    '24h': 'day',
    '7d': 'day',
    '30d': 'week',
    '3m': 'month',
    '1y': 'month',
    '5y': 'year',
  }[timePeriod] || 'day';


  const timeDisplayFormats = {
    hour: {
      hour: 'HH:mm',
      tooltipFormat: 'dd MMM yyyy HH:mm'
    },
    day: {
      day: 'MMM dd',
      tooltipFormat: 'MMM dd, yyyy'
    },
    week :{
      day: 'MMM dd',
      tooltipFormat: 'MMM dd'
    },
    month: {
      month: 'MMM',
      tooltipFormat: 'MMM yyyy'
    },
    year: {
      year: 'yyyy',
      tooltipFormat: 'yyyy'
    }
  };

  const data = {
    labels: coinTimestamp1.length > coinTimestamp2.length ? coinTimestamp1 : coinTimestamp2,
    datasets: [
      {
        label: `${coinName1} Price In USD`,
        data: coinPrice1,
        yAxisID: 'y',
        fill: false,
        borderColor: '#2d7aff',
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointBackgroundColor: '#000',
        pointBorderColor: '#2d7aff',
      },
      {
        label: `${coinName2} Price In USD`,
        data: coinPrice2,
        yAxisID: 'y1',
        fill: false,
        borderColor: '#767587',
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointBackgroundColor: '#000',
        pointBorderColor: '#767587',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        display: false,
        ticks: {
          font: {
            size: 12,
            weight: '500',
          },
        },
      },
      x: {
        display: true,
        type: 'time',
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          font: {
            size: 10.5,
          }
        }
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        caretPadding: 10,
        yAlign: 'top',
        backgroundColor: '#000',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#000',
        borderWidth: 0.5,
        alignItems: 'center',
        titleAlign: 'center',
        footerAlign: 'center',
        bodyAlign: 'center',
        fontFamily: 'Monsterrat',
        titleFont: {
          size: 13,
          weight: 700,
          color: '#3b567f',
          family: 'Nunito, sans-serif',
        },
        bodyFont: {
          size: 9,
          weight: 'normal',
          color: '#000',
          family: 'Nunito, sans-serif',
        },
        callbacks: {
          label: () => '',
          title: (context) => `$${formatNumber(context[0].raw.toFixed(2))}`,
          beforeBody: (context) => {
            const date = new Date(context[0].parsed.x);
            return date.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' });
          },
        },
        displayColors: false,
      },
      legend: {
        display: false,
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'index',
      intersect: true,
    },
    animation: {
      onComplete: function () {
        const chart = this;
        const ctx = chart.ctx;
        const activePoints = chart.tooltip && chart.tooltip._active;
        if (activePoints && activePoints.length) {
          activePoints.forEach(function (point) {
            const x = point.element.x;
            const y = point.element.y;
            const radius = 5;
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = '#000';
            ctx.fill();
            ctx.restore();
          });
        }
      },
    },
  };
  

  if (!coinPrice1.length || !coinTimestamp1.length || !coinPrice2.length || !coinTimestamp2.length) {
    return <div>No data available to display the chart</div>;
  }

  return (
    <>
      <div className="chart-header-compare" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Line className='chart-container-compare' data={data} options={options} />
      </div>
    </>
  );
};

export default LineChartComp;
