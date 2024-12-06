import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icons } from '../ui/icons';
import { cn } from '@/lib/utils';
import { usePathname } from '@/hooks';
import { MainNavItem, SidebarNavItem } from '@/types/nav-items-type';

type DashboardNavProps = {
  items: MainNavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
};

type DashboardNavItemProps = {
  item: MainNavItem | SidebarNavItem;
  setOpen?: Dispatch<SetStateAction<boolean>>;
};

const DashboardNavItem: React.FC<DashboardNavItemProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (item.items?.some((subItem) => pathname.includes(subItem.href))) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [pathname, item.items]);

  const toggleSubmenu = () => {
    setIsOpen(!isOpen);
  };

  const IconComponent = Icons[item.icon || 'arrowRight'];

  return (
    <div key={item.href} className='space-y-1'>
      {item.items ? (
        <>
          <div
            className='group text-sm flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-[#700070] rounded-lg transition'
            onClick={toggleSubmenu}
          >
            <div className='flex items-center flex-1'>
              <IconComponent className='h-5 w-5 mr-3' />
              {item.label}
            </div>
            {isOpen ? (
              <Icons.minus className='h-5 w-5' />
            ) : (
              <Icons.plus className='h-5 w-5' />
            )}
          </div>
          {isOpen && (
            <div className='pl-8 space-y-1'>
              {item.items.map((subItem) => {
                const SubIconComponent = Icons[subItem.icon || 'arrowRight'];
                return (
                  <NavLink
                    to={subItem.href}
                    key={subItem.href}
                    className={({ isActive }) =>
                      cn(
                        'group text-sm flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-[#700070] rounded-lg transition',
                        isActive ? 'text-white bg-[#700070]' : 'text-black'
                      )
                    }
                  >
                    <div className='flex text-sm items-center flex-1'>
                      <SubIconComponent className='h-5 w-5 mr-3' />
                      {subItem.label}
                    </div>
                  </NavLink>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <NavLink
          to={item.href}
          className={({ isActive }) =>
            cn(
              'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-[#700070] rounded-lg transition',
              isActive ? 'text-white bg-[#700070]' : 'text-black'
            )
          }
        >
          <div className='flex items-center flex-1'>
            <IconComponent className='h-5 w-5 mr-3' />
            {item.label}
          </div>
        </NavLink>
      )}
    </div>
  );
};

const DashboardNav: React.FC<DashboardNavProps> = ({ items, setOpen }) => {
  if (!items?.length) {
    return null;
  }

  return (
    <nav className='space-y-1'>
      {items.map((item) => (
        <DashboardNavItem key={item.href} item={item} setOpen={setOpen} />
      ))}
    </nav>
  );
};

export default DashboardNav;
