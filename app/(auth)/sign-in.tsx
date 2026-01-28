import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { OAuthButton } from "../_components/OAuthButton";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        backgroundColor: "#f0f6ff",
      }}
    >
      <View
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 28,
          // padding: 28,
          boxSizing: "border-box",
          paddingVertical: 32,
          paddingHorizontal: 28,
          flexDirection: "column",
          gap: 36,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        <Text style={{ color: "black", fontWeight: "700", fontSize: 28 }}>
          Sign in
        </Text>
        <View style={{ flexDirection: "column", gap: 16 }}>
          <View style={{ flexDirection: "column", gap: 8 }}>
            <Text style={{ fontWeight: "600" }}>Email</Text>
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Enter email"
              onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
              style={{
                borderBottomWidth: 1,
                borderColor: "#737373",
                paddingHorizontal: 2,
                paddingVertical: 4,
              }}
            />
          </View>
          <View style={{ flexDirection: "column", gap: 8 }}>
            <Text style={{ fontWeight: "600" }}>Password</Text>
            <TextInput
              value={password}
              placeholder="Enter password"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              style={{
                borderBottomWidth: 1,
                borderColor: "#737373",
                paddingHorizontal: 2,
                paddingVertical: 4,
              }}
            />
          </View>
          <TouchableOpacity
            onPress={onSignInPress}
            style={{
              width: "100%",
              backgroundColor: "#0a7ea4",
              borderRadius: 12,
              padding: 12,
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 24,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            <Text style={{ color: "#ffffff", fontWeight: "600", fontSize: 16 }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 3,
            justifyContent: "center",
          }}
        >
          <Text>Dont' have an account?</Text>
          <Link href="/sign-up">
            <Text style={{ color: "#0a7ea4", fontWeight: "700" }}>Sign up</Text>
          </Link>
        </View>
        <View
          style={{ flexDirection: "row", justifyContent: "center", gap: 4 }}
        >
          <View
            style={{
              borderBottomWidth: 1,
              width: 80,
              borderBottomColor: "#737373",
            }}
          />
          <Text>OR</Text>
          <View
            style={{
              borderBottomWidth: 1,
              width: 80,
              borderBottomColor: "#737373",
            }}
          />
        </View>
        <OAuthButton />
      </View>
    </View>
  );
}
