import { User } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileCard() {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <User size={32} color="#2563eb" />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>Б. Батжаргал</Text>
          <Text style={styles.meta}>EMP-2024-001</Text>
          <Text style={styles.meta}>Технологийн алба</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  row: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#dbeafe",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
  },
  meta: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
});
