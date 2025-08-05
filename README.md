# 🧩 Modular Component Provider (MCP) Server

A pluggable MCP server for accessing reusable UI components from multiple design systems like **ShadCN** and more — via both **API** and **CLI**.

> 💡 Think of it as an NPM registry, but for ready-to-use UI components — design-system aware, developer-friendly, and instantly sharable.

---

## 📦 Monorepo Structure

This project uses [pnpm workspaces](https://pnpm.io/workspaces) and a monorepo layout:

```
apps/
  demo/            ← optional Next.js visual playground
  server/          ← Express REST API server

packages/
  cli/             ← CLI tool: `mcp list`, `mcp get`, etc.
  core/            ← Shared types and interfaces
  kit-shadcn/      ← ShadCN UI component provider
  kit-<provider>/   ← Provider UI component provider
```

---

## ✨ Features

- 🧩 **Pluggable Kit Support**: ShadCN, Accernity, Comp-UI — or bring your own!
- ⚡ **Dynamic Component Registry**: Pull components live from GitHub or local FS
- 🧠 **Metadata Support**: Tags, themes, versions, and more
- 🌐 **REST API Server**: Fast Express API with endpoints for list + retrieval
- 💻 **CLI Tool**: Fetch components into your project using `mcp` commands
- 📁 **Filesystem or GitHub-based**: Flexible registry loading strategy

---

## 🚀 Getting Started

### 1️⃣ Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/your-mcp-server
cd your-mcp-server
pnpm install
```

---

### 2️⃣ Start MCP Server

```bash
cd apps/server
pnpm dev
```

The MCP API will be available at:

```
http://localhost:3001/:kit/components
```

Example:

```
http://localhost:3001/shadcn/components/button
```

---

### 3️⃣ Use the CLI Tool

```bash
cd packages/cli
pnpm build
pnpm link --global
```

Now use it globally:

```bash
mcp list shadcn
mcp get shadcn button --out Button.tsx
```

---

## 🧱 How It Works

Each UI kit (e.g. ShadCN) implements its own `MCPProvider`:

```ts
export interface MCPProvider {
  listComponents(): Promise<ComponentMeta[]>;
  getComponent(name: string): Promise<ComponentData | null>;
}
```

The `componentRegistry` can be:
- 🧾 Hardcoded static JSON
- 📂 Local file system scan (e.g., `components/ui/*.tsx`)
- ☁️ Live GitHub repo fetch (`shadcn-ui/ui`)

---

## 🔌 Adding a New Kit

1. Create `packages/kit-yourkit/`
2. Implement the provider:

```ts
export const YourKitProvider: MCPProvider = {
  listComponents: async () => [...],
  getComponent: async (name) => {...}
};
```

3. Register in `apps/server/src/providers.ts`:

```ts
import { YourKitProvider } from "@mcp/kit-yourkit";
export const providers = {
  yourkit: YourKitProvider,
  ...
};
```

---

## 📦 CLI Commands

| Command                                 | Description                                 |
|-----------------------------------------|---------------------------------------------|
| `mcp list <kit>`                        | List all components for a given kit         |
| `mcp get <kit> <name>`                  | Get code for a component                    |
| `mcp get <kit> <name> --out Button.tsx` | Save component to file                      |

---

## 🧪 Example Output

```bash
$ mcp list shadcn

button     - 0.1.0
input      - 0.1.0
accordion  - 0.1.0
```

```bash
$ mcp get shadcn button

🧩 button.tsx
--------------------------------
<button className="...">Click me</button>
```

---

## 📁 Component Schema (Example)

```ts
interface ComponentData {
  code: {
    tsx: string;
    css?: string;
  };
  previewUrl?: string;
  metadata: ComponentMeta;
}

interface ComponentMeta {
  name: string;
  version: string;
  tags?: string[];
  themes?: string[];
}
```

---

## 🌍 REST API Endpoints

| Method | Route                                     | Description                      |
|--------|-------------------------------------------|----------------------------------|
| GET    | `/shadcn/components`                      | List all components              |
| GET    | `/shadcn/components/:name`                | Get single component             |
| GET    | `/lit-name/components/:name`              | Get from another kit             |

---

## 🔧 Roadmap Ideas

- [ ] Add support for theme variations
- [ ] Add preview URLs and screenshots
- [ ] Add local caching for GitHub fetches
- [ ] Support for remote component registries
- [ ] Add `mcp search` CLI support
- [ ] CLI scaffolding (`mcp init`) for new projects

---

## 🤝 Contributing

1. Clone
2. Create a new branch
3. Run the server and CLI locally
4. Add your kit or improvement
5. PR it!

---

## ⚖️ License

MIT © 2025 

---

> Built with love for frontend developers who want composable, scalable UI systems — no vendor lock-in.