export const GAMESTATE_MENU = 'MENU';
export const GAMESTATE_PLAYING = 'PLAYING';
export const GAMESTATE_PAUSED = 'PAUSED';
export const GAMESTATE_END = 'END';
export const GAMESTATE_READY = 'READY';

export const GAMEMODE_ZEN = 'ZEN';
export const GAMEMODE_LINE_TARGET = 'LINE TARGET';

export const MENU_MAIN = 'MAIN';
export const MENU_STYLE_SETTINGS = 'STYLE';
export const MENU_IMPORT_EXPORT = 'IMPORT_EXPORT';

export const blockSizeInUnits = 26;

export const fieldWidthInBlocks = 10;
export const fieldHeightInBlocks = 20;
export const hiddenHeight = 3;

export const totalReadyMillis = 1500;

export const defaultStyles = [
  { fill: '#708090' }, // I
  { fill: '#f5c635' }, // L
  { fill: '#ee8817' }, // O
  { fill: '#47b450' }, // Z
  { fill: '#ee575b' }, // T
  { fill: '#9155f4' }, // J
  { fill: '#009fd4' }, // S
];

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
var testPassiveSupported = false;

try {
  var options = {
    get passive() { // This function will be called when the browser
                    //     attempts to access the passive property.
      testPassiveSupported = true;

      // make linter happy
      return true;
    }
  };

  window.addEventListener("test", options, options);
  window.removeEventListener("test", options, options);
} catch(err) {
  testPassiveSupported = false;
}

export const passiveSupported = testPassiveSupported;
