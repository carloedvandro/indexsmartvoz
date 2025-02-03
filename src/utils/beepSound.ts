// Criar o AudioContext apenas quando necessário para evitar problemas com o contexto
let audioContext: AudioContext | null = null;

const createBeep = () => {
  const getAudioContext = () => {
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContext;
  };

  const play = () => {
    const context = getAudioContext();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(1000, context.currentTime);
    gainNode.gain.setValueAtTime(0.1, context.currentTime);
    
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.1);
  };

  return { play };
};

export const beepSound = createBeep();