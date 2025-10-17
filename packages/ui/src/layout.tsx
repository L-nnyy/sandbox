import type { HTMLAttributes } from 'react';
import { cx } from './utils';

type StackSpace = 'tight' | 'base' | 'relaxed';
type SectionSurface = 'paper' | 'mist' | 'night';
type ColumnCount = 1 | 2 | 3 | 4;

type BaseProps<T extends HTMLElement> = HTMLAttributes<T> & {
  className?: string;
};

export type StackProps = BaseProps<HTMLDivElement> & {
  space?: StackSpace;
};

export type NotebookSectionProps = BaseProps<HTMLElement> & {
  surface?: SectionSurface;
};

export type ResponsiveGridProps = BaseProps<HTMLDivElement> & {
  sm?: ColumnCount;
  lg?: ColumnCount;
};

export const Stack = ({ space = 'base', className, ...props }: StackProps) => {
  const spaceClasses: Record<StackSpace, string> = {
    tight: 'space-y-3',
    base: 'space-y-5',
    relaxed: 'space-y-7',
  };

  return <div className={cx('flex flex-col', spaceClasses[space], className)} {...props} />;
};

const sectionSurfaceStyles: Record<SectionSurface, string> = {
  paper: 'bg-atelier-paper text-atelier-ink border-atelier-sand',
  mist: 'bg-atelier-mist text-atelier-ink border-atelier-haze',
  night: 'bg-atelier-night text-atelier-parchment border-atelier-charcoal',
};

export const NotebookSection = ({ surface = 'paper', className, ...props }: NotebookSectionProps) => {
  return (
    <section
      className={cx(
        'relative rounded-3xl border-2 border-dashed px-6 py-8 shadow-sm sm:px-9 sm:py-10',
        sectionSurfaceStyles[surface],
        'before:absolute before:inset-x-6 before:top-4 before:h-px before:bg-atelier-haze/60 before:content-[""] dark:before:bg-atelier-shadow/60',
        className,
      )}
      {...props}
    />
  );
};

const gridColumns: Record<ColumnCount, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
};

const smGridColumns: Record<ColumnCount, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
};

const lgGridColumns: Record<ColumnCount, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
};

export const ResponsiveGrid = ({ sm = 2, lg = 3, className, ...props }: ResponsiveGridProps) => {
  return (
    <div
      className={cx(
        'grid gap-5',
        gridColumns[1],
        smGridColumns[sm],
        lgGridColumns[lg],
        className,
      )}
      {...props}
    />
  );
};
