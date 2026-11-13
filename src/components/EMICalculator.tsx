import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Calculator, CreditCard, Percent, IndianRupee, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Bank {
  id: string;
  name: string;
  logo: string;
  interestRate: number;
  processingFee: number;
  maxTenure: number;
  minAmount: number;
  maxAmount: number;
  features: string[];
}

const banks: Bank[] = [
  {
    id: 'sbi',
    name: 'State Bank of India',
    logo: '🏦',
    interestRate: 10.5,
    processingFee: 0.5,
    maxTenure: 60,
    minAmount: 100000,
    maxAmount: 5000000,
    features: ['No prepayment charges', 'Quick approval', 'Doorstep service']
  },
  {
    id: 'hdfc',
    name: 'HDFC Bank',
    logo: '🏛️',
    interestRate: 10.75,
    processingFee: 1.0,
    maxTenure: 60,
    minAmount: 100000,
    maxAmount: 4000000,
    features: ['Instant approval', 'Flexible tenure', 'Top-up loan facility']
  },
  {
    id: 'icici',
    name: 'ICICI Bank',
    logo: '💳',
    interestRate: 10.85,
    processingFee: 0.75,
    maxTenure: 48,
    minAmount: 150000,
    maxAmount: 3500000,
    features: ['Online tracking', 'Zero documentation', 'EMI holiday option']
  },
  {
    id: 'axis',
    name: 'Axis Bank',
    logo: '🏦',
    interestRate: 11.0,
    processingFee: 1.0,
    maxTenure: 48,
    minAmount: 100000,
    maxAmount: 3000000,
    features: ['Competitive rates', 'Minimal documentation', 'Fast disbursal']
  },
  {
    id: 'kotak',
    name: 'Kotak Mahindra Bank',
    logo: '💰',
    interestRate: 10.99,
    processingFee: 0.5,
    maxTenure: 60,
    minAmount: 100000,
    maxAmount: 4000000,
    features: ['Flexi EMI', 'Balance transfer', 'No hidden charges']
  },
  {
    id: 'pnb',
    name: 'Punjab National Bank',
    logo: '🏛️',
    interestRate: 10.25,
    processingFee: 0.35,
    maxTenure: 60,
    minAmount: 50000,
    maxAmount: 2500000,
    features: ['Lowest interest rate', 'Government backing', 'Extended tenure']
  }
];

const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

const EMICalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [selectedBankId, setSelectedBankId] = useState('sbi');
  const [tenure, setTenure] = useState(24);
  const [showComparison, setShowComparison] = useState(false);

  const selectedBank = banks.find(b => b.id === selectedBankId) || banks[0];

  const calculateEMI = (principal: number, rate: number, months: number) => {
    const monthlyRate = rate / (12 * 100);
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const emiDetails = useMemo(() => {
    const emi = calculateEMI(loanAmount, selectedBank.interestRate, tenure);
    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - loanAmount;
    const processingFeeAmount = (loanAmount * selectedBank.processingFee) / 100;
    
    return {
      emi,
      totalAmount,
      totalInterest,
      processingFeeAmount,
      effectiveCost: totalAmount + processingFeeAmount
    };
  }, [loanAmount, selectedBank, tenure]);

  const allBankEMIs = useMemo(() => {
    return banks.map(bank => ({
      ...bank,
      emi: calculateEMI(loanAmount, bank.interestRate, Math.min(tenure, bank.maxTenure)),
      totalPayable: calculateEMI(loanAmount, bank.interestRate, Math.min(tenure, bank.maxTenure)) * Math.min(tenure, bank.maxTenure)
    })).sort((a, b) => a.emi - b.emi);
  }, [loanAmount, tenure]);

  return (
    <section id="emi-calculator" className="py-20 bg-gradient-to-br from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <CreditCard className="w-4 h-4" />
            Easy Financing Options
          </span>
          <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
            EMI Calculator
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Finance your dream interior with easy EMI options from India's leading banks. 
            Calculate your monthly payments and choose the best plan for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Calculator Input */}
          <Card className="lg:col-span-2 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                Calculate Your EMI
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Loan Amount */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-medium">Loan Amount</Label>
                  <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
                    <IndianRupee className="w-4 h-4 text-primary" />
                    <Input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Math.max(50000, Math.min(5000000, Number(e.target.value))))}
                      className="w-32 border-none bg-transparent text-lg font-bold p-0 focus-visible:ring-0"
                    />
                  </div>
                </div>
                <Slider
                  value={[loanAmount]}
                  onValueChange={([value]) => setLoanAmount(value)}
                  min={50000}
                  max={5000000}
                  step={10000}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹50,000</span>
                  <span>₹50,00,000</span>
                </div>
              </div>

              {/* Bank Selection */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Select Bank</Label>
                <Select value={selectedBankId} onValueChange={setSelectedBankId}>
                  <SelectTrigger className="h-14">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {banks.map((bank) => (
                      <SelectItem key={bank.id} value={bank.id}>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{bank.logo}</span>
                          <div>
                            <div className="font-medium">{bank.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {bank.interestRate}% p.a.
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tenure */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-medium">Loan Tenure</Label>
                  <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-lg font-bold">{tenure} months</span>
                  </div>
                </div>
                <Slider
                  value={[tenure]}
                  onValueChange={([value]) => setTenure(value)}
                  min={6}
                  max={selectedBank.maxTenure}
                  step={6}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>6 months</span>
                  <span>{selectedBank.maxTenure} months</span>
                </div>
              </div>

              {/* Bank Features */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-primary" />
                  {selectedBank.name} Benefits
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedBank.features.map((feature, i) => (
                    <span key={i} className="bg-background px-3 py-1 rounded-full text-xs">
                      ✓ {feature}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* EMI Results */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <p className="text-primary-foreground/80 text-sm mb-1">Your Monthly EMI</p>
                  <p className="text-4xl font-bold">{formatINR(emiDetails.emi)}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-primary-foreground/20">
                    <span className="text-primary-foreground/80">Principal Amount</span>
                    <span className="font-medium">{formatINR(loanAmount)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-primary-foreground/20">
                    <span className="text-primary-foreground/80">Interest Rate</span>
                    <span className="font-medium">{selectedBank.interestRate}% p.a.</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-primary-foreground/20">
                    <span className="text-primary-foreground/80">Total Interest</span>
                    <span className="font-medium">{formatINR(emiDetails.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-primary-foreground/20">
                    <span className="text-primary-foreground/80">Processing Fee</span>
                    <span className="font-medium">{formatINR(emiDetails.processingFeeAmount)}</span>
                  </div>
                  <div className="flex justify-between py-2 pt-4">
                    <span className="font-medium">Total Payable</span>
                    <span className="text-xl font-bold">{formatINR(emiDetails.effectiveCost)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowComparison(!showComparison)}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              {showComparison ? 'Hide' : 'Compare All'} Banks
            </Button>
          </div>
        </div>

        {/* Bank Comparison Table */}
        {showComparison && (
          <Card className="mt-8 max-w-6xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="w-5 h-5 text-primary" />
                Compare EMI Across Banks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Bank</th>
                      <th className="text-center py-3 px-4">Interest Rate</th>
                      <th className="text-center py-3 px-4">Processing Fee</th>
                      <th className="text-center py-3 px-4">Monthly EMI</th>
                      <th className="text-center py-3 px-4">Total Payable</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allBankEMIs.map((bank, index) => (
                      <tr 
                        key={bank.id} 
                        className={`border-b hover:bg-muted/50 cursor-pointer ${
                          bank.id === selectedBankId ? 'bg-primary/10' : ''
                        }`}
                        onClick={() => setSelectedBankId(bank.id)}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{bank.logo}</span>
                            <div>
                              <div className="font-medium">{bank.name}</div>
                              {index === 0 && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                  Lowest EMI
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-3 px-4">{bank.interestRate}%</td>
                        <td className="text-center py-3 px-4">{bank.processingFee}%</td>
                        <td className="text-center py-3 px-4 font-bold text-primary">
                          {formatINR(bank.emi)}
                        </td>
                        <td className="text-center py-3 px-4">{formatINR(bank.totalPayable)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Ready to start your project? Get instant loan approval and begin your interior transformation today!
          </p>
          <Button size="lg" className="px-8">
            Apply for Financing
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EMICalculator;
