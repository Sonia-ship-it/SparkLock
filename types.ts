
export enum Screen {
  LANDING = 'LANDING',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  OTP = 'OTP',
  RESET_PASSWORD = 'RESET_PASSWORD',
  SUCCESS = 'SUCCESS',
  PROFILE_STEP_1 = 'PROFILE_STEP_1',
  PROFILE_STEP_2 = 'PROFILE_STEP_2',
  DASHBOARD = 'DASHBOARD',
  ANALYTICS = 'ANALYTICS',
  CONTROLS = 'CONTROLS',
  HISTORY = 'HISTORY',
  QR_SCAN = 'QR_SCAN'
}

export interface HistoryItem {
  id: string;
  type: string;
  date: string;
  time: string;
  location: string;
  message: string;
}

export interface ControlDevice {
  id: string;
  name: string;
  location: string;
  status: boolean;
  amps: number;
}
