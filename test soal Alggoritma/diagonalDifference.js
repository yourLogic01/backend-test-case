// 4. Silahkan cari hasil dari pengurangan dari jumlah diagonal sebuah matrik NxN Contoh:
// Contoh:
// Matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]
// diagonal pertama = 1 + 5 + 9 = 15
// diagonal kedua = 0 + 5 + 7 = 12
// maka hasilnya adalah 15 - 12 = 3
function diagonalDifference(matrix) {
  let primaryDiagonal = 0,
    secondaryDiagonal = 0;
  let n = matrix.length;

  for (let i = 0; i < n; i++) {
    primaryDiagonal += matrix[i][i];
    secondaryDiagonal += matrix[i][n - 1 - i];
  }

  return Math.abs(primaryDiagonal - secondaryDiagonal);
}

const Matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(diagonalDifference(Matrix));
