import dynamic from 'next/dynamic';

export { default as HeroSection } from './Hero';
export { default as DescriptionSection } from './Description';
export { default as ProductShowcaseSection } from './ProductShowcase';
export { default as SystemRequirementsSection } from './SystemRequirements';

// export { default as VideosSection } from './Videos';
export const VideosSection = dynamic(() => import('./Videos'));
