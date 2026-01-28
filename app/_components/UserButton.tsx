import { useClerk, useUser } from "@clerk/clerk-expo";
import React, { useState } from "react";
import {
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function UserButton() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [menuVisible, setMenuVisible] = useState(false);

  if (!user) return null;

  return (
    <View>
      {/* user button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setMenuVisible(true)}
        style={styles.avatarContainer}
      >
        <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
      </TouchableOpacity>

      {/* dropdown menu heseg */}
      <Modal
        transparent
        animationType="fade"
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.menuCard}>
            {/* user heseg */}
            <View id="user-info" style={styles.userInfo}>
              <Image
                source={{ uri: user.imageUrl }}
                style={styles.menuAvatar}
              />
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{user.fullName}</Text>
                <Text style={styles.userEmail} numberOfLines={1}>
                  {user.primaryEmailAddress?.emailAddress}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* garah heseg */}
            <TouchableOpacity
              style={styles.signOutBtn}
              onPress={() => {
                signOut();
                setMenuVisible(false);
              }}
            >
              <Text style={styles.signOutText}>Гарах</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    borderWidth: 2,
    borderColor: "#eee",
    borderRadius: 20,
    padding: 2,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  menuCard: {
    position: "absolute",
    top: 70,
    right: 20,
    width: 220,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  menuAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  userEmail: {
    fontSize: 12,
    color: "#666",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 8,
  },
  signOutBtn: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#fff1f0",
  },
  signOutText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ff4d4f",
  },
});
