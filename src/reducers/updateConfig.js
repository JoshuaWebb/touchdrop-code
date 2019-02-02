import { mergeDeep } from '../util';

export default (state, action) => {
  const newConfig = mergeDeep(state.config, action.config);

  return {
    ...state,
    config: newConfig,
  };
};
