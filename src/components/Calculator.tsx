import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import PreviousEquationText from "../../PreviousEquationText";
import ResultText from "../../ResultText";
import ArrButtons from "./ArrButtons";

export default function Calculator() {
  const functionButtons = ["C", "+/-", "%"];
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
      console.log(
        resultNumber,
        previousEquationText.length,
        "xxxxx",
        previousEquationText,
        functionHolder,
        functionHolder.length,
        previousEquationText.length > 0 && functionHolder.length == 0
      );
      if (functionHolder.length == 0 && isNewEqu) {
        setIsNewEqu(false);
        setResultText(newValue);
      } else {
        setResultText(resultText + newValue);
      }
    } else {
      setResultText(resultText.slice(0, -1));
    }
  };
  const newFunctionButtonClick = (newValue: string) => {
    if (newValue != "=") {
      functionHolder.push(newValue);
      console.log(functionHolder);
      setResultText(resultText + newValue);
    } else {
      calculate(resultText);
      setIsNewEqu(true);
      setFunctionHolder([]);
    }
  };
  const calculate = (resultText: string) => {
    var splitted: string[] = [];
    if (resultText.charAt(0) != "-") {
      splitted = resultText.split(/[x+-/]/);
      setFunctionHolder([]);
    } else {
      resultText = resultText.slice(1);
      splitted = resultText.split(/[x+-/]/);
      splitted[0] = (parseFloat(splitted[0]) * -1).toString();
      console.log("splitted[0]: " + splitted[0]);
    }

    console.log("Splitted: " + splitted);
    for (let index = 0; index < splitted.length; index++) {
      switch (functionHolder[index]) {
        case "+":
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

        default:
          break;
      }
      setResultNumber(parseFloat(splitted[splitted.length - 1]));
      setPreviousEquationText(resultText + "=" + splitted[splitted.length - 1]);
    }
    setResultText(splitted[splitted.length - 1]);
    splitted = [];
  };

  return (
    <View style={styles.container}>
      <PreviousEquationText title={previousEquationText} />
      <ResultText title={resultText} />
      <View style={styles.numpad}>
        <View>
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
        <ArrButtons
          titles={equationButtons}
          column={1}
          onClick={newFunctionButtonClick}
          bgColor="#4b5efc"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ececec",
    alignItems: "center",
    justifyContent: "center",
  },
  numpad: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ececec",
    alignItems: "center",
    justifyContent: "center",
  },
});
