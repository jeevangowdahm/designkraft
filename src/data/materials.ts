// Comprehensive materials and lighting data for interior design

export interface Material {
  id: string;
  name: string;
  category: string;
  pricePerSqFt: number;
  durability: 'low' | 'medium' | 'high';
  maintenance: 'low' | 'medium' | 'high';
  ecoFriendly: boolean;
  description: string;
  bestFor: string[];
  image?: string;
}

export interface LightingOption {
  id: string;
  name: string;
  type: 'ambient' | 'task' | 'accent' | 'decorative';
  priceRange: { min: number; max: number };
  wattage: string;
  lumens: string;
  colorTemp: string;
  description: string;
  bestFor: string[];
}

export interface FurnitureItem {
  id: string;
  name: string;
  category: string;
  priceRange: { budget: number; standard: number; premium: number };
  materials: string[];
  description: string;
}

// Flooring Materials
export const flooringMaterials: Material[] = [
  {
    id: 'hardwood-oak',
    name: 'Oak Hardwood',
    category: 'flooring',
    pricePerSqFt: 8,
    durability: 'high',
    maintenance: 'medium',
    ecoFriendly: true,
    description: 'Classic oak hardwood with natural grain patterns',
    bestFor: ['living', 'bedroom', 'dining', 'office']
  },
  {
    id: 'hardwood-walnut',
    name: 'Walnut Hardwood',
    category: 'flooring',
    pricePerSqFt: 12,
    durability: 'high',
    maintenance: 'medium',
    ecoFriendly: true,
    description: 'Rich, dark walnut with elegant appearance',
    bestFor: ['living', 'bedroom', 'dining', 'office']
  },
  {
    id: 'laminate-wood',
    name: 'Laminate Wood',
    category: 'flooring',
    pricePerSqFt: 3,
    durability: 'medium',
    maintenance: 'low',
    ecoFriendly: false,
    description: 'Affordable wood-look laminate flooring',
    bestFor: ['living', 'bedroom', 'office']
  },
  {
    id: 'vinyl-luxury',
    name: 'Luxury Vinyl Plank',
    category: 'flooring',
    pricePerSqFt: 4,
    durability: 'high',
    maintenance: 'low',
    ecoFriendly: false,
    description: 'Waterproof vinyl with realistic wood/stone look',
    bestFor: ['kitchen', 'bathroom', 'living']
  },
  {
    id: 'ceramic-tile',
    name: 'Ceramic Tile',
    category: 'flooring',
    pricePerSqFt: 5,
    durability: 'high',
    maintenance: 'low',
    ecoFriendly: true,
    description: 'Durable ceramic tiles in various patterns',
    bestFor: ['kitchen', 'bathroom', 'dining']
  },
  {
    id: 'porcelain-tile',
    name: 'Porcelain Tile',
    category: 'flooring',
    pricePerSqFt: 7,
    durability: 'high',
    maintenance: 'low',
    ecoFriendly: true,
    description: 'Premium porcelain with superior durability',
    bestFor: ['kitchen', 'bathroom', 'living']
  },
  {
    id: 'marble',
    name: 'Natural Marble',
    category: 'flooring',
    pricePerSqFt: 15,
    durability: 'medium',
    maintenance: 'high',
    ecoFriendly: true,
    description: 'Luxurious natural marble with unique veining',
    bestFor: ['bathroom', 'living', 'dining']
  },
  {
    id: 'concrete-polished',
    name: 'Polished Concrete',
    category: 'flooring',
    pricePerSqFt: 6,
    durability: 'high',
    maintenance: 'low',
    ecoFriendly: true,
    description: 'Industrial-modern polished concrete finish',
    bestFor: ['living', 'kitchen', 'office']
  },
  {
    id: 'bamboo',
    name: 'Bamboo Flooring',
    category: 'flooring',
    pricePerSqFt: 5,
    durability: 'medium',
    maintenance: 'medium',
    ecoFriendly: true,
    description: 'Sustainable bamboo with natural warmth',
    bestFor: ['living', 'bedroom', 'office']
  },
  {
    id: 'carpet',
    name: 'Wall-to-Wall Carpet',
    category: 'flooring',
    pricePerSqFt: 4,
    durability: 'medium',
    maintenance: 'high',
    ecoFriendly: false,
    description: 'Soft, comfortable carpeting',
    bestFor: ['bedroom', 'living']
  }
];

