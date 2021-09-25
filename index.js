/**
 * Desafio: escrever uma função que valide a solução de um jogo de Sudoku.
 * A função irá receber um array bi-dimensional (NxN) com inteiros de 1 a N, e deve retornar um booleano informando se o preenchimento está correto.
 *
 * Exemplo de um valor de entrada:
 * [
 *   [7,8,4,  1,5,9,  3,2,6],
 *   [5,3,9,  6,7,2,  8,4,1],
 *   [6,1,2,  4,3,8,  7,5,9],
 *
 *   [9,2,8,  7,1,5,  4,6,3],
 *   [3,5,7,  8,4,6,  1,9,2],
 *   [4,6,1,  9,2,3,  5,8,7],
 *
 *   [8,7,6,  3,9,4,  2,1,5],
 *   [2,4,3,  5,6,1,  9,7,8],
 *   [1,9,5,  2,8,7,  6,3,4]
 * ]
 *
 * Para maiores informações sobre Sudoku:
 * https://pt.wikipedia.org/wiki/Sudoku
 *
 * Voce pode testar o seu codigo rodando o comando `npm test` no terminal
 * e tambem pode alterar o arquivo `index.test.js` se desejar.
 * Apos enviado, seu codigo sera validado com outros cenarios de teste tambem.
 *
 * @param array array bidimensional de inteiros
 * @returns `true` ou `false`, informando se o preenchimento está correto
 */
function sudoku(array) {
  return check(array);
}

function check(matrix) {
  const horizontal = validateHorizontal(matrix);
  const vertical = validateHorizontal(transpose(matrix));
  //let blocks = checkBlocks(matrix) //'
  const blocks = testBlocks(divideBlocks(matrix, matrix.length));
  return horizontal && vertical && blocks;
}

function transpose(matrix) {
  //Transforma a vertical na horizontal da matriz
  return matrix[0].map((col, i) => matrix.map((row) => row[i]));
}

function validateHorizontal(matrix) {
  let val = true;
  //Checa linha horizontal por números repetidos
  matrix.map((arr) => {
    new Set(arr).size !== arr.length ? (val = false) : '';
  });
  return val;
}

function divideBlocks(matrix, size) {
  //Cria uma array para dividir os blocos e ir para validação
  const blocks = Array(size).fill([]);
  let blockIndex = 0;
  //If para tamanhos diferentes de tabuleiros
  if (size === 9) {
    matrix.map((num, i) => {
      let index = Math.floor(i / 3);
      //Divide todo o tabuleiro em blocos de 3x3 para validação
      blocks[index] = [...blocks[index], ...matrix[i].slice(0, 3)];
      blocks[index + 3] = [...blocks[index + 3], ...matrix[i].slice(3, 6)];
      blocks[index + 6] = [...blocks[index + 6], ...matrix[i].slice(6, 9)];
    });
  } else if (size === 4) {
    matrix.map((num, i) => {
      //Divide todo o tabuleiro em blocos de 2x2 para validação
      let index = Math.floor(i / 2);
      blocks[index] = [...blocks[index], ...matrix[i].slice(0, 2)];
      blocks[index + 2] = [...blocks[index + 2], ...matrix[i].slice(2, 4)];
    });
  }
  return blocks;
}

function testBlocks(array) {
  //Testa se cada um dos blocos possuem números únicos
  let val = true;
  for (let i = 0; i < array.length; i++) {
    new Set(array[i]).size !== array[i].length ? (val = false) : '';
  }
  return val;
}

function isASet(array) {
  //Cria uma array com valores únicos para verificar se existem números repetidos
  const copy = new Set(array);
  if (copy.size == array.length) {
    return true;
  }
  return false;
}

module.exports = sudoku;
