// 1. Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"

function reverseAlphabet(str) {
  let letters = "";
  let numbers = "";

  // Pisahkan huruf dan angka
  for (let char of str) {
    if (isNaN(char)) {
      letters = char + letters;
    } else {
      numbers += char;
    }
  }

  return letters + numbers;
}

console.log(reverseAlphabet("NEGIE1"));
