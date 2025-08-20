
import { useState } from "react";

export interface BiometryFlowState {
  currentStep: 'instructions' | 'camera' | 'processing' | 'success' | 'error';
  isProcessing: boolean;
  error: string | null;
}

export const useBiometryFlow = () => {
  const [state, setState] = useState<BiometryFlowState>({
    currentStep: 'instructions',
    isProcessing: false,
    error: null
  });

  const nextStep = () => {
    switch (state.currentStep) {
      case 'instructions':
        setState(prev => ({ ...prev, currentStep: 'camera' }));
        break;
      case 'camera':
        setState(prev => ({ ...prev, currentStep: 'processing', isProcessing: true }));
        break;
      case 'processing':
        setState(prev => ({ ...prev, currentStep: 'success', isProcessing: false }));
        break;
      default:
        break;
    }
  };

  const setError = (error: string) => {
    setState(prev => ({ ...prev, currentStep: 'error', error, isProcessing: false }));
  };

  const reset = () => {
    setState({
      currentStep: 'instructions',
      isProcessing: false,
      error: null
    });
  };

  return {
    state,
    nextStep,
    setError,
    reset
  };
};
