Goodel._modelClassMethods = function () {}

Goodel._modelClassMethods.findWhere = function (searchHash) {
  return this.table.findWhere(searchHash);
}

Goodel._modelClassMethods.findBy = function (searchHash) {
  var attrs = this.table.findBy(searchHash);

  return new this(attrs);
}

Goodel._modelClassMethods.create = function (recordHash) {
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

Goodel._modelClassMethods.toString = function () {
  return "{ sheet: <sheet>, columns: <columns> }"
          .replace("<sheet>", this.sheet.getName())
          .replace("<columns>", this.columns);
}

