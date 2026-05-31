import axios from "axios";
import type { AstralMap } from "../types/astral";
import { mockAstralMap } from "./mockData";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  withCredentials: true,
  timeout: 60000,
});

async function ensureCsrf() {
  await client.get("/sanctum/csrf-cookie");
}

export async function getAstralMap(
  username: string,
  signal?: AbortSignal,
): Promise<AstralMap> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 1500));
    return mockAstralMap(username);
  }
  await ensureCsrf();
  const { data } = await client.post<AstralMap>(
    "/api/astrology/analyze",
    { username },
    { signal },
  );
  return data;
}

export async function regenerateBabelFish(
  username: string,
  signal?: AbortSignal,
): Promise<AstralMap["babel_fish"]> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 800));
    const mock = mockAstralMap(username);
    return mock.babel_fish;
  }
  await ensureCsrf();
  const { data } = await client.post<{ babel_fish: AstralMap["babel_fish"] }>(
    "/api/astrology/babel-fish",
    { username },
    { signal },
  );
  return data.babel_fish;
}
