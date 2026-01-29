"use client";

import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Header() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <ChevronLeft size={26} color="#32353cff" />
      </Pressable>
      <Text style={styles.title}>Санал болгосон түүх</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 8,
    backgroundColor: "#f0f6ff",
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: -0.5,
  },
});
