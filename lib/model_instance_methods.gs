Goodel._ModelInstance = function () {}

Goodel._ModelInstance.prototype.save = function () {
  this.model.create(this);
}

Goodel._ModelInstance.prototype.toString = function () {
  var stringifiedObj = [];
  
  for (var key in this) {
    if (this.hasOwnProperty(key)) {
      var kvPair = "<key> = <value>"
        .replace("<key>", key)
        .replace("<value>", this[key]);
      
      stringifiedObj.push(kvPair);
    }
  }
  
  stringifiedObj = "{ " + stringifiedObj.join(", ") + " }";
  
  return stringifiedObj;
}

