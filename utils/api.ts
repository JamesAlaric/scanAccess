import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScanItem } from "@/types";

const API_URL = "https://appweb-gestion-transport-gp2.onrender.com";

// Fonction utilitaire pour obtenir le sessionID
const getSessionId = async () => {
  return await AsyncStorage.getItem("sessionID");
};

// Fonction pour récupérer tous les étudiants
export const getAllStudents = async () => {
  try {
    const sessionID = await getSessionId();
    const response = await axios.get(`${API_URL}/etudiantC`, {
      params: { sessionID },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des étudiants:", error);
    throw error;
  }
};

// Fonction pour récupérer un étudiant par son ID
export const getStudentById = async (id: string) => {
  try {
    const sessionID = await getSessionId();
    const response = await axios.get(`${API_URL}/etudiantC/${id}`, {
      params: { sessionID },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'étudiant:", error);
    throw error;
  }
};

// Fonction pour récupérer un étudiant par son matricule
export const getStudentByMatricule = async (matricule: string) => {
  try {
    const sessionID = await getSessionId();
    const response = await axios.get(`${API_URL}/etudiantC/matricule`, {
      params: { sessionID, matricule },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'étudiant:", error);
    throw error;
  }
};

// Fonction pour vérifier l'accès d'un étudiant
export const checkStudentAccess = async (matricule: string) => {
  try {
    const student = await getStudentByMatricule(matricule);
    return student.isEnabled;
  } catch (error) {
    console.error(
      "Erreur lors de la vérification de l'accès de l'étudiant:",
      error
    );
    throw error;
  }
};

// Fonction pour enregistrer un scan dans l'historique
export const saveScanToHistory = async (
  studentData: any,
  isEnabled: boolean
) => {
  try {
    const scans = await AsyncStorage.getItem("scans");
    let scanHistory = scans ? JSON.parse(scans) : [];

    scanHistory.push({
      student: studentData,
      isEnabled: isEnabled,
      timestamp: new Date().toISOString(),
    });

    await AsyncStorage.setItem("scans", JSON.stringify(scanHistory));
  } catch (error) {
    console.error(
      "Error during loading to History:",
      error
    );
    throw error;
  }
};

// Fonction pour récupérer l'historique des scans
export const getScanHistory = async (): Promise<ScanItem[]> => {
    try {
      const scans = await AsyncStorage.getItem('scans');
      if (scans) {
        const parsedScans = JSON.parse(scans);
        return parsedScans.map((scan: any) => ({
          student: {
            nom: scan.student?.nom || 'N/A',
            prenom: scan.student?.prenom || 'N/A',
            classe: {
              libele: scan.student?.classe?.libele || 'N/A'
            }
          },
          isEnabled: !!scan.isEnabled,
          timestamp: scan.timestamp || new Date().toISOString()
        }));
      }
      return [];
    } catch (error) {
      console.error("Erreur lors de la récupération de l'historique des scans:", error);
      return [];
    }
  };

export const clearScanHistory = async () => {
  try {
    await AsyncStorage.removeItem("scans");
  } catch (error) {
    console.error(
      "Erreur lors de la suppression de l'historique des scans:",
      error
    );
    throw error;
  }
};

// Fonction principale pour scanner un étudiant
export const scanStudent = async (matricule: string) => {
  try {
    const student = await getStudentByMatricule(matricule);
    const isEnabled = await checkStudentAccess(matricule);
    await saveScanToHistory(student, isEnabled);
    return { student, isEnabled };
  } catch (error) {
    console.error("Erreur lors du scan de l'étudiant:", error);
    throw error;
  }
};
