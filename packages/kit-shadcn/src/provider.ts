import { MCPProvider, ComponentData, ComponentMeta } from "@mcp/core";
import { componentRegistry } from "./registry";

export class ShadcnProvider implements MCPProvider {
  async getComponent(name: string): Promise<ComponentData | null> {
    return componentRegistry[name] ?? null;
  }

  async listComponents(): Promise<ComponentMeta[]> {
    return Object.values(componentRegistry).map(c => c.metadata);
  }
}
