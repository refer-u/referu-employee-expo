import { ThemedText } from "@/components/themed-text";

export const ReferUHeader = () => {
  return (
    <ThemedText
      type="title"
      style={{
        color: "#fff",
        bottom: 0,
        height: 70,
        position: "absolute",
        paddingHorizontal: 26,
        paddingVertical: 22,
      }}
    >
      Refer
      <ThemedText
        type="title"
        style={{
          color: "#94A3B8",
        }}
      >
        U
      </ThemedText>
    </ThemedText>
  );
};
