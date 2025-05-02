'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link href="/" className="text-xl font-bold">
          Vibe Text Editor
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/" passHref>
            <Button variant={pathname === '/' ? 'default' : 'ghost'}>
              All Blogs
            </Button>
          </Link>
          <Link href="/create" passHref>
            <Button variant={pathname === '/create' ? 'default' : 'ghost'}>
              Create Blog
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
