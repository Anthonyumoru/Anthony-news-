async function loadPrices() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,bitcoin-cash,litecoin,ripple&vs_currencies=usd&include_24hr_change=true');
    const data = await res.json();
    const coins = [{id: 'bitcoin', symbol: 'BTCUSD'},{id: 'ethereum', symbol: 'ETHUSD'},{id: 'bitcoin-cash', symbol: 'BCHUSD'},{id: 'litecoin', symbol: 'LTCUSD'},{id: 'ripple', symbol: 'XRPUSD'}];
    const html = coins.map(c => {
      const price = data[c.id].usd.toLocaleString();
      const change = data[c.id].usd_24h_change.toFixed(2);
      const cls = change >= 0 ? 'up' : 'down';
      const sign = change >= 0 ? '+' : '';
      return `<div class="ticker-item ${cls}"><strong>${c.symbol}</strong> $${price} <span>${sign}${change}%</span></div>`;
    }).join('');
    document.getElementById('price-ticker').innerHTML = html;
  } catch (e) {
    document.getElementById('price-ticker').innerHTML = '<div class="ticker-item">Prices unavailable</div>';
  }
}
loadPrices(); setInterval(loadPrices, 60000);
