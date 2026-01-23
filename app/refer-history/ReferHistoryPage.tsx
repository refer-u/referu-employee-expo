import ParallaxScrollView from "@/components/parallax-scroll-view";
import { Stack } from "expo-router";
import { View } from "react-native";
import { ReferUHeader } from "../_components/ReferUHeader";
import Header from "./_historyComponents/Header";
import TabsPage from "./_historyComponents/TabsPage";

export default function ReferHistoryPage() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#005295", dark: "#1D3D47" }}
      headerImage={<ReferUHeader />}
    >
      <View style={{ backgroundColor: "#ffffff", height: "100%" }}>
        <Stack.Screen options={{ headerShown: false }} />
        <Header />
        <TabsPage />
      </View>
    </ParallaxScrollView>
  );
}
