import React, { useState } from "react";
import { PlanCard } from "./PlanCard";
import { PlansOrbital } from "./PlansOrbital";
import { useNavigate } from "react-router-dom";
const PLANS = [{
  id: "smartvoz-80",
  name: "SMARTVOZ",
  gb: "80GB",
  price: 84.99,
  features: ["Smartvoz 80GB", "Minutos: Ilimitados", "Chip eSIM ou Sim Card Fisico", "Escolha seu DDD", "Validade: 30 Dias"]
}, {
  id: "smartvoz-100",
  name: "SMARTVOZ",
  gb: "100GB",
  price: 104.99,
  features: ["Smartvoz 100GB", "Minutos: Ilimitados", "Chip eSIM ou Sim Card Fisico", "Escolha seu DDD", "Validade: 30 Dias"]
}, {
  id: "smartvoz-120",
  name: "SMARTVOZ",
  gb: "120GB",
  price: 124.99,
  features: ["Smartvoz 120GB", "Minutos: Ilimitados", "Chip eSIM ou Sim Card Fisico", "Escolha seu DDD", "Validade: 30 Dias"],
  isHighlighted: true
}, {
  id: "smartvoz-140",
  name: "SMARTVOZ",
  gb: "140GB",
  price: 144.99,
  features: ["Smartvoz 140GB", "Minutos: Ilimitados", "Chip eSIM ou Sim Card Fisico", "Escolha seu DDD", "Validade: 30 Dias"]
}];
interface PlansSectionProps {
  storeOwnerCustomId?: string;
  onSelectPlan?: (plan: any) => void;
}
export function PlansSection({
  storeOwnerCustomId,
  onSelectPlan
}: PlansSectionProps) {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"cards" | "orbital">("orbital");
  const handleSelectPlan = (plan: any) => {
    if (onSelectPlan) {
      // If onSelectPlan is provided, use it (for plan-selection page)
      onSelectPlan(plan);
    } else {
      // Default behavior for other pages
      if (storeOwnerCustomId) {
        navigate(`/client/products?sponsor=${storeOwnerCustomId}&plan=${plan.id}`);
      } else {
        navigate(`/client/products?plan=${plan.id}`);
      }
    }
  };
  return;
}