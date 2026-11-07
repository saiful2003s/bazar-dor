"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ICategory } from "@/types/type";

const NavbarPage = () => {
  const [navs, setNavs] = useState<ICategory[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/categories"
      );

      const data: ICategory[] = await res.json();
      setNavs(data);
    };

    fetchCategories();
  }, []);

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-center gap-3 overflow-x-auto py-3">

          {navs.map((n) => {
            const isActive = pathname === `/category/${n.slug}`;

            return (
              <Link
                key={n.id}
                href={`/category/${n.slug}`}
                className={`shrink-0 px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                  isActive
                    ? "bg-green-600 text-white"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                {n.icon} {n.nameBn}
              </Link>
            );
          })}

        </div>
      </div>
    </nav>
  );
};

export default NavbarPage;