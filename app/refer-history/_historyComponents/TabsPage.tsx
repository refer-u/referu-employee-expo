import { useAllReferrals } from "@/app/hook/use-all-referrals";

import { getDateWithoutTime } from "@/libs/utils/getDateWithoutTime";
import * as NavigationBar from "expo-navigation-bar";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Badge from "../_uiComponents/Badge";
import CardItem from "../_uiComponents/CardItem";
import TabButton from "../_uiComponents/TabButton";

type TabKey = "Илгээсэн" | "Зөвшөөрсөн" | "Цуцлагдсан";

export default function TabsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("Илгээсэн");
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#5d3912");
    NavigationBar.setButtonStyleAsync("dark");
  }, []);

  const { allReferrals } = useAllReferrals();
  console.log("allReferrals", allReferrals);
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
          allReferrals
            .filter((ref) => ref.referralStatus === "SUBMITTED")
            .map((i) => (
              <CardItem key={i._id} dotColor="#fb923c">
                {/* <Text style={styles.title}>{i.jobName}</Text> */}
                <Text style={styles.muted}>
                  Санал болгосон:{" "}
                  <Text style={styles.boldText}>{i.candidateFirstName}</Text>
                </Text>
                <View style={styles.badges}>
                  <Badge
                    text={`Илгээсэн: ${getDateWithoutTime(i.createdAt)}`}
                    variant="Илгээсэн"
                  />
                </View>
              </CardItem>
            ))}

        {/* Зөвшөөрсөн */}
        {activeTab === "Зөвшөөрсөн" &&
          allReferrals
            .filter(
              (ref) =>
                ref.referralStatus === "BONUS100" ||
                ref.referralStatus === "BONUS200",
            )
            .map((i) => (
              <CardItem key={i._id} dotColor="#22c55e">
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.muted}>
                    Санал болгосон:{" "}
                    <Text style={styles.boldText}>{i.candidateFirstName}</Text>
                  </Text>

                  <Text style={styles.bonus}>{i.bonusAmount}₮</Text>
                </View>

                <View style={styles.badges}>
                  <Badge
                    text={`Илгээсэн: ${getDateWithoutTime(i.createdAt)}`}
                    variant="Илгээсэн"
                  />

                  <Badge
                    text={`Зөвшөөрсөн: ${getDateWithoutTime(i.updatedAt)}`}
                    variant="Зөвшөөрсөн"
                  />
                </View>
              </CardItem>
            ))}

        {/* Цуцлагдсан */}
        {activeTab === "Цуцлагдсан" &&
          allReferrals
            .filter((ref) => ref.referralStatus === "REJECTED")
            .map((i) => (
              <CardItem key={i._id} dotColor="#ef4444">
                {/* <Text style={styles.title}>{i.jobName}</Text> */}
                <Text style={styles.muted}>
                  Санал болгосон:{" "}
                  <Text style={styles.boldText}>{i.candidateFirstName}</Text>
                </Text>

                <View style={styles.badges}>
                  <Badge
                    text={`Илгээсэн: ${getDateWithoutTime(i.createdAt)}`}
                    variant="Илгээсэн"
                  />
                  <Badge
                    text={`Цуцлагдсан: ${getDateWithoutTime(i.updatedAt)}`}
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
  boldText: {
    color: "#111827",
    fontWeight: "500",
  },
  container: {
    flex: 1,
    backgroundColor: "#f0f6ff",
    paddingHorizontal: 9,
    paddingTop: 18,
  },
  tabs: {
    flexDirection: "row",
    borderRadius: 10,
  },

  bonus: { fontSize: 14, fontWeight: "600", color: "#2dca67ff" },
  content: { padding: 16, gap: 12 },
  title: { fontSize: 18, fontWeight: "600", color: "#111827" },
  muted: { fontSize: 16, color: "#363739ff", marginTop: 2 },
  badges: { flexDirection: "row", gap: 6, marginTop: 8, flexWrap: "wrap" },
});
