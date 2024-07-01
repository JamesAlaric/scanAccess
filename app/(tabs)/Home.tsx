import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { logout, getUserName } from "@/utils/auth";
import Button from "@/components/Button";
import { getScanHistory } from "@/utils/api";
import ScanView from "@/components/scanView";
import { HelloWave } from "@/components/HelloWave";

const Home = () => {
  const router = useRouter();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [scanCount, setScanCount] = useState(0);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const name = await getUserName();
      setUserName(name || "User");
    };
    fetchUserName();
  }, []);

  useEffect(() => {
    updateScanCount();
  }, []);

  const updateScanCount = async () => {
    const history = await getScanHistory();
    setScanCount(history.length);
  };

  const handleLogout = async () => {
    await logout();
    setScanCount(0);
    router.replace("/login");
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logoutButton}
            >
              <Ionicons name="log-out-outline" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        {isCameraOpen ? (
          <ScanView
            onClose={() => setIsCameraOpen(false)}
            onScanComplete={updateScanCount}
          />
        ) : (
          <View style={styles.content}>
            <Text style={styles.welcomeMessage}>
              Happy to see you again, {userName}! <HelloWave/>
            </Text>
            <Text style={styles.title}>Scan Access</Text>

            <View style={styles.statsBox}>
              <Text style={styles.statsTitle}>Scan Statistics</Text>
              <Text style={styles.statsCount}>{scanCount}</Text>
              <Text style={styles.statsLabel}>Total Scans</Text>
            </View>

            <Button
              title="Scan QR Code"
              onPress={() => setIsCameraOpen(true)}
              filled
              style={styles.button}
            />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcomeMessage: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  button: {
    marginTop: 20,
    width: "100%",
  },
  logoutButton: {
    marginRight: 15,
  },
  statsBox: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statsCount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#4a90e2",
  },
  statsLabel: {
    fontSize: 14,
    color: "#666",
  },
});

export default Home;
