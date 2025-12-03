import '../app/globals.css'

import type { Preview } from '@storybook/nextjs-vite'
import { ThemeProvider } from '@/components/theme-provider'
import { Decorator } from '@storybook/react'
import { SWRConfig } from 'swr'

const withProviders: Decorator = (Story) => (
  <SWRConfig value={{ provider: () => new Map() }}>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
      enableSystem={false}
    >
      <div className="min-h-screen bg-background text-foreground">
        <Story />
      </div>
    </ThemeProvider>
  </SWRConfig>
)

const preview: Preview = {
  decorators: [withProviders],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
}

export default preview;
