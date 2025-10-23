import api from "@/utils/apiClient";

export const loginAPI = (email: string, password: string) =>
  api.post("/login/", { email, password }).then(res => res.data);

export const registerAPI = (data: any) =>
  api.post("/register/", data).then(res => res.data);

export const refreshTokenAPI = (refreshToken: string) =>
  api.post("/refresh/", { refresh: refreshToken }).then(res => res.data);
