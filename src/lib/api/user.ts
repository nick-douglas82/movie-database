import router from "../../router";
import defaultOptions from "./defaultOptions";
import { useUserStore } from "../../store";
import { apiFetch } from "../api";
import { User } from "./types";

// Types
type UnauthenticatedUser = {
  auth: false;
};

type AuthenticatedUser = {
  auth: true;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export type AuthUser = UnauthenticatedUser | AuthenticatedUser;

export const checkAuth = async () => {
  return apiFetch<AuthUser>(`/auth`);
};

export const createNewUser = async (email: string, name: string, password: string) => {
  return apiFetch<User>(`auth/register`, {
    method: "POST",
    ...defaultOptions,
    body: JSON.stringify({
      name,
      email,
      password 
    }),
  });
};

export const logInUser = async (email: string, password: string) => {
  return apiFetch<User>(`auth/sign-in`, {
    method: "POST",
    ...defaultOptions,
    body: JSON.stringify({
      email,
      password 
    }),
  })
}

export const logOutUser = async () => {
  apiFetch<void>(`/auth/sign-out`, { method: 'POST', ...defaultOptions }).then(() => {
    const userStore = useUserStore();
    userStore.logUserOut();

    router.push("/");
  });
};
