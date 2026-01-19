import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function MenuItem() {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push("/refer-history/ReferHistoryPage")}
      style={styles.card}
    >
      <View style={styles.row}>
        <Text style={styles.text}>Санал болгосон түүх</Text>
        <ChevronRight size={20} color="#6b7280" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontWeight: "500",
  },
});
