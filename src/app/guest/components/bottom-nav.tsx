'use client';

import React from 'react';
import Link from 'next/link';
import useNavigation from '@/hooks/use-navigation';
import useScrollingEffect from '@/hooks/use-scroll';
import { BellRing, LucideClipboardCheck, ShoppingCart } from 'lucide-react';
import { RiRestaurant2Line } from 'react-icons/ri';

const BottomNav = () => {
  const scrollDirection = useScrollingEffect();
  const navClass = scrollDirection === 'up' ? '' : 'opacity-75 duration-500';

  const {
    isHomeActive,
    isOrdersActive,
    isNotificationsActive,
    isCartActive,
  } = useNavigation();

  const navItems = [
    {
      href: '/guest/menu',
      label: 'Menu',
      icon: <RiRestaurant2Line className="w-6 h-6" />,
      isActive: isHomeActive,
    },
    {
      href: '/guest/cart',
      label: 'Giỏ hàng',
      icon: <ShoppingCart className="w-[22px] h-[22px]" />,
      isActive: isCartActive,
    },
    {
      href: '/guest/orders',
      label: 'Đơn đặt',
      icon: <LucideClipboardCheck className="w-5 h-5" />,
      isActive: isOrdersActive,
    },
    {
      href: '/guest/notifications',
      label: 'Thông báo',
      icon: <BellRing className="w-[22px] h-[22px]" />,
      isActive: isNotificationsActive,
    },
  ];

  return (
    <div
      className={`fixed bottom-0 bg-white w-full py-[10px] z-10 md:hidden ${navClass} shadow-sm border-t border-gray-200`}
    >
      <div className="flex flex-row justify-around items-center w-full gap-3">
        {navItems.map(({ href, label, icon, isActive }) => (
          <Link key={href} href={href} className="flex items-center">
            <div
              className={`flex flex-col items-center text-xs gap-1 ${isActive ? 'text-orange-500' : 'text-gray-400'
                }`}
            >
              {icon}
              <span>{label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
