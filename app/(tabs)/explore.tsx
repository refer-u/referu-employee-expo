import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "../_components/Header";
import MenuItem from "../_components/MenuItem";

import { mockEmployee } from "../_components/mockEmployee";
import { ProfileCard } from "../_components/ProfileCard";

export default function MySection() {
  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f6ff",
  },
  content: {
    padding: 12,
    gap: 16,
  },
});
