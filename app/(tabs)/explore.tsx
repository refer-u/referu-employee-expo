import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "../_components/Header";
import MenuItem from "../_components/MenuItem";
import ProfileCard from "../_components/ProfileCard";

export default function MySection() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <ProfileCard />
        <MenuItem />
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
    padding: 16,
    gap: 16,
  },
});
