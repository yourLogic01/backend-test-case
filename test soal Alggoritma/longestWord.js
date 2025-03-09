// 2. Diberikan contoh sebuah kalimat, silahkan cari kata terpanjang dari kalimat tersebut, jika ada kata dengan panjang yang sama silahkan ambil salah satu
// Contoh:
// const sentence = "Saya sangat senang mengerjakan soal algoritma"
// longest(sentence)
// mengerjakan: 11 character

function longestWord(sentence) {
  const words = sentence.split(" "); // split kalimat jadikan array kata
  let longest = ""; // siapkan variabel untuk menyimpan kata terpanjang

  for (let i = 0; i < words.length; i++) {
    // cek setiap kata apakah lebih panjang dari kata terpanjang
    if (words[i].length > longest.length) {
      longest = words[i]; // simpan kata terpanjang
    }
  }

  return longest + ": " + longest.length + " character";
}

console.log(longestWord("Saya sangat senang mengerjakan soal algoritma"));
