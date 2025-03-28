'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    return {
      label: decodeURIComponent(segment).replace(/-/g, ' '),
      href,
    };
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
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
          <li key={crumb.href} className="flex items-center space-x-2">
            <span className="font-md font-bold">{'>'}</span>
            {index !== breadcrumbs.length - 1 ? (
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
