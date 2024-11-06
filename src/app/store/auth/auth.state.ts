import { UserInfo } from "@app/models"

export interface AuthState {
  loader: boolean;
  userInfo: UserInfo | null;
  successMessage: string;
  errorMessage: string;
}