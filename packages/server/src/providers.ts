import { MCPProvider } from "@mcp/core";
import { ShadcnProvider } from "@mcp/kit-shadcn";

export const providers: Record<string, MCPProvider> = {
  shadcn: new ShadcnProvider()
};
