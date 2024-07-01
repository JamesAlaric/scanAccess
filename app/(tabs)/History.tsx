import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, Stack } from "expo-router";
import { getScanHistory, clearScanHistory } from "@/utils/api";
import { ScanItem } from "@/types";

const History = () => {
  const [history, setHistory] = useState<ScanItem[]>([]);
  const [filter, setFilter] = useState<"all" | "authorized" | "unauthorized">(
    "all"
  );

  const loadHistory = useCallback(async () => {
    const scanHistory = await getScanHistory();
    setHistory(scanHistory);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [loadHistory])
  );

  const handleClearHistory = () => {
    Alert.alert(
      "Clear History",
      "Are you sure you want to clear all scan history?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: async () => {
            await clearScanHistory();
            setHistory([]);
          },
        },
      ]
    );
  };

  const filteredHistory = history.filter((item) => {
    if (filter === "all") return true;
    if (filter === "authorized") return item.isEnabled;
    if (filter === "unauthorized") return !item.isEnabled;
    return true;
  });

  const renderItem = ({ item }: { item: ScanItem }) => (
    <View style={styles.item}>
      <View style={styles.itemHeader}>
        <Text style={styles.name}>{`${item.student?.nom || "N/A"} ${
          item.student?.prenom || "N/A"
        }`}</Text>
        <Text
          style={[
            styles.status,
            item.isEnabled ? styles.statusEnabled : styles.statusDisabled,
          ]}
        >
          {item.isEnabled ? "Authorized" : "Unauthorized"}
        </Text>
      </View>
      <Text style={styles.class}>{item.student?.classe?.libele || "N/A"}</Text>
      <Text style={styles.timestamp}>
        {new Date(item.timestamp).toLocaleString()}
      </Text>
    </View>
  );

  const EmptyListComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="document-text-outline" size={100} color="#ccc" />
      <Text style={styles.emptyText}>No scan history available</Text>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "History",
          headerRight: () => (
            <TouchableOpacity
              onPress={handleClearHistory}
              style={styles.headerButton}
            >
              <Ionicons name="trash-outline" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "all" && styles.activeFilter,
            ]}
            onPress={() => setFilter("all")}
          >
            <Text style={styles.filterText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "authorized" && styles.activeFilter,
            ]}
            onPress={() => setFilter("authorized")}
          >
            <Text style={styles.filterText}>Authorized</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "unauthorized" && styles.activeFilter,
            ]}
            onPress={() => setFilter("unauthorized")}
          >
            <Text style={styles.filterText}>Unauthorized</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredHistory}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={EmptyListComponent}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#fff",
  },
  filterButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },
  activeFilter: {
    backgroundColor: "#4a90e2",
  },
  filterText: {
    color: "#333",
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  item: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 5,
    borderRadius: 5,
  },
  statusEnabled: {
    backgroundColor: "#4CAF50",
    color: "white",
  },
  statusDisabled: {
    backgroundColor: "#F44336",
    color: "white",
  },
  class: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  timestamp: {
    fontSize: 14,
    color: "#999",
  },
  headerButton: {
    marginRight: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
    marginTop: 10,
  },
});

export default History;
