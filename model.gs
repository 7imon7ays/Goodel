var Godel = {};

Godel.Model = function (sheetName) {
  this.spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  this.table = new Godel.Table(this.spreadSheet.getSheetByName(sheetName));

  var headerRow = this.table.getRow(1);
  this.columns = headerRow.getValues()[0];

  this.columnMap = null;
  this._buildColumnMap();
}

Godel.Model.prototype.findWhere = function (searchHash) {
  var matches = []

  for (var searchKey in searchHash) {
    var columnIdx = this.columnMap[searchKey];
    
    for (var i = 1; i < 20; i++) {
      var attribute = this.table.getCell(i, columnIdx).getValue();
      if (searchHash[searchKey] == attribute) {
        var row = this.table.getRow(i).getValues()[0],
            record = this._getRecord(row);
          
        matches.push(record);
      }
    }

  }
  return matches;
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
}

Godel.Model.prototype._getRecord = function (row) {
  var record = {}, len = this.columns.length,
      i;
  
  for (i = 0; i < len; i++) {
    var column = this.columns[i];
    record[column] = row[i];
  }
  
  return record;
}

Godel.Model.prototype._buildColumnMap = function () {
  var columnMap = {},
      len = this.columns.length,
      i;
  
  for (i = 0; i < len; i++) {
    var column = this.columns[i];
    columnMap[column] = i + 1;
  }

  this.columnMap = columnMap;
}

