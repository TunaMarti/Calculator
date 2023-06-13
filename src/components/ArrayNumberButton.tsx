import React, { ComponentProps, useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import TextButton from "./TextButton";

type IProps = ComponentProps<typeof View> & {
  titles: string[];
  column: number;
  onClick: (newValue: string) => void;
};

const ArrayNumberButton: React.FC<IProps> = (props) => {
  const [gridArray, setGridArray] = useState<string[][]>([]);
  const onButtonClick = (newValue: string) => {
    props.onClick(newValue);
  };

  const defineEachRowElements = () => {
    const rowNumber = Math.floor(props.titles.length / props.column);
    let tmpArray = [];

    //slice (a,b)]
    //a 4er  0 dan
    //b 4er rownumber-1 den last index of titles

    for (let index2 = 0; index2 < props.titles.length; index2 += props.column) {
      console.log(
        index2,
        props.column,
        props.titles.length,
        props.titles.slice(index2, props.column + index2)
      );

      tmpArray.push(props.titles.slice(index2, props.column + index2));
      // index1++;
    }
    console.log(tmpArray);
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
              bgColor="#ffffff"
            ></TextButton>
          ))}
        </View>
      ))}
    </View>
  );
};

export default ArrayNumberButton;

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row-reverse",
  },
  container: {
    flexDirection: "column",
  },
  button: {
    marginHorizontal: 10,
    minWidth: 80,
  },
});
