const express = require("express");
const router = express.Router();
const PanelController = require("../controllers/PanelController"); // Asegúrate de que la ruta es correcta.
const panelController = new PanelController();

router.get("/panels", panelController.getAllPanels);

// Exportar el router para poder montarlo en el archivo principal de la aplicación.
module.exports = router;


// Extensión de la ruta
const extension = "/panel";


router.get(extension + "/panels", async (req, res) => {
  try {
    const panels = await panelController.getAllPanels();
    res.json(panels);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los paneles' });
  }
});

router.get(extension + "/:panelId", async (req, res) => {
  try {
    const panelId = req.params.panelId;
    const panel = await panelController.getPanelById(panelId);
    if (panel) {
      res.json(panel);
    } else {
      res.status(404).json({ error: 'Panel no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el panel' });
  }
});

module.exports = router;
