import { ThemedText } from "@/components/themed-text";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { View } from "react-native";
import UserButton from "./UserButton";

export const ReferUHeader = () => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        height: 70,
        width: "100%",
        paddingHorizontal: 26,
        paddingVertical: 22,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <ThemedText type="title" style={{ color: "#fff" }}>
        Refer
        <ThemedText type="title" style={{ color: "#94A3B8" }}>
          U
        </ThemedText>
      </ThemedText>

      {/* UserButton */}
      <SignedIn>
        <UserButton />
      </SignedIn>

      {/* Login */}
      <SignedOut>{/* <Pressable><Text>Login</Text></Pressable> */}</SignedOut>
    </View>
  );
};
