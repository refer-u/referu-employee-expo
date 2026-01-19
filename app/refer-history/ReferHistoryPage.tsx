import { View } from "react-native";
import Header from "./_historyComponents/Header";
import TabsPage from "./_historyComponents/TabsPage";

export default function ReferHistoryPage() {
  return (
    <View style={{ backgroundColor: "#ffffff", height: "100%" }}>
      <Header />
      <TabsPage />
    </View>
  );
}
