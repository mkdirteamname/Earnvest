import requests
import pandas as pd
from montecarlo import MCSimulation
from flask import Flask, request
from flask_cors import CORS
from flask_restful import Resource, Api
from pandas_datareader import data as pdr
import numpy as np
import yfinance as yf
from datetime import datetime


app = Flask(__name__)
CORS(app)
api = Api(app)


def crypto_analysis(savings_amount):
    btc_url = "https://api.alternative.me/v2/ticker/Bitcoin/?convert=USD"
    eth_url = "https://api.alternative.me/v2/ticker/Ethereum/?convert=USD"

    btc_response = requests.get(btc_url).json()
    eth_response = requests.get(eth_url).json()

    btc_price = btc_response['data']['1']['quotes']['USD']['price']
    eth_price = eth_response['data']['1027']['quotes']['USD']['price']

    half_savings = savings_amount / 2
    btc_coins = half_savings / btc_price
    eth_coins = half_savings / eth_price

    btc_df = pd.read_csv(('./Resources/Bitcoin Historical Data.csv'),
                    index_col="Date", parse_dates=True, infer_datetime_format=True)
    btc_df.loc[:,"Price"]=btc_df.loc[:,"Price"].str.replace(",","")
    btc_df.loc[:,"Price"]=btc_df.loc[:,"Price"].astype("float")

    btc_df.loc[:,"Open"]=btc_df.loc[:,"Open"].str.replace(",","")
    btc_df.loc[:,"Open"]=btc_df.loc[:,"Open"].astype("float")

    btc_df.loc[:,"High"]=btc_df.loc[:,"High"].str.replace(",","")
    btc_df.loc[:,"High"]=btc_df.loc[:,"High"].astype("float")

    btc_df.loc[:,"Low"]=btc_df.loc[:,"Low"].str.replace(",","")
    btc_df.loc[:,"Low"]=btc_df.loc[:,"Low"].astype("float")

    btc_df = btc_df.drop(columns=["Change %"])

    def clean_currency(price_string):
        price = price_string
        if type(price_string) == str:
            price_string = price_string.replace('$', '')
            price_string = price_string.replace('-', '0')
            if price_string[-1] == 'K':
                thousand = 1000
                price_string = price_string.replace('K', '')
                price = float(price_string)
                price = price * thousand
            elif price_string[-1] == 'M':
                million = 1000000
                price_string = price_string.replace('M', '')
                price = float(price_string)
                price = price * million
            else:
                billion = 1000000000
                price_string = price_string.replace('B', '')
                price = float(price_string)
                price = price * billion
        return price

    btc_df['Vol.'] = btc_df['Vol.'].apply(clean_currency)
    btc_df2 = btc_df[['Open', 'High', 'Low', 'Price', 'Vol.']]
    columns = ["open", "high"," low", "close", "volume"]
    btc_df2.columns = columns

    eth_df = pd.read_csv(('./Resources/Ethereum Historical Data.csv'),
                    index_col="Date", parse_dates=True, infer_datetime_format=True)
    eth_df = eth_df.drop(columns=["Change %"])

    eth_df['Vol.'] = eth_df['Vol.'].apply(clean_currency)

    eth_df.loc[:, "Price"] = eth_df.loc[:, "Price"].str.replace(",", "")
    eth_df.loc[:, "Price"] = eth_df.loc[:, "Price"].astype("float")

    eth_df.loc[:,"Open"]=eth_df.loc[:,"Open"].str.replace(",","")
    eth_df.loc[:,"Open"]=eth_df.loc[:,"Open"].astype("float")

    eth_df.loc[:,"High"]=eth_df.loc[:,"High"].str.replace(",","")
    eth_df.loc[:,"High"]=eth_df.loc[:,"High"].astype("float")

    eth_df.loc[:,"Low"]=eth_df.loc[:,"Low"].str.replace(",","")
    eth_df.loc[:,"Low"]=eth_df.loc[:,"Low"].astype("float")

    eth_df2 = eth_df[['Open', 'High', 'Low', 'Price', 'Vol.']]
    columns = ["open", "high"," low", "close", "volume"]
    eth_df2.columns = columns

    to_merge_dict = {'BTC': btc_df2, 'ETH': eth_df2}
    merged_df = pd.concat(to_merge_dict.values(), axis=1, keys=to_merge_dict.keys())

    MC_crypto = MCSimulation(
        portfolio_data=merged_df,
        weights=[.5, .5],
        num_simulation=210,
        num_trading_days=252*5
    )

    MC_summary_statistics, ci_Series = MC_crypto.summarize_cumulative_return()

    ci_lower_cumulative_return = ci_Series.iloc[0]*savings_amount
    ci_upper_cumulative_return = ci_Series.iloc[1]*savings_amount
    print(f"There is a 95% chance that your investment over the next 5 years will end within in the range of ${ci_lower_cumulative_return:,.2f} and ${ci_upper_cumulative_return:,.2f}.")
    return ci_lower_cumulative_return, ci_upper_cumulative_return


def stock_analysis(initial_investment, risk_tolerance):
    yf.pdr_override()
    initial_investment = int(initial_investment)
    risk_tolerance = float(risk_tolerance)
    stocks = ['AAPL', 'GOOG', 'MSFT', 'AMZN', 'TSLA', 'NVDA']
    end = datetime.now()
    start = datetime(end.year - 1, end.month, end.day)
    stocks_df = pdr.get_data_yahoo(stocks, start=start, end=end)['Adj Close']
    tech_returns = stocks_df.pct_change(fill_method=None)
    tech_returns = tech_returns.dropna()
    expected_returns = tech_returns.mean()
    print(expected_returns)
    n = len(stocks)
    allocation = [1 / n for i in range(n)]
    portfolio_expected_return = np.dot(allocation, expected_returns)
    print(portfolio_expected_return)
    final_amounts = initial_investment * (1 + portfolio_expected_return) ** 12
    return final_amounts


class Crypto(Resource):
    def post(self):
        request_data = request.get_json()
        savings_amount = request_data["savings_amount"]
        ci_lower_cumulative_return, ci_upper_cumulative_return = crypto_analysis(savings_amount)
        return {
            "ci_lower_cumulative_return": ci_lower_cumulative_return,
            "ci_upper_cumulative_return": ci_upper_cumulative_return
        }


class Stocks(Resource):
    def post(self):
        request_data = request.get_json()
        initial_investment = request_data["initial_investment"]
        risk_tolerance = request_data["risk_tolerance"]
        final_amount = stock_analysis(initial_investment, risk_tolerance)
        return {
            "final_amounts": final_amount
        }


api.add_resource(Stocks, "/stocks")
api.add_resource(Crypto, "/crypto")


if __name__ == "__main__":
    app.run(debug=True)