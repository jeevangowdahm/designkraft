import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { 
  Calculator, ArrowRight, Globe, Wallet, Sparkles, 
  Lightbulb, Layers, PaintBucket, Sofa, ChevronDown, ChevronUp,
  Leaf, Shield, Wrench, MapPin
} from 'lucide-react';
import { countries, getCountryById } from '@/data/countries';
import { indianCities, getCityById, formatINR, IndianCity } from '@/data/indianCities';
import { 
  flooringMaterials, wallFinishes, ceilingFinishes, lightingOptions,
  getMaterialsForRoom, getLightingForRoom, getFurnitureForRoom,
  Material, LightingOption, FurnitureItem
} from '@/data/materials';

const roomTypes = [
  { id: 'living', name: 'Living Room', icon: '🛋️', basePrice: 50 },
  { id: 'bedroom', name: 'Bedroom', icon: '🛏️', basePrice: 45 },
  { id: 'kitchen', name: 'Kitchen', icon: '🍳', basePrice: 75 },
  { id: 'bathroom', name: 'Bathroom', icon: '🚿', basePrice: 80 },
  { id: 'office', name: 'Home Office', icon: '💼', basePrice: 55 },
  { id: 'dining', name: 'Dining Room', icon: '🍽️', basePrice: 48 },
];

const designStyles = [
  { id: 'minimal', name: 'Minimalist', multiplier: 1, description: 'Clean lines, neutral colors' },
  { id: 'modern', name: 'Modern', multiplier: 1.2, description: 'Contemporary with bold accents' },
  { id: 'luxury', name: 'Luxury', multiplier: 1.8, description: 'Premium finishes, custom pieces' },
  { id: 'industrial', name: 'Industrial', multiplier: 1.1, description: 'Raw materials, urban feel' },
  { id: 'scandinavian', name: 'Scandinavian', multiplier: 1.15, description: 'Light, airy, functional' },
  { id: 'traditional', name: 'Traditional', multiplier: 1.3, description: 'Classic, timeless elegance' },
  { id: 'bohemian', name: 'Bohemian', multiplier: 1.1, description: 'Eclectic, colorful, artistic' },
  { id: 'coastal', name: 'Coastal', multiplier: 1.15, description: 'Beach-inspired, relaxed' },
];

const budgetTiers = [
  { 
    id: 'budget', 
    name: 'Budget Friendly', 
    multiplier: 0.5, 
    icon: Wallet,
    description: 'Smart choices, great results',
    features: ['Local materials', 'DIY options', 'Phased approach']
  },
  { 
    id: 'standard', 
    name: 'Standard', 
    multiplier: 1, 
    icon: Sparkles,
    description: 'Balanced quality & cost',
    features: ['Quality materials', 'Professional finish', 'Full service']
  },
  { 
    id: 'premium', 
    name: 'Premium', 
    multiplier: 1.8, 
    icon: Calculator,
    description: 'Luxury & excellence',
    features: ['Premium brands', 'Custom pieces', 'White glove service']
  },
];

