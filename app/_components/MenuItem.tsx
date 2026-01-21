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
        <ChevronRight size={22} color="#6b7280" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 17,
    fontWeight: "500",
    letterSpacing: -0.5,
    color: "#4e545dff",
  },
});
