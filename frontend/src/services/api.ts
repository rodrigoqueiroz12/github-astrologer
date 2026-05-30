import axios from "axios";
import type { AstralMap } from "../types/astral";
import { mockAstralMap } from "./mockData";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

const client = axios.create({
  withCredentials: true,
  timeout: 60000,
});

export async function getAstralMap(
  username: string,
  signal?: AbortSignal,
): Promise<AstralMap> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 1500));
    return mockAstralMap(username);
  }
  await client.get("/sanctum/csrf-cookie");
  const { data } = await client.post<AstralMap>(
    "/api/astrology/analyze",
    { username },
    { signal },
  );
  return data;
}
