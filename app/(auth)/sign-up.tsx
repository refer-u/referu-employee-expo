import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import * as React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { OAuthButton } from "../_components/OAuthButton";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See Clerk docs: custom flows error handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See Clerk docs: custom flows error handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <>
        <Text>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
      </>
    );
  }

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
          Sign up
        </Text>
        <View style={{ flexDirection: "column", gap: 16 }}>
          <View style={{ flexDirection: "column", gap: 8 }}>
            <Text style={{ fontWeight: "600" }}>Email</Text>
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Enter email"
              onChangeText={(email) => setEmailAddress(email)}
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
          {/* </View> */}
          <TouchableOpacity
            onPress={onSignUpPress}
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
              Sign Up
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
          <Text>Already have an account?</Text>
          <Link href="/sign-in">
            <Text style={{ color: "#0a7ea4", fontWeight: "700" }}>Sign in</Text>
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
