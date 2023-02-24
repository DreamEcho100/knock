import dynamic from 'next/dynamic';

export { default as HeroSection } from './Hero';
export { default as DescriptionSection } from './Description';
export { default as ShapesYourDrumsSection } from './ShapesYourDrums';
export { default as EasyToUseSection } from './EasyToUse';
export { default as DrumsThatKnockSection } from './DrumsThatKnock';
export { default as ReviewsSection } from './Reviews';
export { default as AvailableOnIOSSection } from './AvailableOnIOS';

// export { default as VideosSection } from './Videos';
export const VideosSection = dynamic(() => import('./Videos'));
