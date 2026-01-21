import { Stack } from "expo-router";
import { View } from "react-native";
import Header from "./_historyComponents/Header";
import TabsPage from "./_historyComponents/TabsPage";

export default function ReferHistoryPage() {
  return (
    <View style={{ backgroundColor: "#ffffff", height: "100%" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      <TabsPage />
    </View>
  );
}
