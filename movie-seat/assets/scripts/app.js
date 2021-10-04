const countEl = document.getElementById('count');
const costEl = document.getElementById('cost');
const selectEL = document.querySelector('select');
const options = selectEL.querySelectorAll('option');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
let selectedSeat = JSON.parse(localStorage.getItem('selectedSeat')) || [];
let selectIdx = JSON.parse(localStorage.getItem('selectIdx')) || 0;
let selectValue = JSON.parse(localStorage.getItem('selectValue')) || 10;

const loadInit = () => {
  seats.forEach((seat, index) => {
    if (selectedSeat.indexOf(index) !== -1) {
      seat.classList.add('selected');
    }
  });

  selectEL.selectedIndex = selectIdx;
  announceHandler();
};

document.addEventListener('DOMContentLoaded', loadInit);

const announceHandler = () => {
  let count = document.querySelectorAll('.row .seat.selected').length;
  let cost = count * selectEL.value;
  countEl.innerText = count;
  costEl.innerText = cost;
};
const bookHandler = function (index, e) {
  this.classList.toggle('selected');
  if (!this.classList.contains('selected')) {
    selectedSeat = selectedSeat.filter((seleted) => seleted !== index);
  } else {
    selectedSeat.push(index);
  }
  localStorage.setItem('selectedSeat', JSON.stringify(selectedSeat));
  announceHandler();
};

const changeHandler = (e) => {
  announceHandler();
  localStorage.setItem('selectIdx', JSON.stringify(e.target.selectedIndex));
};

seats.forEach((seat, index) =>
  seat.addEventListener('click', bookHandler.bind(seat, index))
);

selectEL.addEventListener('change', changeHandler);
