import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const galleryItems = [
  {
    id: 1,
    title: 'Modern Living Room',
    category: 'Residential',
    before: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
    description: 'Complete transformation from dated to contemporary minimalist style',
  },
  {
    id: 2,
    title: 'Executive Office',
    category: 'Commercial',
    before: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    description: 'Modernized workspace with improved functionality and aesthetics',
  },
  {
    id: 3,
    title: 'Luxury Bedroom Suite',
    category: 'Residential',
    before: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
    description: 'Elegant boutique hotel-inspired bedroom redesign',
  },
  {
    id: 4,
    title: 'Restaurant Interior',
    category: 'Hospitality',
    before: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    description: 'Refined dining atmosphere with warm ambient lighting',
  },
];

const BeforeAfterGallery: React.FC = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const currentItem = galleryItems[currentIndex];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
    setSliderPosition(50);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
    setSliderPosition(50);
  };

  return (
    <section id="gallery" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            {t('gallery_title')}
          </h2>
          <p className="text-muted-foreground text-lg">
            See the dramatic transformations we've achieved for our clients
          </p>
        </div>

        {/* Gallery Viewer */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-3xl border border-border/50 shadow-card overflow-hidden">
            {/* Comparison Slider */}
            <div
              className="relative aspect-[16/10] cursor-ew-resize select-none overflow-hidden"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleSliderMove}
              onTouchMove={handleTouchMove}
            >
              {/* After Image (Background) */}
              <div className="absolute inset-0">
                <img
                  src={currentItem.after}
                  alt="After"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-sage/90 text-secondary-foreground rounded-full text-sm font-medium">
                  {t('gallery_after')}
                </div>
              </div>

              {/* Before Image (Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={currentItem.before}
                  alt="Before"
                  className="w-full h-full object-cover"
                  style={{ width: `${100 / (sliderPosition / 100)}%`, maxWidth: 'none' }}
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-charcoal/90 text-primary-foreground rounded-full text-sm font-medium">
                  {t('gallery_before')}
                </div>
              </div>

              {/* Slider Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-primary-foreground shadow-lg cursor-ew-resize"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-foreground shadow-lg flex items-center justify-center">
                  <ChevronLeft className="w-4 h-4 text-foreground -mr-1" />
                  <ChevronRight className="w-4 h-4 text-foreground -ml-1" />
                </div>
              </div>
            </div>

            {/* Info & Navigation */}
            <div className="p-6 lg:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">
                    {currentItem.category}
                  </span>
                  <h3 className="text-xl font-serif font-semibold text-foreground mt-1">
                    {currentItem.title}
                  </h3>
                  <p className="text-muted-foreground mt-1">{currentItem.description}</p>
                </div>

                <div className="flex items-center gap-4">
                  {/* Dots */}
                  <div className="flex gap-2">
                    {galleryItems.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setCurrentIndex(i);
                          setSliderPosition(50);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === currentIndex ? 'bg-primary w-6' : 'bg-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Arrows */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={prevSlide} className="rounded-xl">
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextSlide} className="rounded-xl">
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
