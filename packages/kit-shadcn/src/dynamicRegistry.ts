import axios from "axios";
import { ComponentData } from "@devmukesh/mcp-core";

// ✅ Declare the component file list
const componentFiles = [
  "accordion.tsx",
  "alert.tsx",
  "alert-dialog.tsx",
  "aspect-ratio.tsx",
  "avatar.tsx",
  "badge.tsx",
  "breadcrumb.tsx",
  "button.tsx",
  "calendar.tsx",
  "card.tsx",
  "carousel.tsx",
  "chart.tsx",
  "checkbox.tsx",
  "collapsible.tsx",
  "command.tsx",
  "context-menu.tsx",
  "dialog.tsx",
  "drawer.tsx",
  "dropdown-menu.tsx",
  "form.tsx",
  "hover-card.tsx",
  "input.tsx",
  "input-otp.tsx",
  "label.tsx",
  "menubar.tsx",
  "navigation-menu.tsx",
  "pagination.tsx",
  "popover.tsx",
  "progress.tsx",
  "radio-group.tsx",
  "resizable.tsx",
  "scroll-area.tsx",
  "select.tsx",
  "separator.tsx",
  "sheet.tsx",
  "sidebar.tsx",
  "skeleton.tsx",
  "slider.tsx",
  "sonner.tsx",
  "switch.tsx",
  "table.tsx",
  "tabs.tsx",
  "textarea.tsx",
  "toast.tsx",
  "toaster.tsx",
  "toggle.tsx",
  "toggle-group.tsx",
  "tooltip.tsx"
];

// ✅ GitHub base URL
const BASE_URL = "https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/registry/default/ui";

export async function generateComponentRegistry(): Promise<Record<string, ComponentData>> {
  const registry: Record<string, ComponentData> = {};

  await Promise.all(
    componentFiles.map(async (fileName) => {
      const name = fileName.replace(".tsx", "");
      const url = `${BASE_URL}/${fileName}`;

      try {
        const res = await axios.get(url);
        const tsx = res.data;

        registry[name] = {
          code: {
            tsx,
            css: ""
          },
          metadata: {
            name,
            version: "0.1.0",
            tags: [],
            themes: ["default"]
          }
        };
      } catch (err) {
        console.error(`❌ Failed to fetch ${name}: ${(err instanceof Error ? err.message : String(err))}`);
      }
    })
  );

  return registry;
}
