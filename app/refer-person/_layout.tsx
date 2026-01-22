import { Stack } from "expo-router";

export default function ReferPersonLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          title: "Санал Болгох Маягт",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "700",
            color: "#005295",
          },
        }}
      />
    </Stack>
  );
}
