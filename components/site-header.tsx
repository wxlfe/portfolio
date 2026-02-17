'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'Skills', href: '/skills' },
  { label: 'Experience', href: '/experience' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="hover_nav_wrap">
      <Card className="hover_nav_card">
        <Link href="/" className="hover_nav_brand" aria-label="Home">
          <img src="/assets/images/wxlfe-gold.svg" height={44} alt="Nate Wolfe logo" />
        </Link>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="hover_nav_toggle"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
        <nav className={cn('hover_nav_links', isOpen && 'is-open')} aria-label="Main">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Button key={link.href} asChild variant="ghost" size="sm" className={cn('hover_nav_button', isActive && 'is-active')}>
                <Link href={link.href} onClick={() => setIsOpen(false)}>
                  {link.label}
                </Link>
              </Button>
            );
          })}
        </nav>
      </Card>
    </header>
  );
}
