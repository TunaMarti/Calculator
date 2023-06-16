import { string } from "mathjs";

export function reverseString(str: string) {
  return str.split("").reverse().join("");
}

export type splitArr_FuncHoldArr = {
  splitArr: string[];
  funcHolderArr: string[];
};

export function multiplyDivide(
  splitArr: string[],
  funcHolderArr: string[]
): splitArr_FuncHoldArr {
  for (let index = 0; index < splitArr.length; index++) {
    switch (funcHolderArr[index]) {
      case "x":
        splitArr[index + 1] = (
          parseFloat(splitArr[index]) * parseFloat(splitArr[index + 1])
        ).toString();
        splitArr.splice(index, 1);
        funcHolderArr.splice(index, 1);
        break;
      case "/":
        splitArr[index + 1] = (
          parseFloat(splitArr[index]) / parseFloat(splitArr[index + 1])
        ).toString();
        splitArr.splice(index, 1);
        funcHolderArr.splice(index, 1);
        break;
    }
  }

  const tmp: splitArr_FuncHoldArr = {
    splitArr: splitArr,
    funcHolderArr: funcHolderArr,
  };
  return tmp;
}

export function doAritmathics(
  splitArr: string[],
  funcHolderArr: string[]
): splitArr_FuncHoldArr {
  for (let index = 0; index < splitArr.length; index++) {
    switch (funcHolderArr[index]) {
      case "+":
        console.log(
          "topla",
          parseFloat(splitArr[index]) + parseFloat(splitArr[index + 1])
        );
        splitArr[index + 1] = (
          parseFloat(splitArr[index]) + parseFloat(splitArr[index + 1])
        ).toString();
        break;
      case "-":
        splitArr[index + 1] = (
          parseFloat(splitArr[index]) - parseFloat(splitArr[index + 1])
        ).toString();
        break;
      case "%":
        splitArr[index + 1] = (
          parseFloat(splitArr[index]) % parseFloat(splitArr[index + 1])
        ).toString();
        break;

      default:
        break;
    }
  }
  const tmp: splitArr_FuncHoldArr = {
    splitArr: splitArr,
    funcHolderArr: funcHolderArr,
  };
  return tmp;
}

export function bracketRemove(str: string[]) {
  for (let index = 0; index < str.length; index++) {
    if (/[()]/.test(str[index])) {
      str[index] = str[index].replace(/[()]/, "");
    }
  }
  return str;
}

export function FindLastNonDigit(str: string) {
  let lastNonDigitIndex = -1;

  for (let i = str.length - 1; i >= 0; i--) {
    if (
      isNaN(Number(str[i])) &&
      str[i] != "." &&
      str[i] != "(" &&
      str[i] != ")"
    ) {
      lastNonDigitIndex = i;
      break;
    }
  }
  return lastNonDigitIndex;
}
// export type tipali = {
//   name: string;
//   no: number;
// };

// export function reverseString2(str: string): tipali {
//   const tmp: tipali = { name: str.split("").reverse().join(""), no: 123 };
//   return tmp;
// }
