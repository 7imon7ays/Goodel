/*
 * Model takes the name of the sheet where the table is kept.
 * It expects the first row to be a header with column names.
 * Ie. it won't search that row
 */
Godel.Model = function (sheetName) {
  this.spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = this.spreadSheet.getSheetByName(sheetName);
 
  if (sheet == null) {
    var missingSheetMsg = 'Could not find sheet "$sheetName" in active spreadsheet.'
                            .replace("$sheetName", sheetName);
    throw new Error (missingSheetMsg);
  }
 
  this.table = new Godel.Table(sheet);

  var headerRow = this.table.getRow(1);
  this.columns = headerRow.getValues()[0];
}

Godel.Model.prototype.findWhere = function (searchHash) {
  return this.table.findWhere(searchHash);
}

Godel.Model.prototype.findBy = function (searchHash) {
  return this.table.findBy(searchHash);
}

Godel.Model.prototype.create = function (recordHash) {
  var newRecord = [], len = this.columns.length, i;
  
  for (i = 0; i < len; i++) {
    var column = this.columns[i],
        attribute = recordHash[column] || "";
    
    newRecord.push(attribute);
  }
  var emptyRowIdx = this.table.getEmptyRowIdx(),
      row = this.table.getRow(emptyRowIdx);
  
  row.setValues([newRecord]);
  this.table.numRows++;

  return newRecord;
}

