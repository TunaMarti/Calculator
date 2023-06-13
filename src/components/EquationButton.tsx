import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import React, { Component, ComponentProps } from "react";

type EquationButtonProps = ComponentProps<typeof View> & {
  title: string;
  selected?: boolean;
  onPress: () => void;
};

const EquationButton: React.FC<EquationButtonProps> = ({
  title,
  onPress,
  ...restOfProp
}) => {
  const onClick = () => {
    // ada a sd
    onPress();
  };

  return (
    <TouchableOpacity
      {...restOfProp}
      style={[styles.container, restOfProp.style]}
      onPress={onClick}
    >
      <Text style={styles.button}>{title}</Text>
    </TouchableOpacity>
  );
};

export default EquationButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4b5efc",
    margin: 5,
    borderRadius: 8,
  },
  button: {
    margin: 5,
    textAlign: "center",
  },
});
