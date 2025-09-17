"use client";
import React, { useState } from 'react';
import { X, Mail, Lock, User, CreditCard, Check, Zap, Plus, Minus } from 'lucide-react';

const AuthButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login', 'signup', 'pricing'
  const [isAnnual, setIsAnnual] = useState(false);
  const [additionalUsers, setAdditionalUsers] = useState({ basic: 0, standard: 0, enterprise: 0 });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const updateUserCount = (planName, change) => {
    setAdditionalUsers(prev => ({
      ...prev,
      [planName.toLowerCase()]: Math.max(0, prev[planName.toLowerCase()] + change)
    }));
  };

  const calculatePrice = (basePrice, planName) => {
    const numericPrice = parseFloat(basePrice.replace('£', ''));
    const userPrice = additionalUsers[planName.toLowerCase()] * 9.99;
    const totalPrice = numericPrice + userPrice;
    const finalPrice = isAnnual ? totalPrice * 0.9 : totalPrice;
    return `£${finalPrice.toFixed(2)}`;
  };

  const pricingPlans = [
    {
      name: 'Basic',
      price: '£29.99',
      period: isAnnual ? '/year' : '/month',
      features: [
        'Includes 1 admin and 1 user account',
        'Up to 10 SOPs',
        'Basic templates',
        'Email support',
        'Progress tracking'
      ],
      popular: false,
      stripePriceId: 'price_starter_monthly'
    },
    {
      name: 'Standard',
      price: '£47.99',
      period: isAnnual ? '/year' : '/month',
      features: [
        'Includes 1 admin and 1 user account',
        'Unlimited SOPs',
        'Advanced templates',
        'Real-time collaboration',
        'Priority support',
        'Custom branding',
        'Analytics dashboard'
      ],
      popular: true,
      stripePriceId: 'price_pro_monthly'
    },
    {
      name: 'Enterprise',
      price: '£99.99',
      period: isAnnual ? '/year' : '/month',
      features: [
        'Includes 1 admin and 1 user account',
        'Everything in Standard',
        'SSO integration',
        'Advanced permissions',
        'API access',
        'Dedicated support',
        'Custom integrations'
      ],
      popular: false,
      stripePriceId: 'price_enterprise_monthly'
    }
  ];

  const featureMatrix = [
    { feature: 'Admin accounts included', basic: '1', standard: '1', enterprise: '1' },
    { feature: 'User accounts included', basic: '1', standard: '1', enterprise: '1' },
    { feature: 'Additional users (£9.99/month)', basic: true, standard: true, enterprise: true },
    { feature: 'Maximum SOPs', basic: '10', standard: 'Unlimited', enterprise: 'Unlimited' },
    { feature: 'Basic templates', basic: true, standard: true, enterprise: true },
    { feature: 'Advanced templates', basic: false, standard: true, enterprise: true },
    { feature: 'Real-time collaboration', basic: false, standard: true, enterprise: true },
    { feature: 'Email support', basic: true, standard: true, enterprise: true },
    { feature: 'Priority support', basic: false, standard: true, enterprise: true },
    { feature: 'Dedicated support', basic: false, standard: false, enterprise: true },
    { feature: 'Progress tracking', basic: true, standard: true, enterprise: true },
    { feature: 'Custom branding', basic: false, standard: true, enterprise: true },
    { feature: 'Analytics dashboard', basic: false, standard: true, enterprise: true },
    { feature: 'SSO integration', basic: false, standard: false, enterprise: true },
    { feature: 'Advanced permissions', basic: false, standard: false, enterprise: true },
    { feature: 'API access', basic: false, standard: false, enterprise: true },
    { feature: 'Custom integrations', basic: false, standard: false, enterprise: true }
  ];

  const handleStripeCheckout = (priceId) => {
    console.log('Redirecting to Stripe checkout for:', priceId);
  };

  const Modal = ({ children }) => {
    if (!isModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-white/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <div className="bg-white/95 backdrop-blur-xl border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] rounded-2xl w-full max-w-md sm:max-w-lg md:max-w-4xl lg:max-w-6xl max-h-[90vh] overflow-y-auto relative">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100/80 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
          {children}
        </div>
      </div>
    );
  };

  const LoginForm = () => (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-6 sm:mb-8">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600 text-sm sm:text-base">Sign in to your SOPBuilder account</p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/80 backdrop-blur-sm text-sm sm:text-base"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/80 backdrop-blur-sm text-sm sm:text-base"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="ml-2 text-gray-600">Remember me</span>
          </label>
          <button className="text-blue-600 hover:text-blue-700">Forgot password?</button>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 text-sm sm:text-base"
        >
          Sign In
        </button>
      </div>

      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-gray-600 text-sm sm:text-base">
          Don't have an account?{' '}
          <button
            onClick={() => setAuthMode('signup')}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );

  const SignupForm = () => (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-6 sm:mb-8">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Get Started</h2>
        <p className="text-gray-600 text-sm sm:text-base">Create your SOPBuilder account</p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/80 backdrop-blur-sm text-sm sm:text-base"
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/80 backdrop-blur-sm text-sm sm:text-base"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="password"
            name="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/80 backdrop-blur-sm text-sm sm:text-base"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/80 backdrop-blur-sm text-sm sm:text-base"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 text-sm sm:text-base"
        >
          Create Account
        </button>

        <button
          onClick={() => setAuthMode('pricing')}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 text-sm sm:text-base"
        >
          View Pricing Plans
        </button>
      </div>

      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-gray-600 text-sm sm:text-base">
          Already have an account?{' '}
          <button
            onClick={() => setAuthMode('login')}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );

  const PricingTable = () => (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
        <p className="text-gray-600 text-sm sm:text-base">Select the perfect plan for your SOP building needs</p>
        
        {/* Annual/Monthly Toggle */}
        <div className="flex items-center justify-center mt-6 mb-4">
          <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>Monthly</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`mx-3 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isAnnual ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isAnnual ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
            Annual 
            <span className="text-green-600 ml-1">(10% off)</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl p-4 sm:p-6 transition-all duration-200 hover:shadow-lg backdrop-blur-sm flex flex-col ${
              plan.popular
                ? 'bg-gradient-to-br from-blue-50/80 to-purple-50/80 border-2 border-blue-500 md:scale-105'
                : 'bg-white/60 border border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {calculatePrice(plan.price, plan.name)}
                </span>
                <span className="text-gray-600 text-sm sm:text-base">{plan.period}</span>
              </div>
              
              {/* User Count Selector */}
              <div className="bg-gray-50/80 rounded-lg p-3 mb-4">
                <div className="text-sm text-gray-600 mb-2">Additional users (£9.99{isAnnual ? ' × 12 × 0.9' : ''}/month)</div>
                <div className="flex items-center justify-center space-x-3">
                  <button
                    onClick={() => updateUserCount(plan.name, -1)}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-semibold min-w-[2rem] text-center">
                    {additionalUsers[plan.name.toLowerCase()]}
                  </span>
                  <button
                    onClick={() => updateUserCount(plan.name, 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <ul className="space-y-2 sm:space-y-3 mb-6 flex-grow">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleStripeCheckout(plan.stripePriceId)}
              className={`w-full py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base mt-auto ${
                plan.popular
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-[1.02]'
                  : 'bg-gray-100/80 text-gray-900 hover:bg-gray-200/80 backdrop-blur-sm'
              }`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-900 text-center mb-6">Feature Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Features</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Basic</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Standard</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {featureMatrix.map((row, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">{row.feature}</td>
                  <td className="py-3 px-4 text-center">
                    {typeof row.basic === 'boolean' ? (
                      row.basic ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-700">{row.basic}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {typeof row.standard === 'boolean' ? (
                      row.standard ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-700">{row.standard}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {typeof row.enterprise === 'boolean' ? (
                      row.enterprise ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-700">{row.enterprise}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 text-center">
        <button
          onClick={() => setAuthMode('signup')}
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          ← Back to Sign Up
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => {
          setIsModalOpen(true);
          setAuthMode('login');
        }}
        className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 flex items-center gap-2"
      >
        <User className="w-5 h-5" />
        Sign In
      </button>

      <Modal>
        {authMode === 'login' && <LoginForm />}
        {authMode === 'signup' && <SignupForm />}
        {authMode === 'pricing' && <PricingTable />}
      </Modal>
    </>
  );
};

export default AuthButton;