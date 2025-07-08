const { google } = require("googleapis");

class SheetService {
  constructor() {
    this.SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
    this.auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  }

  async getClient() {
    return await this.auth.getClient();
  }

  async getSheets() {
    const client = await this.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const response = await sheets.spreadsheets.get({ spreadsheetId: this.SPREADSHEET_ID });
    return response.data.sheets.map((sheet) => ({
      title: sheet.properties.title,
      sheetId: sheet.properties.sheetId,
    }));
  }

  async getHeaders(sheetName) {
    const client = await this.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: this.SPREADSHEET_ID,
      range: `${sheetName}!1:1`,
    });

    return response.data.values?.[0] || [];
  }

  async setHeadersIfMissing(sheetName, headers) {
    if (!Array.isArray(headers) || headers.length === 0) {
      throw new Error("Encabezados inválidos");
    }

    const client = await this.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const existing = await this.getHeaders(sheetName);
    if (existing.length > 0) return { alreadyExists: true, headers: existing };

    await sheets.spreadsheets.values.update({
      spreadsheetId: this.SPREADSHEET_ID,
      range: `${sheetName}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [headers] },
    });

    return { created: true, headers };
  }

  async sendData(sheetName, { nombre, correo, mensaje }) {
    if (!nombre || !correo || !mensaje) {
      throw new Error("Faltan campos obligatorios");
    }

    const client = await this.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: this.SPREADSHEET_ID,
      range: `${sheetName}!A1`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[new Date().toISOString(), nombre, correo, mensaje]],
      },
    });

    return response.data;
  }

  async getSheetData(sheetName) {
    const client = await this.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: this.SPREADSHEET_ID,
      range: sheetName,
    });

    return response.data.values || [];
  }

  async updateRow(sheetName, rowIndex, values) {
    if (!Array.isArray(values)) {
      throw new Error("Valores inválidos");
    }

    const client = await this.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    await sheets.spreadsheets.values.update({
      spreadsheetId: this.SPREADSHEET_ID,
      range: `${sheetName}!A${rowIndex}`,
      valueInputOption: "RAW",
      requestBody: { values: [values] },
    });
  }

  async deleteRow(sheetName, rowIndex) {
    const row = parseInt(rowIndex);
    if (isNaN(row) || row < 2) {
      throw new Error("Índice inválido (mínimo 2)");
    }

    const client = await this.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const metadata = await sheets.spreadsheets.get({ spreadsheetId: this.SPREADSHEET_ID });
    const sheet = metadata.data.sheets.find((s) => s.properties.title === sheetName);

    if (!sheet) throw new Error("Hoja no encontrada");

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: this.SPREADSHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: sheet.properties.sheetId,
                dimension: "ROWS",
                startIndex: row - 1,
                endIndex: row,
              },
            },
          },
        ],
      },
    });
  }

  async findByCorreo(sheetName, correo) {
    const rows = await this.getSheetData(sheetName);
    if (rows.length < 2) return [];

    const headers = rows[0];
    const correoIndex = headers.indexOf("correo");
    if (correoIndex === -1) throw new Error("Columna 'correo' no encontrada");

    return rows.map((row, i) => ({ rowNumber: i + 1, row })).filter((r) => r.row[correoIndex] === correo);
  }
}

module.exports = new SheetService();
