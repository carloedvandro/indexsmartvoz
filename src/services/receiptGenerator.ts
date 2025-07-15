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
    let yPosition = 20;
    
    // Título principal
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.text('Comprovante de Pagamento via Pix', 105, yPosition, { align: 'center' });
    
    // Espaçamento
    yPosition += 15;
    
    // Data de geração
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    pdf.text(`Gerado em ${data.date}`, 20, yPosition);
    
    // Espaçamento
    yPosition += 20;
    
    // Dados da Transação (seção)
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(13);
    pdf.text('Dados da Transacao', 20, yPosition);
    
    yPosition += 10;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    pdf.text(`Protocolo: ${data.protocol}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`ID/Transacao: ${data.transactionId}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`Valor: ${data.amount}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`Data/Hora: ${data.date}`, 20, yPosition);
    
    if (data.asaasPaymentId) {
      yPosition += 8;
      pdf.text(`ID Asaas: ${data.asaasPaymentId}`, 20, yPosition);
    }
    
    // Espaçamento
    yPosition += 20;
    
    // Dados do Destinatário (seção)
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(13);
    pdf.text('Dados do Destinatario', 20, yPosition);
    
    yPosition += 10;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    pdf.text(`Nome: ${data.recipientName}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`CPF/CNPJ: ${data.recipientDoc}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`Instituicao: ${data.recipientBank}`, 20, yPosition);
    
    // Espaçamento
    yPosition += 20;
    
    // Dados do Pagador (seção)
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(13);
    pdf.text('Dados do Pagador', 20, yPosition);
    
    yPosition += 10;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    pdf.text(`CPF/CNPJ: ${data.payerDoc}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`Instituicao: ${data.payerBank}`, 20, yPosition);
    
    // Espaçamento
    yPosition += 25;
    
    // Rodapé com disclaimer
    pdf.setFontSize(10);
    const disclaimerText = "Este documento e cobranca nao possuem valor fiscal e sao de responsabilidade unica e exclusiva de SmartVoz Telecom.\n\nCobranca intermediada por asaas.com - gerar boletos nunca foi tao facil.";
    
    // Usar splitTextToSize para quebrar o texto automaticamente
    const splitText = pdf.splitTextToSize(disclaimerText, 170);
    splitText.forEach((line: string, index: number) => {
      pdf.text(line, 20, yPosition + (index * 6));
    });
    
    // Salvar o PDF (equivalente ao Output('D') do PHP)
    const fileName = `Comprovante_PIX_SmartVoz_${data.protocol.replace('#', '')}.pdf`;
    pdf.save(fileName);
  }
}