import {
  mergeDeep,
  persistedData,
  objectsHaveSameKeys,
} from '../util';

import {
  defaultStyles,
} from '../constants';

const configKey = 'config';

export function loadConfig (state) {
  const existingConfig = persistedData.get(configKey);
  if (existingConfig) {
    return {
      ...state,
      config: existingConfig,
    }
  }

  return state;
}

export function updateConfig (state, action) {
  const newConfig = mergeDeep(state.config, action.config);

  if (!validateConfig(newConfig)) {
    return state;
  }

  persistedData.set(configKey, newConfig);

  return {
    ...state,
    config: newConfig,
  };
}

export function validateConfig(config) {
  if (!config) {
    return false;
  }

  if (config.version !== 0) {
    // NOTE: when we update the version of this for reals,
    // we'll probably want a facility to upgrade a config
    // object through the various (supported) versions so
    // any configs that players have stored offline can
    // still be used and brought up to date.
    return false;
  }

  if (!config.blockStyles) {
    return false;
  }

  if (!objectsHaveSameKeys(config.blockStyles, defaultStyles)) {
    return false;
  }

  const keys = Object.keys(config.blockStyles);
  for (let key of keys) {
    const newStyle = config.blockStyles[key];
    const defaultStyle = defaultStyles[key];

    if (!objectsHaveSameKeys(newStyle, defaultStyle)) {
      return false;
    }
  }

  return true;
}
