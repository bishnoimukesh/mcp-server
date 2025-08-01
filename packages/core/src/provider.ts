import { ComponentData, ComponentMeta } from "./types";

export interface MCPProvider {
  getComponent(name: string): Promise<ComponentData | null>;
  listComponents(): Promise<ComponentMeta[]>;
}
