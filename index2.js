// Функция для запуска игры
const setup = () => {
  for (let i = 0; i < Math.pow(size, 2); i++) {
  const tile = document.createElement('div');
  tile.classList.add('tile');
  board.appendChild(tile);
  }
  tiles = document.querySelectorAll('.tile');
  boardSize = Math.sqrt(tiles.length);
  board.style.width = boardSize * tileSize + 'px';
  
  document.documentElement.style.setProperty('--tileSize', `${tileSize}px`);
  document.documentElement.style.setProperty('--boardSize', `${boardSize * tileSize}px`);
  
  let x = 0;
  let y = 0;
  tiles.forEach((tile, i) => {
  // set tile coordinates
  tile.setAttribute('data-tile', `${x},${y}`);
  
  // Добавление боб
  let random_boolean = Math.random() < bombFrequency;
  if (random_boolean) {
  bombs.push(`${x},${y}`);
  if (x > 0) numbers.push(`${x-1},${y}`);
  if (x < boardSize - 1) numbers.push(`${x+1},${y}`);
  if (y > 0) numbers.push(`${x},${y-1}`);
  if (y < boardSize - 1) numbers.push(`${x},${y+1}`);
  
  if (x > 0 && y > 0) numbers.push(`${x-1},${y-1}`);
  if (x < boardSize - 1 && y < boardSize - 1) numbers.push(`${x+1},${y+1}`);
  
  if (y > 0 && x < boardSize - 1) numbers.push(`${x+1},${y-1}`);
  if (x > 0 && y < boardSize - 1) numbers.push(`${x-1},${y+1}`);
  }
  
  x++;
  if (x >= boardSize) {
  x = 0;
  y++;
  }
  
  /* Обработка правого клика мыши */
  tile.oncontextmenu = function(e) {
  e.preventDefault();
  flag(tile);
  }
  
  /* Обработка левого клика мыши */
  tile.addEventListener('click', function(e) {
  clickTile(tile);
  });
  });
  
         // Цикл для назначения чисел 
  numbers.forEach(num => {
  let coords = num.split(',');
  let tile = document.querySelectorAll(`[data-tile="${parseInt(coords[0])},${parseInt(coords[1])}"]`)[0];
  let dataNum = parseInt(tile.getAttribute('data-num'));
  if (!dataNum) dataNum = 0;
  tile.setAttribute('data-num', dataNum + 1);
  });
 }


 /* Функция для установки флага */
const flag = (tile) => {
  if (gameOver) return;
  if (!tile.classList.contains('tile--checked')) {
  if (!tile.classList.contains('tile--flagged')) {
  tile.innerHTML = '?';
  tile.classList.add('tile--flagged');
  } else {
  tile.innerHTML = '';
  tile.classList.remove('tile--flagged');
  }
  }
 }


 /* Проверка есть бомба или нет */
const clickTile = (tile) => {
  if (gameOver) return;
  if (tile.classList.contains('tile--checked') || tile.classList.contains('tile--flagged')) return;
  let coordinate = tile.getAttribute('data-tile');
         // Условие, если есть бомба
  if (bombs.includes(coordinate)) {
  endGame(tile);
  } else { // Иначе
  /* Проверка, если боба поблизости */
  let num = tile.getAttribute('data-num');
  if (num != null) {
  tile.classList.add('tile--checked');
  tile.innerHTML = num;
  tile.style.color = numberColors[num-1];
  setTimeout(() => {
  checkVictory();
  }, 100);
  return;
  }
  
  checkTile(tile, coordinate);
  }
  tile.classList.add('tile--checked');
 }


 /* функция для правильного нажатия */
const checkTile = (tile, coordinate) => {
 
  console.log('✔');
  let coords = coordinate.split(',');
  let x = parseInt(coords[0]);
  let y = parseInt(coords[1]);
  
  /* check nearby tiles */
  setTimeout(() => {
  if (x > 0) {
  let targetW = document.querySelectorAll(`[data-tile="${x-1},${y}"`)[0];
  clickTile(targetW, `${x-1},${y}`);
  }
  if (x < boardSize - 1) {
  let targetE = document.querySelectorAll(`[data-tile="${x 1},${y}"`)[0];
  clickTile(targetE, `${x 1},${y}`);
  }
  if (y > 0) {
  let targetN = document.querySelectorAll(`[data-tile="${x},${y-1}"]`)[0];
  clickTile(targetN, `${x},${y-1}`);
  }
  if (y < boardSize - 1) {
  let targetS = document.querySelectorAll(`[data-tile="${x},${y 1}"]`)[0];
  clickTile(targetS, `${x},${y 1}`);
  }
  
  if (x > 0 && y > 0) {
  let targetNW = document.querySelectorAll(`[data-tile="${x-1},${y-1}"`)[0];
  clickTile(targetNW, `${x-1},${y-1}`);
  }
  if (x < boardSize - 1 && y < boardSize - 1) {
  let targetSE = document.querySelectorAll(`[data-tile="${x 1},${y 1}"`)[0];
  clickTile(targetSE, `${x 1},${y 1}`);
  }
  
  if (y > 0 && x < boardSize - 1) {
  let targetNE = document.querySelectorAll(`[data-tile="${x 1},${y-1}"]`)[0];
  clickTile(targetNE, `${x 1},${y-1}`);
  }
  if (x > 0 && y < boardSize - 1) {
  let targetSW = document.querySelectorAll(`[data-tile="${x-1},${y 1}"`)[0];
  clickTile(targetSW, `${x-1},${y 1}`);
  }
  }, 10);
 }