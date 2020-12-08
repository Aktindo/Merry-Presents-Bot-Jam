function spellcheck(input, value) {
    var returnVal = false;
    var length = input.length;
    for (var inc = length - 1; inc >= 0; inc--) {
      if(value.toUpperCase() === dictionary[inc].toUpperCase()) {
        returnVal = true;
        break;
      }
    }
    return returnVal;
  }

module.exports = spellcheck