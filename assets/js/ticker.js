async function loadCrypto() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=usd&include_24hr_change=true');
    const data = await res.json();
    document.getElementById('ticker').innerHTML = `
      <span>BTC $${data.bitcoin.usd.toLocaleString()} (${data.bitcoin.usd_24h_change.toFixed(1)}%)</span>
      <span>ETH $${data.ethereum.usd.toLocaleString()} (${data.ethereum.usd_24h_change.toFixed(1)}%)</span>
      <span>SOL $${data.solana.usd.toLocaleString()} (${data.solana.usd_24h_change.toFixed(1)}%)</span>
      <span>BNB $${data.binancecoin.usd.toLocaleString()} (${data.binancecoin.usd_24h_change.toFixed(1)}%)</span>
    `;
  } catch(e) {
    document.getElementById('ticker').innerHTML = 'Crypto prices unavailable';
  }
}
loadCrypto();
setInterval(loadCrypto, 60000);
