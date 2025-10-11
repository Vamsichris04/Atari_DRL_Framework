'use client';
import { Button } from '@/components/ui/button';
import { HomeIcon, MoveRight } from 'lucide-react';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/constants';

export function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const currentIndex = ROUTES.findIndex((route) => route.route === pathname);

  return (
    <div className="fixed bottom-0 border flex justify-between w-full h-14 p-2 bg-secondary">
      {ROUTES.map((route, index) => {
        const elements = [];
        if (index !== 0) {
          elements.push(<MoveRight size="40" key={`arrow-${index}`} />);
        }
        elements.push(
          <Button
            key={index}
            disabled={currentIndex <= index}
            onClick={() => {
              router.push(route.route);
            }}
            variant={currentIndex < index ? 'ghost' : 'default'}
          >
            {route.route === '/' ? <HomeIcon /> : ''}
            {route.text}
          </Button>
        );
        return elements;
      })}
    </div>
  );
}
