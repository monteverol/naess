'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  const params = useParams();

  const breadcrumbs = useMemo(() => {
    const crumbs = [];
    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i];
      const isPageSegment = segment.toLowerCase() === 'page';

      // Skip "page" segment and handle the next one as a display-only breadcrumb (e.g., Page 1)
      if (isPageSegment && i + 1 < pathSegments.length) {
        crumbs.push({
          label: `Page ${pathSegments[i + 1]}`,
          href: null, // Not clickable
        });
        break; // Skip remaining segments
      }

      const href = '/' + pathSegments.slice(0, i + 1).join('/');
      crumbs.push({
        label: decodeURIComponent(segment).replace(/-/g, ' '),
        href,
      });
    }
    return crumbs;
  }, [pathSegments]);

  // JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs
      .filter(crumb => crumb.href) // Exclude non-clickable breadcrumbs
      .map((breadcrumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": breadcrumb.label,
        "item": `${process.env.NEXT_PUBLIC_SITE_URL}${breadcrumb.href}`,
      }))
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [structuredData]);

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-600 mb-4">
      <ol className="flex space-x-2">
        <li>
          <Link href="/" className="hover:underline text-lg font-bold text-[#264D6C]">Home</Link>
        </li>
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span className="font-md font-bold">{'>'}</span>
            {crumb.href ? (
              <Link href={crumb.href} className="hover:underline text-lg font-bold text-[#264D6C] capitalize">
                {crumb.label}
              </Link>
            ) : (
              <span className="font-bold text-lg capitalize">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;