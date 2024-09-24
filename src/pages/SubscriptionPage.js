import React, { useState, useEffect } from 'react';
import { CheckCircle, HelpCircle, AlertCircle } from 'lucide-react';

const plans = [
  { id: 'free', name: 'Free', price: 0, questions: 1, period: 'day', color: 'bg-gray-100', textColor: 'text-gray-800', icon: HelpCircle },
  { id: 'bronze', name: 'Bronze', price: 100, questions: 5, period: 'day', color: 'bg-amber-100', textColor: 'text-amber-800', icon: CheckCircle },
  { id: 'silver', name: 'Silver', price: 300, questions: 10, period: 'day', color: 'bg-sky-100', textColor: 'text-sky-800', icon: CheckCircle },
  { id: 'gold', name: 'Gold', price: 1000, questions: 'Unlimited', period: 'day', color: 'bg-yellow-100', textColor: 'text-yellow-800', icon: CheckCircle }
];

function formatPrice(price) {
  return price === 0 ? 'Free' : `₹${price}/month`;
}

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isPaymentTime, setIsPaymentTime] = useState(false);

  useEffect(() => {
    const checkPaymentTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setIsPaymentTime(hours === 10 || (hours === 11 && minutes === 0));
    };
    checkPaymentTime();
    const interval = setInterval(checkPaymentTime, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (plan) => {
    if (plan.price > 0) {
      if (!isPaymentTime) {
        alert("Payments are only accepted between 10:00 AM and 11:00 AM IST.");
        return;
      }
      setSelectedPlan(plan);
      alert(`You've selected the ${plan.name} plan. Please proceed to payment.`);
    } else {
      alert(`You've successfully subscribed to the ${plan.name} plan.`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center text-white mb-4">StackOverflow Subscriptions</h1>
        <p className="text-xl text-center text-white mb-12">Choose the perfect plan for your StackOverflow needs</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div key={plan.id} className={`flex flex-col ${plan.color} border-4 border-white shadow-lg transform transition-all duration-300 hover:scale-105 p-6 rounded-lg`}>
              <div className={`${plan.textColor} flex justify-between items-center`}>
                <h2 className="text-2xl font-bold">{plan.name}</h2>
                <plan.icon className="w-8 h-8" />
              </div>
              <p className={`text-xl font-semibold ${plan.textColor}`}>{formatPrice(plan.price)}</p>
              <p className={`text-lg ${plan.textColor} mt-2`}>
                <span className="font-bold text-2xl">{plan.questions}</span> {plan.questions === 1 ? 'question' : 'questions'} per {plan.period}
              </p>
              <button 
                className={`w-full text-lg font-semibold mt-6 ${plan.price > 0 ? 'bg-white text-black hover:bg-gray-100' : 'bg-green-500 text-white hover:bg-green-600'} py-2 rounded-lg`}
                onClick={() => handleSubscribe(plan)}
              >
                {plan.price > 0 ? 'Subscribe Now' : 'Start Free'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white inline-flex items-center px-4 py-2 rounded-full text-pink-600 font-semibold text-lg border border-white shadow-lg">
            <AlertCircle className="w-5 h-5 mr-2" />
            Payments are only accepted between 10:00 AM and 11:00 AM IST
          </div>
        </div>
      </div>
    </div>
  );
}
