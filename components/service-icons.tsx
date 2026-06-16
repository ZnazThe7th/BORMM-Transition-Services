'use client';

import {
  Compass,
  FileText,
  Lightbulb,
  PenTool,
  Rocket,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

import type {ServiceIconKey} from '@/lib/services';

/**
 * Maps the serializable icon keys from the shared catalog to lucide icon
 * components. Keeping this on the client side lets `lib/services.ts` stay free
 * of React imports so the back-end can use the same data.
 */
export const serviceIcons: Record<ServiceIconKey, LucideIcon> = {
  lightbulb: Lightbulb,
  rocket: Rocket,
  fileText: FileText,
  penTool: PenTool,
  compass: Compass,
  trendingUp: TrendingUp,
};
