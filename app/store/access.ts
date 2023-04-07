import { create } from "zustand";
import { persist } from "zustand/middleware";
import { queryMeta } from "../utils";

export interface AccessControlStore {
  proxyUrl: string;
  accessCode: string;
  token: string;

  updateToken: (_: string) => void;
  updateProxyUrl: (_: string) => void;
  updateCode: (_: string) => void;
  enabledAccessControl: () => boolean;
}

export const ACCESS_KEY = "access-control";

export const useAccessStore = create<AccessControlStore>()(
  persist(
    (set, get) => ({
      token: "",
      accessCode: "",
      proxyUrl: "",
      enabledAccessControl() {
        return queryMeta("access") === "enabled";
      },
      updateCode(code: string) {
        set((state) => ({ accessCode: code }));
      },
      updateToken(token: string) {
        set((state) => ({ token }));
      },
      updateProxyUrl(proxyUrl) {
        set((state) => ({ proxyUrl }));
      },
    }),
    {
      name: ACCESS_KEY,
      version: 1,
    },
  ),
);
