import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/alive-table/',
  title: 'AliveTable',
  description: 'AliveTable文档',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide' }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/real-ju/alive-table' }]
  }
});
