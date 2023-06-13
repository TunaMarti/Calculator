import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import React, { ComponentProps } from "react";

type NumberButtonProps = ComponentProps<typeof View> & {
  title: string;
  selected?: boolean;
  onPress: () => void;
  bgColor?: string;
};

const TextButton: React.FC<NumberButtonProps> = ({
  title,
  onPress,
  bgColor,
  ...restOfProp
}) => {
  return (
    <TouchableOpacity
      {...restOfProp}
      style={[
        styles.container,
        restOfProp.style,
        { backgroundColor: bgColor ?? "#ffffff" },
      ]}
      onPress={onPress}
    >
      <Text style={styles.button}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    borderRadius: 8,
  },
  button: {
    margin: 5,
    textAlign: "center",
  },
});
