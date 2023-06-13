import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import React, { Component, ComponentProps } from "react";

type FunctionButtonProps = ComponentProps<typeof View> & {
  title: string;
  selected?: boolean;
  onPress: () => void;
};

const FunctionButton: React.FC<FunctionButtonProps> = ({
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

export default FunctionButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d2d3da",
    margin: 5,
    borderRadius: 8,
  },
  button: {
    margin: 5,
    textAlign: "center",
  },
});
