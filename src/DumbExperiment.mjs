export class experiments {
    

    static generateMechName(baseWord) {
        const mods = [
            {name:"round", func: (word) => {
                const replacements = {
                  a: ['a', 'o', 'u', 'y', 'e'],
                  b: ['b', '6', '8'],
                  c: ['c', 'k'],
                  d: ['d', 'b', '6'],
                  e: ['e', '3'],
                  f: ['f', 'ph'],
                  g: ['g', '9'],
                  h: ['h', '4'],
                  i: ['i', '1', '!', '|'],
                  j: ['j'],
                  k: ['k', 'c'],
                  l: ['l', '1', '|'],
                  m: ['m'],
                  n: ['n'],
                  o: ['o', '0'],
                  p: ['p', '9'],
                  q: ['q'],
                  r: ['r'],
                  s: ['s', '5', '$'],
                  t: ['t', '7'],
                  u: ['u', 'v'],
                  v: ['v', 'u'],
                  w: ['w'],
                  x: ['x', '3'],
                  y: ['y'],
                  z: ['z', '2']
                };
            
                let newWord = '';
                for (let i = 0; i < word.length; i++) {
                  const char = word.charAt(i).toLowerCase();
                  if (replacements[char]) {
                    newWord += replacements[char][Math.floor(Math.random() * replacements[char].length)];
                  } else {
                    newWord += char;
                  }
                }
                return newWord;
              }},
            
              {name:"upper", func: (word) => {
                return word.toUpperCase();
              }},
                {name:"lower", func: (word) => {
                return word.toLowerCase();
              }},
              {name:"randMixCaSe", func: (word) => {
                // random letter mixed case: MinECraFt, mInEcRaFt, mineCrAft
                let result = "";
                for (let i = 0; i < word.length; i++) {
                  if (Math.random() < 0.5) {
                    result += word[i].toLowerCase();
                  } else {
                    result += word[i].toUpperCase();
                  }
                }
                return result;
              }},
              {name:"pascal", func: (word) => {
                // pascal case mod: WordMaker9000
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
              }},
              {name:"ranz-dash", func: (word) => {
                // random dash split mod
                const letters = word.split("");
                const dashCount = Math.floor(Math.random() * (letters.length - 1)/3) + 1;
                const dashIndexes = [];
                for (let i = 0; i < dashCount; i++) {
                  let randomIndex = Math.floor(Math.random() * letters.length);
                  while (dashIndexes.includes(randomIndex)) {
                    randomIndex = Math.floor(Math.random() * letters.length);
                  }
                  dashIndexes.push(randomIndex);
                }
                dashIndexes.sort((a, b) => a - b);
                for (let i = 0; i < dashIndexes.length; i++) {
                  letters[dashIndexes[i]] += "-";
                }
                return letters.join("").replace("--", "z");
              }},
              {name:"inator", func: (word) => {
                // botic postfix mod
                const postfixes = [
                  "inator",
                  "9000",
                  "x86",
                  "x64",
                  "84+9/e",
                  "32bit",
                  "64bit",
                  "ultimate",
                ];
                const postfix = postfixes[Math.floor(Math.random() * postfixes.length)];
                const number = Math.floor(Math.random() * 10000);
                const randomExpression = Math.random() < 0.5 ? `${number}*o` : `1/${number}*w`;
                return `${word}${postfix}${Math.random() < 0.5 ? number : randomExpression}`;
              }},
              {name:"-_.", func: (word) => {
                // letter replacement mod
                const letters = word.split("");
                const replaceCount = Math.floor(Math.random() * letters.length);
                const replaceIndexes = [];
                for (let i = 0; i < replaceCount; i++) {
                  let randomIndex = Math.floor(Math.random() * letters.length);
                  while (replaceIndexes.includes(randomIndex)) {
                    randomIndex = Math.floor(Math.random() * letters.length);
                  }
                  replaceIndexes.push(randomIndex);
                }
                replaceIndexes.sort((a, b) => a - b);
                for (let i = 0; i < replaceIndexes.length; i++) {
                  const randomChar = Math.random() < 0.33 ? "-" : Math.random() < 0.5 ? "_" : ".";
                  letters[replaceIndexes[i]] = randomChar;
                }
                return letters.join("");
              }},
              {name:"round", func: (word) => {
                return word.replace(/\s/g, '');
              }},
              {name:"reverser", func: (word) => {
                let reversedWord = "";
                for (let i = word.length - 1; i >= 0; i--) {
                    reversedWord += word[i];
                }
                return reversedWord;
            }},
            {name:"emoji", func: (word) => {
                const emoticons = [":)", ":D", ";)", "<3", ":P", "XD", ":O", ":("];
                let newWord = "";
                for (let i = 0; i < word.length; i++) {
                    newWord += word[i];
                    if (i < word.length - 1) {
                        newWord += emoticons[Math.floor(Math.random() * emoticons.length)];
                    }
                }
                return newWord;
            }},
            {name:"vowel(w)er", func: (word) => {
                const vowels = ["a", "e", "i", "o", "u"];
                return word
                  .split("")
                  .map((letter) => {
                    if (vowels.includes(letter.toLowerCase())) {
                      return Math.random() < 0.5 ? letter : letter.toLowerCase() + "w";
                    }
                    return letter;
                  })
                  .join("");
              }},
              {name:"ranAlien", func: (word) => {
                const symbols = ["'", '"', "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "=", "`", "~", "{", "}", "[", "]", "|", "\\", ";", "<", ">", ",", ".", "?", "/"];
                const alienLetters = ["k", "z", "x", "q", "j", "p", "v", "y", "g", "f", "b", "n", "m", "d", "c", "s", "h", "r", "l", "t", "w"];
                return word
                  .split("")
                  .map((letter) => {
                    if (Math.random() < 0.5) {
                      return alienLetters[Math.floor(Math.random() * alienLetters.length)];
                    } else {
                      return letter.toLowerCase() + symbols[Math.floor(Math.random() * symbols.length)];
                    }
                  })
                  .join("");
              }}
              
        ]
        var copymods = [...mods]; //simple array copy
        var input = baseWord;
        var modchain = [{name:"base", input: input}];
        
        for (let i = 0; i < 3; ) {
            var mod = copymods[Math.floor(Math.random() * copymods.length)];
            copymods = copymods.filter(item => item !== mod); //remove mod from copy of array
            input= mod.func(input);
            modchain.push({name: mod.name, input: input});
            i++
        }
        input =input.replace(/[^\w\s{}[\]:,.-]/g, "").replace("...","o")
        modchain.push({name: "clean", input: input});
        console.log(modchain);
          return input;
      }
}