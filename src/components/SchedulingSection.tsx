import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Star, Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import kushwanthPhoto from '@/assets/team/kushwanth-bs.jpg';
import kethanPhoto from '@/assets/team/kethan-hrishikesh.jpg';
import karanPhoto from '@/assets/team/karan-gowda.jpg';
import niranjanPhoto from '@/assets/team/niranjan.jpg';

interface Designer {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
  bio: string;
  availability: { [date: string]: string[] };
}

const designers: Designer[] = [
  {
    id: '1',
    name: 'Kushwanth BS',
    specialty: 'Residential & Luxury',
    rating: 4.9,
    reviews: 127,
    image: kushwanthPhoto,
    bio: '15+ years creating stunning residential spaces across Bangalore and Mumbai. Specializes in modern luxury and minimalist design.',
    availability: {
      '2025-01-06': ['09:00', '10:00', '14:00', '15:00'],
      '2025-01-07': ['09:00', '11:00', '13:00', '16:00'],
      '2025-01-08': ['10:00', '11:00', '14:00'],
      '2025-01-09': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      '2025-01-10': ['09:00', '13:00', '14:00', '15:00'],
    },
  },
  {
    id: '2',
    name: 'Kethan Hrishikesh NU',
    specialty: 'Commercial & Office',
    rating: 4.8,
    reviews: 89,
    image: kethanPhoto,
    bio: 'Award-winning commercial designer focused on creating productive, inspiring workspaces. Expert in IT parks and corporate offices.',
    availability: {
      '2025-01-06': ['10:00', '11:00', '15:00'],
      '2025-01-07': ['09:00', '10:00', '14:00', '15:00', '16:00'],
      '2025-01-08': ['11:00', '13:00', '14:00', '16:00'],
      '2025-01-09': ['10:00', '14:00', '15:00'],
      '2025-01-10': ['09:00', '10:00', '11:00', '14:00'],
    },
  },
  {
    id: '3',
    name: 'Karan Gowda H',
    specialty: 'Healthcare & Wellness',
    rating: 4.9,
    reviews: 64,
    image: karanPhoto,
    bio: 'Specialized in healthcare environments that promote healing and wellness. Works with leading hospital chains across India.',
    availability: {
      '2025-01-06': ['09:00', '13:00', '14:00'],
      '2025-01-07': ['10:00', '11:00', '15:00', '16:00'],
      '2025-01-08': ['09:00', '10:00', '14:00', '15:00'],
      '2025-01-09': ['11:00', '13:00', '14:00', '16:00'],
      '2025-01-10': ['10:00', '11:00', '15:00'],
    },
  },
  {
    id: '4',
    name: 'Niranjan',
    specialty: 'Hospitality & Restaurants',
    rating: 4.7,
    reviews: 112,
    image: niranjanPhoto,
    bio: 'Expert in creating memorable hospitality experiences through innovative design. Worked with top hotel chains and premium restaurants.',
    availability: {
      '2025-01-06': ['11:00', '14:00', '16:00'],
      '2025-01-07': ['09:00', '10:00', '13:00', '14:00'],
      '2025-01-08': ['10:00', '15:00', '16:00'],
      '2025-01-09': ['09:00', '10:00', '11:00', '15:00'],
      '2025-01-10': ['13:00', '14:00', '15:00', '16:00'],
    },
  },
];

