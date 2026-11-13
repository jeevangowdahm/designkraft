export interface IndianCity {
  id: string;
  name: string;
  state: string;
  tier: 'metro' | 'tier1' | 'tier2';
  priceMultiplier: number; // Multiplier relative to base price
  laborRate: number; // per sq ft in INR
  materialMarkup: number; // percentage markup on materials
}

export const indianCities: IndianCity[] = [
  // Metro Cities (Tier 1)
  { 
    id: 'mumbai', 
    name: 'Mumbai', 
    state: 'Maharashtra', 
    tier: 'metro', 
    priceMultiplier: 1.4,
    laborRate: 850,
    materialMarkup: 15
  },
  { 
    id: 'delhi', 
    name: 'Delhi NCR', 
    state: 'Delhi', 
    tier: 'metro', 
    priceMultiplier: 1.35,
    laborRate: 800,
    materialMarkup: 12
  },
  { 
    id: 'bangalore', 
    name: 'Bangalore', 
    state: 'Karnataka', 
    tier: 'metro', 
    priceMultiplier: 1.3,
    laborRate: 750,
    materialMarkup: 10
  },
  { 
    id: 'chennai', 
    name: 'Chennai', 
    state: 'Tamil Nadu', 
    tier: 'metro', 
    priceMultiplier: 1.2,
    laborRate: 700,
    materialMarkup: 8
  },
  { 
    id: 'hyderabad', 
    name: 'Hyderabad', 
    state: 'Telangana', 
    tier: 'metro', 
    priceMultiplier: 1.25,
    laborRate: 720,
    materialMarkup: 10
  },
  { 
    id: 'kolkata', 
    name: 'Kolkata', 
    state: 'West Bengal', 
    tier: 'metro', 
    priceMultiplier: 1.15,
    laborRate: 650,
    materialMarkup: 8
  },
  
  // Tier 1 Cities
  { 
    id: 'pune', 
    name: 'Pune', 
    state: 'Maharashtra', 
    tier: 'tier1', 
    priceMultiplier: 1.2,
    laborRate: 680,
    materialMarkup: 10
  },
  { 
    id: 'ahmedabad', 
    name: 'Ahmedabad', 
    state: 'Gujarat', 
    tier: 'tier1', 
    priceMultiplier: 1.15,
    laborRate: 620,
    materialMarkup: 8
  },
  { 
    id: 'jaipur', 
    name: 'Jaipur', 
    state: 'Rajasthan', 
    tier: 'tier1', 
    priceMultiplier: 1.1,
    laborRate: 580,
    materialMarkup: 7
  },
  { 
    id: 'lucknow', 
    name: 'Lucknow', 
    state: 'Uttar Pradesh', 
    tier: 'tier1', 
    priceMultiplier: 1.05,
    laborRate: 550,
    materialMarkup: 6
  },
  { 
    id: 'chandigarh', 
    name: 'Chandigarh', 
    state: 'Punjab', 
    tier: 'tier1', 
    priceMultiplier: 1.15,
    laborRate: 620,
    materialMarkup: 8
  },
  { 
    id: 'kochi', 
    name: 'Kochi', 
    state: 'Kerala', 
    tier: 'tier1', 
    priceMultiplier: 1.18,
    laborRate: 650,
    materialMarkup: 10
  },
  { 
    id: 'goa', 
    name: 'Goa', 
    state: 'Goa', 
    tier: 'tier1', 
    priceMultiplier: 1.25,
    laborRate: 700,
    materialMarkup: 12
  },
  
  // Tier 2 Cities
  { 
    id: 'indore', 
    name: 'Indore', 
    state: 'Madhya Pradesh', 
    tier: 'tier2', 
    priceMultiplier: 1.0,
    laborRate: 480,
    materialMarkup: 5
  },
  { 
    id: 'nagpur', 
    name: 'Nagpur', 
    state: 'Maharashtra', 
    tier: 'tier2', 
    priceMultiplier: 1.0,
    laborRate: 500,
    materialMarkup: 5
  },
  { 
    id: 'bhopal', 
    name: 'Bhopal', 
    state: 'Madhya Pradesh', 
    tier: 'tier2', 
    priceMultiplier: 0.95,
    laborRate: 450,
    materialMarkup: 4
  },
  { 
    id: 'coimbatore', 
    name: 'Coimbatore', 
    state: 'Tamil Nadu', 
    tier: 'tier2', 
    priceMultiplier: 1.0,
    laborRate: 520,
    materialMarkup: 6
  },
  { 
    id: 'vadodara', 
    name: 'Vadodara', 
    state: 'Gujarat', 
    tier: 'tier2', 
    priceMultiplier: 0.98,
    laborRate: 480,
    materialMarkup: 5
  },
  { 
    id: 'visakhapatnam', 
    name: 'Visakhapatnam', 
    state: 'Andhra Pradesh', 
    tier: 'tier2', 
    priceMultiplier: 1.0,
    laborRate: 500,
    materialMarkup: 5
  },
  { 
    id: 'surat', 
    name: 'Surat', 
    state: 'Gujarat', 
    tier: 'tier2', 
    priceMultiplier: 1.05,
    laborRate: 520,
    materialMarkup: 6
  },
];

export const getCityById = (id: string): IndianCity | undefined => {
  return indianCities.find(city => city.id === id);
};

export const getCitiesByTier = (tier: 'metro' | 'tier1' | 'tier2'): IndianCity[] => {
  return indianCities.filter(city => city.tier === tier);
};

export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};
