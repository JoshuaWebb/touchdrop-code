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
