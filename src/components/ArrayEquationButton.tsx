import React, { ComponentProps, useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import TextButton from "./TextButton";

type IProps = ComponentProps<typeof View> & {
  titles: string[];
  column: number;
  onClick: (newValue: string) => void;
};

const ArrayEquationButton: React.FC<IProps> = (props) => {
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
            bgColor="#4b5efc"
          ></TextButton>
        );
      })}
    </View>
  );
};

export default ArrayEquationButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  button: {
    marginHorizontal: 10,
    minWidth: 80,
  },
});
