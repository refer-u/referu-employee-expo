import { useColorScheme } from "@/hooks/use-color-scheme";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
if (!publishableKey) {
  throw new Error("Missing Publishable key.");
}

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <ClerkProvider
            publishableKey={publishableKey}
            tokenCache={tokenCache}
          >
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />

              <Stack.Screen
                name="modal"
                options={{
                  headerShown: true,
                  presentation: "modal",
                  title: "Дэлгэрэнгүй Мэдээлэл",
                  headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: "700",
                    color: "#005295",
                  },
                }}
              />
              <Stack.Screen
                name="[id]"
                options={{
                  headerShown: true,
                  presentation: "modal",
                  title: "Санал Болгох Маягт",
                  headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: "700",
                    color: "#005295",
                  },
                }}
              />
            </Stack>
          </ClerkProvider>
          <StatusBar style="auto" />
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
