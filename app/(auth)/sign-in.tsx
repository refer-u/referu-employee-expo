import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { OAuthButton } from "../_components/OAuthButton";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendCode = async () => {
    if (!isLoaded) return;

    if (!email.trim()) {
      setError("Enter email");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await signIn.create({
        identifier: email,
        strategy: "email_code",
      });

      setStep("code");
    } catch (err: any) {
      setError("Error");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    if (!code.trim()) {
      setError("Enter your code");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await signIn?.attemptFirstFactor({
        strategy: "email_code",
        code,
      });

      if (res?.status === "complete") {
        if (!setActive) return;

        await setActive({ session: res.createdSessionId });
        router.replace("/");
      }
    } catch (err) {
      setError("Code is not valid");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f6ff",
      }}
    >
      <View
        style={{
          width: 320,
          backgroundColor: "#ffffff",
          borderRadius: 24,
          paddingVertical: 32,
          paddingHorizontal: 28,
          flexDirection: "column",
          gap: 48,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        <Text style={{ color: "black", fontWeight: "700", fontSize: 28 }}>
          {step === "email" ? "Sign in to Refer-U" : "Verify code"}
        </Text>

        {step === "email" && (
          <View style={{ flexDirection: "column", gap: 50 }}>
            <View style={{ flexDirection: "column", gap: 12 }}>
              <Text style={{ fontWeight: "600", fontSize: 18 }}>Email</Text>
              <View style={{ flexDirection: "column", gap: 10 }}>
                <TextInput
                  autoCapitalize="none"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#737373",
                    paddingVertical: 6,
                    letterSpacing: 0,
                  }}
                />
                {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
              </View>
            </View>

            <TouchableOpacity
              onPress={sendCode}
              disabled={loading}
              style={{
                backgroundColor: "#0a7ea4",
                padding: 14,
                borderRadius: 12,
                alignItems: "center",
                marginTop: 10,
              }}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                  Send code
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {step === "code" && (
          <View style={{ flexDirection: "column", gap: 50 }}>
            <View style={{ flexDirection: "column", gap: 12 }}>
              <Text style={{ fontWeight: "600", fontSize: 18 }}>
                Verification code
              </Text>
              <View style={{ flexDirection: "column", gap: 10 }}>
                <TextInput
                  value={code}
                  onChangeText={setCode}
                  keyboardType="number-pad"
                  placeholder="123456"
                  maxLength={6}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#737373",
                    paddingVertical: 6,
                    letterSpacing: 33,
                    fontSize: 18,
                  }}
                />
                {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
              </View>
            </View>

            <TouchableOpacity
              onPress={verifyCode}
              disabled={loading}
              style={{
                backgroundColor: "#0a7ea4",
                padding: 14,
                borderRadius: 12,
                alignItems: "center",
                marginTop: 10,
              }}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={{ color: "#fff", fontWeight: "600" }}>Verify</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        <OAuthButton />
      </View>
    </View>
  );
}
