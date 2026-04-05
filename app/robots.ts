import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://shahzilshahzad.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Disallow crawling of any private or API routes
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
