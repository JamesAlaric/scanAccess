import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  filled?: boolean;
  color?: string;
  style?: object;
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  const filledBgColor = props.color || Colors.primary;
  const outlinedColor = Colors.white;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = props.filled ? Colors.white : Colors.primary;

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...{ backgroundColor: bgColor },
        ...(props.disabled && styles.buttonDisabled),
        ...props.style,
      }}
      onPress={props.onPress}
      disabled={props.disabled || props.loading}
    >
      {props.loading ? (
        <ActivityIndicator
          color={props.filled ? Colors.white : Colors.primary}
        />
      ) : (
        <Text
          style={{
            fontSize: 18,
            color: props.disabled ? Colors.gray : textColor,
          }}
        >
          {props.title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});

export default Button;
