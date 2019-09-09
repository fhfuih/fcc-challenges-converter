/*
*
*
*       Complete the handler logic below
*       
*       
*/
const pattern = /^([0-9\./]*)(\w*)$/; // capture empty unit
const units = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];

function ConvertHandler() {
  
  this.getNum = function(input) {
    var result;
    
    const groups = pattern.exec(input.toLowerCase());
    if (!groups) {
      // no match -> null. Containing letters
      // e.g. damnkg
      return null;
    }
    
    const str = groups[1];
    const fractions = str.split('/').map(s => parseFloat(s));
    
    if (str.length === 0) {
      // only unit 'kg' => default '1kg'
      result = 1;
    } else if (fractions.length > 2) {
      // double fraction not allowed as is noted in test cases
      result = null;
    } else {
      result = fractions.reduce((acc, cur) => acc / cur);
      if (isNaN(result) || !isFinite(result)) {
        result = null;
        // case 1: trailing or heading / leads to an empty string
        //   '1.1/kg'
        // case 2: some number after a slash (divisor) is zero
      }
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    var result;
    
    const groups = pattern.exec(input.toLowerCase());
    result = groups ? groups[2] : null;
    if (!units.includes(result)) {
      result = null;
    }
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    var result;
    
    if (!initUnit) {
      return null;
    }
    
    switch(initUnit.toLowerCase()) {
      case 'gal':
        result = 'l';
        break;
      case 'l':
        result = 'gal';
        break;
      case 'lbs': 
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      default:
        result = null;
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result;
    
    if (!unit) {
      return null;
    }
    
    switch(unit.toLowerCase()) {
      case 'gal':
        result = 'gallons';
        break;
      case 'l':
        result = 'litres';
        break;
      case 'lbs': 
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      default:
        result = null;
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    
    if (!initUnit) {
      return null;
    }
    
    switch(initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs': 
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = null;
    }
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    
    const ini = initNum ? initNum.toFixed(5).replace(/\.?0*$/,'') : null;
    const ret = returnNum ? returnNum.toFixed(5).replace(/\.?0*$/,'') : null;
    result = `${ini} ${this.spellOutUnit(initUnit)} converts to ${ret} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
