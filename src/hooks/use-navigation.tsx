'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

const useNavigation = () => {
  const pathname = usePathname();
  const [isHomeActive, setIsHomeActive] = useState(true);
  const [isOrdersActive, setIsOrdersActive] = useState(false);
  const [isNotificationsActive, setIsNotificationsActive] = useState(false);
  const [isCartActive, setIsCartActive] = useState(false);

  useEffect(() => {
    setIsHomeActive(false);
    setIsOrdersActive(false);
    setIsNotificationsActive(false);
    setIsCartActive(false);

    switch (pathname) {
      case '/guest/menu':
        setIsHomeActive(true);
        break;
      case '/guest/orders':
        setIsOrdersActive(true);
        break;
      case '/guest/notifications':
        setIsNotificationsActive(true);
        break;
      case '/guest/cart':
        setIsCartActive(true);
        break;
      default:
        break;
    }
  }, [pathname]);

  return {
    isHomeActive,
    isOrdersActive,
    isNotificationsActive,
    isCartActive,
  };
};

export default useNavigation;
