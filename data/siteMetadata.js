const siteMetadata = {
  title: 'Priyanshu Sharma',
  author: 'Priyanshu Sharma',
  headerTitle: 'Priyanshu Sharma',
  description:
    "Hi, I'm Priyanshu Sharma. I love designing & reading. Join me in my journey of learning new things and sharing experiences.",
  language: 'en-us',
  theme: 'system',
  siteUrl: 'https://priyanshusharma.dev/',
  siteRepo: 'https://github.com/PriyanshuCK/site',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/avatar.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'priyanshu@priyanshusharma.dev',
  github: 'https://github.com/PriyanshuCK',
  twitter: 'https://twitter.com/PriyanshuCK',
  linkedin: 'https://www.linkedin.com/in/PriyanshuCK',
  locale: 'en-US',
  analytics: {
    googleAnalyticsId: 'G-ZX0NW47J11',
  },
  newsletter: {
    provider: 'revue',
  },
  comment: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      inputPosition: 'top',
      lang: 'en',
      darkTheme: 'transparent_dark',
      themeURL: '',
    },
  },
}

module.exports = siteMetadata
