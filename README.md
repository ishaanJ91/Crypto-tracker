# 🚀 [Crypto Tracker](https://ishaanj91.github.io/Crypto-tracker/)

Crypto Tracker is a web application that allows users to view cryptocurrency details, compare different cryptocurrencies, and track their historical data. The application uses two APIs to fetch data:

1. **CoinRanking API**: For retrieving cryptocurrency details and historical data.
2. **NewsAPI**: For fetching the latest news related to cryptocurrencies (please note that this feature requires a paid plan, so it may not work on the hosted version. A screenshot demonstrating this functionality is provided).

You can explore the project [here](https://ishaanj91.github.io/Crypto-tracker/).

<br>

## 📑 Table of Contents
- [📃 Project Overview](#project-overview)
- [🔗 APIs Used](#apis-used)
  - [🔍 CoinRanking API](#coinranking-api)
  - [📰 NewsAPI](#newsapi)
- [🌟 Features](#features)
- [⚙️ Installation](#installation)
- [💻 Usage](#usage)
- [🤝 Contributing](#contributing)


<br>

## 📃 Project Overview

Crypto Tracker provides a comprehensive view of the cryptocurrency market. Users can:
- **View Data History**: Track the historical price data of any cryptocurrency.
- **Compare Cryptocurrencies**: Compare the performance of multiple cryptocurrencies side-by-side.
- **See Graphs**: Visualize cryptocurrency data with interactive charts.
- **View Top 100 Cryptocurrencies**: Get a list of the top 100 cryptocurrencies by market cap.

<br>


## 🔗 APIs Used

### CoinRanking API
The CoinRanking API is used to fetch:
- **Cryptocurrency Details**: Information about different cryptocurrencies.
- **Historical Data**: Price history for cryptocurrencies over time.

**API Details:**
- **Endpoint:** `/coin/{coin_id}/history`
- **API Documentation:** [CoinRanking API](https://coinranking.com/api)

### NewsAPI
The NewsAPI is used to fetch the latest news articles related to cryptocurrencies. This feature requires a paid plan, so it does not work on the hosted version.

**API Details:**
- **Endpoint:** `/v2/everything?q=cryptocurrency`
- **API Documentation:** [NewsAPI](https://newsapi.org/docs/endpoints/everything)

<br>

## 🌟 Features

- **Data History**: View historical price data for a selected cryptocurrency.
- **Comparison**: Compare the prices and performance of different cryptocurrencies.
- **Graphs**: Visualize historical data with interactive charts.
- **Top 100 Cryptos**: Display a list of the top 100 cryptocurrencies by market capitalization.

<br>

## ⚙️ Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/crypto-tracker.git
   cd crypto-tracker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your API keys:
   ```env
   COINRANKING_API_KEY=your_coinranking_api_key
   NEWS_API_KEY=your_news_api_key
   ```

4. **Run the application**:
   ```bash
   npm start
   ```

<br>

## 💻 Usage

1. Open the application in your browser:
   ```bash
   http://localhost:3000
   ```

2. Use the interface to:
   - View historical data by selecting a cryptocurrency.
   - Compare cryptocurrencies by adding them to the comparison view.
   - View graphs and historical data charts.
   - Check out the top 100 cryptocurrencies.

<br>

## 🤝 Contributing

Contributions are welcome! If you have suggestions or improvements, please feel free to:
- Open an issue
- Submit a pull request

Thank you for checking out Crypto Tracker!
