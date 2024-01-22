import React from "react";
import Link from "next/link";

import { Icons } from "./Icons";

export interface Breadcrumb {
  id: number;
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
    <ol className="flex items-center space-x-2">
      {breadcrumbs.map((crumb, index) => (
        <li key={crumb.href}>
          <div className="flex items-center text-sm">
            <Link
              href={crumb.href}
              className="font-medium text-sm text-muted-foreground hover:text-gray-900 transition-colors"
            >
              {crumb.name}
            </Link>
            {index !== breadcrumbs.length - 1 && <Icons.Slash />}
          </div>
        </li>
      ))}
    </ol>
  );
};

export default Breadcrumbs;
