import { Tabs } from "expo-router";
import TabBar from "@/components/navigation/TabBar";

const TabLayout = () => {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: true,
      }}
    >
      <Tabs.Screen name="Home" options={{ title: "Home" }} />
      <Tabs.Screen name="History" options={{ title: "History" }} />
    </Tabs>
  );
};

export default TabLayout;
