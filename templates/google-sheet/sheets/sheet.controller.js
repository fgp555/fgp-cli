const SheetService = require("./sheet.service");

class SheetController {
  sheetService = SheetService;

  getSheets = async (req, res) => {
    try {
      const sheets = await this.sheetService.getSheets();
      res.json({ sheets });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  getHeaders = async (req, res) => {
    try {
      const headers = await this.sheetService.getHeaders(req.params.sheetName);
      res.json({ headers });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  setHeadersIfMissing = async (req, res) => {
    try {
      const result = await this.sheetService.setHeadersIfMissing(req.params.sheetName, req.body.headers);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  sendData = async (req, res) => {
    try {
      const result = await this.sheetService.sendData(req.params.sheetName, req.body);
      res.json({ message: "Datos enviados correctamente", result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  getSheetData = async (req, res) => {
    try {
      const rows = await this.sheetService.getSheetData(req.params.sheetName);
      res.json({ data: rows });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  updateRow = async (req, res) => {
    try {
      await this.sheetService.updateRow(req.params.sheetName, req.params.rowIndex, req.body.values);
      res.json({ message: "Fila actualizada correctamente." });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  deleteRow = async (req, res) => {
    try {
      await this.sheetService.deleteRow(req.params.sheetName, req.params.rowIndex);
      res.json({ message: "Fila eliminada correctamente." });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  findByCorreo = async (req, res) => {
    try {
      const results = await this.sheetService.findByCorreo(req.params.sheetName, req.query.correo);
      res.json({ results });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
}

module.exports = new SheetController();
