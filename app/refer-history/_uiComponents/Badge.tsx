import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Badge({
  text,
  variant = "Илгээсэн",
}: {
  text: string;
  variant: "Илгээсэн" | "Зөвшөөрсөн" | "Цуцлагдсан";
}) {
  return (
    <View
      style={[
        styles.Илгээсэн,
        variant === "Илгээсэн" && styles.Илгээсэн,
        variant === "Зөвшөөрсөн" && styles.Зөвшөөрсөн,
        variant === "Цуцлагдсан" && styles.Цуцлагдсан,
      ]}
    >
      <Text
        style={[
          styles.text,
          variant === "Илгээсэн" && styles.text,
          variant === "Зөвшөөрсөн" && styles.successText,
          variant === "Цуцлагдсан" && styles.dangerText,
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Илгээсэн: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 14,
  },
  text: {
    fontSize: 9,
    color: "#374151",
  },
  Зөвшөөрсөн: {
    backgroundColor: "#dcfce7",
  },
  successText: {
    color: "#15803d",
  },
  Цуцлагдсан: {
    backgroundColor: "#fee2e2",
  },
  dangerText: {
    color: "#b91c1c",
  },
});
