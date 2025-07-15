import jsPDF from 'jspdf';

export interface PaymentReceiptData {
  transactionId: string;
  amount: string;
  date: string;
  protocol: string;
  recipientName: string;
  recipientDoc: string;
  recipientBank: string;
  payerDoc: string;
  payerBank: string;
  asaasPaymentId?: string;
}

export class ReceiptGenerator {
  static generatePaymentReceipt(data: PaymentReceiptData): void {
    const pdf = new jsPDF();
    
    // Configurar fonte padrão
    pdf.setFont('helvetica');
    
    // Título principal
    pdf.setFontSize(16);
    pdf.text('Comprovante de Pagamento via Pix', 105, 20, { align: 'center' });
    
    // Data de geração
    pdf.setFontSize(12);
    pdf.text(`Gerado em ${data.date}`, 20, 35);
    
    // Dados da Transação
    let yPosition = 55;
    pdf.setFontSize(13);
    pdf.text('Dados da Transação', 20, yPosition);
    
    pdf.setFontSize(12);
    yPosition += 10;
    pdf.text(`Protocolo: ${data.protocol}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`ID/Transação: ${data.transactionId}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`Valor: ${data.amount}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`Data/Hora: ${data.date}`, 20, yPosition);
    
    if (data.asaasPaymentId) {
      yPosition += 8;
      pdf.text(`ID Asaas: ${data.asaasPaymentId}`, 20, yPosition);
    }
    
    // Dados do Destinatário
    yPosition += 20;
    pdf.setFontSize(13);
    pdf.text('Dados do Destinatário', 20, yPosition);
    
    pdf.setFontSize(12);
    yPosition += 10;
    pdf.text(`Nome: ${data.recipientName}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`CPF/CNPJ: ${data.recipientDoc}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`Instituição: ${data.recipientBank}`, 20, yPosition);
    
    // Dados do Pagador
    yPosition += 20;
    pdf.setFontSize(13);
    pdf.text('Dados do Pagador', 20, yPosition);
    
    pdf.setFontSize(12);
    yPosition += 10;
    pdf.text(`CPF/CNPJ: ${data.payerDoc}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`Instituição: ${data.payerBank}`, 20, yPosition);
    
    // Rodapé
    yPosition += 25;
    pdf.setFontSize(10);
    const disclaimerText = [
      'Este documento e cobrança não possuem valor fiscal e são de responsabilidade',
      'única e exclusiva de SmartVoz Telecom.',
      '',
      'Cobrança intermediada por asaas.com - gerar boletos nunca foi tão fácil.'
    ];
    
    disclaimerText.forEach(line => {
      pdf.text(line, 20, yPosition);
      yPosition += 6;
    });
    
    // Salvar o PDF
    const fileName = `Comprovante_PIX_SmartVoz_${data.protocol.replace('#', '')}.pdf`;
    pdf.save(fileName);
  }
}