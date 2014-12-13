function Godel.DataSheet (sheet) {
  this.sheet = sheet;
}

Godel.DataSheet.prototype.getRange = function (row, col) {
  return this.sheet.getRange(row, col);
}

Godel.DataSheet.prototype.getRange = function (row, col, nRows, nCols) {
  return this.sheet.getRange(row, col, nRows, cCols);
}

Godel.DataSheet.prototype.getEmptyRowIdx = function () {
  var rowIdx = 1;
  
  while (this.sheet.getRange(rowIdx, 1).getValue() != "") {
    rowIdx += 1;
  }
  
  return rowIdx;
}

Godel.DataSheet.prototype.getEmptyColumnIdx = function () {
  var columnIdx = 1;
  
  while (this.sheet.getRange(1, columnIdx).getValue() != "") {
    columnIdx += 1;
  }
  
  return columnIdx;
}

