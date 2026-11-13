import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Home, Building2, Hospital, Hotel, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    key: 'services_residential',
    icon: Home,
    description: 'Create your dream home with personalized designs that reflect your lifestyle.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
    features: ['Living Rooms', 'Bedrooms', 'Kitchens', 'Bathrooms'],
  },
  {
    key: 'services_commercial',
    icon: Building2,
    description: 'Transform workspaces into productive, inspiring environments.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    features: ['Offices', 'Retail', 'Restaurants', 'Co-working'],
  },
  {
    key: 'services_healthcare',
    icon: Hospital,
    description: 'Design healing spaces that promote wellness and recovery.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80',
    features: ['Hospitals', 'Clinics', 'Dental', 'Wellness Centers'],
  },
  {
    key: 'services_hospitality',
    icon: Hotel,
    description: 'Create memorable experiences through exceptional design.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
    features: ['Hotels', 'Resorts', 'Spas', 'Event Venues'],
  },
];

const Services: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            {t('services_title')}
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive interior design solutions tailored to every space and industry
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.key}
              className="group relative bg-card rounded-3xl overflow-hidden border border-border/50 shadow-card hover:shadow-lg-soft transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={t(service.key)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                
                {/* Icon Badge */}
                <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-card">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <h3 className="text-2xl font-serif font-semibold text-foreground mb-3">
                  {t(service.key)}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <Button variant="outline" className="group/btn gap-2">
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
