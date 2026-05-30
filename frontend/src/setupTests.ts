// jsdom não tem TextEncoder nativo, então usei do próprio Node
global.TextEncoder = require('util').TextEncoder;

import '@testing-library/jest-dom';
