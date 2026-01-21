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
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingTop: 40,
  },
  backButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 7,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
});
