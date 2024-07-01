import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import { checkSession, isSessionValid } from "@/utils/auth";

const welcome = () => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await checkSession();
      if (session) {
        const isValid = await isSessionValid(session);
        if (isValid) {
          router.replace("/Home");
        } else {
          router.replace("/login");
        }
      } else {
        setIsChecking(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/goRegister");
  };

  if (isChecking) {
    return null; // Ou un composant de chargement
  }

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[Colors.secondary, Colors.primary]}
    >
      <View
        style={{
          paddingHorizontal: 22,
          position: "absolute",
          top: 450,
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 55,
            fontWeight: 800,
            color: Colors.white,
          }}
        >
          {" "}
          Scan{" "}
        </Text>
        <Text
          style={{
            fontSize: 60,
            fontWeight: 800,
            left: 15,
            color: Colors.white,
          }}
        >
          {" "}
          Access
        </Text>

        <Button
          title="Start Now"
          onPress={handleRegister}
          style={{
            marginTop: 50,
            width: "100%",
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ color: Colors.white, fontSize: 15 }}>
            Already register?{" "}
          </Text>
          <Pressable onPress={handleLogin}>
            <Text
              style={{
                fontSize: 15,
                color: Colors.white,
                fontWeight: "bold",
                marginLeft: 4,
              }}
            >
              Login here
            </Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

export default welcome;

const styles = StyleSheet.create({});
