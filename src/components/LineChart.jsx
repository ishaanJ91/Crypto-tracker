import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Filler, CategoryScale, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(LinearScale, TimeScale, CategoryScale, PointElement, Filler, LineElement, Tooltip);

const LineChart = ({ coinHistory, currentPrice, coinName, timePeriod }) => {
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

  const lowestPrice = Math.min(...coinPrice);
  const highestPrice = Math.max(...coinPrice);
  const averagePrice = coinPrice.length ? (totalPrice / coinPrice.length) : 0;

  const timeUnit = {
    '3h': 'hour',
    '24h': 'hour',
    '7d': 'day',
    '30d': 'day',
    '3m': 'month',
    '1y': 'month',
    '3y': 'month',
    '5y': 'year',
    'all': 'year'
  }[timePeriod] || 'day';

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

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 600);
          gradient.addColorStop(0, 'rgba(0, 113, 189, 0.5)');
          gradient.addColorStop(1, 'rgba(0, 113, 189, 0)');
          return gradient;
        },
        borderColor: '#0071bd',
        tension: 0.4,
        pointRadius: 0, // Hide the point
        pointHoverRadius: 0, // Hide the hover point
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          callback: (value) => `$${formatNumber(value)}`,
          font: {
            size: 12,
            weight: '500',
          },
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
      },
      x: {
        type: 'time',
        time: {
          unit: timeUnit,
          displayFormats: timeDisplayFormats[timeUnit],
          tooltipFormat: timeDisplayFormats[timeUnit].tooltipFormat,
        },
        ticks: {
          font: {
            size: 12,
            weight: '500',
          },
          maxRotation: 0,
          autoSkip: true,
        },
        grid: {
          display: false,
        },
      },
    },

    plugins: {
      tooltip: {
        padding: {
          left: 50,
          right: 0,
          top: 10,
          bottom: 10,
        },
        enabled: true,
        caretPadding: 10,
        yAlign: 'bottom',
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
          size: 17,
          weight: 700,
          color: '#3b567f',
          family: 'Nunito, sans-serif',
        },
        bodyFont: {
          size: 12,
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
      intersect: false,
    },
  };

  if (!coinPrice.length || !coinTimestamp.length) {
    return <div>No data available to display the chart</div>;
  }

  return (
    <>
      <div className="chart-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className='info-graph'>
          <div className="price-container">
            <h5 className="price-change">Price Chart</h5>
          </div>
          <div className='price-stats'>
            <div className='time-history'>
              <p>{timePeriod}</p>
              <p className={`change history ${coinHistory?.data?.change < 0 ? 'negative' : 'positive'}`}> {coinHistory?.data.change > 0 ? '+' : ''}{formatNumber(coinHistory?.data?.change)}%  </p>
            </div>
            <div className='price-range-info'>
              <p>Low</p>
              <p><b>${formatNumber(lowestPrice)}</b></p>
            </div>
            <div className='price-range-info'>
              <p>High</p>
              <p><b>${formatNumber(highestPrice)}</b></p>
            </div>
            <div className='price-range-info'>
              <p>Average</p>
              <p><b>${formatNumber(averagePrice)}</b></p>
            </div>
          </div>
        </div>
        <Line className='chart-container' data={data} options={options} />
      </div>
    </>
  );
};

export default LineChart;
