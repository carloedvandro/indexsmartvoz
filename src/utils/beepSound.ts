const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

// Criar um beep mais alto e claro
const createBeep = () => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(1000, audioContext.currentTime); // Frequência mais alta
  gainNode.gain.setValueAtTime(1, audioContext.currentTime); // Volume máximo
  
  return {
    play: () => {
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1); // Duração do beep
    }
  };
};

export const beepSound = createBeep();