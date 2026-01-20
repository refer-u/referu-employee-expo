import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Миний хэсэг</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 52,
    justifyContent: "center",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
});
