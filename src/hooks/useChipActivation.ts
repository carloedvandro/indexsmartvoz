
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useChipActivation() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLines, setSelectedLines] = useState<Array<{
    number: string;
    barcode?: string;
  }>>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [scanningIndex, setScanningIndex] = useState<number | null>(null);
  const [protocol, setProtocol] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleContinue = () => {
    if (currentStep === 3) {
      // Generate a protocol number when moving to confirmation
      const protocolNumber = new Date().getTime().toString();
      setProtocol(protocolNumber);
      setShowConfirmation(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleAddLine = () => {
    if (phoneNumber && selectedLines.length < 10) {
      setSelectedLines([...selectedLines, { number: phoneNumber }]);
      setPhoneNumber("");
    }
  };

  const handleUpdateBarcode = (index: number, barcode: string) => {
    const updatedLines = [...selectedLines];
    updatedLines[index] = { ...updatedLines[index], barcode };
    setSelectedLines(updatedLines);
  };

  const handleRemoveLine = (index: number) => {
    const updatedLines = selectedLines.filter((_, i) => i !== index);
    setSelectedLines(updatedLines);
  };

  const startScanning = (index: number) => {
    setScanningIndex(index);
  };

  const handleScanningClose = () => {
    setScanningIndex(null);
  };

  const handleUnderstand = () => {
    navigate("/client/dashboard");
  };

  return {
    currentStep,
    selectedLines,
    phoneNumber,
    scanningIndex,
    protocol,
    showConfirmation,
    handleContinue,
    handleBack,
    handleAddLine,
    handleUpdateBarcode,
    handleRemoveLine,
    startScanning,
    handleScanningClose,
    handleUnderstand,
    setPhoneNumber
  };
}
