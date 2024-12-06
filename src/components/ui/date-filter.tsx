import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { addMonths, format } from 'date-fns';
import { id } from 'date-fns/locale';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Icons } from '@/components/ui/icons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from '@/components/ui/popover';

export function DateFilter() {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [month, setMonth] = useState(new Date());

  const defaultMonth = date?.from || month;
  const nextMonth = addMonths(defaultMonth, 1);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={false}
          size='sm'
          variant='outline'
          className={cn(
            'w-[320px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <Icons.calender className='mr-2 h-4 w-4' />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, 'dd LLLL y', { locale: id })} -{' '}
                {format(date.to, 'dd LLLL y', { locale: id })}
              </>
            ) : (
              format(date.from, 'dd LLLL y', { locale: id })
            )
          ) : (
            <span>Pilih Tanggal</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='lg:w-auto w-full p-0' align='start'>
        <div className='flex flex-col lg:flex-row w-full'>
          <Calendar
            disabled={false}
            initialFocus
            mode='range'
            defaultMonth={defaultMonth}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
            captionLayout='dropdown-buttons'
            fromYear={2020}
            toYear={2050}
            locale={id}
            month={defaultMonth}
            onMonthChange={setMonth}
          />
          <Calendar
            disabled={false}
            mode='range'
            defaultMonth={nextMonth}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
            captionLayout='dropdown-buttons'
            fromYear={2020}
            toYear={2050}
            locale={id}
            month={nextMonth}
            onMonthChange={(newMonth) => setMonth(addMonths(newMonth, -1))}
          />
        </div>

        <div className='p-4 w-full flex items-center gap-x-2'>
          <PopoverClose asChild>
            <Button
              onClick={() => setDate(undefined)}
              className='w-full'
              variant='outline'
            >
              Reset
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button disabled={!date?.from} className='w-full'>
              Filter
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}
