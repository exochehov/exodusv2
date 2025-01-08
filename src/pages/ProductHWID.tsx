import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductHero from '../components/ui/ProductHero';
import TabNavigation from '../components/ui/TabNavigation';
import ProductTabs from '../components/ui/ProductTabs';
import { MediaGallery } from '../components/video/MediaGallery';
import { commonFeatures } from '../data/features';
import { setupInstructions, troubleshootingItems, faqItems } from '../data/productData';

const mediaItems = [
  {
    type: 'video' as const,
    url: 'https://youtu.be/pBkpHgDdcps'
  },
  {
    type: 'image' as const,
    url: 'https://imgur.com/mKEurLU.jpg'
  }
];

export default function ProductHWID() {
  const [activeTab, setActiveTab] = useState('features');
  const videoRef = useRef<HTMLDivElement>(null);
  
  const scrollToVideo = () => {
    videoRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductHero
          title="HWID Spoofer"
          description="Advanced hardware ID spoofing solution with real-time protection"
          onWatchDemo={scrollToVideo}
        />

        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={['features', 'documentation', 'FAQ']}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ProductTabs
              activeTab={activeTab}
              features={commonFeatures}
              setupInstructions={setupInstructions}
              troubleshootingItems={troubleshootingItems}
              faqItems={faqItems}
            />
          </motion.div>
        </AnimatePresence>

        <div ref={videoRef} className="mt-20 scroll-mt-24">
          <MediaGallery 
            items={mediaItems}
            className="shadow-xl shadow-black/20"
          />
        </div>
      </div>
    </div>
  );
}