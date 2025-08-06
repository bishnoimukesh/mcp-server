# 🧩 Modular Component Provider (MCP) Server

A comprehensive, pluggable MCP server for accessing reusable UI components from multiple design systems like **ShadCN UI**, **Aceternity UI**, and more — via both **REST API** and **CLI tools**.

> 💡 Think of it as an NPM registry, but specifically for ready-to-use UI components — design-system aware, developer-friendly, instantly sharable, and completely vendor-agnostic.

![Demo Screenshot](https://via.placeholder.com/800x400/1e40af/ffffff?text=MCP+Server+Demo)

---

## ⚡ Quick Demo

```bash
# 1. Get any component instantly
mcp get shadcn button --out Button.tsx

# 2. List all available components  
mcp list shadcn

# 3. Browse components in your browser
# Visit: http://localhost:3000
```

---

## 🌟 Key Features

- 🧩 **Pluggable Architecture**: Support for multiple UI kit providers (ShadCN, Aceternity, etc.)
- ⚡ **Dynamic Component Registry**: Real-time component fetching from GitHub repositories
- 🌐 **REST API Server**: Fast Express.js API with comprehensive endpoints
- � **CLI Tool**: Developer-friendly command-line interface
- 🎨 **Beautiful Demo App**: Next.js showcase with Tailwind CSS styling
- 📊 **Rich Metadata**: Tags, themes, versions, and component information
- 🔄 **Live Updates**: Components are fetched fresh from source repositories
- 🏗️ **TypeScript First**: Full type safety across the entire stack
- 📦 **Monorepo Structure**: Well-organized workspace with pnpm
- 🎯 **Zero Vendor Lock-in**: Framework agnostic and extensible

---

## 📦 Project Architecture

This project uses [pnpm workspaces](https://pnpm.io/workspaces) with a clean monorepo structure:

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
│   └── 📁 server/                  ← Express.js REST API server
│       ├── src/
│       │   ├── index.ts           ← Server entry point
│       │   ├── routes/            ← API route handlers
│       │   └── providers.ts       ← Kit provider registry
│       └── package.json
├── 📁 packages/
│   ├── 📁 cli/                     ← Command-line interface
│   │   ├── src/index.ts           ← CLI commands and logic
│   │   └── package.json
│   ├── 📁 core/                    ← Shared types and interfaces
│   │   ├── src/
│   │   │   ├── types.ts           ← Component data structures
│   │   │   ├── provider.ts        ← Provider interface
│   │   │   └── index.ts
│   │   └── package.json
│   ├── 📁 kit-shadcn/              ← ShadCN UI provider
│   │   ├── src/
│   │   │   ├── provider.ts        ← ShadCN provider implementation
│   │   │   ├── registry.ts        ← Static component registry
│   │   │   ├── dynamicRegistry.ts ← GitHub-based registry
│   │   │   └── index.tsx
│   │   └── package.json
│   └── 📁 server/                  ← Server package (Express app)
├── pnpm-workspace.yaml             ← Workspace configuration
├── pnpm-lock.yaml
└── package.json                    ← Root package configuration
```

---

## �🚀 Getting Started (2 Minutes)

### 📋 Prerequisites

- **Node.js** 18+ 
- **pnpm** 8+ (recommended package manager)
- **Git** (for cloning the repository)

### 1️⃣ Installation

```bash
# Clone the repository
git clone https://github.com/bishnoimukesh/mcp-server.git
cd mcp-server

# Install all dependencies using pnpm workspaces
pnpm install
```

### 2️⃣ Build All Packages

```bash
# Build core packages first
cd packages/core && pnpm run build
cd ../kit-shadcn && pnpm run build
cd ../server && pnpm run build
cd ../cli && pnpm run build
```

### 3️⃣ Start the MCP Server

```bash
# Start the API server
cd packages/server
pnpm run dev
```

The MCP API will be available at: **http://localhost:3001**

### 4️⃣ Launch the Demo App (Optional)

```bash
# In a new terminal, start the demo app
cd apps/demo
pnpm run dev
```

The demo application will be available at: **http://localhost:3000**

### 5️⃣ Use CLI Tool

```bash
# Build and link the CLI globally
cd packages/cli
pnpm run build
pnpm link --global

# Now use it globally
mcp list shadcn
mcp get shadcn button --out Button.tsx
```

✅ **That's it!** Your MCP server is running.

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

## 💻 CLI Usage

### Installation

```bash
# Build and link the CLI globally
cd packages/cli
pnpm run build
pnpm link --global
```

### Available Commands

#### List Components
```bash
# List all components from ShadCN kit
mcp list shadcn

# Output:
# accordion  -  0.1.0
# alert      -  0.1.0  
# button     -  0.1.0
# ... (46 total components)
```

#### Get Component Code
```bash
# Display component code in terminal
mcp get shadcn button

# Output:
# 🧩 button.tsx
# import * as React from \"react\"\n# import { Slot } from \"@radix-ui/react-slot\"\n# // ... full component code
```

#### Save Component to File
```bash
# Save component to a file
mcp get shadcn button --out Button.tsx

# Output:
# ✅ Saved to Button.tsx
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
import { MCPProvider, ComponentData, ComponentMeta } from "@mcp/core";

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