const CostCalculator: React.FC = () => {
  const { t } = useLanguage();
  const [roomType, setRoomType] = useState('living');
  const [size, setSize] = useState(200);
  const [style, setStyle] = useState('modern');
  const [budgetTier, setBudgetTier] = useState('budget');
  const [country, setCountry] = useState('in');
  const [indianCity, setIndianCity] = useState('bangalore');
  
  // Material selections
  const [selectedFlooring, setSelectedFlooring] = useState<string>('');
  const [selectedWall, setSelectedWall] = useState<string>('');
  const [selectedCeiling, setSelectedCeiling] = useState<string>('');
  const [selectedLighting, setSelectedLighting] = useState<string[]>([]);
  const [selectedFurniture, setSelectedFurniture] = useState<string[]>([]);
  
  // UI state
  const [showMaterials, setShowMaterials] = useState(false);
  const [showLighting, setShowLighting] = useState(false);
  const [showFurniture, setShowFurniture] = useState(false);
  
  const [estimate, setEstimate] = useState(0);
  const [breakdown, setBreakdown] = useState<{
    materials: number;
    lighting: number;
    furniture: number;
    labor: number;
  }>({ materials: 0, lighting: 0, furniture: 0, labor: 0 });

  const selectedCountry = getCountryById(country);
  const selectedCity = getCityById(indianCity);
  const selectedBudget = budgetTiers.find((b) => b.id === budgetTier) || budgetTiers[0];

  // Get filtered options based on room type
  const roomMaterials = useMemo(() => getMaterialsForRoom(roomType), [roomType]);
  const roomLighting = useMemo(() => getLightingForRoom(roomType), [roomType]);
  const roomFurniture = useMemo(() => getFurnitureForRoom(roomType), [roomType]);

  // Auto-select first options when room changes
  useEffect(() => {
    if (roomMaterials.flooring.length > 0) {
      setSelectedFlooring(roomMaterials.flooring[0].id);
    }
    if (roomMaterials.walls.length > 0) {
      setSelectedWall(roomMaterials.walls[0].id);
    }
    if (roomMaterials.ceiling.length > 0) {
      setSelectedCeiling(roomMaterials.ceiling[0].id);
    }
    // Select default lighting (first ambient + first task if available)
    const defaultLights: string[] = [];
    const ambient = roomLighting.find(l => l.type === 'ambient');
    if (ambient) defaultLights.push(ambient.id);
    setSelectedLighting(defaultLights);
    
    // Select essential furniture
    const essentials = roomFurniture.slice(0, 3).map(f => f.id);
    setSelectedFurniture(essentials);
  }, [roomType, roomMaterials, roomLighting, roomFurniture]);

  // Calculate detailed estimate
  useEffect(() => {
    const room = roomTypes.find((r) => r.id === roomType);
    const designStyle = designStyles.find((s) => s.id === style);
    
    if (!room || !designStyle) return;

    // Calculate materials cost
    let materialsCost = 0;
    const floor = flooringMaterials.find(m => m.id === selectedFlooring);
    const wall = wallFinishes.find(m => m.id === selectedWall);
    const ceiling = ceilingFinishes.find(m => m.id === selectedCeiling);
    
    if (floor) materialsCost += floor.pricePerSqFt * size;
    if (wall) materialsCost += wall.pricePerSqFt * size * 0.8; // 80% of floor area for walls
    if (ceiling) materialsCost += ceiling.pricePerSqFt * size;

    // Calculate lighting cost
    let lightingCost = 0;
    selectedLighting.forEach(lightId => {
      const light = lightingOptions.find(l => l.id === lightId);
      if (light) {
        const avgPrice = (light.priceRange.min + light.priceRange.max) / 2;
        lightingCost += avgPrice * (budgetTier === 'budget' ? 0.6 : budgetTier === 'premium' ? 1.4 : 1);
      }
    });

    // Calculate furniture cost
    let furnitureCost = 0;
    selectedFurniture.forEach(furnId => {
      const furn = roomFurniture.find(f => f.id === furnId);
      if (furn) {
        furnitureCost += furn.priceRange[budgetTier as keyof typeof furn.priceRange] || furn.priceRange.standard;
      }
    });

    // Apply style multiplier
    materialsCost *= designStyle.multiplier;
    
    // Calculate labor cost - use city-specific rates for India
    let laborCost = 0;
    if (country === 'in' && selectedCity) {
      // India: Use city-specific labor rate
      laborCost = selectedCity.laborRate * size;
      // Apply material markup for the city
      materialsCost *= (1 + selectedCity.materialMarkup / 100);
      // Apply city price multiplier
      materialsCost *= selectedCity.priceMultiplier;
      lightingCost *= selectedCity.priceMultiplier;
      furnitureCost *= selectedCity.priceMultiplier;
    } else {
      // Other countries: Standard labor calculation
      const laborMultiplier = budgetTier === 'budget' ? 0.3 : budgetTier === 'premium' ? 0.5 : 0.4;
      laborCost = (materialsCost + lightingCost) * laborMultiplier;
    }

    // Apply budget tier multiplier to materials
    materialsCost *= selectedBudget.multiplier;

    // Convert to selected currency
    const rate = selectedCountry.rate;
    
    setBreakdown({
      materials: Math.round(materialsCost * rate),
      lighting: Math.round(lightingCost * rate),
      furniture: Math.round(furnitureCost * rate),
      labor: Math.round(laborCost * rate)
    });

    const total = (materialsCost + lightingCost + furnitureCost + laborCost) * rate;
    setEstimate(Math.round(total));
  }, [roomType, size, style, budgetTier, selectedFlooring, selectedWall, selectedCeiling, 
      selectedLighting, selectedFurniture, country, indianCity, selectedCountry.rate, selectedBudget.multiplier, roomFurniture, selectedCity]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: selectedCountry.currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const toggleLighting = (id: string) => {
    setSelectedLighting(prev => 
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
  };

  const toggleFurniture = (id: string) => {
    setSelectedFurniture(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const MaterialBadge = ({ material }: { material: Material }) => (
    <div className="flex gap-1 mt-2">
      {material.ecoFriendly && (
        <span className="inline-flex items-center gap-1 text-[10px] bg-green-500/20 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">
          <Leaf className="w-3 h-3" /> Eco
        </span>
      )}
      <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full ${
        material.durability === 'high' ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' :
        material.durability === 'medium' ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' :
        'bg-red-500/20 text-red-600 dark:text-red-400'
      }`}>
        <Shield className="w-3 h-3" /> {material.durability}
      </span>
      <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full ${
        material.maintenance === 'low' ? 'bg-green-500/20 text-green-600 dark:text-green-400' :
        material.maintenance === 'medium' ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' :
        'bg-red-500/20 text-red-600 dark:text-red-400'
      }`}>
        <Wrench className="w-3 h-3" /> {material.maintenance}
      </span>
    </div>
  );

  return (
    <section id="calculator" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
              {t('calc_title')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get a detailed, realistic estimate for your interior design project with specific materials, lighting, and furniture options
            </p>
          </div>

          {/* Budget Tier Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-foreground mb-4 text-center">
              Choose Your Budget Level
            </label>
            <div className="grid md:grid-cols-3 gap-4">
              {budgetTiers.map((tier) => {
                const Icon = tier.icon;
                return (
                  <button
                    key={tier.id}
                    onClick={() => setBudgetTier(tier.id)}
                    className={`p-6 rounded-2xl border-2 transition-all text-left ${
                      budgetTier === tier.id
                        ? tier.id === 'budget' 
                          ? 'border-green-500 bg-green-500/10 shadow-lg'
                          : 'border-primary bg-primary/10 shadow-lg'
                        : 'border-border/50 bg-card hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        budgetTier === tier.id && tier.id === 'budget'
                          ? 'bg-green-500 text-white'
                          : budgetTier === tier.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className={`font-semibold ${
                          tier.id === 'budget' ? 'text-green-600 dark:text-green-400' : 'text-foreground'
                        }`}>
                          {tier.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">{tier.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-1">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            tier.id === 'budget' ? 'bg-green-500' : 'bg-primary'
                          }`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-card rounded-3xl border border-border/50 shadow-card overflow-hidden">
            <div className="grid lg:grid-cols-5">
              {/* Form - Takes 3 columns */}
              <div className="lg:col-span-3 p-6 lg:p-8 space-y-6">
                {/* Row 1: Country & City */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Your Country
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-muted text-foreground border border-border/50 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    >
                      {countries.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.currency})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Indian City Selector - Only show for India */}
                  {country === 'in' && (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Your City
                      </label>
                      <select
                        value={indianCity}
                        onChange={(e) => setIndianCity(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-muted text-foreground border border-border/50 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      >
                        <optgroup label="Metro Cities">
                          {indianCities.filter(c => c.tier === 'metro').map((city) => (
                            <option key={city.id} value={city.id}>
                              {city.name}, {city.state}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Tier 1 Cities">
                          {indianCities.filter(c => c.tier === 'tier1').map((city) => (
                            <option key={city.id} value={city.id}>
                              {city.name}, {city.state}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Tier 2 Cities">
                          {indianCities.filter(c => c.tier === 'tier2').map((city) => (
                            <option key={city.id} value={city.id}>
                              {city.name}, {city.state}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                    </div>
                  )}
                </div>

                {/* City Pricing Info for India */}
                {country === 'in' && selectedCity && (
                  <div className="bg-primary/10 rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{selectedCity.name} Pricing</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedCity.tier === 'metro' ? '🏙️ Metro city rates' : 
                         selectedCity.tier === 'tier1' ? '🌆 Tier 1 city rates' : '🏘️ Tier 2 city rates'}
                        {' • '}Labor: {formatINR(selectedCity.laborRate)}/sq ft
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        selectedCity.tier === 'metro' ? 'bg-amber-500/20 text-amber-600' :
                        selectedCity.tier === 'tier1' ? 'bg-blue-500/20 text-blue-600' :
                        'bg-green-500/20 text-green-600'
                      }`}>
                        {selectedCity.priceMultiplier > 1 
                          ? `+${Math.round((selectedCity.priceMultiplier - 1) * 100)}%` 
                          : selectedCity.priceMultiplier < 1 
                          ? `-${Math.round((1 - selectedCity.priceMultiplier) * 100)}%`
                          : 'Base Rate'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Room Type */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Room Type
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-muted text-foreground border border-border/50 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  >
                    {roomTypes.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.icon} {room.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Size Slider */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Room Size: <span className="text-primary font-bold">{size} sq ft</span>
                    <span className="text-muted-foreground text-xs ml-2">({Math.round(size * 0.0929)} sq m)</span>
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="2000"
                    step="25"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>50 sq ft (Small)</span>
                    <span>1000 sq ft (Medium)</span>
                    <span>2000 sq ft (Large)</span>
                  </div>
                </div>

                {/* Design Style */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Design Style
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {designStyles.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setStyle(s.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                          style === s.id
                            ? 'bg-secondary text-secondary-foreground ring-2 ring-primary'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        <div className="font-semibold">{s.name}</div>
                        <div className="text-[10px] opacity-70">{s.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Materials Section */}
                <div className="border border-border/50 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setShowMaterials(!showMaterials)}
                    className="w-full p-4 flex items-center justify-between bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Layers className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-foreground">Materials & Finishes</h3>
                        <p className="text-xs text-muted-foreground">Flooring, walls, ceiling</p>
                      </div>
                    </div>
                    {showMaterials ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  
                  {showMaterials && (
                    <div className="p-4 space-y-4 bg-background">
                      {/* Flooring */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                          <PaintBucket className="w-4 h-4" /> Flooring
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {roomMaterials.flooring.map((mat) => (
                            <button
                              key={mat.id}
                              onClick={() => setSelectedFlooring(mat.id)}
                              className={`p-3 rounded-xl text-left transition-all ${
                                selectedFlooring === mat.id
                                  ? 'bg-primary/20 border-2 border-primary'
                                  : 'bg-muted border-2 border-transparent hover:border-primary/30'
                              }`}
                            >
                              <div className="font-medium text-sm text-foreground">{mat.name}</div>
                              <div className="text-xs text-muted-foreground">{formatCurrency(mat.pricePerSqFt * selectedCountry.rate)}/sq ft</div>
                              <MaterialBadge material={mat} />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Walls */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Wall Finish</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {roomMaterials.walls.map((mat) => (
                            <button
                              key={mat.id}
                              onClick={() => setSelectedWall(mat.id)}
                              className={`p-3 rounded-xl text-left transition-all ${
                                selectedWall === mat.id
                                  ? 'bg-primary/20 border-2 border-primary'
                                  : 'bg-muted border-2 border-transparent hover:border-primary/30'
                              }`}
                            >
                              <div className="font-medium text-sm text-foreground">{mat.name}</div>
                              <div className="text-xs text-muted-foreground">{formatCurrency(mat.pricePerSqFt * selectedCountry.rate)}/sq ft</div>
                              <MaterialBadge material={mat} />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Ceiling */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Ceiling</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {roomMaterials.ceiling.map((mat) => (
                            <button
                              key={mat.id}
                              onClick={() => setSelectedCeiling(mat.id)}
                              className={`p-3 rounded-xl text-left transition-all ${
                                selectedCeiling === mat.id
                                  ? 'bg-primary/20 border-2 border-primary'
                                  : 'bg-muted border-2 border-transparent hover:border-primary/30'
                              }`}
                            >
                              <div className="font-medium text-sm text-foreground">{mat.name}</div>
                              <div className="text-xs text-muted-foreground">{formatCurrency(mat.pricePerSqFt * selectedCountry.rate)}/sq ft</div>
                              <MaterialBadge material={mat} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Lighting Section */}
                <div className="border border-border/50 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setShowLighting(!showLighting)}
                    className="w-full p-4 flex items-center justify-between bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-yellow-500" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-foreground">Lighting Design</h3>
                        <p className="text-xs text-muted-foreground">{selectedLighting.length} fixtures selected</p>
                      </div>
                    </div>
                    {showLighting ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  
                  {showLighting && (
                    <div className="p-4 bg-background">
                      {['ambient', 'task', 'accent', 'decorative'].map(type => {
                        const typeLights = roomLighting.filter(l => l.type === type);
                        if (typeLights.length === 0) return null;
                        return (
                          <div key={type} className="mb-4 last:mb-0">
                            <label className="block text-sm font-medium text-foreground mb-2 capitalize">
                              {type} Lighting
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {typeLights.map((light) => (
                                <button
                                  key={light.id}
                                  onClick={() => toggleLighting(light.id)}
                                  className={`p-3 rounded-xl text-left transition-all ${
                                    selectedLighting.includes(light.id)
                                      ? 'bg-yellow-500/20 border-2 border-yellow-500'
                                      : 'bg-muted border-2 border-transparent hover:border-yellow-500/30'
                                  }`}
                                >
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <div className="font-medium text-sm text-foreground">{light.name}</div>
                                      <div className="text-xs text-muted-foreground">{light.description}</div>
                                    </div>
                                    <div className="text-xs text-right">
                                      <div className="text-foreground font-medium">
                                        {formatCurrency(light.priceRange.min * selectedCountry.rate)} - {formatCurrency(light.priceRange.max * selectedCountry.rate)}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-2 flex flex-wrap gap-1">
                                    <span className="text-[10px] bg-muted-foreground/20 px-2 py-0.5 rounded-full">{light.wattage}</span>
                                    <span className="text-[10px] bg-muted-foreground/20 px-2 py-0.5 rounded-full">{light.lumens} lm</span>
                                    <span className="text-[10px] bg-muted-foreground/20 px-2 py-0.5 rounded-full">{light.colorTemp}</span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Furniture Section */}
                <div className="border border-border/50 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setShowFurniture(!showFurniture)}
                    className="w-full p-4 flex items-center justify-between bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                        <Sofa className="w-5 h-5 text-purple-500" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-foreground">Furniture</h3>
                        <p className="text-xs text-muted-foreground">{selectedFurniture.length} items selected</p>
                      </div>
                    </div>
                    {showFurniture ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  
                  {showFurniture && (
                    <div className="p-4 bg-background">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {roomFurniture.map((furn) => (
                          <button
                            key={furn.id}
                            onClick={() => toggleFurniture(furn.id)}
                            className={`p-3 rounded-xl text-left transition-all ${
                              selectedFurniture.includes(furn.id)
                                ? 'bg-purple-500/20 border-2 border-purple-500'
                                : 'bg-muted border-2 border-transparent hover:border-purple-500/30'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium text-sm text-foreground">{furn.name}</div>
                                <div className="text-xs text-muted-foreground">{furn.description}</div>
                              </div>
                              <div className="text-xs text-right">
                                <div className="text-foreground font-medium">
                                  {formatCurrency(furn.priceRange[budgetTier as keyof typeof furn.priceRange] * selectedCountry.rate)}
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {furn.materials.slice(0, 3).map((mat, i) => (
                                <span key={i} className="text-[10px] bg-muted-foreground/20 px-2 py-0.5 rounded-full">{mat}</span>
                              ))}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Estimate Display - Takes 2 columns */}
              <div className={`lg:col-span-2 p-6 lg:p-8 flex flex-col ${
                budgetTier === 'budget' 
                  ? 'bg-gradient-to-br from-green-500 to-green-600' 
                  : 'bg-gradient-copper'
              }`}>
                <div className="flex-1 flex flex-col justify-center items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                    <selectedBudget.icon className="w-8 h-8 text-white" />
                  </div>

                  <p className="text-white/80 text-sm uppercase tracking-wider mb-2">
                    Total Estimate
                  </p>

                  <div className="text-4xl lg:text-5xl font-serif font-bold text-white mb-2">
                    {formatCurrency(estimate)}
                  </div>

                  <p className="text-white/70 text-sm mb-6">
                    in {selectedCountry.name}
                  </p>

                  {/* Cost Breakdown */}
                  <div className="w-full bg-white/10 rounded-xl p-4 mb-6 text-left">
                    <p className="text-white/90 text-sm font-medium mb-3">Cost Breakdown:</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Materials & Finishes</span>
                        <span className="text-white font-medium">{formatCurrency(breakdown.materials)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Lighting ({selectedLighting.length} items)</span>
                        <span className="text-white font-medium">{formatCurrency(breakdown.lighting)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Furniture ({selectedFurniture.length} items)</span>
                        <span className="text-white font-medium">{formatCurrency(breakdown.furniture)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Labor & Installation</span>
                        <span className="text-white font-medium">{formatCurrency(breakdown.labor)}</span>
                      </div>
                      <div className="border-t border-white/20 pt-2 mt-2 flex justify-between text-sm font-bold">
                        <span className="text-white">Total</span>
                        <span className="text-white">{formatCurrency(estimate)}</span>
                      </div>
                    </div>
                  </div>

                  {budgetTier === 'budget' && (
                    <div className="w-full bg-white/10 rounded-xl p-4 mb-6 text-left">
                      <p className="text-white/90 text-xs font-medium mb-2">💡 Budget-Friendly Tips:</p>
                      <ul className="text-white/70 text-xs space-y-1">
                        <li>• Use locally sourced materials</li>
                        <li>• Consider phased implementation</li>
                        <li>• Mix high & low-cost items</li>
                        <li>• DIY painting & simple installations</li>
                      </ul>
                    </div>
                  )}

                  <p className="text-white/70 text-xs mb-6">
                    *Estimate based on selections. Final cost may vary.
                  </p>

                  <Button
                    variant="glass"
                    size="lg"
                    className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30 gap-2"
                  >
                    Get Detailed Quote
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostCalculator;
