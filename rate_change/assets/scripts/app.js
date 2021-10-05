// api: https://open.er-api.com/v6/latest/USD
const currentEl = document.getElementById('current');
const exchangeEl = document.getElementById('exchange');
const amountStart = document.getElementById('amount-start');
const amountEnd = document.getElementById('amount-end');
const rate = document.querySelector('.rate');
const swapBtn = document.querySelector('.btn');

let result;

const loadApi = async (currentOne = 'USD') => {
  try {
    let api = `https://open.er-api.com/v6/latest/${currentOne}`;

    const response = await fetch(api);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
const initApp = async () => {
  result = await loadApi();
  let tempEl = '';
  for (key in result.rates) {
    tempEl += `<option value="${key}">${key}</option>`;
  }
  currentEl.innerHTML = tempEl;
  exchangeEl.innerHTML = tempEl;

  rate.innerHTML = `1 USD = ${result.rates['EUR']} EUR`;
  exchangeEl.value = 'EUR';
  amountEnd.value = result.rates['EUR'].toFixed(2);
};

initApp();

const updateRate = async (swap) => {
  if (swap) {
    const tempIdx = currentEl.value;
    currentEl.value = exchangeEl.value;
    exchangeEl.value = tempIdx;
  }
  result = await loadApi(currentEl.value);
  const rateCal = result.rates[exchangeEl.value];

  rate.innerHTML = `1 ${currentEl.value} = ${rateCal.toFixed(4)} ${
    exchangeEl.value
  }`;

  amountEnd.value = (rateCal * amountStart.value).toFixed(2);
};

currentEl.addEventListener('change', updateRate.bind(null, false));
exchangeEl.addEventListener('change', updateRate.bind(null, false));
amountStart.addEventListener('change', updateRate.bind(null, false));
swapBtn.addEventListener('click', updateRate.bind(null, true));
