import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Utilisateur prédéfini
const PREDEFINED_USER = {
  email: "a@gmail.com",
  password: "scanAccess",
};

const API_URL = "https://appweb-gestion-transport-gp2.onrender.com";

export const login = async (email: string, password: string) => {
  try {
    // Vérification de l'utilisateur prédéfini en premier
    if (
      email === PREDEFINED_USER.email &&
      password === PREDEFINED_USER.password
    ) {
      const fakeSessionId = "fake-session-" + Date.now();
      await AsyncStorage.setItem("sessionID", fakeSessionId);
      await AsyncStorage.setItem(
        "sessionData",
        JSON.stringify({
          email: email,
          timestamp: new Date().getTime(),
        })
      );
      return true;
    }

    // Si ce n'est pas l'utilisateur prédéfini, tentative de connexion via l'API
    const response = await axios.post(`${API_URL}/connexion`, {
      username: email,
      password: password,
    });

    if (response.data.sessionID) {
      await AsyncStorage.setItem("sessionID", response.data.sessionID);
      await AsyncStorage.setItem(
        "sessionData",
        JSON.stringify({
          email: email,
          timestamp: new Date().getTime(),
        })
      );
      return true;
    }

    return false;
  } catch (error) {
    console.error("Erreur de connexion:", error);
    return false;
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem("sessionID");
    await AsyncStorage.removeItem("sessionData");
    await AsyncStorage.removeItem("scans");
    return true;
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    return false;
  }
};

export const checkSession = async () => {
  try {
    const session = await AsyncStorage.getItem("sessionID");
    return session;
  } catch (error) {
    console.error("Erreur lors de la vérification de la session:", error);
    return null;
  }
};

export const isSessionValid = async (session: string) => {
  try {
    const sessionData = await AsyncStorage.getItem("sessionData");
    if (sessionData) {
      const { timestamp } = JSON.parse(sessionData);
      const currentTime = new Date().getTime();
      const fiveDaysInMilliseconds = 5 * 24 * 60 * 60 * 1000;
      return currentTime - timestamp < fiveDaysInMilliseconds;
    }
    return false;
  } catch (error) {
    console.error(
      "Erreur lors de la vérification de la validité de la session:",
      error
    );
    return false;
  }
};

export const getUserName = async () => {
  try {
    const sessionData = await AsyncStorage.getItem("sessionData");
    if (sessionData) {
      const { email } = JSON.parse(sessionData);
      return email.split("@")[0] || "User"; // Utilise la partie avant @ de l'email comme nom
    }
    return "User";
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du nom d'utilisateur:",
      error
    );
    return "User";
  }
};
