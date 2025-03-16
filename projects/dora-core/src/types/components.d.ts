export interface DoraOptions {
  layout?: 'vertical' | 'horizontal'
  theme?: 'light' | 'dark'
  locale?: string
}

export type DoraLayoutProps = {
  showHeader?: boolean
  showSidebar?: boolean
}