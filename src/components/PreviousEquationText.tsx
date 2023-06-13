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
    <View {...restOfProp}>
      <Text style={styles.previousEquationText}>{title}</Text>
    </View>
  );
};

export default PreviousEquationText;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  previousEquationText: {
    margin: 5,
    textAlign: "center",
    fontSize: 25,
  },
});
