import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import { checkSession, isSessionValid } from "@/utils/auth";

const { width, height } = Dimensions.get("window");

const Welcome = () => {
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
    return null; // Or a loading component
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={[Colors.secondary, Colors.primary]}
      >
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Scan</Text>
            <Text style={styles.titleText}>Access</Text>
          </View>
          <Button
            title="Start Now"
            onPress={handleRegister}
            style={styles.button}
          />
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already registered? </Text>
            <Pressable onPress={handleLogin}>
              <Text style={styles.loginLink}>Login here</Text>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.1,
  },
  titleContainer: {
    marginBottom: height * 0.05,
  },
  titleText: {
    fontSize: width * 0.15,
    fontWeight: "800",
    color: Colors.white,
  },
  button: {
    marginTop: height * 0.03,
    width: "100%",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: height * 0.02,
  },
  loginText: {
    color: Colors.white,
    fontSize: width * 0.04,
  },
  loginLink: {
    fontSize: width * 0.04,
    color: Colors.white,
    fontWeight: "bold",
    marginLeft: 4,
  },
});

export default Welcome;
