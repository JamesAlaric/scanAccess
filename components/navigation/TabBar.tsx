import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TabBarIcon } from "./TabBarIcon";
import { ComponentProps } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";

type IconName = ComponentProps<typeof Ionicons>["name"];

interface TabIconConfig {
  outline: IconName;
  filled: IconName;
}

const tabIconMap: { [key: string]: TabIconConfig } = {
  Home: { outline: "home-outline", filled: "home" },
  History: { outline: "albums-outline", filled: "albums" },
  // Ajoutez d'autres routes et paires d'icônes selon vos besoins
};

const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const primaryColor = Colors.primary;
  const greyColor = Colors.gray;

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const color = isFocused ? primaryColor : greyColor;
        const iconConfig = tabIconMap[route.name] || {
          outline: "help-circle-outline",
          filled: "help-circle",
        };
        const iconName = isFocused ? iconConfig.filled : iconConfig.outline;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
          >
            {options.tabBarIcon ? (
              options.tabBarIcon({ focused: isFocused, color, size: 28 })
            ) : (
              <TabBarIcon name={iconName} color={color} />
            )}
            <Text style={[styles.tabLabel, { color }]}>
              {typeof label === "string" ? label : ""}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: "row",
    position: "absolute",
    bottom: 25,
    backgroundColor: "white",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
  },
});

export default TabBar;
