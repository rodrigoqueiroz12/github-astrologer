import axios from "axios";
import type { AstralMap } from "../types/astral";
import { mockAstralMap } from "./mockData";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  timeout: 8000,
});

export async function getAstralMap(
  username: string,
  signal?: AbortSignal,
): Promise<AstralMap> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 1500));
    return mockAstralMap(username);
  }
  const { data } = await client.get<AstralMap>(`/api/astral/${username}`, {
    signal,
  });
  return data;
}
