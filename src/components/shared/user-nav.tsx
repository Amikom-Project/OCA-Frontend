import { useAuth } from '@/hooks/use-auth';

import ProfileIcon from '@/assets/profile.svg';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function UserNav() {
  const { user, logout, navigateAfterLogout } = useAuth();

  const { nama_pegawai, nama_satker } = user;

  const getInitials = (fullName: string): string => {
    const nameParts = fullName.split(' ');
    const initials = nameParts.map((part) => part.charAt(0).toUpperCase());
    return initials.join('');
  };

  const initials = getInitials(nama_pegawai);

  const handleLogout = () => {
    logout();
    navigateAfterLogout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='relative h-9 w-9 rounded-full hover:bg-transparent'
        >
          <Avatar className='h-9 w-9'>
            <AvatarImage src={ProfileIcon} alt={nama_pegawai} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{'Agent'}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {nama_satker}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
