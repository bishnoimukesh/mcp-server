const MCP_SERVER_URL = "http://localhost:3001";

export async function getComponentsFromKit(kit: string) {
  try {
    const response = await fetch(`${MCP_SERVER_URL}/${kit}/components`);
    if (!response.ok) {
      throw new Error(`Failed to fetch components: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching components:", error);
    return [];
  }
}

export async function getComponentByName(kit: string, name: string) {
  try {
    const response = await fetch(`${MCP_SERVER_URL}/${kit}/components/${name}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch component: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching component:", error);
    return null;
  }
}
