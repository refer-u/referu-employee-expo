import React from "react";
import { StyleSheet, View } from "react-native";

export default function CardItem({
  children,
  dotColor,
}: {
  children: React.ReactNode;
  dotColor: string;
}) {
  return (
    <View style={styles.card}>
      <View style={[styles.dot, { backgroundColor: dotColor }]} />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dot: {
    width: 6,
    height: 40,
    borderRadius: 5,
  },
  content: {
    flex: 1,
  },
});
