import ParallaxScrollView from "@/components/parallax-scroll-view";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "../_components/Header";
import MenuItem from "../_components/MenuItem";
import { mockEmployee } from "../_components/mockEmployee";
import { ProfileCard } from "../_components/ProfileCard";
import { ReferUHeader } from "../_components/ReferUHeader";

export default function MySection() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#005295", dark: "#1D3D47" }}
      headerImage={<ReferUHeader />}
    >
      <View style={{ flex: 1 }}>
        <StatusBar style="dark"></StatusBar>
        <View style={styles.container}>
          <Header />
          <View style={styles.content}>
            {mockEmployee.map((emp) => (
              <ProfileCard key={emp._id} employee={emp} />
            ))}
            <MenuItem />
          </View>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f6ff",
  },
  content: {
    paddingHorizontal: 26,
    paddingVertical: 30,
    gap: 16,
  },
});
