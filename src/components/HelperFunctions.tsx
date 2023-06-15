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
  funcHolderArr: string[],
  index: number
): splitArr_FuncHoldArr {
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

  const tmp: splitArr_FuncHoldArr = {
    splitArr: splitArr,
    funcHolderArr: funcHolderArr,
  };
  console.log(splitArr, funcHolderArr, " ----BEFORE------ ", tmp);
  return tmp;
}
// export type tipali = {
//   name: string;
//   no: number;
// };

// export function reverseString2(str: string): tipali {
//   const tmp: tipali = { name: str.split("").reverse().join(""), no: 123 };
//   return tmp;
// }
