// utils/createEmotionCache.js
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';

// Create RTL cache
const createEmotionCache = () => {
  return createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
  });
};

export default createEmotionCache;