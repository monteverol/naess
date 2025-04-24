'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  const breadcrumbs = useMemo(() => {
    const crumbs = [];
    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i];
      const isPageSegment = segment.toLowerCase() === 'page';

      if (isPageSegment && i + 1 < pathSegments.length) {
        crumbs.push({
          label: `Page ${pathSegments[i + 1]}`,
          href: null,
        });
        break;
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
    <nav 
      aria-label="Breadcrumb" 
      className="section-inner-width"
    >
      <ol className="flex flex-wrap items-center text-sm md:text-base">
        <li className="flex items-center">
          <Link 
            href="/" 
            className="text-blue-700 hover:text-blue-900 font-medium transition-colors duration-200 flex items-center group"
          >
            <svg 
              className="w-4 h-4 mr-1 text-blue-500 group-hover:text-blue-700" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Home
          </Link>
        </li>
        
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="flex items-center">
            <svg 
              className="w-5 h-5 mx-2 text-blue-400" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
            
            {crumb.href ? (
              <Link 
                href={crumb.href} 
                className="text-blue-600 hover:text-blue-800 font-medium capitalize transition-colors duration-200 whitespace-nowrap truncate max-w-xs hover:underline"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-gray-600 font-medium capitalize">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;