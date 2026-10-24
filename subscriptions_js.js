import React, { useState } from 'react';

const WHATSAPP_NUMBER = "9647700000000"; // قم بتحديث رقم الواتساب الخاص بك

const plans = [
  {
    id: 'free_trial',
    name: 'التجريبية',
    price: 'مجاناً',
    duration: '30 يوم',
    features: ['إضافة حتى 10 عقارات', 'دعم فني أساسي', 'عرض عقاري ميسر'],
    popular: false,
  },
  {
    id: 'monthly',
    name: 'الشهرية',
    price: '25,000 د.ع',
    duration: 'شهر واحد',
    features: ['إضافة عقارات لا محدودة', 'دعم فني على مدار الساعة', 'إدارة المكاتب والعقارات', 'تنبيهات فورية'],
    popular: true,
  },
  {
    id: 'quarterly',
    name: 'الربع سنوية',
    price: '65,000 د.ع',
    duration: '3 أشهر',
    features: ['خصم خاص 15%', 'إضافة عقارات لا محدودة', 'دعم مخصص للمكاتب', 'تقارير أداء متقدمة'],
    popular: false,
  },
  {
    id: 'yearly',
    name: 'السنوية',
    price: '220,000 د.ع',
    duration: 'سنة كاملة',
    features: ['خصم خاص 25%', 'كافة المزايا المتقدمة', 'أولوية في خدمة العملاء', 'دعم تسويقي مخصص'],
    popular: false,
  },
];

export default function Subscriptions() {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const handleSubscribe = (plan) => {
    const message = `مرحباً، أود الاشتراك في تطبيق عقاري الميسر - باقة (${plan.name}) بسعر (${plan.price}).`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-[#2C221E] sm:text-4xl font-['Cairo']">
          خطط الاشتراكات في عقاري الميسر
        </h2>
        <p className="mt-4 text-xl text-[#6B5E55] font-['Cairo']">
          اختر الباقة المناسبة لاحتياجاتك واستمتع بإدارة عقاراتك بكل سهولة
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl bg-white p-8 shadow-lg flex flex-col justify-between border-2 ${
                plan.popular ? 'border-[#C88A58]' : 'border-transparent'
              }`}
            >
              <div>
                {plan.popular && (
                  <span className="inline-block bg-[#C88A58] text-white text-xs px-3 py-1 rounded-full font-bold mb-4 font-['Cairo']">
                    الأكثر طلباً
                  </span>
                )}
                <h3 className="text-2xl font-bold text-[#2C221E] font-['Cairo']">{plan.name}</h3>
                <p className="mt-4 text-3xl font-extrabold text-[#C88A58] font-['Cairo']">{plan.price}</p>
                <p className="text-sm text-[#8C7A6B] font-['Cairo']">{plan.duration}</p>

                <ul className="mt-6 space-y-3 text-right">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-[#4A3E3D] font-['Cairo']">
                      <span className="ml-2 text-green-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSubscribe(plan)}
                className={`mt-8 w-full py-3 px-4 rounded-xl font-bold transition-all duration-200 font-['Cairo'] ${
                  plan.popular
                    ? 'bg-[#C88A58] text-white hover:bg-[#A86F43]'
                    : 'bg-[#F2EFE9] text-[#2C221E] hover:bg-[#E2DDD5]'
                }`}
              >
                اشترك الآن عبر واتساب
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}