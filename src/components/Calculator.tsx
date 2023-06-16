import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import PreviousEquationText from "./PreviousEquationText";
import ResultText from "./ResultText";
import ArrButtons from "./ArrButtons";
import {
  reverseString,
  multiplyDivide,
  bracketRemove,
  doAritmathics,
  FindLastNonDigit,
} from "./HelperFunctions";
import { mod } from "mathjs";

export default function Calculator() {
  const functionButtons = ["+/-", "%", "C"];
  const numberButtons = [
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "1",
    "Geri Al",
    "0",
    ".",
  ];

  const equationButtons = ["/", "x", "-", "+", "="];

  const [resultText, setResultText] = useState<string>("");
  const [previousEquationText, setPreviousEquationText] = useState<string>("");
  const [resultNumber, setResultNumber] = useState<number>();
  const [functionHolder, setFunctionHolder] = useState<string[]>([]);
  const [isNewEqu, setIsNewEqu] = useState<boolean>(false);

  const newNumberButtonClick = (newValue: string) => {
    if (newValue != "Geri Al") {
      if (functionHolder.length == 0 && isNewEqu) {
        setIsNewEqu(false);
        setResultText(newValue);
      } else {
        setResultText(resultText + newValue);
      }
    } else {
      let lastChar = resultText[resultText.length - 1];
      if (
        (lastChar == "x" ||
          lastChar == "-" ||
          lastChar == "+" ||
          lastChar == "/" ||
          lastChar == "%") &&
        resultText.length > 1
      ) {
        if (resultText[resultText.length - 2] != "(") functionHolder.pop();
        setResultText(resultText.slice(0, -1));
      } else if (
        (lastChar == "x" ||
          lastChar == "-" ||
          lastChar == "+" ||
          lastChar == "/" ||
          lastChar == "%") &&
        resultText.length == 1
      ) {
        setResultText(resultText.slice(0, -1));
      } else if (
        !(
          lastChar == "x" ||
          lastChar == "-" ||
          lastChar == "+" ||
          lastChar == "/" ||
          lastChar == "%"
        )
      ) {
        setResultText(resultText.slice(0, -1));
      }
    }
  };
  const newFunctionButtonClick = (newValue: string) => {
    if (
      newValue == "+" ||
      newValue == "-" ||
      newValue == "x" ||
      newValue == "/" ||
      newValue == "%"
    ) {
      if ("+-x/%".includes(resultText[resultText.length - 1])) {
        return;
      } else if (resultText.length == 0) {
        setResultText(resultText + newValue);
      } else {
        functionHolder.push(newValue);
        setResultText(resultText + newValue);
      }
    } else
      switch (newValue) {
        case "=":
          calculate(resultText);
          setIsNewEqu(true);
          setFunctionHolder([]);
          break;
        case "C":
          setResultText("");
          setPreviousEquationText("");
          setFunctionHolder([]);
          break;
        case "+/-":
          var lastOp = functionHolder[functionHolder.length - 1];
          //-----------------FUNCTION HOLDER BOSKEN BASILDIGINDA--------------------
          if (functionHolder.length == 0) {
            if (resultText.charAt(0) != "-") setResultText("-" + resultText);
            else {
              setResultText(resultText.slice(1));
            }
          }
          //-----------------FUNCTION HOLDER DOLUYKEN BASILDIGINDA--------------------
          else {
            if (lastOp == "+") {
              lastOp = "-";
              setResultText(
                reverseString(reverseString(resultText).replace("+", "-"))
              );
              functionHolder.pop();
              functionHolder.push(lastOp);
            } else if (lastOp == "-") {
              lastOp = "+";
              setResultText(
                reverseString(reverseString(resultText).replace("-", "+"))
              );
              functionHolder.pop();
              functionHolder.push(lastOp);
            } else {
              let lastCharIndRT: number = resultText.length - 1;
              if (resultText.charAt(lastCharIndRT).match(/[0-9]/)) {
                const lastNonDigit = FindLastNonDigit(resultText);
                setResultText(
                  [
                    resultText.slice(0, lastNonDigit + 1),
                    "(-",
                    resultText.slice(lastNonDigit + 1),
                    ")",
                  ].join("")
                );
              } else if (resultText[resultText.length - 1] == ")") {
                const lastIndex = resultText.lastIndexOf("(-");
                if (lastIndex !== -1) {
                  const modifiedStr =
                    resultText.slice(0, lastIndex) +
                    resultText.slice(lastIndex + 2, resultText.length - 1);
                  setResultText(modifiedStr);
                }
              }
            }
          }
          break;
        default:
          break;
      }
  };
  const calculate = (resultText: string) => {
    var splitted: string[] = [];
    if (resultText.charAt(0) != "-") {
      splitted = resultText.split(/(?<![(-])[\/x+%-](?![)])+/);

      //   setFunctionHolder([]);
    } else {
      resultText = resultText.slice(1);
      splitted = resultText.split(/(?<![(-])[\/x+%-](?![)])+/);
      splitted[0] = (parseFloat(splitted[0]) * -1).toString();
    }

    splitted = bracketRemove(splitted);
    const spltFncArr = multiplyDivide(splitted, functionHolder);
    splitted = spltFncArr.splitArr;
    setFunctionHolder(spltFncArr.funcHolderArr);
    const artmSplit = doAritmathics(splitted, functionHolder);
    splitted = artmSplit.splitArr;
    setFunctionHolder(artmSplit.funcHolderArr);

    setResultNumber(parseFloat(splitted[splitted.length - 1]));
    setPreviousEquationText(
      resultText + "=" + parseFloat(splitted[splitted.length - 1]).toFixed(3)
    );

    setResultText(
      parseFloat(splitted[splitted.length - 1])
        .toFixed(3)
        .toString()
    );
    splitted = [];
  };

  useEffect(() => {
    console.log("fncHolder: ", functionHolder);
  }, [functionHolder]);

  return (
    <View style={styles.container}>
      <PreviousEquationText title={previousEquationText} />
      <ResultText title={resultText} />
      <View style={styles.numpad}>
        <View style={styles.sayiVeFunc}>
          <ArrButtons
            titles={functionButtons}
            column={3}
            onClick={newFunctionButtonClick}
            bgColor="#d2d3da"
          />
          <ArrButtons
            titles={numberButtons}
            column={3}
            onClick={newNumberButtonClick}
          />
        </View>
        <View style={styles.oparator}>
          <ArrButtons
            titles={equationButtons}
            column={1}
            onClick={newFunctionButtonClick}
            bgColor="#4b5efc"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ececec",
    // alignItems: "center",
  },
  numpad: {
    flex: 3,
    flexDirection: "row",
    backgroundColor: "#ececec",
    // alignItems: "center",
  },
  sayiVeFunc: {
    flex: 3,
    flexDirection: "column",
    backgroundColor: "#ececec",
    // alignItems: "center",
    justifyContent: "center",
  },
  oparator: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ececec",
    // alignItems: "center",
    justifyContent: "center",
  },
});
