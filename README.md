# 🧩 MCP Server - Unified Component Provider

A comprehensive, unified package for accessing reusable UI components from multiple design systems like **ShadCN UI**, **Material UI**, and more — via both **REST API** and **CLI tools**.

> 💡 Think of it as an NPM registry, but specifically for ready-to-use UI components — design-system aware, developer-friendly, instantly sharable, and completely vendor-agnostic.

![Demo Screenshot](https://via.placeholder.com/800x400/1e40af/ffffff?text=MCP+Server+Demo)

---

## 📦 Installation

### Global Installation (Recommended for CLI)
```bash
npm install -g @devmukesh/mcp-server
```

### Local Installation (For programmatic usage)
```bash
npm install @devmukesh/mcp-server
```

---

## ⚡ Quick Start

### CLI Usage
```bash
# List all available components from ShadCN
mcp list shadcn

# Get a specific component
mcp get shadcn button

# Save component to file
mcp get shadcn button --out Button.tsx

# Get component with custom name
mcp get shadcn button --out CustomButton.tsx
```

### Server Usage
```bash
# Start the MCP server (if using source)
npm run dev

# Access REST API
curl http://localhost:3001/shadcn/components
curl http://localhost:3001/shadcn/components/button
```

### Programmatic Usage
```typescript
import { MCPServer, ShadcnProvider } from '@devmukesh/mcp-server';

// Use the ShadCN provider
const provider = new ShadcnProvider();
const components = await provider.listComponents();
const buttonCode = await provider.getComponent('button');

// Or start the server programmatically
const server = new MCPServer();
server.listen(3001);
```

---

## 🌟 Key Features

- 🧩 **Pluggable Architecture**: Support for multiple UI kit providers (ShadCN, Aceternity, etc.)
- 📦 **Unified Package**: Single installation for CLI, server, and programmatic usage
- ⚡ **Dynamic Component Registry**: Real-time component fetching from GitHub repositories
- 🌐 **REST API Server**: Fast Express.js API with comprehensive endpoints
- 🖥️ **CLI Tool**: Developer-friendly command-line interface with file output
- 🎨 **Beautiful Demo App**: Next.js showcase with Tailwind CSS styling
- 📊 **Rich Metadata**: Tags, themes, versions, and component information
- 🔄 **Live Updates**: Components are fetched fresh from source repositories
- 🏗️ **TypeScript First**: Full type safety across the entire stack
- 📦 **Monorepo Structure**: Well-organized workspace with pnpm
- 🎯 **Zero Vendor Lock-in**: Framework agnostic and extensible

---

## � Available Commands

### CLI Commands
```bash
# List components from a kit
mcp list <kit>
mcp list shadcn

# Get component code
mcp get <kit> <component>
mcp get shadcn button

# Save to file
mcp get <kit> <component> --out <filename>
mcp get shadcn button --out Button.tsx

# Show help
mcp --help
mcp get --help
```

### REST API Endpoints
```bash
# List all components from a kit
GET /{kit}/components

# Get specific component
GET /{kit}/components/{name}

# Example endpoints
GET /shadcn/components
GET /shadcn/components/button
GET /shadcn/components/card
```

---

## 🎯 Supported Component Kits

### ShadCN UI
- **Package**: Included in `@devmukesh/mcp-server`
- **Components**: 50+ production-ready components
- **Source**: [shadcn/ui](https://github.com/shadcn-ui/ui)
- **Usage**: `mcp list shadcn` | `mcp get shadcn button`

### Coming Soon
- **Aceternity UI** - Modern animated components
- **Radix UI** - Low-level UI primitives  
- **Mantine** - Feature-rich components library
- **Custom Providers** - Add your own component libraries

### Adding New Providers
The pluggable architecture makes it easy to add any UI kit:

```bash
# 1. Create new provider package
mkdir packages/kit-yourkit
cd packages/kit-yourkit

# 2. Implement MCPProvider interface
# 3. Register in server providers
# 4. Use: mcp list yourkit
```

💡 **See [🔌 Adding New Component Kits](#-adding-new-component-kits) section below for detailed guide.**

---

## 🏗️ Project Architecture & Folder Structure

This project uses [pnpm workspaces](https://pnpm.io/workspaces) with a clean monorepo structure that supports pluggable UI kit providers:

```
📁 mcp-server/
├── 📁 apps/
│   ├── 📁 demo/                    ← Next.js demo application
│   │   ├── app/
│   │   │   ├── page.tsx           ← Beautiful component gallery
│   │   │   ├── component/[name]/  ← Individual component viewer
│   │   │   └── layout.tsx
│   │   ├── libs/mcp.ts            ← API client functions
│   │   └── package.json
├── 📁 packages/
│   ├── 📁 core/                    ← Shared types and interfaces
│   │   ├── src/
│   │   │   ├── types.ts           ← Component data structures
│   │   │   ├── provider.ts        ← MCPProvider interface
│   │   │   └── index.ts
│   │   └── package.json
│   ├── 📁 kit-shadcn/              ← ShadCN UI provider implementation
│   │   ├── src/
│   │   │   ├── provider.ts        ← ShadCN provider implementation
│   │   │   ├── registry.ts        ← Static component registry
│   │   │   └── index.tsx
│   │   └── package.json
│   ├── 📁 server/                  ← Express.js REST API server
│   │   ├── src/
│   │   │   ├── index.ts           ← Server entry point
│   │   │   └── providers.ts       ← Kit provider registry
│   │   └── package.json
│   └── 📁 cli/                     ← Command-line interface
│       ├── src/index.ts           ← CLI commands and logic
│       └── package.json
├── 📁 dist/                        ← Compiled unified package
│   ├── index.js                   ← Main entry point
│   ├── cli.mjs                    ← CLI executable
│   └── *.d.ts                     ← TypeScript declarations
├── 📁 src/                         ← Unified package source
│   ├── index.ts                   ← Re-exports all packages
│   └── cli.ts                     ← CLI entry point
├── pnpm-workspace.yaml             ← Workspace configuration
├── pnpm-lock.yaml
├── tsconfig.json                   ← TypeScript configuration
├── tsup.config.ts                  ← Build configuration
└── package.json                    ← Unified package configuration
```

### Pluggable Provider System

The architecture supports adding new UI kit providers easily:

```typescript
// 1. Implement the MCPProvider interface
interface MCPProvider {
  listComponents(): Promise<ComponentMeta[]>;
  getComponent(name: string): Promise<ComponentData>;
}

// 2. Create your provider (e.g., packages/kit-yourkit/)
class YourKitProvider implements MCPProvider {
  async listComponents() { /* your implementation */ }
  async getComponent(name: string) { /* your implementation */ }
}

// 3. Register in server (packages/server/src/providers.ts)
export const providers = {
  shadcn: new ShadcnProvider(),
  yourkit: new YourKitProvider(),  // Add your provider
};
```

### Package Exports

The unified package exports everything from its internal packages:

```typescript
// Main exports from @devmukesh/mcp-server
export * from './packages/core/dist/index';      // Types & interfaces
export * from './packages/kit-shadcn/dist/index'; // ShadCN provider  
export * from './packages/server/dist/index';     // Express server
```
│   ├── index.js          ← Main entry point
│   ├── cli.mjs           ← CLI executable
│   └── *.d.ts            ← TypeScript declarations
└── package.json          ← Unified package configuration
```

---

## 🚀 Development Setup

If you want to contribute or run from source:

### Prerequisites
- **Node.js** 18+ 
- **pnpm** 8+ (recommended package manager)
- **Git** (for cloning the repository)

### 1️⃣ Clone and Install

```bash
# Clone the repository
git clone https://github.com/bishnoimukesh/mcp-server.git
cd mcp-server

# Install all dependencies using pnpm workspaces
pnpm install
```

### 2️⃣ Build and Start

```bash
# Build all packages
pnpm build

# Start the MCP server
pnpm dev
```

The MCP API will be available at: **http://localhost:3001**

### 3️⃣ Test the CLI

```bash
# Test CLI commands
node dist/cli.mjs list shadcn
node dist/cli.mjs get shadcn button
```

### 4️⃣ Launch the Demo App (Optional)

```bash
# In a new terminal, start the demo app
cd apps/demo
pnpm run dev
```

The demo application will be available at: **http://localhost:3000**

---

## 🔧 Package Scripts

```bash
# Root package commands
pnpm build          # Build all packages
pnpm dev            # Start the development server
pnpm test           # Run tests (when available)

# Individual package builds (from root)
pnpm -r build       # Build all packages recursively
pnpm -F core build  # Build only core package
```

---

## 📚 API Reference

### ShadCN Provider

```typescript
import { ShadcnProvider } from '@devmukesh/mcp-server';

const provider = new ShadcnProvider();

// List all components
const components = await provider.listComponents();
// Returns: ComponentData[]

// Get component code
const buttonCode = await provider.getComponent('button');
// Returns: ComponentData with code property
```

### Server Usage

```typescript
import { MCPServer } from '@devmukesh/mcp-server';

const server = new MCPServer();
server.listen(3001, () => {
  console.log('MCP Server running on port 3001');
});
```

---

## 🌐 REST API Documentation

### Base URL
```
http://localhost:3001
```

### Available Endpoints

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| `GET` | `/{kit}/components` | List all components for a kit | `ComponentMeta[]` |
| `GET` | `/{kit}/components/{name}` | Get specific component code | `ComponentData` |

### Examples

#### List ShadCN Components
```bash
curl http://localhost:3001/shadcn/components
```

**Response:**
```json
[
  {
    "name": "button",
    "version": "0.1.0",
    "tags": [],
    "themes": ["default"]
  },
  {
    "name": "input",
    "version": "0.1.0", 
    "tags": [],
    "themes": ["default"]
  }
  // ... 44 more components
]
```

#### Get Button Component
```bash
curl http://localhost:3001/shadcn/components/button
```

**Response:**
```json
{
  "code": {
    "tsx": "import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
// ... full component code",
    "css": ""
  },
  "metadata": {
    "name": "button",
    "version": "0.1.0",
    "tags": [],
    "themes": ["default"]
  }
}
```

---

## 💻 CLI Usage Examples

### Installation Check
```bash
# Verify installation
mcp --version
mcp --help
```

### List Components
```bash
# List all components from ShadCN kit
mcp list shadcn
```

**Output:**
```
accordion  -  0.1.0
alert      -  0.1.0
button     -  0.1.0
card       -  0.1.0
input      -  0.1.0
...
```

### Get Components
```bash
# Display component code in terminal
mcp get shadcn button

# Save component to file
mcp get shadcn button --out Button.tsx
mcp get shadcn card --out components/Card.tsx

# Get multiple components
mcp get shadcn button --out Button.tsx
mcp get shadcn input --out Input.tsx
```

### Real-world Examples
```bash
# Set up a new React project with ShadCN components
mkdir my-project && cd my-project
npm init -y

# Get commonly used components
mcp get shadcn button --out src/components/Button.tsx
mcp get shadcn input --out src/components/Input.tsx  
```

---

## 🌐 REST API Documentation

### Base URL
```
http://localhost:3001
```

### Available Endpoints

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| `GET` | `/{kit}/components` | List all components for a kit | `ComponentMeta[]` |
| `GET` | `/{kit}/components/{name}` | Get specific component code | `ComponentData` |

### Examples

#### List ShadCN Components
```bash
curl http://localhost:3001/shadcn/components
```

**Response:**
```json
[
  {
    "name": "button",
    "version": "0.1.0",
    "tags": [],
    "themes": ["default"]
  },
  {
    "name": "input",
    "version": "0.1.0", 
    "tags": [],
    "themes": ["default"]
  }
  // ... 44 more components
]
```

#### Get Button Component
```bash
curl http://localhost:3001/shadcn/components/button
```

**Response:**
```json
{
  "code": {
    "tsx": "import * as React from \"react\"\nimport { Slot } from \"@radix-ui/react-slot\"\n// ... full component code",
    "css": ""
  },
  "metadata": {
    "name": "button",
    "version": "0.1.0",
    "tags": [],
    "themes": ["default"]
  }
}
```

---

## 🧱 Architecture Deep Dive

### Core Interfaces

```typescript
// Component metadata structure
interface ComponentMeta {
  name: string;
  version: string;
  tags?: string[];
  themes?: string[];
}

// Full component data with code
interface ComponentData {
  code: {
    tsx: string;
    css: string;
  };
  metadata: ComponentMeta;
}

// Provider interface that all kits implement
interface MCPProvider {
  listComponents(): Promise<ComponentMeta[]>;
  getComponent(name: string): Promise<ComponentData>;
}
```

### Package Structure

The unified package exports everything from its internal packages:

```typescript
// Main exports from @devmukesh/mcp-server
export * from './packages/core/dist/index';      // Types & interfaces
export * from './packages/kit-shadcn/dist/index'; // ShadCN provider  
export * from './packages/server/dist/index';     // Express server
```

### Provider System

```typescript
// ShadCN Provider Implementation
class ShadcnProvider implements MCPProvider {
  async listComponents(): Promise<ComponentMeta[]> {
    // Fetches from GitHub API or static registry
  }
  
  async getComponent(name: string): Promise<ComponentData> {
    // Downloads component from shadcn/ui repository
  }
}
```

---

## 🎯 Use Cases

### For React Developers
```bash
# Quickly scaffold components for new projects
mcp get shadcn button --out src/components/ui/Button.tsx
mcp get shadcn input --out src/components/ui/Input.tsx
```

### For Design Systems
```typescript
// Integrate with existing build tools
import { ShadcnProvider } from '@devmukesh/mcp-server';

const provider = new ShadcnProvider();
const components = await provider.listComponents();

// Generate component library automatically
for (const comp of components) {
  const data = await provider.getComponent(comp.name);
  await fs.writeFile(`components/${comp.name}.tsx`, data.code.tsx);
}
```

### For Teams
```bash
# Share component standards across team
npm install -g @devmukesh/mcp-server

# Everyone uses the same components
mcp get shadcn button --out Button.tsx
```

### For API Integration
```javascript
// Use REST API in any language/framework
fetch('http://localhost:3001/shadcn/components/button')
  .then(res => res.json())
  .then(data => {
    console.log(data.code.tsx); // Component code
  });
```

---

## 📖 Component Reference

### Available ShadCN Components

| Component | Description | Usage |
|-----------|-------------|--------|
| `accordion` | Collapsible content sections | `mcp get shadcn accordion` |
| `alert` | Alert notifications | `mcp get shadcn alert` |
| `alert-dialog` | Modal alert dialogs | `mcp get shadcn alert-dialog` |
| `avatar` | User profile pictures | `mcp get shadcn avatar` |
| `badge` | Small status indicators | `mcp get shadcn badge` |
| `button` | Interactive buttons | `mcp get shadcn button` |
| ... | *46+ components total* | `mcp list shadcn` |

---

## 🔧 Troubleshooting

### Common Issues

#### CLI Not Working
```bash
# Verify installation
npm list -g @devmukesh/mcp-server

# Reinstall if needed
npm uninstall -g @devmukesh/mcp-server
npm install -g @devmukesh/mcp-server
```

#### Server Connection Issues
```bash
# Check if server is running
curl http://localhost:3001/shadcn/components

# Start server if needed (from source)
cd packages/server && pnpm run dev
```

#### Permission Issues
```bash
# Use sudo if needed for global install
sudo npm install -g @devmukesh/mcp-server

# Or use npx to run without global install
npx @devmukesh/mcp-server list shadcn
```

### Error Messages

| Error | Solution |
|-------|----------|
| `command not found: mcp` | Install globally: `npm install -g @devmukesh/mcp-server` |
| `ECONNREFUSED` | Start the server: `pnpm dev` |
| `Module not found` | Run `pnpm install` in project root |

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup
```bash
git clone https://github.com/bishnoimukesh/mcp-server.git
cd mcp-server
pnpm install
pnpm build
```

### Adding New Providers
1. Create new provider in `packages/`
2. Implement `MCPProvider` interface
3. Add to server registry
4. Update documentation
5. Submit PR

### Testing
```bash
# Test CLI
node dist/cli.mjs list shadcn
node dist/cli.mjs get shadcn button

# Test API  
curl http://localhost:3001/shadcn/components
```

---

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [ShadCN UI](https://ui.shadcn.com/) - For the amazing component library
- [Radix UI](https://www.radix-ui.com/) - For the foundational primitives
- [Tailwind CSS](https://tailwindcss.com/) - For the styling system
- [Next.js](https://nextjs.org/) - For the demo application framework

---

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/bishnoimukesh/mcp-server/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/bishnoimukesh/mcp-server/discussions)
- 📧 **Email**: mukeshbishnoi@gmail.com

---

<div align="center">
  
**Made with ❤️ by [Mukesh Bishnoi](https://github.com/bishnoimukesh)**

[⭐ Star this repo](https://github.com/bishnoimukesh/mcp-server) | [🐛 Report Bug](https://github.com/bishnoimukesh/mcp-server/issues) | [💡 Request Feature](https://github.com/bishnoimukesh/mcp-server/issues)

</div>
    css?: string;
  };
  previewUrl?: string;
  metadata: ComponentMeta;
}

// Provider interface - implement this for new kits
interface MCPProvider {
  listComponents(): Promise<ComponentMeta[]>;
  getComponent(name: string): Promise<ComponentData | null>;
}
```

### Provider Implementation Example

```typescript
// ShadCN provider implementation
export class ShadcnProvider implements MCPProvider {
  async getComponent(name: string): Promise<ComponentData | null> {
    return componentRegistry[name] ?? null;
  }

  async listComponents(): Promise<ComponentMeta[]> {
    return Object.values(componentRegistry).map(c => c.metadata);
  }
}
```

### Dynamic Component Registry

The ShadCN provider fetches components directly from the official repository:

```typescript
const BASE_URL = "https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/registry/default/ui";

// Supports 46+ components including:
const componentFiles = [
  "accordion.tsx", "alert.tsx", "button.tsx", "card.tsx",
  "dialog.tsx", "input.tsx", "table.tsx", "tooltip.tsx",
  // ... and many more
];
```

---

## 🎨 Demo Application Features

The demo application showcases the MCP server capabilities with:

### 🏠 Home Page Features
- **Responsive Grid Layout**: 1-4 columns based on screen size
- **Beautiful Card Design**: Hover effects and animations
- **Component Statistics**: Real-time count of available components
- **Search-Ready UI**: Foundation for future search functionality

### 📝 Component Detail Pages
- **Syntax-Highlighted Code**: Dark theme code display
- **Copy to Clipboard**: One-click code copying
- **Component Metadata**: Version, tags, and theme information
- **Navigation**: Seamless back-to-gallery navigation

### 🎨 Design System
- **Tailwind CSS**: Modern utility-first styling
- **Gradient Backgrounds**: Eye-catching visual design
- **Smooth Animations**: Professional transitions and hover effects
- **Mobile-First**: Responsive design for all devices


## � Essential Commands

### Development
```bash
# Start everything (run these in separate terminals)
cd packages/server && pnpm dev     # API server :3001
cd apps/demo && pnpm dev           # Demo app :3000

# Build packages when you make changes
cd packages/core && pnpm build
cd packages/kit-yourkit && pnpm build
```

### CLI Usage
```bash
# Install CLI globally
cd packages/cli && pnpm build && pnpm link --global

# Use the CLI
mcp list <kit-name>                # List all components
mcp get <kit> <component>          # Show component code
mcp get <kit> <component> --out file.tsx  # Save to file

# Examples
mcp list shadcn
mcp get shadcn button
mcp get shadcn card --out Card.tsx
```

### API Usage
```bash
# List components
curl http://localhost:3001/shadcn/components

# Get specific component
curl http://localhost:3001/shadcn/components/button

# Your custom kit
curl http://localhost:3001/yourkit/components/awesome-button
```

---

## 🔧 Register Your Kit

Once you've created your kit, register it with the server:

```typescript
// packages/server/src/providers.ts
import { ShadcnProvider } from "@mcp/kit-shadcn";
import { YourKitProvider } from "@mcp/kit-yourkit";  // Add this

export const providers = {
  shadcn: new ShadcnProvider(),
  yourkit: new YourKitProvider(),  // Add this line
};
```

```json
// packages/server/package.json - Add dependency
{
  "dependencies": {
    "@mcp/kit-yourkit": "workspace:*"
  }
}
```

Rebuild and restart:
```bash
cd packages/server && pnpm build && pnpm dev
```

---

## 🎯 Real Examples

### Example 1: Bootstrap Components
```typescript
// Fetch Bootstrap components from CDN
async getComponent(name: string) {
  const url = `https://cdn.example.com/bootstrap/${name}.js`;
  const code = await fetch(url).then(r => r.text());
  return { code: { tsx: code }, metadata: { name, version: "5.0.0" } };
}
```

### Example 2: Local Component Library
```typescript
// Use your existing component folder
async listComponents() {
  const files = await fs.readdir('./my-components');
  return files.map(f => ({ name: f.replace('.tsx', ''), version: '1.0.0' }));
}
```

### Example 3: Private GitHub Repo
```typescript
// Fetch from private repo (requires token)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
async getComponent(name: string) {
  const url = `https://api.github.com/repos/yourorg/components/contents/${name}.tsx`;
  const response = await fetch(url, {
    headers: { Authorization: `token ${GITHUB_TOKEN}` }
  });
  // ... decode base64 content
}
```

---

## � Project Structure (Simple)

```
mcp-server/
├── packages/
│   ├── core/           # Types & interfaces (don't touch)
│   ├── kit-shadcn/     # Example kit (copy this!)
│   ├── kit-yourkit/    # Your new kit goes here
│   ├── server/         # API server (add your kit here)
│   └── cli/            # Command line tool
└── apps/
    └── demo/           # Web UI to browse components
```

---

## 🔌 Adding New Component Kits

### Quick Start Guide (Recommended)

#### Option 1: Copy Existing Kit
```bash
# 1. Copy the ShadCN kit as a template
cp -r packages/kit-shadcn packages/kit-yourkit

# 2. Update package.json
cd packages/kit-yourkit
# Change name to "@mcp/kit-yourkit"

# 3. Edit src/provider.ts - replace ShadCN URLs with yours
# 4. Register in packages/server/src/providers.ts
```

#### Option 2: Create From Scratch

**Step 1: Create Kit Package**

```bash
mkdir packages/kit-yourkit
cd packages/kit-yourkit
pnpm init
```

**Step 2: Implement Provider**

```typescript
// packages/kit-yourkit/src/provider.ts
import { MCPProvider, ComponentData, ComponentMeta } from "@devmukesh/mcp-core";

export class YourKitProvider implements MCPProvider {
  async listComponents(): Promise<ComponentMeta[]> {
    // Your implementation here
    return [
      {
        name: "your-component",
        version: "1.0.0",
        tags: ["form", "input"],
        themes: ["light", "dark"]
      }
    ];
  }

  async getComponent(name: string): Promise<ComponentData | null> {
    // Your implementation here
    return {
      code: {
        tsx: "// Your component code here",
        css: "/* Your styles here */"
      },
      metadata: {
        name,
        version: "1.0.0",
        tags: [],
        themes: ["default"]
      }
    };
  }
}
```

**Step 3: Register Provider**

```typescript
// packages/server/src/providers.ts
import { YourKitProvider } from "@mcp/kit-yourkit";

export const providers: Record<string, MCPProvider> = {
  shadcn: new ShadcnProvider(),
  yourkit: new YourKitProvider(), // Add your provider
};
```

**Step 4: Update Dependencies**

```json
// packages/server/package.json
{
  "dependencies": {
    "@mcp/kit-yourkit": "workspace:*"
  }
}
```

#### Option 3: Local File System
Point to your existing component folder:

```typescript
// Read from your existing component folder
async getComponent(name: string) {
  const filePath = `/path/to/your/components/${name}.tsx`;
  const code = await fs.readFile(filePath, 'utf8');
  return { code: { tsx: code }, metadata: {...} };
}
```

### Real-World Examples

#### Example 1: Bootstrap Components
```typescript
// Fetch Bootstrap components from CDN
async getComponent(name: string) {
  const url = `https://cdn.example.com/bootstrap/${name}.js`;
  const code = await fetch(url).then(r => r.text());
  return { code: { tsx: code }, metadata: { name, version: "5.0.0" } };
}
```

#### Example 2: Local Component Library
```typescript
// Use your existing component folder
async listComponents() {
  const files = await fs.readdir('./my-components');
  return files.map(f => ({ name: f.replace('.tsx', ''), version: '1.0.0' }));
}
```

#### Example 3: Private GitHub Repo
```typescript
// Fetch from private repo (requires token)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
async getComponent(name: string) {
  const url = `https://api.github.com/repos/yourorg/components/contents/${name}.tsx`;
  const response = await fetch(url, {
    headers: { Authorization: `token ${GITHUB_TOKEN}` }
  });
  // ... decode base64 content
}
```

---

## �️ Development Guide

### Development Scripts

```bash
# Start server in development mode
cd packages/server && pnpm run dev

# Start demo app in development mode  
cd apps/demo && pnpm run dev

# Build specific package
cd packages/core && pnpm run build

# Build all packages
pnpm run build --recursive
```

### Adding New Components

1. **For ShadCN**: Components are automatically fetched from the official repository
2. **For Custom Kits**: Update your provider's component registry
3. **Testing**: Use the CLI or API to verify new components

### Code Quality

```bash
# Type checking
pnpm run type-check

# Linting (if configured)
pnpm run lint

# Testing (if configured)
pnpm run test
```

---

## 📊 Current Component Support

### ShadCN UI Kit (46 Components)

| Category | Components |
|----------|------------|
| **Form Controls** | button, input, textarea, checkbox, radio-group, select, switch, slider, form, label |
| **Layout** | card, sheet, dialog, drawer, sidebar, separator, resizable, aspect-ratio |
| **Navigation** | breadcrumb, navigation-menu, pagination, tabs, accordion, collapsible |
| **Feedback** | alert, alert-dialog, toast, toaster, sonner, tooltip, hover-card, popover, progress, skeleton |
| **Data Display** | table, chart, avatar, badge, calendar, carousel, scroll-area |
| **Interactive** | command, context-menu, dropdown-menu, menubar, toggle, toggle-group |

---

## 🔧 Configuration Options

### Environment Variables

```bash
# Server configuration
PORT=3001                    # API server port
NODE_ENV=development         # Environment mode

# GitHub API (for future enhancements)
GITHUB_TOKEN=your_token      # For rate limit increases
```

### Workspace Configuration

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

---

## 🚀 Deployment Guide

### Production Build

```bash
# Build all packages for production
pnpm run build --recursive

# Start production server
cd packages/server
NODE_ENV=production node dist/index.js
```

### Docker Deployment (Future)

```dockerfile
# Example Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build --recursive
EXPOSE 3001
CMD ["node", "packages/server/dist/index.js"]
```

---

## �️ Roadmap & Future Features

### 🎯 Near Term (Next 2-3 months)
- [ ] **Component Search**: Full-text search across all components
- [ ] **Theme Variations**: Support for light/dark theme variants
- [ ] **Component Previews**: Live preview URLs and screenshots
- [ ] **Local Caching**: Cache GitHub responses for better performance
- [ ] **More UI Kits**: Aceternity UI, Chakra UI, Mantine
- [ ] **CLI Improvements**: Interactive component selection

### 🚀 Medium Term (3-6 months)
- [ ] **Component Analytics**: Usage tracking and popularity metrics
- [ ] **Version Management**: Support for multiple component versions
- [ ] **Custom Registries**: Support for private component registries
- [ ] **VS Code Extension**: Direct integration with VS Code
- [ ] **Component Dependencies**: Automatic dependency resolution
- [ ] **Component Generator**: AI-assisted component creation

### 🌟 Long Term (6+ months)
- [ ] **Visual Component Builder**: Drag-and-drop component composer
- [ ] **Component Marketplace**: Community-driven component sharing
- [ ] **Design Token Integration**: Automatic design system synchronization
- [ ] **Multi-Framework Support**: React, Vue, Svelte, Angular
- [ ] **Cloud Hosting**: Hosted MCP server service
- [ ] **Enterprise Features**: Team management, private repositories

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🐛 Bug Reports
1. Check existing issues first
2. Create detailed bug reports with reproduction steps
3. Include environment information (Node.js version, OS, etc.)

### 💡 Feature Requests
1. Search existing feature requests
2. Provide clear use cases and benefits
3. Include mockups or examples if applicable

### 🔧 Code Contributions

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/mcp-server.git

# 2. Create a feature branch
git checkout -b feature/amazing-feature

# 3. Install dependencies
pnpm install

# 4. Make your changes and test thoroughly
pnpm run build --recursive

# 5. Commit with descriptive messages
git commit -m "Add amazing feature"

# 6. Push and create a Pull Request
git push origin feature/amazing-feature
```

### 📋 Contribution Guidelines
- Follow existing code style and conventions
- Add tests for new features (when test framework is added)
- Update documentation for any API changes
- Ensure all builds pass before submitting PR

---

## � Support & Community

### 🐛 Issues & Bugs
- [GitHub Issues](https://github.com/bishnoimukesh/mcp-server/issues)
- Check existing issues before creating new ones
- Provide reproduction steps and environment details

### 💬 Discussions
- [GitHub Discussions](https://github.com/bishnoimukesh/mcp-server/discussions)
- Ask questions, share ideas, showcase projects

### 📖 Documentation
- [API Documentation](./docs/api.md) *(coming soon)*
- [Architecture Guide](./docs/architecture.md) *(coming soon)*
- [Contributing Guide](./CONTRIBUTING.md) *(coming soon)*

---

## ⚖️ License

MIT License © 2025 [Mukesh Bishnoi](https://github.com/bishnoimukesh)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.

---

## 🙏 Acknowledgments

- **[ShadCN UI](https://ui.shadcn.com/)** - For the amazing component library
- **[Next.js](https://nextjs.org/)** - For the excellent React framework
- **[Tailwind CSS](https://tailwindcss.com/)** - For the utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - For the accessible UI primitives
- **[pnpm](https://pnpm.io/)** - For efficient package management

---

## 📈 Project Stats

![GitHub Stars](https://img.shields.io/github/stars/bishnoimukesh/mcp-server?style=social)
![GitHub Forks](https://img.shields.io/github/forks/bishnoimukesh/mcp-server?style=social)
![GitHub Issues](https://img.shields.io/github/issues/bishnoimukesh/mcp-server)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/bishnoimukesh/mcp-server)
![License](https://img.shields.io/github/license/bishnoimukesh/mcp-server)

---

> **Built with ❤️ for frontend developers who want composable, scalable UI systems — no vendor lock-in, maximum flexibility.** 

**Happy coding! 🚀**