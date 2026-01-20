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
      style={[styles.button, active && styles.active]}
    >
      <Text style={[styles.text, active && styles.textActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  active: {
    borderBottomWidth: 2,
    borderBottomColor: "#2563eb",
  },
  hover: {
    padding: 2,
    borderRadius: 2,
    backgroundColor: "#2563eb",
  },
  text: {
    fontSize: 13,
    color: "#6b7280",
  },
  textActive: {
    color: "#111827",
    fontWeight: "600",
  },
});