const SchedulingSection: React.FC = () => {
  const { toast } = useToast();
  const [selectedDesigner, setSelectedDesigner] = useState<Designer | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(today.setDate(diff));
  });
  const [bookingStep, setBookingStep] = useState<'designer' | 'datetime' | 'confirm'>('designer');
  const [bookingData, setBookingData] = useState({ name: '', email: '', phone: '', notes: '' });
  const [showModal, setShowModal] = useState(false);

  const getWeekDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const nextWeek = () => {
    const next = new Date(currentWeekStart);
    next.setDate(next.getDate() + 7);
    setCurrentWeekStart(next);
  };

  const prevWeek = () => {
    const prev = new Date(currentWeekStart);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeekStart(prev);
  };

  const selectDesigner = (designer: Designer) => {
    setSelectedDesigner(designer);
    setSelectedDate('');
    setSelectedTime('');
    setBookingStep('datetime');
    setShowModal(true);
  };

  const selectDateTime = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setBookingStep('confirm');
  };

  const confirmBooking = () => {
    if (!bookingData.name || !bookingData.email) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in your name and email.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Booking Confirmed!',
      description: `Your consultation with ${selectedDesigner?.name} is scheduled for ${selectedDate} at ${selectedTime}.`,
    });

    // Reset state
    setShowModal(false);
    setSelectedDesigner(null);
    setSelectedDate('');
    setSelectedTime('');
    setBookingStep('designer');
    setBookingData({ name: '', email: '', phone: '', notes: '' });
  };

  const closeModal = () => {
    setShowModal(false);
    setBookingStep('designer');
  };

  return (
    <section id="scheduling" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Book a Consultation
          </h2>
          <p className="text-muted-foreground text-lg">
            Schedule a one-on-one session with our expert designers to discuss your vision
          </p>
        </div>

        {/* Designer Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {designers.map((designer) => (
            <div
              key={designer.id}
              className="bg-card rounded-3xl border border-border/50 shadow-card overflow-hidden hover:shadow-lg-soft transition-all duration-300 group"
            >
              {/* Designer Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={designer.image}
                  alt={designer.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>

              {/* Designer Info */}
              <div className="p-5">
                <h3 className="text-lg font-serif font-semibold text-foreground mb-1">
                  {designer.name}
                </h3>
                <p className="text-sm text-primary font-medium mb-2">{designer.specialty}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="text-sm font-medium text-foreground">{designer.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">({designer.reviews} reviews)</span>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {designer.bio}
                </p>

                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => selectDesigner(designer)}
                >
                  <Calendar className="w-4 h-4" />
                  View Availability
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Modal */}
        {showModal && selectedDesigner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-card rounded-3xl border border-border/50 shadow-lg-soft w-full max-w-2xl max-h-[90vh] overflow-hidden animate-scale-in">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedDesigner.image}
                    alt={selectedDesigner.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-serif font-semibold text-foreground">
                      {selectedDesigner.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{selectedDesigner.specialty}</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-4 p-4 bg-muted/50">
                <div className={`flex items-center gap-2 ${bookingStep === 'datetime' || bookingStep === 'confirm' ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${bookingStep === 'datetime' || bookingStep === 'confirm' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    1
                  </div>
                  <span className="text-sm font-medium hidden sm:inline">Select Time</span>
                </div>
                <div className="w-8 h-px bg-border" />
                <div className={`flex items-center gap-2 ${bookingStep === 'confirm' ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${bookingStep === 'confirm' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    2
                  </div>
                  <span className="text-sm font-medium hidden sm:inline">Confirm</span>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[50vh]">
                {bookingStep === 'datetime' && (
                  <div className="space-y-6">
                    {/* Week Navigation */}
                    <div className="flex items-center justify-between">
                      <Button variant="ghost" size="icon" onClick={prevWeek}>
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                      <span className="font-medium text-foreground">
                        {formatDisplayDate(currentWeekStart)} - {formatDisplayDate(getWeekDates()[6])}
                      </span>
                      <Button variant="ghost" size="icon" onClick={nextWeek}>
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2">
                      {getWeekDates().map((date) => {
                        const dateKey = formatDateKey(date);
                        const slots = selectedDesigner.availability[dateKey] || [];
                        const isToday = formatDateKey(new Date()) === dateKey;
                        const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

                        return (
                          <div key={dateKey} className="text-center">
                            <div className={`text-xs font-medium mb-1 ${isToday ? 'text-primary' : 'text-muted-foreground'}`}>
                              {date.toLocaleDateString('en-US', { weekday: 'short' })}
                            </div>
                            <div className={`text-sm font-semibold mb-2 ${isToday ? 'text-primary' : 'text-foreground'}`}>
                              {date.getDate()}
                            </div>
                            <div className="space-y-1">
                              {slots.length > 0 && !isPast ? (
                                slots.slice(0, 3).map((time) => (
                                  <button
                                    key={`${dateKey}-${time}`}
                                    onClick={() => selectDateTime(dateKey, time)}
                                    className={`w-full px-1 py-1.5 text-xs rounded-lg transition-all ${
                                      selectedDate === dateKey && selectedTime === time
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted hover:bg-primary/10 text-foreground'
                                    }`}
                                  >
                                    {time}
                                  </button>
                                ))
                              ) : (
                                <span className="text-xs text-muted-foreground">-</span>
                              )}
                              {slots.length > 3 && !isPast && (
                                <span className="text-xs text-muted-foreground">+{slots.length - 3} more</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {selectedDate && selectedTime && (
                      <div className="flex items-center justify-center gap-2 p-4 bg-sage/10 rounded-xl">
                        <Check className="w-5 h-5 text-sage" />
                        <span className="text-sm font-medium text-foreground">
                          Selected: {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {selectedTime}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {bookingStep === 'confirm' && (
                  <div className="space-y-6">
                    {/* Selected Slot Summary */}
                    <div className="bg-muted/50 rounded-xl p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Appointment</p>
                        <p className="font-medium text-foreground">
                          {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {selectedTime}
                        </p>
                      </div>
                    </div>

                    {/* Booking Form */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          value={bookingData.name}
                          onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                          placeholder="John Doe"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={bookingData.email}
                          onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                          className="w-full px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                          placeholder="john@example.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={bookingData.phone}
                          onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Project Notes
                        </label>
                        <textarea
                          value={bookingData.notes}
                          onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                          placeholder="Tell us about your project..."
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-border flex justify-between">
                {bookingStep === 'confirm' && (
                  <Button variant="ghost" onClick={() => setBookingStep('datetime')}>
                    Back
                  </Button>
                )}
                {bookingStep === 'datetime' && (
                  <Button variant="ghost" onClick={closeModal}>
                    Cancel
                  </Button>
                )}
                
                {bookingStep === 'datetime' && selectedDate && selectedTime && (
                  <Button variant="hero" onClick={() => setBookingStep('confirm')}>
                    Continue
                  </Button>
                )}
                
                {bookingStep === 'confirm' && (
                  <Button variant="hero" onClick={confirmBooking} className="gap-2">
                    <Check className="w-4 h-4" />
                    Confirm Booking
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SchedulingSection;
