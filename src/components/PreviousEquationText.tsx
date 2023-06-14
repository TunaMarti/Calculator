import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import React, { Component, ComponentProps } from "react";

type PreviousEquationTextProps = ComponentProps<typeof View> &
  ComponentProps<typeof Text> & {
    title: string;
  };

const PreviousEquationText: React.FC<PreviousEquationTextProps> = ({
  title,
  ...restOfProp
}) => {
  return (
    <View {...restOfProp} style={styles.container}>
      <Text style={styles.previousEquationText}>{title}</Text>
    </View>
  );
};

export default PreviousEquationText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ececec",
    borderRadius: 8,
  },
  previousEquationText: {
    margin: 5,
    textAlign: "left",
    fontSize: 25,
  },
});