// Wall Finishes
export const wallFinishes: Material[] = [
  {
    id: 'paint-matte',
    name: 'Matte Paint',
    category: 'wall',
    pricePerSqFt: 1.5,
    durability: 'medium',
    maintenance: 'medium',
    ecoFriendly: true,
    description: 'Classic matte finish, hides imperfections',
    bestFor: ['living', 'bedroom', 'dining', 'office']
  },
  {
    id: 'paint-satin',
    name: 'Satin Paint',
    category: 'wall',
    pricePerSqFt: 1.8,
    durability: 'high',
    maintenance: 'low',
    ecoFriendly: true,
    description: 'Subtle sheen, easy to clean',
    bestFor: ['kitchen', 'bathroom', 'living']
  },
  {
    id: 'paint-semi-gloss',
    name: 'Semi-Gloss Paint',
    category: 'wall',
    pricePerSqFt: 2,
    durability: 'high',
    maintenance: 'low',
    ecoFriendly: true,
    description: 'Reflective finish, moisture resistant',
    bestFor: ['kitchen', 'bathroom']
  },
  {
    id: 'wallpaper-vinyl',
    name: 'Vinyl Wallpaper',
    category: 'wall',
    pricePerSqFt: 3,
    durability: 'high',
    maintenance: 'low',
    ecoFriendly: false,
    description: 'Durable vinyl with various patterns',
    bestFor: ['living', 'bedroom', 'dining']
  },
  {
    id: 'wallpaper-textile',
    name: 'Textile Wallpaper',
    category: 'wall',
    pricePerSqFt: 8,
    durability: 'medium',
    maintenance: 'high',
    ecoFriendly: true,
    description: 'Luxurious fabric-based wallcovering',
    bestFor: ['bedroom', 'living', 'dining']
  },
  {
    id: 'wood-paneling',
    name: 'Wood Paneling',
    category: 'wall',
    pricePerSqFt: 10,
    durability: 'high',
    maintenance: 'medium',
    ecoFriendly: true,
    description: 'Natural wood panels for accent walls',
    bestFor: ['living', 'office', 'bedroom']
  },
  {
    id: 'stone-veneer',
    name: 'Stone Veneer',
    category: 'wall',
    pricePerSqFt: 12,
    durability: 'high',
    maintenance: 'low',
    ecoFriendly: true,
    description: 'Natural stone accent wall treatment',
    bestFor: ['living', 'dining']
  },
  {
    id: 'brick-exposed',
    name: 'Exposed Brick',
    category: 'wall',
    pricePerSqFt: 15,
    durability: 'high',
    maintenance: 'low',
    ecoFriendly: true,
    description: 'Industrial-style exposed brick finish',
    bestFor: ['living', 'kitchen', 'office']
  },
  {
    id: 'plaster-venetian',
    name: 'Venetian Plaster',
    category: 'wall',
    pricePerSqFt: 18,
    durability: 'high',
    maintenance: 'medium',
    ecoFriendly: true,
    description: 'Luxurious hand-applied plaster finish',
    bestFor: ['living', 'dining', 'bedroom']
  },
  {
    id: 'tile-subway',
    name: 'Subway Tile',
    category: 'wall',
    pricePerSqFt: 6,
    durability: 'high',
    maintenance: 'low',
    ecoFriendly: true,
    description: 'Classic subway tile pattern',
    bestFor: ['kitchen', 'bathroom']
  }
];

