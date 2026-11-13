import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Send, Phone, Mail, MapPin, Clock, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { countries, getCountryById } from '@/data/countries';

const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedCountry, setSelectedCountry] = useState('in');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    projectType: '',
    message: '',
  });

  const countryData = getCountryById(selectedCountry);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Message Sent!',
      description: `We'll contact you at ${countryData.phoneCode} ${formData.phone} within 24 hours.`,
    });
    setFormData({ 
      name: '', 
      email: '', 
      phone: '', 
      address: '',
      city: '',
      state: '',
      postalCode: '',
      projectType: '', 
      message: '' 
    });
  };

  const getContactInfoByCountry = () => {
    const countryInfo: Record<string, { phone: string; email: string; address: string }> = {
      us: { phone: '+1 (555) 123-4567', email: 'usa@designflow.com', address: '123 Design Street, New York, NY 10001' },
      gb: { phone: '+44 20 7123 4567', email: 'uk@designflow.com', address: '10 Oxford Street, London W1D 1BS' },
      eu: { phone: '+49 30 1234567', email: 'europe@designflow.com', address: 'Friedrichstraße 123, 10117 Berlin' },
      in: { phone: '+91 98765 43210', email: 'india@designflow.com', address: '456 MG Road, Bengaluru 560001' },
      jp: { phone: '+81 3-1234-5678', email: 'japan@designflow.com', address: '1-1-1 Shibuya, Tokyo 150-0002' },
      cn: { phone: '+86 21 1234 5678', email: 'china@designflow.com', address: '888 Nanjing Road, Shanghai 200001' },
      au: { phone: '+61 2 1234 5678', email: 'australia@designflow.com', address: '100 George Street, Sydney NSW 2000' },
      ca: { phone: '+1 (416) 555-0123', email: 'canada@designflow.com', address: '200 Bay Street, Toronto ON M5J 2J5' },
      ae: { phone: '+971 4 123 4567', email: 'uae@designflow.com', address: 'Dubai Design District, Dubai' },
      sg: { phone: '+65 6123 4567', email: 'singapore@designflow.com', address: '1 Raffles Place, Singapore 048616' },
      br: { phone: '+55 11 91234-5678', email: 'brazil@designflow.com', address: 'Av. Paulista 1000, São Paulo 01310-100' },
      mx: { phone: '+52 55 1234 5678', email: 'mexico@designflow.com', address: 'Paseo de la Reforma 250, CDMX 06600' },
      za: { phone: '+27 11 123 4567', email: 'southafrica@designflow.com', address: '123 Sandton Drive, Johannesburg 2196' },
      kr: { phone: '+82 2-1234-5678', email: 'korea@designflow.com', address: '123 Gangnam-daero, Seoul 06134' },
      sa: { phone: '+966 11 123 4567', email: 'saudi@designflow.com', address: 'King Fahd Road, Riyadh 12211' },
      ng: { phone: '+234 1 234 5678', email: 'nigeria@designflow.com', address: '123 Victoria Island, Lagos 101233' },
      eg: { phone: '+20 2 1234 5678', email: 'egypt@designflow.com', address: '123 Tahrir Square, Cairo 11511' },
      pk: { phone: '+92 21 1234 5678', email: 'pakistan@designflow.com', address: 'Clifton Road, Karachi 75600' },
      id: { phone: '+62 21 1234 5678', email: 'indonesia@designflow.com', address: 'Jl. Sudirman, Jakarta 10220' },
      th: { phone: '+66 2 123 4567', email: 'thailand@designflow.com', address: '999 Sukhumvit Road, Bangkok 10110' },
    };
    return countryInfo[selectedCountry] || countryInfo.us;
  };

  const contactInfo = getContactInfoByCountry();

  const contactDetails = [
    { icon: Phone, label: 'Phone', value: contactInfo.phone },
    { icon: Mail, label: 'Email', value: contactInfo.email },
    { icon: MapPin, label: 'Address', value: contactInfo.address },
    { icon: Clock, label: 'Hours', value: 'Mon-Fri: 9AM - 6PM (Local Time)' },
  ];

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
              {t('contact_title')}
            </h2>
            <p className="text-muted-foreground text-lg">
              Ready to transform your space? Let's discuss your vision.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-3xl border border-border/50 shadow-card p-6 lg:p-8">
                <h3 className="text-xl font-serif font-semibold text-foreground mb-6">
                  Contact Information
                </h3>

                {/* Country Selector for Contact Info */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Your Location
                  </label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-muted text-foreground border border-border/50 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  >
                    {countries.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-5">
                  {contactDetails.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="text-foreground font-medium text-sm">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Proof */}
              <div className="bg-gradient-copper rounded-3xl p-6 lg:p-8 text-primary-foreground">
                <p className="text-lg font-medium mb-2">
                  "DesignKraft India transformed our home beyond our dreams!"
                </p>
                <p className="text-sm opacity-80">
                  — Priya Sharma, {countryData.name}
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="bg-card rounded-3xl border border-border/50 shadow-card p-6 lg:p-8"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('contact_name')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('contact_email')}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      <div className="px-4 py-3 bg-muted rounded-xl text-foreground border border-border/50 flex items-center min-w-[80px] justify-center font-medium">
                        {countryData.phoneCode}
                      </div>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="flex-1 px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder={countryData.phonePlaceholder}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 bg-muted rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                      <option value="">Select a type</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="hospitality">Hospitality</option>
                    </select>
                  </div>
                </div>

                {/* Address Section - Country Specific */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="123 Main Street, Apt 4B"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {countryData.addressFormat.cityLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder={countryData.addressFormat.cityLabel}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {countryData.addressFormat.stateLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder={countryData.addressFormat.stateLabel}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {countryData.addressFormat.postalLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder={countryData.addressFormat.postalPlaceholder}
                    />
                  </div>
                </div>

                {/* Country Display */}
                <div className="mt-4 px-4 py-3 bg-primary/10 rounded-xl flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">Country: <strong>{countryData.name}</strong></span>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('contact_message')}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <Button variant="hero" size="lg" type="submit" className="mt-6 w-full gap-2">
                  {t('contact_send')}
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
