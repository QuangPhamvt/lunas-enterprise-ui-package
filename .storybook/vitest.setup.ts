// Storybook 10.3+ applies project annotations automatically via @storybook/addon-vitest.
// Add custom beforeAll/afterAll hooks here if needed.

import { configure } from 'storybook/test';

// Form fields are lazy()-loaded, and on a cold Vite dev server the first story in a file can wait
// well over the default 1s for that chunk — give findBy*/waitFor room so the suite isn't flaky.
configure({ asyncUtilTimeout: 5000 });
