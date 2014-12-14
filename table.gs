Godel.Table = function (sheet) {
  this.sheet = sheet;
  this.numColumns = this.getEmptyColumnIdx() - 1;
}

Godel.Table.prototype.getRow = function (row) {
  return this.sheet.getRange(row, 1, 1, this.numColumns);
}

Godel.Table.prototype.getCell = function (row, col) {
  return this.sheet.getRange(row, col);
}

Godel.Table.prototype.getRange = function (row, col, nRows, nCols) {
  return this.sheet.getRange(row, col, nRows, nCols);
}

Godel.Table.prototype.getEmptyRowIdx = function () {
  var rowIdx = 1;
  
  // TOFIX: Depends on existing rows having non-null value
  while (this.getCell(rowIdx, 1).getValue() != "") {
    rowIdx += 1;
  }

  return rowIdx;
}

Godel.Table.prototype.getEmptyColumnIdx = function () {
  var columnIdx = 1;
  
  // TOFIX: Depends on existing columns having non-null value
  while (this.getCell(1, columnIdx).getValue() != "") {
    columnIdx += 1;
  }
  
  return columnIdx;
}

