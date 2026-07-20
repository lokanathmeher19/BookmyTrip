import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

const EXCHANGE_RATES = {
  INR: 1,      // Base currency
  USD: 0.012,  // 1 INR = 0.012 USD
  EUR: 0.011,  // 1 INR = 0.011 EUR
  GBP: 0.0095, // 1 INR = 0.0095 GBP
  AUD: 0.018,  // 1 INR = 0.018 AUD
};

const CURRENCY_SYMBOLS = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  AUD: 'A$',
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('currency') || 'INR';
  });

  const changeCurrency = (newCurrency) => {
    if (EXCHANGE_RATES[newCurrency]) {
      setCurrency(newCurrency);
      localStorage.setItem('currency', newCurrency);
    }
  };

  const formatPrice = (priceInINR) => {
    const rate = EXCHANGE_RATES[currency] || 1;
    const converted = priceInINR * rate;
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(converted).replace(/[A-Z]{3}\s?/, CURRENCY_SYMBOLS[currency]); // Fix for some locales rendering currency code
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      changeCurrency, 
      formatPrice,
      currencies: Object.keys(EXCHANGE_RATES)
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
