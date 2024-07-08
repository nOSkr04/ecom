import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

const ColorList = ({ color }: { color: string }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {[1, 0.8, 0.5].map((opacity: number) => {
        return (
          <View
            key={opacity}
            style={[styles.color, { backgroundColor: color, opacity }]}
          />
        );
      })}
    </ScrollView>
  );
};

export default ColorList;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 150,
    borderRadius: 25,
    borderCurve: "continuous",
    marginBottom: 15,
  },
  color: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: "100%",
  },
});
