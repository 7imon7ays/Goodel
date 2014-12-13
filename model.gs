function main () {
  var StudentModel = new Godel.Model("Data");

  var will = StudentModel.findBy({ FirstName: "William" });
  
  var joe = { FirstName: "Joseph", LastName: "Blogs", City: "LA" };
  
  StudentModel.create(joe);
}

function Godel.Model (sheetName) {
  this.spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  this.dataSheet = new Godel.DataSheet(this.spreadSheet.getSheetByName(sheetName));

  this.numColumns = this.dataSheet.getEmptyColumnIdx - 1;
      headerRow = this.dataSheet.getRange(1, 1, 1, this.numColumns);

  this.columns = headerRow.getValues()[0];
  this.columnMap = null;
  this._buildColumnMap();
}

Godel.Model.prototype.findBy = function (searchHash) {
  var matches = []

  for (var searchKey in searchHash) {
    var columnIdx = this.columnMap[searchKey];
    
    for (var i = 1; i < 20; i++) {
      var attribute = this.dataSheet.getRange(i, columnIdx).getValue();
      if (searchHash[searchKey] == attribute) {
        var row = this.dataSheet.getRange(i, 1, 1, this.numColumns).getValues()[0],
            record = this._getRecord(row);
          
        matches.push(record);
      }
    }

  }
  return matches;
}

Godel.Model.prototype.create = function (recordHash) {
  var emptyRowIdx = this.dataSheet.getEmptyRowIdx();
  
  var row = this.dataSheet.getRange(emptyRowIdx, 1, 1, this.columns.length),
      newRecord = [],
      len = this.columns.length, i;
  
  for (i = 0; i < len; i++) {
    var column = this.columns[i],
        attribute = recordHash[column] || "";
    
    newRecord.push(attribute);
  }

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

