import { MCPProvider, ComponentData, ComponentMeta } from "@devmukesh/mcp-core";
import { generateComponentRegistry } from "./dynamicRegistry";

let cache: Record<string, ComponentData> | null = null;

async function loadRegistry(): Promise<Record<string, ComponentData>> {
  if (!cache) {
    cache = await generateComponentRegistry();
  }
  return cache;
}

export const ShadcnProvider: MCPProvider = {
  async listComponents(): Promise<ComponentMeta[]> {
    const registry = await loadRegistry();
    return Object.values(registry).map((comp) => comp.metadata);
  },

  async getComponent(name: string): Promise<ComponentData | null> {
    const registry = await loadRegistry();
    return registry[name] ?? null;
  }
};
