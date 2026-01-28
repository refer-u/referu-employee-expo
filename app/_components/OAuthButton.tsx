import { useSSO } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { Globe } from "lucide-react-native"; // You can use 'Chrome' or 'Globe' as a placeholder
import { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

// This handles the browser window closing properly
WebBrowser.maybeCompleteAuthSession();

export function OAuthButton() {
  const { startSSOFlow } = useSSO();

  const onPress = useCallback(async () => {
    try {
      // THIS IS THE BLOCK YOU ASKED ABOUT:
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: Linking.createURL("/", { scheme: "referuhr" }),
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (err) {
      // If the user cancels the login, it usually triggers an error
      console.error("SSO error", JSON.stringify(err, null, 2));
    }
  }, [startSSOFlow]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Globe color="black" size={20} style={{ marginRight: 10 }} />
      <Text style={styles.text}>Continue with Google</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a202c",
  },
});
