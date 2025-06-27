
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Line = {
  id: number;
  internet: string;
  type: string;
  ddd: string;
  price: number;
  barcode?: string;
  planId?: string;
  planName?: string;
};

export function useProductsState() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLines, setSelectedLines] = useState<Line[]>([]);
  const [selectedDueDate, setSelectedDueDate] = useState<number | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [protocol, setProtocol] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [scanningIndex, setScanningIndex] = useState<number | null>(null);
  const [showChipActivation, setShowChipActivation] = useState(false);
  const [isAsaasProcessing, setIsAsaasProcessing] = useState(false);

  return {
    currentStep,
    setCurrentStep,
    selectedLines,
    setSelectedLines,
    selectedDueDate,
    setSelectedDueDate,
    acceptedTerms,
    setAcceptedTerms,
    protocol,
    setProtocol,
    showConfirmation,
    setShowConfirmation,
    scanningIndex,
    setScanningIndex,
    showChipActivation,
    setShowChipActivation,
    isAsaasProcessing,
    setIsAsaasProcessing
  };
}
