import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Header() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <ArrowLeft size={22} color="#6b7280" />
      </Pressable>

      <Text style={styles.title}>Санал болгосон түүх</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,

    elevation: 2,
  },
  backButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
});
