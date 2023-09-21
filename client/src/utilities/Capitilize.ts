export default function capitilizeWord(w: string) {
  let arr = w.split(" ");
  let newArr: string[] = [];

  for (let i = 0; i < arr.length; i++) {
    let word = arr[i].toLowerCase().split("");

    word[0] = word[0].toUpperCase();

    newArr.push(word.join(""));
  }

  return newArr.join(" ");
}
