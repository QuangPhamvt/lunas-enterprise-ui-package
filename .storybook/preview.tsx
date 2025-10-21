import '../packages/index.css'

import { Controls, Description, Primary, Stories, Subtitle, Title } from '@storybook/addon-docs/blocks'
import { withThemeByClassName } from '@storybook/addon-themes'
import type { Preview } from '@storybook/react-vite'
import React from 'react'

import { INITIAL_VIEWPORTS } from 'storybook/viewport'

const withStrictMode = (Story: React.FC) => {
  return (
    <React.StrictMode>
      <Story />
    </React.StrictMode>
  )
}

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
    withStrictMode,
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
