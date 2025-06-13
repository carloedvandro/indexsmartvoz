
import React from "react";
import { PlanCard } from "./PlanCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImageSwiper } from "@/components/ui/image-swiper";
import Image from "@/components/ui/image";

const PLANS = [
  {
    id: "smartvoz-80",
    name: "SMARTVOZ",
    gb: "80GB",
    price: 84.99,
    features: [
      "Smartvoz 80GB",
      "Minutos: Ilimitados",
      "Chip eSIM ou Sim Card Fisico",
      "Escolha seu DDD"
    ],
    cashback: 30.00
  },
  {
    id: "smartvoz-100",
    name: "SMARTVOZ",
    gb: "100GB",
    price: 104.99,
    features: [
      "Smartvoz 100GB",
      "Minutos: Ilimitados",
      "Chip eSIM ou Sim Card Fisico",
      "Escolha seu DDD"
    ],
    cashback: 40.00
  },
  {
    id: "smartvoz-120",
    name: "SMARTVOZ",
    gb: "120GB",
    price: 124.99,
    features: [
      "Smartvoz 120GB",
      "Minutos: Ilimitados",
      "Chip eSIM ou Sim Card Fisico",
      "Escolha seu DDD"
    ],
    isHighlighted: true,
    cashback: 50.00
  },
  {
    id: "smartvoz-140",
    name: "SMARTVOZ",
    gb: "140GB",
    price: 144.99,
    features: [
      "Smartvoz 140GB",
      "Minutos: Ilimitados",
      "Chip eSIM ou Sim Card Fisico",
      "Escolha seu DDD"
    ],
    cashback: 60.00
  },
];

interface PlansSectionProps {
  storeOwnerCustomId?: string;
}

export function PlansSection({ storeOwnerCustomId }: PlansSectionProps) {
  const navigate = useNavigate();

  const handleSelectPlan = (plan: any) => {
    // Navigate directly to the products page with the plan selected
    if (storeOwnerCustomId) {
      navigate(`/client/products?sponsor=${storeOwnerCustomId}&plan=${plan.id}`);
    } else {
      navigate(`/client/products?plan=${plan.id}`);
    }
  };

  // URLs das imagens para o swiper
  const swiperImages = "https://img.freepik.com/premium-photo/3d-cartoon_975306-1.jpg?w=2000,https://img.freepik.com/premium-photo/3d-cartoon-boy-avatar_113255-5540.jpg,https://th.bing.com/th/id/OIP.OmBLyKbo8iixJ2SeS12xxwHaE7?w=626&h=417&rs=1&pid=ImgDetMain,https://thumbs.dreamstime.com/b/animated-academic-cheerful-cartoon-scholar-301088562.jpg,https://img.freepik.com/premium-psd/3d-cute-young-business-man-character-generative-ai_43614-1027.jpg,https://img.freepik.com/premium-photo/arafed-cartoon-man-suit-tie-standing-with-his-hands-his-hips_988987-15581.jpg";

  return (
    <div className="py-8 rounded-xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-pink-600 mb-2">
          Conecte-se ao Futuro
        </h2>
        <p className="text-gray-600 mt-2 mx-auto max-w-3xl px-4">
          Escolha o plano ideal para suas necessidades com a melhor relação custo-benefício do mercado digital
        </p>
      </div>

      {/* Image Swiper */}
      <div className="flex justify-center mb-8">
        <ImageSwiper 
          images={swiperImages}
          cardWidth={280}
          cardHeight={200}
          className="mx-auto"
        />
      </div>
      
      <div className="py-8 rounded-xl">
        {/* Cartões dos planos */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Todos os Planos</h3>
          <div className="flex flex-wrap justify-center gap-6 mx-auto px-4 max-w-7xl">
            {PLANS.map((plan) => (
              <div key={plan.id} className="flex justify-center">
                <PlanCard 
                  plan={plan} 
                  onSelect={handleSelectPlan} 
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-2">Internet de alta qualidade sem contratos longos</p>
          <div className="flex justify-center gap-4 flex-wrap px-4">
            <div className="bg-white px-4 py-2 rounded-md shadow-sm flex items-center gap-2">
              <span className="text-pink-600 font-medium">Sem taxas ocultas</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-md shadow-sm flex items-center gap-2">
              <span className="text-pink-600 font-medium">Serviço completo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
