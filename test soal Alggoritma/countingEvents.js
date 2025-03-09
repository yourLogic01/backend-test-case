// 3. Terdapat dua buah array yaitu array INPUT dan array QUERY, silahkan tentukan berapa kali kata dalam QUERY terdapat pada array INPUT
// Contoh:
// INPUT = ['xc', 'dz', 'bbb', 'dz']
// QUERY = ['bbb', 'ac', 'dz']
// OUTPUT = [1, 0, 2] karena kata 'bbb' terdapat 1 pada INPUT, kata 'ac' tidak ada pada INPUT, dan kata 'dz' terdapat 2 pada INPUT

function countingEvents(input, query) {
  return query.map((q) => {
    let count = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === q) {
        count++;
      }
    }
    return count;
  });
}

const INPUT = ["xc", "dz", "bbb", "dz"];
const QUERY = ["bbb", "ac", "dz"];

console.log(countingEvents(INPUT, QUERY));
