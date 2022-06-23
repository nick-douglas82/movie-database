import router from "../../router";
import defaultOptions from "./defaultOptions";
import { useErrorStore, useUserStore, useTransactionStore } from "../../store";

export const checkAuth = async (): Promise<Response> => {
  const transactionStore = useTransactionStore();

  transactionStore.setIsLoading(true);

  return await fetch(`${import.meta.env.VITE_LOCAL_DB_API}/api/auth`, {
    method: "POST",
    ...defaultOptions,
  });
};

export const createNewUser = async (email: string, name: string, password: string): Promise<void> => {
  const errorStore = useErrorStore();
  const transactionStore = useTransactionStore();

  transactionStore.setIsLoading(true);

  const response = await fetch(`${import.meta.env.VITE_LOCAL_DB_API}/api/auth/register`, {
    method: "POST",
    ...defaultOptions,
    body: JSON.stringify({ email, name, password }),
  });
  if (response.status >= 200 && response.status <= 299) {
    router.push("/");
  } else {
    errorStore.addError(`Error logging in: ${await response.text()}`);
  }
  transactionStore.setIsLoading(false);
};

export const logInUser = async (email: string, password: string): Promise<void> => {
  const userStore = useUserStore();
  const errorStore = useErrorStore();
  const transactionStore = useTransactionStore();

  transactionStore.setIsLoading(true);

  const response = await fetch(`${import.meta.env.VITE_LOCAL_DB_API}/api/auth/sign-in`, {
    method: "POST",
    ...defaultOptions,
    body: JSON.stringify({ email, password }),
  });

  if (response.status >= 200 && response.status <= 299) {
    const user = await response.json();
    userStore.logUserIn(user.user);
    router.push("/");
  } else {
    errorStore.addError(`Error logging in: ${await response.text()}`);
  }
  transactionStore.setIsLoading(false);
};

export const logOutUser = async (): Promise<void> => {
  const userStore = useUserStore();
  const errorStore = useErrorStore();
  const transactionStore = useTransactionStore();

  transactionStore.setIsLoading(true);

  const response = await fetch(`${import.meta.env.VITE_LOCAL_DB_API}/api/auth/sign-out`, {
    method: "POST",
    ...defaultOptions,
  });

  if (response.status >= 200 && response.status <= 299) {
    userStore.logUserOut();
    router.push("/");
  } else {
    errorStore.addError(`Error logging in: ${await response.text()}`);
  }
  transactionStore.setIsLoading(false);
};