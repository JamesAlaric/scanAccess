import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { CameraView, BarcodeScanningResult } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { scanStudent } from "@/utils/api";

interface ScanViewProps {
  onClose: () => void;
  onScanComplete: () => void;
}

const ScanView: React.FC<ScanViewProps> = ({ onClose, onScanComplete }) => {
  const [isScanning, setIsScanning] = useState(false);

  const handleBarCodeScanned = async (result: BarcodeScanningResult) => {
    if (result.data && !isScanning) {
      setIsScanning(true);
      const timeoutId = setTimeout(() => {
        setIsScanning(false);
        alert("Scan took too long. Please Retry.");
        onClose();
      }, 90000);
      try {
        const { student, isEnabled } = await scanStudent(result.data);
        alert(
          isEnabled
            ? `Student ${student.nom} ${student.prenom} has access to transportation.`
            : `This student does not have access to transportation.`
        );
      } catch (error) {
        console.error("Error while verifying student:", error);
        alert("Error while verifying student.");
      } finally {
        setIsScanning(false);
        onScanComplete();
        onClose();
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={isScanning ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.unfocusedContainer} />
          <View style={styles.middleContainer}>
            <View style={styles.unfocusedContainer} />
            <View style={styles.focusedContainer} />
            <View style={styles.unfocusedContainer} />
          </View>
          <View style={styles.unfocusedContainer} />
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close-circle" size={32} color="white" />
        </TouchableOpacity>
        {isScanning && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.loadingText}>
              Checking access, please wait...
            </Text>
          </View>
        )}
        <View style={styles.scanInstructionContainer}>
          <Text style={styles.scanInstruction}>
            Align QR code within the frame to scan
          </Text>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  unfocusedContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  middleContainer: {
    flexDirection: "row",
    flex: 1.5,
  },
  focusedContainer: {
    flex: 6,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  scanInstructionContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
  },
  scanInstruction: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 10,
    borderRadius: 5,
  },
});

export default ScanView;
