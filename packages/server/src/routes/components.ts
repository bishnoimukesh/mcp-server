import { Router } from "express";
import { providers } from "../providers";

const router = Router();

router.get("/:kit/components", async (req, res) => {
  const kit = req.params.kit;
  const provider = providers[kit];
  if (!provider) return res.status(404).json({ error: "Kit not found" });

  const list = await provider.listComponents();
  return res.json(list);
});

router.get("/:kit/components/:name", async (req, res) => {
  const { kit, name } = req.params;
  const provider = providers[kit];
  if (!provider) return res.status(404).json({ error: "Kit not found" });

  const comp = await provider.getComponent(name);
  if (!comp) return res.status(404).json({ error: "Component not found" });

  return res.json(comp);
});

export default router;
