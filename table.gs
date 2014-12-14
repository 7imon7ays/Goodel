var ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
               'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
               'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

Godel.Table = function (sheet) {
  this.sheet = sheet;
  this.numColumns = this.getEmptyColumnIdx() - 1;
  this.numRows = this.getEmptyRowIdx() - 1;
  this.columns = this.getRow(1).getValues()[0];
  this.columnMap = null;
  this._buildColumnMap();
}

Godel.Table.prototype.findBy = function (searchHash) {
  /* If there are more than 20 records,
   * use native search with single query.
   * Otherwise, make one query per row.
   */
  
  if (this.numRows > 20) {
    return this.natFindBy(searchHash);
  } else {
    return this.manFindBy(searchHash);
  }
}

Godel.Table.prototype.findWhere = function (searchHash) {
  // Same as above
  if (this.numRows > 20) {
    return this.natFindWhere(searchHash);
  } else {
    return this.manFindWhere(searchHash);
  }
}

Godel.Table.prototype.manFindBy = function (searchHash) {

  // Loop through rows
  for (var rowIdx = 1; rowIdx < this.numRecords; rowIdx++) {

    // Check match for every search key
    var isAMatch = true;
    for (var searchKey in searchHash) {
      var columnIdx = this.columnMap[searchKey],
          attribute = this.getCell(rowIdx, columnIdx).getValue();
      if (searchHash[searchKey] != attribute) isAMatch = false;
    }

    // Return record when first match is found
    if (isAMatch) {
      var row = this.getRow(rowIdx).getValues()[0],
          record = this._hashifRow(row);
      return record;
    }

  }
  // Return null if no matches are found
  return null
}

Godel.Table.prototype.manFindWhere = function (searchHash) {
  var searchResults = [];
  
  // Loop through rows
  for (var rowIdx = 1; rowIdx < this.numRecords; rowIdx++) {
    var isAMatch = true;

    // Check match for every search key
    for (var searchKey in searchHash) {
      var columnIdx = this.columnMap[searchKey],
          attribute = this.getCell(rowIdx, columnIdx).getValue();
      if (searchHash[searchKey] != attribute) isAMatch = false;
    }
    
    // Add record to results array if it's a match
    if (isAMatch) {
      var row = this.getRow(rowIdx).getValues()[0],
          record = this._hashifRow(row);
      searchResults.push(record);
    }
  }

  return searchResults;
}


Godel.Table.prototype.natFindBy = function (searchHash) {
  /*
   * Create a temporary sheet with a random name
   * where the search formula is inserted.
   * Then retrieves the search results and delete the sheet.
   */
  // Same as above
  var tempSheetName = Math.random().toString(36),
      spreadSheet = this.sheet.getParent(),
      tempSheet = spreadSheet.insertSheet(tempSheetName),
      firstCell = tempSheet.getRange(1,1);

  var searchFormula = this._getSearchRange(),
      searchConditions = this._buildSearchConditions(searchHash)
  
  
  searchFormula += searchConditions + ')';

  firstCell.setFormula(searchFormula);

  if (firstCell.getValue() == "#N/A") return null;

  var matchingRow = tempSheet.getRange(1, 1, 1, this.numColumns).getValues()[0];
  var matchingRecord = this._hashifyRow(matchingRow);
  
  spreadSheet.deleteSheet(tempSheet);
  return matchingRecord;

}

Godel.Table.prototype.natFindWhere = function (searchHash) {
  // Same as above
  var tempSheetName = Math.random().toString(36),
      spreadSheet = this.sheet.getParent(),
      tempSheet = spreadSheet.insertSheet(tempSheetName),
      firstCell = tempSheet.getRange(1,1),
      searchResults = [];

  var searchFormula = this._getSearchRange(),
      searchConditions = this._buildSearchConditions(searchHash)
  
  
  searchFormula += searchConditions + ')';

  firstCell.setFormula(searchFormula);

  if (firstCell.getValue() == "#N/A") return results;

  // If one or more records were found,
  // loop through them and add them to the results array
  var i = 1;
  var thisRow = tempSheet.getRange(i, 1, 1, this.numColumns).getValues()[0];
  while (thisRow[0] != "") {
    var foundRecord = this._hashifyRow(thisRow);
    searchResults.push(foundRecord);
    thisRow = tempSheet.getRange(++i, 1, 1, this.numColumns).getValues()[0];
  }

  spreadSheet.deleteSheet(tempSheet);
  return searchResults;
}

Godel.Table.prototype._buildSearchConditions = function (searchHash) {
  var searchConditions = "";

  for (var key in searchHash) {
    var searchColumn = ALPHABET[this.columnMap[key] - 1];
    
    var condition = '<table>!<searchCol>2:<searchCol><lastRow> = "<searchVal>"'
                      .replace("<table>", this.sheet.getName())
                      .replace(/<searchCol>/g, searchColumn)
                      .replace("<lastRow>", this.getEmptyRowIdx() - 1)
                      .replace("<searchVal>", searchHash[key]);


    searchConditions += condition + ',';
  }
  
  // Remove trailing ', '
  searchConditions = searchConditions.slice(0, searchConditions.length - 1);

  return searchConditions;
}

Godel.Table.prototype._getSearchRange = function () {
  return "=FILTER($table!A2:$lastRow, "
            .replace("$table", this.sheet.getName())
            .replace("$lastRow", this.getEmptyRowIdx() - 1);
}

Godel.Table.prototype._hashifyRow = function (row) {
  var record = {}, len = this.numColumns, i;
  
  for (i = 0; i < len; i++) {

    var attr = this.columns[i];
    if (row[i] == "") {
      record[attr] = null;
    } else {
      record[attr] = row[i];
    }

  }
  return record;
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

Godel.Table.prototype._buildColumnMap = function () {
  var columnMap = {},
      len = this.numColumns,
      columns = this.getRow(1).getValues()[0],
      i;
  
  for (i = 0; i < len; i++) {
    var column = columns[i];
    columnMap[column] = i + 1;
  }
  
  this.columnMap = columnMap;
}

