import { MotionConfig } from 'framer-motion';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { ProjectDrawer } from '@/components/ui/ProjectDrawer';
import { Toaster } from '@/components/ui/Toaster';
import { SmoothScroll } from './SmoothScroll';

/** Client-side wrappers shared by the whole page. */
export function Providers({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      {children}
      <ProjectDrawer />
      <CommandPalette />
      <Toaster />
    </MotionConfig>
  );
}
