import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import React, { Component, ComponentProps } from "react";

type ResultTextProps = ComponentProps<typeof View> &
  ComponentProps<typeof Text> & {
    title: string;
  };

const ResultText: React.FC<ResultTextProps> = ({ title, ...restOfProp }) => {
  return (
    <View {...restOfProp} style={styles.container}>
      <Text style={styles.resultText}>{title}</Text>
    </View>
  );
};

export default ResultText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "flex-end",
    backgroundColor: "#ececec",
  },
  resultText: {
    margin: 5,
    fontSize: 50,
    textAlign: "center",
  },
});
