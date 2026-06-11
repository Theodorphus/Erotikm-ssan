/**
 * BREADCRUMBS COMPONENT
 *
 * Displays navigation breadcrumbs with Schema.org JSON-LD
 * Helps with SEO and navigation clarity
 *
 * Usage:
 * <Breadcrumbs items={[
 *   { label: 'Startsida', href: '/' },
 *   { label: 'Tjänster', href: '/tjanster' },
 *   { label: 'Hemstädning' }
 * ]} />
 */

import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Build Schema.org BreadcrumbList
  const breadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `https://fixarlukas.se${item.href}` : undefined,
    })),
  }

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Brödsmulor" className="py-4 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            {items.map((item, index) => (
              <li key={index} className="flex items-center">
                {item.href ? (
                  <Link href={item.href} className="hover:text-brand-pink transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-900 font-semibold">{item.label}</span>
                )}
                {index < items.length - 1 && <span className="mx-2 text-gray-400">/</span>}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  )
}
