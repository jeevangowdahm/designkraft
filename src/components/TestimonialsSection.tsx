import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: string;
  name: string;
  city: string;
  state: string;
  projectType: string;
  rating: number;
  review: string;
  image: string;
  projectImage: string;
  projectCost: string;
  completionDate: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    city: 'Mumbai',
    state: 'Maharashtra',
    projectType: '3BHK Apartment',
    rating: 5,
    review: 'DesignKraft India transformed our Bandra apartment into a stunning modern home. The AI room analysis was incredibly accurate, and the team executed everything perfectly within our budget. Highly recommended for anyone in Mumbai!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    projectImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
    projectCost: '₹18,50,000',
    completionDate: 'December 2025'
  },
  {
    id: '2',
    name: 'Rahul Verma',
    city: 'Delhi',
    state: 'NCR',
    projectType: 'Villa Interior',
    rating: 5,
    review: 'From design consultation to final execution, the experience was seamless. Our Gurgaon villa looks like something out of a magazine. The 3D preview feature helped us visualize everything before committing.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    projectImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80',
    projectCost: '₹45,00,000',
    completionDate: 'November 2025'
  },
  {
    id: '3',
    name: 'Ananya Reddy',
    city: 'Bangalore',
    state: 'Karnataka',
    projectType: 'Tech Office',
    rating: 5,
    review: 'We needed a modern workspace for our startup in Koramangala. DesignKraft delivered an inspiring office that our employees love. The project was completed ahead of schedule and within budget.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    projectImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
    projectCost: '₹32,00,000',
    completionDate: 'October 2025'
  },
  {
    id: '4',
    name: 'Karthik Iyer',
    city: 'Chennai',
    state: 'Tamil Nadu',
    projectType: '4BHK Home',
    rating: 5,
    review: 'Traditional South Indian aesthetics with modern functionality - exactly what we wanted for our Adyar home. The team understood our requirements perfectly and the craftsmanship was exceptional.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
    projectImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80',
    projectCost: '₹28,00,000',
    completionDate: 'September 2025'
  },
  {
    id: '5',
    name: 'Neha Patel',
    city: 'Ahmedabad',
    state: 'Gujarat',
    projectType: 'Boutique Hotel',
    rating: 5,
    review: 'DesignKraft designed our boutique hotel lobby and 20 rooms. The attention to Gujarati heritage while maintaining luxury standards was impressive. Guest feedback has been overwhelmingly positive.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80',
    projectImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80',
    projectCost: '₹75,00,000',
    completionDate: 'August 2025'
  },
  {
    id: '6',
    name: 'Amit Singh',
    city: 'Hyderabad',
    state: 'Telangana',
    projectType: '2BHK Renovation',
    rating: 5,
    review: 'Budget-friendly renovation that completely changed our Madhapur apartment. The AI-powered suggestions helped us maximize our space without breaking the bank. Best decision we made!',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
    projectImage: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&q=80',
    projectCost: '₹12,50,000',
    completionDate: 'July 2025'
  },
  {
    id: '7',
    name: 'Sunita Joshi',
    city: 'Pune',
    state: 'Maharashtra',
    projectType: 'Healthcare Clinic',
    rating: 5,
    review: 'Professional healthcare interior design that meets all compliance standards. Our patients love the calming environment. The team handled all medical facility requirements expertly.',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&q=80',
    projectImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=80',
    projectCost: '₹22,00,000',
    completionDate: 'June 2025'
  },
  {
    id: '8',
    name: 'Vikram Malhotra',
    city: 'Kolkata',
    state: 'West Bengal',
    projectType: 'Restaurant',
    rating: 5,
    review: 'Our Park Street restaurant needed a unique identity. DesignKraft created a blend of colonial charm with contemporary dining. The space has become Instagram-famous!',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80',
    projectImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
    projectCost: '₹35,00,000',
    completionDate: 'May 2025'
  }
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const cities = Array.from(new Set(testimonials.map(t => t.city)));
  
  const filteredTestimonials = selectedCity 
    ? testimonials.filter(t => t.city === selectedCity)
    : testimonials;

  const visibleTestimonials = filteredTestimonials.slice(currentIndex, currentIndex + 3);
  
  const canGoNext = currentIndex + 3 < filteredTestimonials.length;
  const canGoPrev = currentIndex > 0;

  const handleNext = () => {
    if (canGoNext) setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (canGoPrev) setCurrentIndex(prev => prev - 1);
  };

  return (
    <section id="testimonials" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              <Star className="w-4 h-4 fill-current" />
              Customer Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
              Trusted by Homeowners Across India
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See how we have transformed spaces for thousands of happy customers from Mumbai to Kolkata
            </p>
          </div>

          {/* City Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Button
              variant={selectedCity === null ? "hero" : "outline"}
              size="sm"
              onClick={() => { setSelectedCity(null); setCurrentIndex(0); }}
            >
              All Cities
            </Button>
            {cities.map(city => (
              <Button
                key={city}
                variant={selectedCity === city ? "hero" : "outline"}
                size="sm"
                onClick={() => { setSelectedCity(city); setCurrentIndex(0); }}
              >
                <MapPin className="w-3 h-3 mr-1" />
                {city}
              </Button>
            ))}
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {visibleTestimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-card rounded-3xl border border-border/50 shadow-card overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={testimonial.projectImage} 
                    alt={`${testimonial.projectType} by ${testimonial.name}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                    {testimonial.projectType}
                  </div>
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    {testimonial.projectCost}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative mb-4">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                    <p className="text-sm text-muted-foreground leading-relaxed pl-4">
                      {testimonial.review}
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {testimonial.city}, {testimonial.state}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{testimonial.completionDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          {filteredTestimonials.length > 3 && (
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                disabled={!canGoPrev}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                {Array.from({ length: Math.ceil(filteredTestimonials.length / 3) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i * 3)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      Math.floor(currentIndex / 3) === i ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                disabled={!canGoNext}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 p-8 bg-card rounded-3xl border border-border/50">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-bold text-primary">10,000+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-bold text-primary">4.9★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-bold text-primary">₹500Cr+</div>
              <div className="text-sm text-muted-foreground">Projects Delivered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
