import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  label: string;
  active: boolean;
  onPress: () => void;
};

export default function TabButton({ label, active, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        active && styles.active,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.text, active && styles.textActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: "center",
    height: 44,
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#edf0f7ff",
  },
  active: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 2,
    borderRadius: 10,
    borderBottomColor: "#4f82efff",
    shadowColor: "#4f82efff",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0f172a",
  },
  textActive: {
    color: "#0f172a",
    fontWeight: "500",
  },
  pressed: {
    backgroundColor: "#eff6ff",
    opacity: 0.7,
  },
});
