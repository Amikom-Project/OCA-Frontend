import { Icons } from '@/components/ui/icons';

export interface CardItem {
  label?: string;
  href: string;
  count: number;
  icon?: keyof typeof Icons;
}

export type MainCardItem = CardItem;
