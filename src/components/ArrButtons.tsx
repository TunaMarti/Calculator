import React, { ComponentProps, useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import TextButton from "./TextButton";

type IProps = ComponentProps<typeof View> & {
  titles: string[];
  column: number;
  onClick: (newValue: string) => void;
  bgColor?: string;
};

const ArrButtons: React.FC<IProps> = (props) => {
  const [gridArray, setGridArray] = useState<string[][]>([]);
  const onButtonClick = (newValue: string) => {
    props.onClick(newValue);
  };

  const defineEachRowElements = () => {
    let tmpArray = [];
    for (let index2 = 0; index2 < props.titles.length; index2 += props.column) {
      tmpArray.push(props.titles.slice(index2, props.column + index2));
    }

    setGridArray(tmpArray);
  };

  useEffect(() => {
    defineEachRowElements();
  }, []);

  return (
    <View style={styles.container}>
      {gridArray.map((outer, i) => (
        <View key={"_" + i} style={styles.grid}>
          {outer.map((inner, j) => (
            <TextButton
              key={"_" + i + "_" + j}
              title={inner}
              onPress={() => onButtonClick(inner)}
              style={styles.button}
              bgColor={props.bgColor ?? "#ffffff"}
            ></TextButton>
          ))}
        </View>
      ))}
    </View>
  );
};

export default ArrButtons;

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row-reverse",

    // flex: 3,
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    marginHorizontal: 10,
    flex: 1,
    // minWidth: 100,
  },
});
