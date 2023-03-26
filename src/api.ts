const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
  const response = await fetch(`${BASE_URL}/coins`);
  return await response.json();
}

export async function fetchCoinInfo(coinId: string) {
  const response = await fetch(`${BASE_URL}/coins/${coinId}`);
  return await response.json();
}

export async function fetchCoinTickers(coinId: string) {
  const response = await fetch(`${BASE_URL}/tickers/${coinId}`);
  return await response.json();
}

export async function fetchCoinHistory(coinId: string) {
  const response = await fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
  );
  return await response.json();
}
