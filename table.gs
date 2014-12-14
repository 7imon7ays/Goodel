var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'I'];

// TODO: Initilize with fixed number of columns and rows.
//       Increment global counter when row is added.
Godel.Table = function (sheet) {
  this.sheet = sheet;
  this.numColumns = this.getEmptyColumnIdx() - 1;
}

// TODO: Make search column variable
// { FirstName: 'William' }
Godel.Table.prototype.query = function (searchHash) {
  var tempSheetName = Math.random().toString(36),
      spreadSheet = this.sheet.getParent(),
      tempSheet = spreadSheet.insertSheet(tempSheetName),
      firstCell = tempSheet.getRange(1,1),
      searchResults = [];

  var searchFormula = "=FILTER($table!A2:$lastRow, "
                        .replace("$table", this.sheet.getName())
                        .replace("$lastRow", this.getEmptyRowIdx() - 1);
  
  var searchConditions = "";
  
  // Students!A1:A21 = "William", Students!D1:D21 = "SF"
  
  for (var key in searchHash) {
    var condition = '<table>!<searchCol>2:<searchCol><lastRow> = "<searchVal>"'
                      .replace("<table>", this.sheet.getName())
                      .replace(/<searchCol>/g, 'A') // Map search key to column
                      .replace("<lastRow>", this.getEmptyRowIdx() - 1)
                      .replace("<searchVal>", searchHash[key]);
    

    searchConditions += condition + ',';
  }
  
  searchConditions = searchConditions.slice(0, searchConditions.length - 1);
  
  searchFormula += searchConditions + ')';

  firstCell.setFormula(searchFormula);

  if (firstCell.getValue() == "#N/A") return results;

  var i = 1;
  var thisRecord = tempSheet.getRange(i, 1, 1, this.numColumns).getValues();
  while (thisRecord[0][0] != "") {
    searchResults.push(thisRecord);
    thisRecord = tempSheet.getRange(++i, 1, 1, this.numColumns).getValues();
  }
  
  spreadSheet.deleteSheet(tempSheet);
  return searchResults;

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