// Ceiling Finishes
export const ceilingFinishes: Material[] = [
  {
    id: 'drywall-flat',
    name: 'Flat Drywall',
    category: 'ceiling',
    pricePerSqFt: 2,
    durability: 'medium',
    maintenance: 'low',
    ecoFriendly: true,
    description: 'Standard smooth drywall ceiling',
    bestFor: ['living', 'bedroom', 'office', 'dining']
  },
  {
    id: 'popcorn',
    name: 'Textured (Popcorn)',
    category: 'ceiling',
    pricePerSqFt: 1.5,
    durability: 'medium',
    maintenance: 'medium',
    ecoFriendly: true,
    description: 'Textured acoustic ceiling finish',
    bestFor: ['bedroom', 'office']
  },
  {
    id: 'coffered',
    name: 'Coffered Ceiling',
    category: 'ceiling',
    pricePerSqFt: 25,
    durability: 'high',
    maintenance: 'low',
    ecoFriendly: true,
    description: 'Elegant grid pattern with recessed panels',
    bestFor: ['living', 'dining']
  },
  {
    id: 'tray',
    name: 'Tray Ceiling',
    category: 'ceiling',
    pricePerSqFt: 15,
    durability: 'high',
    maintenance: 'low',
    ecoFriendly: true,
    description: 'Recessed center with raised border',
    bestFor: ['bedroom', 'living', 'dining']
  },
  {
    id: 'beam-exposed',
    name: 'Exposed Beams',
    category: 'ceiling',
    pricePerSqFt: 20,
    durability: 'high',
    maintenance: 'low',
    ecoFriendly: true,
    description: 'Rustic exposed wooden beams',
    bestFor: ['living', 'kitchen', 'dining']
  },
  {
    id: 'wood-plank',
    name: 'Wood Plank',
    category: 'ceiling',
    pricePerSqFt: 12,
    durability: 'high',
    maintenance: 'medium',
    ecoFriendly: true,
    description: 'Warm wood plank ceiling coverage',
    bestFor: ['bedroom', 'living']
  },
  {
    id: 'tin-pressed',
    name: 'Pressed Tin',
    category: 'ceiling',
    pricePerSqFt: 10,
    durability: 'high',
    maintenance: 'low',
    ecoFriendly: true,
    description: 'Vintage pressed tin panels',
    bestFor: ['kitchen', 'dining']
  },
  {
    id: 'stretch',
    name: 'Stretch Ceiling',
    category: 'ceiling',
    pricePerSqFt: 18,
    durability: 'high',
    maintenance: 'low',
    ecoFriendly: false,
    description: 'Modern PVC stretch ceiling system',
    bestFor: ['bathroom', 'office', 'living']
  }
];

