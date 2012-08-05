// Generated by CoffeeScript 1.3.3
(function() {

  this.NumberHelpers = (function() {

    function NumberHelpers() {}

    NumberHelpers.number_to_currency = function(float, opts) {
      var decimal, integer, number, _delimiter, _precision, _ref, _ref1, _ref2, _ref3, _ref4, _separator, _unit;
      if (opts == null) {
        opts = {};
      }
      _precision = (_ref = opts.precision) != null ? _ref : 2;
      _unit = (_ref1 = opts.unit) != null ? _ref1 : '$';
      _separator = (_ref2 = opts.separator) != null ? _ref2 : '.';
      _delimiter = (_ref3 = opts.delimiter) != null ? _ref3 : ',';
      number = float.toString().split('.');
      integer = number[0];
      decimal = number[1];
      decimal = parseFloat("0." + decimal).toFixed(_precision);
      decimal = decimal.toString().split('.');
      decimal = (_ref4 = decimal[1]) != null ? _ref4 : '';
      if (!decimal) {
        _separator = '';
      }
      if (isNaN(integer)) {
        _separator = decimal = '';
      }
      integer = NumberHelpers.number_with_delimiter(integer, {
        delimiter: _delimiter
      });
      return "" + _unit + integer + _separator + decimal;
    };

    NumberHelpers.number_with_delimiter = function(float, opts) {
      var decimal, integer, number, rgx, _delimiter, _ref, _ref1, _ref2, _separator;
      if (opts == null) {
        opts = {};
      }
      _separator = (_ref = opts.separator) != null ? _ref : '.';
      _delimiter = (_ref1 = opts.delimiter) != null ? _ref1 : ',';
      number = float.toString().split(".");
      integer = number[0];
      decimal = (_ref2 = number[1]) != null ? _ref2 : '';
      if (!decimal) {
        _separator = '';
      }
      rgx = /(\d+)(\d{3})/;
      if (_delimiter) {
        while (rgx.test(integer)) {
          integer = integer.replace(rgx, "$1" + _delimiter + "$2");
        }
      }
      return "" + integer + _separator + decimal;
    };

    NumberHelpers.number_with_precision = function(float, opts) {
      var decimal, i, integer, multiple, num_array, num_lngth, number, rnd, rounded, significant, sigs, _delimiter, _precision, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _separator, _significant, _strip_insignificant_zeros;
      if (opts == null) {
        opts = {};
      }
      _precision = (_ref = opts.precision) != null ? _ref : 3;
      _delimiter = (_ref1 = opts.delimiter) != null ? _ref1 : ',';
      _separator = (_ref2 = opts.separator) != null ? _ref2 : '.';
      _significant = (_ref3 = opts.significant) != null ? _ref3 : false;
      _strip_insignificant_zeros = (_ref4 = opts.strip_insignificant_zeros) != null ? _ref4 : false;
      number = float.toString().split('.');
      integer = number[0];
      decimal = (_ref5 = number[1]) != null ? _ref5 : '';
      if (_significant) {
        rnd = _precision - integer.length;
      } else {
        rnd = _precision;
      }
      if (rnd < 1) {
        rnd = 0;
      }
      multiple = Math.pow(10, rnd);
      if (multiple > 1) {
        rounded = Math.round(float * multiple) / multiple;
      } else {
        rounded = float;
      }
      number = rounded.toString().split('.');
      integer = number[0];
      decimal = (_ref6 = number[1]) != null ? _ref6 : '';
      decimal = parseFloat("0." + decimal).toFixed(_precision);
      decimal = decimal.toString().split('.');
      decimal = (_ref7 = decimal[1]) != null ? _ref7 : '';
      number = ("" + integer + "." + decimal) * 1;
      num_array = number.toString().split('');
      num_lngth = num_array.length;
      i = 0;
      sigs = 0;
      while (i < num_lngth) {
        if (!(num_array[i] === '.' || num_array[i] === '0')) {
          sigs++;
        }
        i++;
      }
      if (_significant && sigs >= _precision) {
        significant = number.toPrecision(_precision) * 1;
        significant = significant.toString().split('.');
        integer = significant[0];
        decimal = (_ref8 = significant[1]) != null ? _ref8 : '';
      }
      integer = NumberHelpers.number_with_delimiter(integer, {
        delimiter: _delimiter
      });
      if (_strip_insignificant_zeros) {
        decimal = '';
      }
      if (!decimal) {
        _separator = '';
      }
      return "" + integer + _separator + decimal;
    };

    NumberHelpers.number_to_human = function(float, opts) {
      var abs_float, denom, label, number, precise, _delimiter, _precision, _ref, _ref1, _ref2, _ref3, _ref4, _separator, _significant, _strip_insignificant_zeros;
      if (opts == null) {
        opts = {};
      }
      _precision = (_ref = opts.precision) != null ? _ref : 3;
      _separator = (_ref1 = opts.separator) != null ? _ref1 : '.';
      _significant = (_ref2 = opts.significant) != null ? _ref2 : true;
      _delimiter = (_ref3 = opts.delimiter) != null ? _ref3 : ',';
      _strip_insignificant_zeros = (_ref4 = opts.strip_insignificant_zeros) != null ? _ref4 : false;
      abs_float = Math.abs(float);
      if (abs_float < Math.pow(10, 3)) {
        denom = 1;
        label = false;
      } else if (abs_float >= Math.pow(10, 3) && abs_float < Math.pow(10, 6)) {
        denom = Math.pow(10, 3);
        label = 'Thousand';
      } else if (abs_float >= Math.pow(10, 6) && abs_float < Math.pow(10, 9)) {
        denom = Math.pow(10, 6);
        label = 'Million';
      } else if (abs_float >= Math.pow(10, 9) && abs_float < Math.pow(10, 12)) {
        denom = Math.pow(10, 9);
        label = 'Billion';
      } else if (abs_float >= Math.pow(10, 12) && abs_float < Math.pow(10, 15)) {
        denom = Math.pow(10, 12);
        label = 'Trillion';
      } else if (abs_float >= Math.pow(10, 15)) {
        denom = Math.pow(10, 15);
        label = 'Quadrillion';
      }
      number = float / denom;
      precise = NumberHelpers.number_with_precision(number, {
        precision: _precision,
        significant: _significant,
        delimiter: label === 'Quadrillion' ? '' : _delimiter,
        separator: _separator,
        strip_insignificant_zeros: !label ? true : _strip_insignificant_zeros
      });
      if (label) {
        return "" + precise + " " + label;
      } else {
        return precise;
      }
    };

    NumberHelpers.number_to_human_size = function(float, opts) {
      var abs_float, denom, label, number, precise, _delimiter, _precision, _ref, _ref1, _ref2, _ref3, _ref4, _separator, _significant, _strip_insignificant_zeros;
      if (opts == null) {
        opts = {};
      }
      _precision = (_ref = opts.precision) != null ? _ref : 3;
      _separator = (_ref1 = opts.separator) != null ? _ref1 : '.';
      _significant = (_ref2 = opts.significant) != null ? _ref2 : true;
      _delimiter = (_ref3 = opts.delimiter) != null ? _ref3 : ',';
      _strip_insignificant_zeros = (_ref4 = opts.strip_insignificant_zeros) != null ? _ref4 : false;
      if (float > 1000) {
        float = float / 1.024;
      }
      if (float > 1000000) {
        float = float / 1.024;
      }
      if (float > 1000000000) {
        float = float / 1.024;
      }
      if (float > 1000000000000) {
        float = float / 1.024;
      }
      abs_float = Math.abs(float);
      if (abs_float < Math.pow(10, 3)) {
        denom = 1;
        label = 'Bytes';
      } else if (abs_float >= Math.pow(10, 3) && abs_float < Math.pow(10, 6)) {
        denom = Math.pow(10, 3);
        label = 'KB';
      } else if (abs_float >= Math.pow(10, 6) && abs_float < Math.pow(10, 9)) {
        denom = Math.pow(10, 6);
        label = 'MB';
      } else if (abs_float >= Math.pow(10, 9) && abs_float < Math.pow(10, 12)) {
        denom = Math.pow(10, 9);
        label = 'GB';
      } else if (abs_float >= Math.pow(10, 12) && abs_float < Math.pow(10, 15)) {
        denom = Math.pow(10, 12);
        label = 'TB';
      }
      number = float / denom;
      precise = NumberHelpers.number_with_precision(number, {
        precision: _precision,
        significant: _significant,
        delimiter: _delimiter,
        separator: _separator,
        strip_insignificant_zeros: label === 'Bytes' ? true : _strip_insignificant_zeros
      });
      return "" + precise + " " + label;
    };

    NumberHelpers.number_to_phone = function(number, opts) {
      var first, last, lng, second, str, _area_code, _country_code, _delimiter, _extension, _ref, _ref1, _ref2, _ref3;
      if (opts == null) {
        opts = {};
      }
      _area_code = (_ref = opts.area_code) != null ? _ref : false;
      _delimiter = (_ref1 = opts.delimiter) != null ? _ref1 : '-';
      _country_code = (_ref2 = opts.country_code) != null ? _ref2 : false;
      _extension = (_ref3 = opts.extension) != null ? _ref3 : false;
      if (isNaN(number)) {
        return number;
      }
      str = number.toString();
      lng = str.length;
      last = str.substr(lng - 4, lng);
      if (lng < 8) {
        first = str.substr(0, 3);
      } else {
        first = str.substr(0, 3);
        second = str.substr(3, 3);
        if (_area_code) {
          first = "(" + first + ") " + second;
        } else {
          first = "" + first + _delimiter + second;
        }
      }
      _extension = _extension ? " x " + opts.extension : '';
      _country_code = _country_code ? "+" + _country_code + _delimiter : '';
      return "" + _country_code + first + _delimiter + last + _extension;
    };

    NumberHelpers.number_to_percentage = function(float, opts) {
      var _delimiter, _precision, _ref, _ref1, _ref2, _ref3, _ref4, _separator, _significant, _strip_insignificant_zeros;
      if (opts == null) {
        opts = {};
      }
      _precision = (_ref = opts.precision) != null ? _ref : 3;
      _separator = (_ref1 = opts.separator) != null ? _ref1 : '.';
      _significant = (_ref2 = opts.significant) != null ? _ref2 : true;
      _delimiter = (_ref3 = opts.delimiter) != null ? _ref3 : '';
      _strip_insignificant_zeros = (_ref4 = opts.strip_insignificant_zeros) != null ? _ref4 : false;
      return true;
    };

    return NumberHelpers;

  })();

}).call(this);
