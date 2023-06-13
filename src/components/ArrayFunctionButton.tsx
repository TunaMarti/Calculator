import React, { ComponentProps, useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import TextButton from "./TextButton";

type IProps = ComponentProps<typeof View> & {
  titles: string[];
  column: number;
  onClick: (newValue: string) => void;
};

const ArrayFunctionButton: React.FC<IProps> = (props) => {
  const onButtonClick = (newValue: string) => {
    props.onClick(newValue);
  };

  // const defineEachRowElements = (newValue: void) =>;
  const rowNumber = Math.floor(props.titles.length / props.column);

  return (
    <View style={styles.container}>
      {props.titles.map((item, i) => {
        return (
          <TextButton
            key={"_" + i}
            title={item}
            onPress={() => onButtonClick(item)}
            style={styles.button}
            bgColor="#d2d3da"
          ></TextButton>
        );
      })}
    </View>
  );
};

export default ArrayFunctionButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  button: {
    marginHorizontal: 10,
    minWidth: 80,
  },
});
