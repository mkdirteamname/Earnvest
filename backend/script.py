import pandas as pd
import yfinance as yf
import datetime

df = pd.read_csv('new_stock.csv')
df.head()
# df['Ticker'] = df['Ticker']+'.NS'

start = '2023-01-01'
end = '2023-01-01'

closing_prices = []
stocks = df['Ticker']
for i in range(len(stocks)):
    closing_prices[i] = yf.download(stocks[i], start, end)['Adj Close']

print(closing_prices)
