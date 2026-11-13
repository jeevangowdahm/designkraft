export interface Country {
  id: string;
  name: string;
  currency: string;
  symbol: string;
  rate: number;
  phoneCode: string;
  phonePlaceholder: string;
  addressFormat: {
    cityLabel: string;
    stateLabel: string;
    postalLabel: string;
    postalPlaceholder: string;
  };
}

export const countries: Country[] = [
  { 
    id: 'us', 
    name: 'United States', 
    currency: 'USD', 
    symbol: '$', 
    rate: 1, 
    phoneCode: '+1',
    phonePlaceholder: '(555) 123-4567',
    addressFormat: { cityLabel: 'City', stateLabel: 'State', postalLabel: 'ZIP Code', postalPlaceholder: '10001' }
  },
  { 
    id: 'gb', 
    name: 'United Kingdom', 
    currency: 'GBP', 
    symbol: '£', 
    rate: 0.79,
    phoneCode: '+44',
    phonePlaceholder: '7911 123456',
    addressFormat: { cityLabel: 'City', stateLabel: 'County', postalLabel: 'Postcode', postalPlaceholder: 'SW1A 1AA' }
  },
  { 
    id: 'eu', 
    name: 'Europe (EUR)', 
    currency: 'EUR', 
    symbol: '€', 
    rate: 0.92,
    phoneCode: '+49',
    phonePlaceholder: '170 1234567',
    addressFormat: { cityLabel: 'City', stateLabel: 'Region', postalLabel: 'Postal Code', postalPlaceholder: '10115' }
  },
  { 
    id: 'in', 
    name: 'India', 
    currency: 'INR', 
    symbol: '₹', 
    rate: 83.12,
    phoneCode: '+91',
    phonePlaceholder: '98765 43210',
    addressFormat: { cityLabel: 'City', stateLabel: 'State', postalLabel: 'PIN Code', postalPlaceholder: '110001' }
  },
  { 
    id: 'jp', 
    name: 'Japan', 
    currency: 'JPY', 
    symbol: '¥', 
    rate: 149.50,
    phoneCode: '+81',
    phonePlaceholder: '90-1234-5678',
    addressFormat: { cityLabel: 'City', stateLabel: 'Prefecture', postalLabel: 'Postal Code', postalPlaceholder: '100-0001' }
  },
  { 
    id: 'cn', 
    name: 'China', 
    currency: 'CNY', 
    symbol: '¥', 
    rate: 7.24,
    phoneCode: '+86',
    phonePlaceholder: '138 0013 8000',
    addressFormat: { cityLabel: 'City', stateLabel: 'Province', postalLabel: 'Postal Code', postalPlaceholder: '100000' }
  },
  { 
    id: 'au', 
    name: 'Australia', 
    currency: 'AUD', 
    symbol: 'A$', 
    rate: 1.53,
    phoneCode: '+61',
    phonePlaceholder: '412 345 678',
    addressFormat: { cityLabel: 'City', stateLabel: 'State', postalLabel: 'Postcode', postalPlaceholder: '2000' }
  },
  { 
    id: 'ca', 
    name: 'Canada', 
    currency: 'CAD', 
    symbol: 'C$', 
    rate: 1.36,
    phoneCode: '+1',
    phonePlaceholder: '(416) 555-0123',
    addressFormat: { cityLabel: 'City', stateLabel: 'Province', postalLabel: 'Postal Code', postalPlaceholder: 'M5V 3L9' }
  },
  { 
    id: 'ae', 
    name: 'UAE', 
    currency: 'AED', 
    symbol: 'د.إ', 
    rate: 3.67,
    phoneCode: '+971',
    phonePlaceholder: '50 123 4567',
    addressFormat: { cityLabel: 'City', stateLabel: 'Emirate', postalLabel: 'P.O. Box', postalPlaceholder: '12345' }
  },
  { 
    id: 'sg', 
    name: 'Singapore', 
    currency: 'SGD', 
    symbol: 'S$', 
    rate: 1.34,
    phoneCode: '+65',
    phonePlaceholder: '9123 4567',
    addressFormat: { cityLabel: 'District', stateLabel: 'Region', postalLabel: 'Postal Code', postalPlaceholder: '123456' }
  },
  { 
    id: 'br', 
    name: 'Brazil', 
    currency: 'BRL', 
    symbol: 'R$', 
    rate: 4.97,
    phoneCode: '+55',
    phonePlaceholder: '11 91234-5678',
    addressFormat: { cityLabel: 'City', stateLabel: 'State', postalLabel: 'CEP', postalPlaceholder: '01310-100' }
  },
  { 
    id: 'mx', 
    name: 'Mexico', 
    currency: 'MXN', 
    symbol: '$', 
    rate: 17.15,
    phoneCode: '+52',
    phonePlaceholder: '55 1234 5678',
    addressFormat: { cityLabel: 'City', stateLabel: 'State', postalLabel: 'C.P.', postalPlaceholder: '06600' }
  },
  { 
    id: 'za', 
    name: 'South Africa', 
    currency: 'ZAR', 
    symbol: 'R', 
    rate: 18.65,
    phoneCode: '+27',
    phonePlaceholder: '82 123 4567',
    addressFormat: { cityLabel: 'City', stateLabel: 'Province', postalLabel: 'Postal Code', postalPlaceholder: '2000' }
  },
  { 
    id: 'kr', 
    name: 'South Korea', 
    currency: 'KRW', 
    symbol: '₩', 
    rate: 1298.50,
    phoneCode: '+82',
    phonePlaceholder: '10-1234-5678',
    addressFormat: { cityLabel: 'City', stateLabel: 'Province', postalLabel: 'Postal Code', postalPlaceholder: '04524' }
  },
  { 
    id: 'sa', 
    name: 'Saudi Arabia', 
    currency: 'SAR', 
    symbol: '﷼', 
    rate: 3.75,
    phoneCode: '+966',
    phonePlaceholder: '50 123 4567',
    addressFormat: { cityLabel: 'City', stateLabel: 'Region', postalLabel: 'Postal Code', postalPlaceholder: '12345' }
  },
  { 
    id: 'ng', 
    name: 'Nigeria', 
    currency: 'NGN', 
    symbol: '₦', 
    rate: 1550.00,
    phoneCode: '+234',
    phonePlaceholder: '803 123 4567',
    addressFormat: { cityLabel: 'City', stateLabel: 'State', postalLabel: 'Postal Code', postalPlaceholder: '100001' }
  },
  { 
    id: 'eg', 
    name: 'Egypt', 
    currency: 'EGP', 
    symbol: 'E£', 
    rate: 30.90,
    phoneCode: '+20',
    phonePlaceholder: '100 123 4567',
    addressFormat: { cityLabel: 'City', stateLabel: 'Governorate', postalLabel: 'Postal Code', postalPlaceholder: '11511' }
  },
  { 
    id: 'pk', 
    name: 'Pakistan', 
    currency: 'PKR', 
    symbol: '₨', 
    rate: 278.50,
    phoneCode: '+92',
    phonePlaceholder: '300 1234567',
    addressFormat: { cityLabel: 'City', stateLabel: 'Province', postalLabel: 'Postal Code', postalPlaceholder: '44000' }
  },
  { 
    id: 'id', 
    name: 'Indonesia', 
    currency: 'IDR', 
    symbol: 'Rp', 
    rate: 15650.00,
    phoneCode: '+62',
    phonePlaceholder: '812 3456 7890',
    addressFormat: { cityLabel: 'City', stateLabel: 'Province', postalLabel: 'Kode Pos', postalPlaceholder: '10110' }
  },
  { 
    id: 'th', 
    name: 'Thailand', 
    currency: 'THB', 
    symbol: '฿', 
    rate: 35.50,
    phoneCode: '+66',
    phonePlaceholder: '81 234 5678',
    addressFormat: { cityLabel: 'District', stateLabel: 'Province', postalLabel: 'Postal Code', postalPlaceholder: '10110' }
  },
];

export const getCountryById = (id: string): Country => {
  return countries.find((c) => c.id === id) || countries[0];
};
