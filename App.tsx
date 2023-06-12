import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import NumberButton from "./src/components/NumberButton";
import ArrayNumberButton from "./src/components/ArrayNumberButton";
import ArrayFunctionButton from "./src/components/ArrayFunctionButton";
import ResultText from "./ResultText";
import PreviousEquationText from "./PreviousEquationText";

export default function App() {
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
    ".",
    "Geri Al",
  ];

  const functionButtons = ["/", "x", "-", "+", "="];
  let result = "12345";
  let previousEquation = "12345";

  const newButtonClick = (newValue: string) => {
    console.log(newValue);
  };

  return (
    <View style={styles.container}>
      <PreviousEquationText title={previousEquation} />
      <ResultText title={result} />
      <View style={styles.numpad}>
        <ArrayNumberButton
          titles={numberButtons}
          column={3}
          onClick={newButtonClick}
        />
        <ArrayFunctionButton
          titles={functionButtons}
          column={1}
          onClick={newButtonClick}
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
