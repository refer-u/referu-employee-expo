import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Badge({ text }: { text: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  text: {
    fontSize: 11,
    color: "#374151",
  },
});
