/**
 * Purpose: Gerador de protocolos sequenciais
 * Simula o comportamento do código PHP para gerar números de protocolo únicos
 */

export class ProtocolGenerator {
  private static readonly PROTOCOL_KEY = 'smartvoz_last_protocol';
  private static readonly INITIAL_NUMBER = 123890;

  /**
   * Gera um novo número de protocolo sequencial
   * Usa localStorage para persistir o último número gerado
   * @returns string - Protocolo formatado (ex: #00123891)
   */
  static generateProtocol(): string {
    try {
      // Buscar o último número do localStorage
      const lastNumberStr = localStorage.getItem(this.PROTOCOL_KEY);
      let lastNumber = this.INITIAL_NUMBER;

      if (lastNumberStr) {
        lastNumber = parseInt(lastNumberStr, 10);
        if (isNaN(lastNumber)) {
          lastNumber = this.INITIAL_NUMBER;
        }
      }

      // Incrementar o número
      const newNumber = lastNumber + 1;

      // Salvar o novo número no localStorage
      localStorage.setItem(this.PROTOCOL_KEY, newNumber.toString());

      // Formatar com zeros à esquerda (ex: #00123891)
      const protocoloFormatado = '#' + newNumber.toString().padStart(8, '0');
      
      console.log('✅ Protocolo gerado:', protocoloFormatado);
      return protocoloFormatado;

    } catch (error) {
      console.error('💥 Erro ao gerar protocolo:', error);
      
      // Fallback: usar timestamp como protocolo
      const fallbackProtocol = '#' + Date.now().toString().slice(-8);
      console.warn('⚠️ Usando protocolo fallback:', fallbackProtocol);
      return fallbackProtocol;
    }
  }

  /**
   * Versão baseada em timestamp + base number
   * Para casos onde queremos protocolos únicos sem localStorage
   */
  static generateTimestampProtocol(): string {
    const timestamp = Date.now();
    const baseNumber = this.INITIAL_NUMBER + (timestamp % 100000);
    return '#' + baseNumber.toString().padStart(8, '0');
  }

  /**
   * Reset do contador (para testes ou manutenção)
   */
  static resetCounter(): void {
    localStorage.removeItem(this.PROTOCOL_KEY);
    console.log('🔄 Contador de protocolos resetado');
  }

  /**
   * Obter o próximo número sem gerar o protocolo
   */
  static getNextNumber(): number {
    const lastNumberStr = localStorage.getItem(this.PROTOCOL_KEY);
    let lastNumber = this.INITIAL_NUMBER;

    if (lastNumberStr) {
      lastNumber = parseInt(lastNumberStr, 10);
      if (isNaN(lastNumber)) {
        lastNumber = this.INITIAL_NUMBER;
      }
    }

    return lastNumber + 1;
  }
}