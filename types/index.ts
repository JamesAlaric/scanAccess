export interface ScanItem {
  student: {
    nom?: string;
    prenom?: string;
    classe?: {
      libele?: string;
    };
  };
  isEnabled: boolean;
  timestamp: string;
}
