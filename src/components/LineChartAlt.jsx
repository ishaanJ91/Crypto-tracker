import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Filler, CategoryScale, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';

import { useState, useEffect } from 'react';

ChartJS.register(LinearScale, TimeScale, CategoryScale, PointElement, Filler, LineElement, Tooltip);

const LineChartAlt = ({ coinHistory, currentPrice, coinName, timePeriod, cryptoDetails1, cryptoDetails2 }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const coinPrice = [];
  const coinTimestamp = [];
  let totalPrice = 0;

  if (coinHistory?.data?.history) {
    for (let i = 0; i < coinHistory.data.history.length; i += 1) {
      const price = parseFloat(coinHistory.data.history[i].price);
      if (price > 0) {
        coinPrice.push(price);
        coinTimestamp.push(new Date(coinHistory.data.history[i].timestamp * 1000));
      }
    }
  }

  for (let i = 0; i < coinPrice.length; i += 1) {
    totalPrice += coinPrice[i];
  }

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const timeUnit = {
    '3h': 'hour',
    '24h': 'day',
    '7d': 'day',
    '30d': 'day',
    '3m': 'month',
    '1y': 'month',
    '3y': 'month',
    '5y': 'year',
    'all': 'year'
  }[timePeriod] || 'day';

  console.log("coinHistory12:", coinHistory);
    console.log("coinPrice13:", coinPrice);
    console.log("coinTimestamp23:", coinTimestamp);

  const timeDisplayFormats = {
    hour: {
      hour: 'HH:mm',
      tooltipFormat: 'MMM dd, yyyy HH:mm'
    },
    day: {
      day: 'MMM dd',
      tooltipFormat: 'MMM dd, yyyy'
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

  const isPositiveChange1 = cryptoDetails1?.change > 0;
  const isPositiveChange2 = cryptoDetails2?.change > 0;


  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);

          if (isPositiveChange1 || isPositiveChange2) {
            gradient.addColorStop(0, 'rgba(71, 146, 81, 0.3)');
            gradient.addColorStop(1, 'rgba(71, 146, 81, 0)');
            
          } else if (!isPositiveChange1 || !isPositiveChange2) {
            gradient.addColorStop(0, 'rgba(249, 66, 65, 0.2)');
            gradient.addColorStop(1, 'rgba(249, 66, 65, 0)');
          }
          return gradient;
        },

        borderColor: (context) => {
            return isPositiveChange1 || isPositiveChange2 ? '#479251' : '#f94241';
        },
        borderWidth: 1.6,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  };

  const options = {
    scales: {
      y : {
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
          title: (context) => `$${formatNumber(context[0].raw.toFixed(2))}`, // Display price as title
          beforeBody: (context) => {
            const date = new Date(context[0].parsed.x);
            return date.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' });
          },
        },
        displayColors: false, // Remove the blue square
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
  };

  if (!coinPrice.length || !coinTimestamp.length) {
    return <div>No data available to display the chart</div>;
  }

  return (
    <>
      <div className="chart-header-compare" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Line className='chart-container-compare'  data={data} options={options} />
      </div>
    </>
  );
};

export default LineChartAlt;
