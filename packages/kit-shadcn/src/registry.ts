import { ComponentData } from "@mcp/core";

export const componentRegistry: Record<string, ComponentData> = {
  button: {
    code: {
      tsx: `<button className="bg-primary text-white py-2 px-4 rounded">Click me</button>`,
      css: `.bg-primary { background-color: #1d4ed8; }`
    },
    previewUrl: "https://dummycdn.com/previews/button.png",
    metadata: {
      name: "button",
      version: "0.1.0",
      tags: ["action", "form"],
      themes: ["default"]
    }
  }
};
