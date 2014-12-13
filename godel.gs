function main () {
  var model = new Model("Data");

  var r = model.findBy({ FirstName: "William" });
  
  Logger.log(r);
}


function Model (sheetName) {
  this.spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  this.dataSheet = this.spreadSheet.getSheetByName(sheetName);
  this.headerRow = this.dataSheet.getRange(1,1,1,20); // TODO: Only get as many columns as column filled
  this.columns = this.headerRow.getValues()[0];
  this.columnMap = null;
  this._buildColumnMap();
}

Model.prototype.findBy = function (searchHash) {
  var matches = []

  for (var searchKey in searchHash) {
    var columnIdx = this.columnMap[searchKey];
    
    for (var i = 1; i < 20; i++) {
      var attribute = this.dataSheet.getRange(i, columnIdx).getValue();
      if (searchHash[searchKey] == attribute) {
        var row = this.dataSheet.getRange(i, 1, 1, 6).getValues()[0], // TODO: Variable # of cols.
            record = this._buildRecord(row);
          
        matches.push(record);
      }
    }

  }
  return matches;
}

Model.prototype._buildRecord = function (row) {
  var record = {}, len = this.columns.length,
      i;
  
  for (i = 0; i < len; i++) {
    var column = this.columns[i];
    record[column] = row[i];
  }
  
  return record;
}

Model.prototype._buildColumnMap = function () {
  var columnMap = {},
      len = this.columns.length,
      i;
  
  for (i = 0; i < len; i++) {
    var column = this.columns[i];
    columnMap[column] = i + 1;
  }

  this.columnMap = columnMap;
}

