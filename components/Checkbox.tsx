import React from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  color?: string;
  style?: ViewStyle;
  disabled?: boolean;
}

function Checkbox({
  value,
  onValueChange,
  color,
  style,
  disabled = false,
}: CheckboxProps): JSX.Element {
  return (
    <Pressable
      style={[
        styles.checkboxBase,
        value && styles.checkboxChecked,
        value && color ? { backgroundColor: color } : {},
        disabled && styles.checkboxDisabled,
        style,
      ]}
      onPress={() => !disabled && onValueChange(!value)}
      disabled={disabled}
    >
      {value && (
        <Ionicons
          name="checkmark"
          size={18}
          color={disabled ? "gray" : "white"}
          style={styles.checkIcon}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkboxBase: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: "#000",
  },
  checkboxDisabled: {
    opacity: 0.5,
  },
  checkIcon: {
    alignSelf: "center",
  },
});

export default Checkbox;
