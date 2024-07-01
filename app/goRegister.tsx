import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const GoRegister = () => {
  const navigation = useNavigation();

  const handleEmailPress = () => {
    Linking.openURL("mailto:transport@uisj.edu");
  };

  const handlePhonePress = () => {
    Linking.openURL("tel:+22012345678");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color={Colors.text} />
      </TouchableOpacity>
      <View style={styles.content}>
        <Ionicons
          name="bus-outline"
          size={120}
          color={Colors.primary}
          style={styles.icon}
        />
        <Text style={styles.title}>Registration Required</Text>
        <Text style={styles.subtitle}>
          To register, please contact the UISJ transportation service
        </Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoText} onPress={handleEmailPress}>
            transport@uisj.edu
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Phone:</Text>
          <Text style={styles.infoText} onPress={handlePhonePress}>
            +237 243 245 678
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 22,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: Colors.text,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginRight: 8,
  },
  infoText: {
    fontSize: 16,
    color: Colors.primary,
    textDecorationLine: "underline",
  },
});

export default GoRegister;
