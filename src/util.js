// https://bost.ocks.org/mike/shuffle/
export function shuffle(array, random = Math.random) {
  var m = array.length, t, i;

  // While there remain elements to shuffle
  while (m) {
    // Pick a remaining element
    i = Math.floor(random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

// variation of https://stackoverflow.com/a/37168679
export function millisecondsToTimestamp(totalMs) {
  var milliseconds = (totalMs % 1000).toFixed(0);
  milliseconds = ("000" + milliseconds).slice(-3);

  var seconds = Math.floor(totalMs / 1000).toFixed(0);
  var minutes = Math.floor(seconds / 60);
  var hours = "";
  if (minutes > 59) {
    hours = Math.floor(minutes / 60);
    minutes = minutes - (hours * 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
  }

  seconds = Math.floor(seconds % 60);
  seconds = (seconds >= 10) ? seconds : "0" + seconds;
  if (hours !== "") {
    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }

  return minutes + ":" + seconds + "." + milliseconds;
}

// https://stackoverflow.com/a/37164538
function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}
export function mergeDeep(target, source) {
  let output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target))
          Object.assign(output, { [key]: source[key] });
        else
          output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

function splitMax(string, delimiter, maxSplits) {
  let arr = string.split(delimiter);
  let result = arr.splice(0, maxSplits - 1);

  result.push(arr.join(delimiter));

  return result;
}

// Facade over localStorage that handles basic
// numbers, strings, objects and arrays.
//
// Note if the object contains sub-objects of
// other types, these will most likely not be
// detected and lost in the conversion.
export const persistedData = {
  set: function(key, value) {
    if (!key) {return;}

    if (value === null || value === undefined) {
      window.localStorage.removeItem(key);
    }

    const ctor = value.constructor.name;
    let stringValue;
    // This handles simple property based objects
    // and arrays but it doesn't support classes
    // the caller should handle serialization
    // themselves.
    switch (ctor) {
      case 'Array': // through
      case 'Object': stringValue = JSON.stringify(value); break;
      case 'String': stringValue = value; break;
      case 'Number': stringValue = value.toString(); break;
      default: throw new Error(`Type ${ctor} not supported`);
    }

    window.localStorage.setItem(key, `pd:${ctor}:${stringValue}`);
  },

  get: function(key) {
    var value = localStorage.getItem(key);

    // values are always strings, so if we
    // get a literal null, it wasn't in there.
    if (value === null) {return;}

    const maxParts = 3;
    const parts = splitMax(value, ':', maxParts);
    if (parts.length < maxParts || parts[0] !== 'pd') {
      // value was definitely not stored using this facade
      return value;
    }

    // At this point we assume the value was stored using
    // the facade, if it wasn't then we've probably got
    // a bug somewhere else (OR someone has been messing
    // with the data manually).
    const ctorName = parts[1];
    const stringValue = parts[2];
    let objectValue;
    switch (ctorName) {
      case 'Array': // through
      case 'Object': objectValue = JSON.parse(stringValue); break;
      case 'String': objectValue = stringValue; break;
      case 'Number': objectValue = Number(stringValue); break;
      default: throw new Error(
        `Non-facade value '${value}' was stored` +
        `but was attempted to be retrieved through the facade.`
      );
    }

    return objectValue;
  }
}

export function objectsHaveSameKeys(a, b) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  const aSet = new Set(aKeys);
  const bSet = new Set(bKeys);

  if (aSet.size !== bSet.size) return false;

  for (let item of aSet) {
    if (!bSet.has(item)) return false;
  }

  return true;
}
