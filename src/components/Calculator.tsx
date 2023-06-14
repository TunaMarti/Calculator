import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import PreviousEquationText from "./PreviousEquationText";
import ResultText from "./ResultText";
import ArrButtons from "./ArrButtons";
import { reverseString } from "./HelperFunctions";
import math from "mathjs";

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
      let lastOp = resultText[resultText.length - 1];
      if (
        resultText.length == 1 &&
        (lastOp == "+" ||
          lastOp == "-" ||
          lastOp == "x" ||
          lastOp == "/" ||
          lastOp == "%")
      ) {
        functionHolder.pop();
      }
      functionHolder.pop();
      setResultText(resultText.slice(0, -1));
    }
  };
  const newFunctionButtonClick = (newValue: string) => {
    console.log("NewVALUE: ", newValue, functionHolder);
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

      console.log(
        "Function holder after clicked an operator ",
        functionHolder,
        "\n"
      );
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
          console.log("lastOp", lastOp, "functionHolder: ", functionHolder);
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
              console.log("replace to negative" + resultText.replace("+", "-"));
              functionHolder.pop();
              functionHolder.push(lastOp);
            } else if (lastOp == "-") {
              lastOp = "+";
              console.log(
                "replace to positive" +
                  reverseString(resultText).replace("-", "+")
              );
              setResultText(
                reverseString(reverseString(resultText).replace("-", "+"))
              );
              functionHolder.pop();
              functionHolder.push(lastOp);
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
      splitted = resultText.split(/[x+\-%/]/);

      //   setFunctionHolder([]);
    } else {
      resultText = resultText.slice(1);
      splitted = resultText.split(/[x+\-%/]/);
      splitted[0] = (parseFloat(splitted[0]) * -1).toString();
    }
    console.log(functionHolder, "SPLITTTTTTED", splitted);
    for (let index = 0; index < splitted.length; index++) {
      switch (functionHolder[index]) {
        case "+":
          console.log(
            "topla",
            parseFloat(splitted[index]) + parseFloat(splitted[index + 1])
          );
          splitted[index + 1] = (
            parseFloat(splitted[index]) + parseFloat(splitted[index + 1])
          ).toString();
          break;
        case "-":
          splitted[index + 1] = (
            parseFloat(splitted[index]) - parseFloat(splitted[index + 1])
          ).toString();
          break;
        case "/":
          splitted[index + 1] = (
            parseFloat(splitted[index]) / parseFloat(splitted[index + 1])
          ).toString();
          break;
        case "x":
          splitted[index + 1] = (
            parseFloat(splitted[index]) * parseFloat(splitted[index + 1])
          ).toString();
          break;
        case "%":
          splitted[index + 1] = (
            parseFloat(splitted[index]) % parseFloat(splitted[index + 1])
          ).toString();
          break;

        default:
          break;
      }
      console.log(
        functionHolder,
        splitted[splitted.length - 1],
        "splitted: ",
        splitted
      );
      setResultNumber(parseFloat(splitted[splitted.length - 1]));
      setPreviousEquationText(resultText + "=" + splitted[splitted.length - 1]);
    }
    setResultText(splitted[splitted.length - 1]);
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
