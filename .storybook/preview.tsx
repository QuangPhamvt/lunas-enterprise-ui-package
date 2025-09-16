import '../packages/index.css'

import { Controls, Description, Primary, Stories, Subtitle, Title } from '@storybook/addon-docs/blocks'
import { withThemeByClassName } from '@storybook/addon-themes'
import type { Preview } from '@storybook/react-vite'

import { INITIAL_VIEWPORTS } from 'storybook/viewport'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
    layout: 'padded',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
      codePanel: true,
    },
  },
  initialGlobals: {},
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
}

export default preview
