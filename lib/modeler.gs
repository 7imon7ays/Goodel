/*
 * Modeler takes the name of the sheet where the table is kept.
 * It expects the first row to be a header with column names
 * Ie. it won't search that row.
 */
Goodel.Modeler = function (sheetName) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(),
      sheet = spreadsheet.getSheetByName(sheetName),
      table = new Goodel.Table(sheet),
      columns = table.getRow(1).getValues()[0];

  if (sheet == null) {
    var missingSheetMsg = 'Could not find sheet "<sheetName>" in active spreadsheet.'
                            .replace("<sheetName>", sheetName);
    throw new Error (missingSheetMsg);
  }

  function Model (instanceAttrHash) {
    this.model = Model;
    for (var attr in instanceAttrHash) {
      this[attr] = instanceAttrHash[attr];
    }
  }

  Model.sheet = sheet;
  Model.name = sheet.getName();
  Model.table = table;
  Model.columns = columns;

  for (var classMethod in Goodel._modelClassMethods) {
    Model[classMethod] = Goodel._modelClassMethods[classMethod];
  }

  Model.prototype = Object.create(Goodel._ModelInstance.prototype);
  
  return Model;
}