// Lighting Options
export const lightingOptions: LightingOption[] = [
  // Ambient Lighting
  {
    id: 'chandelier-crystal',
    name: 'Crystal Chandelier',
    type: 'ambient',
    priceRange: { min: 500, max: 5000 },
    wattage: '60-300W',
    lumens: '3000-15000',
    colorTemp: '2700K-3000K (Warm White)',
    description: 'Elegant crystal chandelier for grand spaces',
    bestFor: ['living', 'dining']
  },
  {
    id: 'chandelier-modern',
    name: 'Modern Chandelier',
    type: 'ambient',
    priceRange: { min: 200, max: 2000 },
    wattage: '40-200W',
    lumens: '2000-10000',
    colorTemp: '3000K-4000K',
    description: 'Contemporary chandelier with clean lines',
    bestFor: ['living', 'dining', 'bedroom']
  },
  {
    id: 'recessed-led',
    name: 'Recessed LED Downlights',
    type: 'ambient',
    priceRange: { min: 30, max: 150 },
    wattage: '6-15W per unit',
    lumens: '600-1500 per unit',
    colorTemp: '2700K-5000K (Adjustable)',
    description: 'Clean, modern recessed lighting',
    bestFor: ['living', 'kitchen', 'bathroom', 'office']
  },
  {
    id: 'flush-mount',
    name: 'Flush Mount Ceiling Light',
    type: 'ambient',
    priceRange: { min: 50, max: 300 },
    wattage: '20-60W',
    lumens: '1500-4000',
    colorTemp: '3000K-4000K',
    description: 'Low-profile ceiling fixture',
    bestFor: ['bedroom', 'bathroom', 'office']
  },
  {
    id: 'pendant-cluster',
    name: 'Pendant Cluster',
    type: 'ambient',
    priceRange: { min: 150, max: 800 },
    wattage: '30-100W',
    lumens: '2000-6000',
    colorTemp: '2700K-3500K',
    description: 'Multiple pendants in a cluster arrangement',
    bestFor: ['kitchen', 'dining']
  },
  {
    id: 'cove-lighting',
    name: 'Cove Lighting (LED Strip)',
    type: 'ambient',
    priceRange: { min: 100, max: 500 },
    wattage: '10-30W per meter',
    lumens: '500-1500 per meter',
    colorTemp: '2700K-6500K (RGB Available)',
    description: 'Hidden LED strips for ambient glow',
    bestFor: ['living', 'bedroom', 'bathroom']
  },
  // Task Lighting
  {
    id: 'under-cabinet',
    name: 'Under Cabinet Lights',
    type: 'task',
    priceRange: { min: 50, max: 200 },
    wattage: '8-20W',
    lumens: '500-1200',
    colorTemp: '3000K-4000K',
    description: 'LED strips or pucks under cabinets',
    bestFor: ['kitchen']
  },
  {
    id: 'desk-lamp',
    name: 'Adjustable Desk Lamp',
    type: 'task',
    priceRange: { min: 40, max: 300 },
    wattage: '5-15W',
    lumens: '400-1000',
    colorTemp: '3000K-5000K (Adjustable)',
    description: 'Focused task lighting for work areas',
    bestFor: ['office', 'bedroom']
  },
  {
    id: 'vanity-light',
    name: 'Vanity Light Bar',
    type: 'task',
    priceRange: { min: 80, max: 400 },
    wattage: '20-60W',
    lumens: '1500-4000',
    colorTemp: '3000K-4000K',
    description: 'Even lighting for grooming tasks',
    bestFor: ['bathroom']
  },
  {
    id: 'reading-light',
    name: 'Wall-Mounted Reading Light',
    type: 'task',
    priceRange: { min: 50, max: 200 },
    wattage: '5-10W',
    lumens: '300-600',
    colorTemp: '2700K-3000K',
    description: 'Adjustable bedside reading light',
    bestFor: ['bedroom']
  },
  {
    id: 'pendant-single',
    name: 'Single Pendant Light',
    type: 'task',
    priceRange: { min: 60, max: 350 },
    wattage: '10-40W',
    lumens: '800-2500',
    colorTemp: '2700K-3500K',
    description: 'Focused pendant over work areas',
    bestFor: ['kitchen', 'dining', 'office']
  },
  // Accent Lighting
  {
    id: 'track-lighting',
    name: 'Track Lighting System',
    type: 'accent',
    priceRange: { min: 100, max: 600 },
    wattage: '30-100W total',
    lumens: '2000-6000 total',
    colorTemp: '2700K-4000K',
    description: 'Adjustable spotlights on a track',
    bestFor: ['living', 'office', 'kitchen']
  },
  {
    id: 'picture-light',
    name: 'Picture/Art Light',
    type: 'accent',
    priceRange: { min: 60, max: 250 },
    wattage: '5-15W',
    lumens: '300-800',
    colorTemp: '2700K-3000K',
    description: 'Directional light for artwork',
    bestFor: ['living', 'dining', 'office']
  },
  {
    id: 'cabinet-spotlight',
    name: 'Display Cabinet Spotlights',
    type: 'accent',
    priceRange: { min: 30, max: 100 },
    wattage: '2-5W per unit',
    lumens: '100-300 per unit',
    colorTemp: '3000K-4000K',
    description: 'Small spotlights for display cabinets',
    bestFor: ['living', 'dining']
  },
  {
    id: 'wall-wash',
    name: 'Wall Wash Lights',
    type: 'accent',
    priceRange: { min: 80, max: 300 },
    wattage: '10-30W',
    lumens: '800-2000',
    colorTemp: '2700K-4000K',
    description: 'Even illumination across walls',
    bestFor: ['living', 'dining', 'office']
  },
  {
    id: 'step-light',
    name: 'Step/Stair Lights',
    type: 'accent',
    priceRange: { min: 30, max: 100 },
    wattage: '1-3W per unit',
    lumens: '50-150 per unit',
    colorTemp: '2700K-3000K',
    description: 'Low-level lighting for stairs and steps',
    bestFor: ['living']
  },
  // Decorative Lighting
  {
    id: 'floor-lamp',
    name: 'Decorative Floor Lamp',
    type: 'decorative',
    priceRange: { min: 100, max: 800 },
    wattage: '10-60W',
    lumens: '500-3000',
    colorTemp: '2700K-3000K',
    description: 'Statement floor lamp as decor piece',
    bestFor: ['living', 'bedroom', 'office']
  },
  {
    id: 'table-lamp',
    name: 'Decorative Table Lamp',
    type: 'decorative',
    priceRange: { min: 50, max: 400 },
    wattage: '5-40W',
    lumens: '300-2000',
    colorTemp: '2700K-3000K',
    description: 'Stylish table lamp for ambiance',
    bestFor: ['living', 'bedroom', 'office']
  },
  {
    id: 'sconce-decorative',
    name: 'Decorative Wall Sconce',
    type: 'decorative',
    priceRange: { min: 60, max: 350 },
    wattage: '5-25W',
    lumens: '300-1500',
    colorTemp: '2700K-3000K',
    description: 'Stylish wall-mounted fixture',
    bestFor: ['living', 'bedroom', 'bathroom', 'dining']
  },
  {
    id: 'string-lights',
    name: 'String/Fairy Lights',
    type: 'decorative',
    priceRange: { min: 15, max: 80 },
    wattage: '5-20W',
    lumens: '200-800',
    colorTemp: '2700K (Warm White)',
    description: 'Whimsical string lights for ambiance',
    bestFor: ['bedroom', 'living']
  },
  {
    id: 'neon-sign',
    name: 'LED Neon Sign',
    type: 'decorative',
    priceRange: { min: 50, max: 300 },
    wattage: '5-20W',
    lumens: '100-500',
    colorTemp: 'Various colors',
    description: 'Custom LED neon artwork',
    bestFor: ['bedroom', 'office', 'living']
  }
];

