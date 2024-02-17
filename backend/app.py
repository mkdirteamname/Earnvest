from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_restful import Resource, Api
from pandas_datareader import data as pdr
import pandas as pd
import yfinance as yf
from datetime import datetime
from pypfopt import EfficientFrontier, risk_models, expected_returns
from pypfopt.discrete_allocation import DiscreteAllocation, get_latest_prices


app = Flask(__name__)
CORS(app)
api = Api(app)


dataset = pd.read_csv('new_stock.csv')
dataset['Ticker'] = dataset['Ticker']+'.NS'


# Function to fetch historical stock prices
def fetch_stock_prices(tickers, start_date, end_date):
    stock_data = {}
    for ticker in tickers:
        prices = yf.download(ticker, start=start_date, end=end_date)['Close']
        stock_data[ticker] = prices
    return stock_data


@app.route('/optimize_portfolio', methods=['POST'])
def optimize_portfolio():
    data = request.json
    tickers = dataset['Ticker'].tolist()
    start_date = datetime.strptime(data['start_date'], '%Y-%m-%d')
    end_date = datetime.strptime(data['end_date'], '%Y-%m-%d')

    # Fetch stock prices
    stock_prices = fetch_stock_prices(tickers, start_date, end_date)
    stock_prices_df = pd.DataFrame(stock_prices)

    # Calculate expected returns and sample covariance
    mu = expected_returns.mean_historical_return(stock_prices_df)
    S = risk_models.sample_cov(stock_prices_df)
    # Optimize portfolio for maximal Sharpe ratio
    ef = EfficientFrontier(mu, S)
    weights = ef.max_sharpe(risk_free_rate=0.05)
    cleaned_weights = ef.clean_weights()
    expected_return, volatility, sharpe_ratio = ef.portfolio_performance(risk_free_rate=0.05)
    expected_return = float(expected_return)
    volatility = float(volatility)
    sharpe_ratio = float(sharpe_ratio)

    # Allocate portfolio value
    latest_prices = get_latest_prices(stock_prices_df)
    da = DiscreteAllocation(weights, latest_prices)
    allocation, leftover = da.lp_portfolio()
    cleaned_weights = {str(key): float(value) for key, value in cleaned_weights.items()}
    allocation = {str(key): int(value) for key, value in allocation.items()}

    result = {
        'weights': cleaned_weights,
        'expected_return': expected_return,
        'volatility': volatility,
        'sharpe_ratio': sharpe_ratio,
        'allocation': allocation,
        'leftover': leftover
    }

    return result


def get_stocks(stocks):
    yf.pdr_override()
    returns = []
    end = datetime.now()
    start = datetime(end.year - 8, end.month, end.day)
    for stock in stocks:
        data = pdr.get_data_yahoo(stock, start=start, end=end)['Adj Close']
        pct_return = data.pct_change(fill_method=None)
        pct_return = pct_return.dropna()
        avg_return = pct_return.mean()
        std_dev = pct_return.std()
        risk_free_rate = 0.02
        sharpe_ratio = (avg_return - risk_free_rate) / std_dev
        returns.append(sharpe_ratio)
    return returns


class Stocks(Resource):
    def post(self):
        request_data = request.get_json()
        returns = get_stocks(request_data['stocks'])
        return returns, 200


api.add_resource(Stocks, '/stocks')


if __name__ == "__main__":
    app.run(debug=True)
