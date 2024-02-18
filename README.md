# Investment Portfolio Management System

## Overview
Managing an investment portfolio effectively requires a balance between risk and return. In the evolving landscape of financial technology, there is a growing demand for automated solutions that can provide users with intelligent portfolio management services. Our Investment Portfolio Management System aims to address this demand by offering a comprehensive and user-friendly platform for managing investment portfolios.

## Technology Stack
- **Frontend:** Next.js
- **Backend:** Firebase, Flask (for integrating an ML model), Node.js
- **Data Integration:** Yahoo Finance (yfinance API) for real-time stock price data

## Key Features Implemented
1) **Historical Market Data Integration**:
   - Ingest and process historical market data from various financial instruments and markets.
   - Accommodate a wide range of data frequencies (e.g., tick, minute, daily) and time periods.
   - Display data on an attractive dashboard for intuitive insights.

2) **Data Visualization and Stock Graphs**:
   - Integrate interactive stock graphs for visualizing historical performance.
   - Provide insights into individual securities and overall portfolio performance.

3) **Real-time Market Alerts**:
   - Display articles related to current financial scenarios and portfolios for a relevant news feed.

4) **Dynamic Portfolio Rebalancing**:
   - Develop algorithms for creating diversified portfolios.
   - Include various asset classes, such as stocks, bonds, and possibly alternative investments.
   - Enable automatic rebalancing based on market conditions, economic indicators, or predefined rules.

5) **Real-time Chatbot (StockSage)**:
   - Deployed on Streamlit, StockSage provides real-time graph plotting capabilities for enhanced portfolio monitoring and analysis.

## Bonus Features
Incorporated behavioral finance principles to assist users in making more rational decisions, especially during market volatility. Utilized a quiz to assess the user's risk appetite, providing nudges, educational content, or simulations to demonstrate the impact of emotional decision-making. Additionally, included supporting YouTube videos for investor education.

## Challenges Faced
- Poor documentation and deprecated use cases of various brokerage platform APIs that we were trying to fetch user data from, leading us to create a sample dataset for testing our optimization algorithm.
- Frontend integration with various backends was challenging.
- Finding a suitable optimization algorithm and converting it into a usable Flask app.
- Firebase integration at the beginning was difficult but eventually figured out.

## Future Enhancements
- **Automated Trading**: Implement a trading bot using algorithmic strategies to automate trades based on predefined rules and market conditions.
- **Risk Management Features**: Incorporate risk management tools and strategies into the trading bot to minimize potential losses.
- **Backtesting and Optimization**: Develop tools for backtesting trading strategies and optimizing them for better performance.
- **Real-time Monitoring and Alerts**: Enable real-time monitoring of trades and provide alerts for significant market events or changes in the portfolio.
- **Integration with Exchanges**: Integrate the trading bot with various exchanges to execute trades seamlessly across multiple markets.
