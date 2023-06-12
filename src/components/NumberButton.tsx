import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import React, { Component, ComponentProps } from "react";

type NumberButtonProps = ComponentProps<typeof View> & {
  title: string;
  selected?: boolean;
  onPress: () => void;
};

const NumberButton: React.FC<NumberButtonProps> = ({
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

export default NumberButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  button: {
    margin: 5,
    textAlign: "center",
  },
});
