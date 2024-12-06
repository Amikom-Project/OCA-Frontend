import React from 'react';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

const ActionButtons: React.FC = () => {
  return (
    <div className='flex space-x-2'>
      <Button variant='warning' size='sm'>
        <Icons.edit className='size-4 mr-2' />
        Edit
      </Button>
    </div>
  );
};

export default ActionButtons;
