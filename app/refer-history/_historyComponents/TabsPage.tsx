import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Badge from "../_uiComponents/Badge";
import CardItem from "../_uiComponents/CardItem";
import TabButton from "../_uiComponents/TabButton";

const historyData = {
  sent: [
    {
      id: "1",
      jobName: "Senior Software Engineer",
      candidateName: "А. Дорж",
      sentDate: "2024-01-15",
    },
    {
      id: "2",
      jobName: "Product Manager",
      candidateName: "Б. Сарнай",
      sentDate: "2024-01-12",
    },
  ],
  approved: [
    {
      id: "3",
      jobName: "UX Designer",
      candidateName: "Ц. Болд",
      sentDate: "2024-01-05",
      approvedDate: "2024-01-10",
      bonus: "₮500,000",
    },
  ],
  rejected: [
    {
      id: "4",
      jobName: "Data Analyst",
      candidateName: "Д. Өсөх",
      sentDate: "2023-12-20",
      responseDate: "2023-12-28",
    },
  ],
};

type TabKey = "Илгээсэн" | "Зөвшөөрсөн" | "Цуцлагдсан";

export default function TabsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("Илгээсэн");
  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabs}>
        <TabButton
          label="Илгээсэн"
          active={activeTab === "Илгээсэн"}
          onPress={() => setActiveTab("Илгээсэн")}
        />
        <TabButton
          label="Зөвшөөрсөн"
          active={activeTab === "Зөвшөөрсөн"}
          onPress={() => setActiveTab("Зөвшөөрсөн")}
        />
        <TabButton
          label="Цуцлагдсан"
          active={activeTab === "Цуцлагдсан"}
          onPress={() => setActiveTab("Цуцлагдсан")}
        />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Илгээгдсэн */}
        {activeTab === "Илгээсэн" &&
          historyData.sent.map((i) => (
            <CardItem key={i.id} dotColor="#fb923c">
              <Text style={styles.title}>{i.jobName}</Text>
              <Text style={styles.muted}>
                Санал болгосон: {i.candidateName}
              </Text>
              <View style={styles.badges}>
                <Badge text={`Илгээсэн: ${i.sentDate}`} variant="Илгээсэн" />
              </View>
            </CardItem>
          ))}

        {/* Зөвшөөрсөн */}
        {activeTab === "Зөвшөөрсөн" &&
          historyData.approved.map((i) => (
            <CardItem key={i.id} dotColor="#22c55e">
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.title}>{i.jobName}</Text>
                <Text style={styles.bonus}>{i.bonus}</Text>
              </View>
              <Text style={styles.muted}>
                Санал болгосон: {i.candidateName}
              </Text>

              <View style={styles.badges}>
                <Badge text={`Илгээсэн: ${i.sentDate}`} variant="Илгээсэн" />

                <Badge
                  text={`Зөвшөөрсөн: ${i.approvedDate}`}
                  variant="Зөвшөөрсөн"
                />
              </View>
            </CardItem>
          ))}

        {/* Цуцлагдсан */}
        {activeTab === "Цуцлагдсан" &&
          historyData.rejected.map((i) => (
            <CardItem key={i.id} dotColor="#ef4444">
              <Text style={styles.title}>{i.jobName}</Text>
              <Text style={styles.muted}>
                Санал болгосон: {i.candidateName}
              </Text>
              <View style={styles.badges}>
                <Badge text={`Илгээсэн: ${i.sentDate}`} variant="Илгээсэн" />
                <Badge
                  text={`Цуцлагдсан: ${i.responseDate}`}
                  variant="Цуцлагдсан"
                />
              </View>
            </CardItem>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f6ff",
    paddingHorizontal: 9,
    paddingTop: 25,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },

  bonus: { fontSize: 14, fontWeight: "600", color: "#22c55e" },
  content: { padding: 16, gap: 12 },
  title: { fontSize: 18, fontWeight: "600", color: "#111827" },
  muted: { fontSize: 13, color: "#6b7280", marginTop: 2 },
  badges: { flexDirection: "row", gap: 8, marginTop: 8, flexWrap: "wrap" },
});