// Furniture by Room
export const furnitureByRoom: Record<string, FurnitureItem[]> = {
  living: [
    { id: 'sofa-3seat', name: '3-Seater Sofa', category: 'seating', priceRange: { budget: 400, standard: 1200, premium: 4000 }, materials: ['Fabric', 'Leather', 'Velvet'], description: 'Main seating piece' },
    { id: 'armchair', name: 'Accent Armchair', category: 'seating', priceRange: { budget: 150, standard: 500, premium: 2000 }, materials: ['Fabric', 'Leather'], description: 'Additional seating' },
    { id: 'coffee-table', name: 'Coffee Table', category: 'table', priceRange: { budget: 100, standard: 400, premium: 1500 }, materials: ['Wood', 'Glass', 'Marble'], description: 'Central table' },
    { id: 'tv-console', name: 'TV Console', category: 'storage', priceRange: { budget: 150, standard: 600, premium: 2500 }, materials: ['Wood', 'MDF', 'Metal'], description: 'Entertainment center' },
    { id: 'bookshelf', name: 'Bookshelf', category: 'storage', priceRange: { budget: 80, standard: 400, premium: 1500 }, materials: ['Wood', 'Metal'], description: 'Display and storage' },
    { id: 'side-table', name: 'Side Table', category: 'table', priceRange: { budget: 40, standard: 150, premium: 600 }, materials: ['Wood', 'Metal', 'Glass'], description: 'Accent table' },
    { id: 'area-rug', name: 'Area Rug', category: 'decor', priceRange: { budget: 100, standard: 500, premium: 3000 }, materials: ['Wool', 'Synthetic', 'Silk'], description: 'Floor covering' }
  ],
  bedroom: [
    { id: 'bed-frame', name: 'Bed Frame (Queen/King)', category: 'furniture', priceRange: { budget: 300, standard: 1000, premium: 4000 }, materials: ['Wood', 'Upholstered', 'Metal'], description: 'Main bed' },
    { id: 'mattress', name: 'Quality Mattress', category: 'furniture', priceRange: { budget: 400, standard: 1200, premium: 4000 }, materials: ['Memory Foam', 'Spring', 'Hybrid'], description: 'Sleeping surface' },
    { id: 'nightstand', name: 'Nightstand (pair)', category: 'storage', priceRange: { budget: 80, standard: 300, premium: 1200 }, materials: ['Wood', 'Metal'], description: 'Bedside tables' },
    { id: 'dresser', name: 'Dresser', category: 'storage', priceRange: { budget: 200, standard: 800, premium: 3000 }, materials: ['Wood', 'MDF'], description: 'Clothing storage' },
    { id: 'wardrobe', name: 'Wardrobe/Closet', category: 'storage', priceRange: { budget: 300, standard: 1500, premium: 5000 }, materials: ['Wood', 'MDF', 'Laminate'], description: 'Clothes storage' },
    { id: 'vanity', name: 'Vanity Table', category: 'furniture', priceRange: { budget: 100, standard: 400, premium: 1500 }, materials: ['Wood', 'Glass'], description: 'Dressing table' }
  ],
  kitchen: [
    { id: 'cabinets', name: 'Kitchen Cabinets (set)', category: 'storage', priceRange: { budget: 3000, standard: 10000, premium: 30000 }, materials: ['Wood', 'MDF', 'Laminate'], description: 'Storage cabinets' },
    { id: 'countertop', name: 'Countertop', category: 'surface', priceRange: { budget: 500, standard: 2000, premium: 8000 }, materials: ['Laminate', 'Granite', 'Quartz', 'Marble'], description: 'Work surface' },
    { id: 'island', name: 'Kitchen Island', category: 'furniture', priceRange: { budget: 400, standard: 1500, premium: 5000 }, materials: ['Wood', 'Marble top'], description: 'Central workspace' },
    { id: 'bar-stools', name: 'Bar Stools (set of 3)', category: 'seating', priceRange: { budget: 150, standard: 500, premium: 1500 }, materials: ['Wood', 'Metal', 'Upholstered'], description: 'Counter seating' },
    { id: 'dining-table-small', name: 'Small Dining Table', category: 'table', priceRange: { budget: 200, standard: 800, premium: 2500 }, materials: ['Wood', 'Glass'], description: 'Eating area' }
  ],
  bathroom: [
    { id: 'vanity-cabinet', name: 'Vanity Cabinet', category: 'storage', priceRange: { budget: 300, standard: 1000, premium: 3500 }, materials: ['Wood', 'MDF', 'PVC'], description: 'Sink cabinet' },
    { id: 'mirror', name: 'Bathroom Mirror', category: 'decor', priceRange: { budget: 50, standard: 200, premium: 800 }, materials: ['Glass', 'LED-lit'], description: 'Wall mirror' },
    { id: 'shower-enclosure', name: 'Shower Enclosure', category: 'fixture', priceRange: { budget: 300, standard: 1000, premium: 3000 }, materials: ['Glass', 'Acrylic'], description: 'Shower door/walls' },
    { id: 'bathtub', name: 'Bathtub', category: 'fixture', priceRange: { budget: 400, standard: 1500, premium: 5000 }, materials: ['Acrylic', 'Cast Iron', 'Stone'], description: 'Soaking tub' },
    { id: 'storage-cabinet', name: 'Storage Cabinet', category: 'storage', priceRange: { budget: 100, standard: 400, premium: 1200 }, materials: ['Wood', 'PVC'], description: 'Towel/supply storage' }
  ],
  office: [
    { id: 'desk', name: 'Office Desk', category: 'furniture', priceRange: { budget: 150, standard: 600, premium: 2500 }, materials: ['Wood', 'Metal', 'Glass'], description: 'Work surface' },
    { id: 'office-chair', name: 'Ergonomic Office Chair', category: 'seating', priceRange: { budget: 150, standard: 500, premium: 1500 }, materials: ['Mesh', 'Leather', 'Fabric'], description: 'Work seating' },
    { id: 'file-cabinet', name: 'File Cabinet', category: 'storage', priceRange: { budget: 80, standard: 300, premium: 800 }, materials: ['Metal', 'Wood'], description: 'Document storage' },
    { id: 'bookcase', name: 'Bookcase', category: 'storage', priceRange: { budget: 100, standard: 400, premium: 1500 }, materials: ['Wood', 'Metal'], description: 'Book/display storage' },
    { id: 'guest-chair', name: 'Guest Chair', category: 'seating', priceRange: { budget: 80, standard: 300, premium: 1000 }, materials: ['Fabric', 'Leather'], description: 'Visitor seating' }
  ],
  dining: [
    { id: 'dining-table', name: 'Dining Table', category: 'table', priceRange: { budget: 300, standard: 1200, premium: 5000 }, materials: ['Wood', 'Glass', 'Marble'], description: 'Main dining surface' },
    { id: 'dining-chairs', name: 'Dining Chairs (set of 6)', category: 'seating', priceRange: { budget: 300, standard: 1200, premium: 4000 }, materials: ['Wood', 'Upholstered'], description: 'Dining seating' },
    { id: 'sideboard', name: 'Sideboard/Buffet', category: 'storage', priceRange: { budget: 200, standard: 800, premium: 3000 }, materials: ['Wood', 'MDF'], description: 'Dining storage' },
    { id: 'china-cabinet', name: 'China Cabinet', category: 'storage', priceRange: { budget: 300, standard: 1000, premium: 4000 }, materials: ['Wood', 'Glass'], description: 'Display cabinet' },
    { id: 'bar-cart', name: 'Bar Cart', category: 'furniture', priceRange: { budget: 80, standard: 300, premium: 1000 }, materials: ['Metal', 'Wood', 'Glass'], description: 'Beverage serving' }
  ]
};

// Get materials filtered by room type
export const getMaterialsForRoom = (roomId: string) => {
  const floorOptions = flooringMaterials.filter(m => m.bestFor.includes(roomId));
  const wallOptions = wallFinishes.filter(m => m.bestFor.includes(roomId));
  const ceilingOptions = ceilingFinishes.filter(m => m.bestFor.includes(roomId));
  return { flooring: floorOptions, walls: wallOptions, ceiling: ceilingOptions };
};

// Get lighting options filtered by room type
export const getLightingForRoom = (roomId: string) => {
  return lightingOptions.filter(l => l.bestFor.includes(roomId));
};

// Get furniture for room
export const getFurnitureForRoom = (roomId: string) => {
  return furnitureByRoom[roomId] || [];
};
