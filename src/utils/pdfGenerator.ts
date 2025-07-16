import jsPDF from 'jspdf';

export type Line = {
  id: number;
  internet: string;
  type: string;
  ddd: string;
  price: number;
  barcode?: string;
  planId?: string;
  planName?: string;
  phoneNumber?: string;
};

interface GenerateReceiptParams {
  selectedLines: Line[];
  protocol: string;
}

export function generateActivationReceipt({ selectedLines, protocol }: GenerateReceiptParams) {
  const pdf = new jsPDF();
  
  // Configurar fundo roxo
  pdf.setFillColor(107, 28, 156);
  pdf.rect(0, 0, 210, 297, 'F');
  
  // Título principal
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Resumo da Ativação do SIM card', 105, 30, { align: 'center' });
  
  // Cabeçalho da tabela
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  
  // Desenhar cabeçalho da tabela
  pdf.setDrawColor(255, 255, 255);
  pdf.setLineWidth(0.5);
  
  // Cabeçalho DDD
  pdf.rect(20, 60, 40, 10);
  pdf.text('DDD', 40, 67, { align: 'center' });
  
  // Cabeçalho Código de barras
  pdf.rect(60, 60, 130, 10);
  pdf.text('Código de barras do SIM card', 125, 67, { align: 'center' });
  
  // Dados da linha
  pdf.setFont('helvetica', 'normal');
  let yPosition = 70;
  
  selectedLines.forEach((line, index) => {
    // Célula DDD
    pdf.rect(20, yPosition, 40, 10);
    pdf.text(line.ddd, 40, yPosition + 7, { align: 'center' });
    
    // Célula ICCID
    pdf.rect(60, yPosition, 130, 10);
    const iccid = line.barcode || '89551095171020027968';
    // Formatar ICCID com espaços para melhor legibilidade
    const formattedIccid = iccid.replace(/(.{4})/g, '$1 ').trim();
    pdf.text(formattedIccid, 125, yPosition + 7, { align: 'center' });
    
    yPosition += 10;
  });
  
  // Protocolo
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Protocolo ${protocol}`, 105, yPosition + 20, { align: 'center' });
  
  // Botão "Entendi"
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setDrawColor(255, 255, 255);
  pdf.setLineWidth(1);
  pdf.rect(75, yPosition + 40, 60, 12);
  pdf.text('Entendi', 105, yPosition + 48, { align: 'center' });
  
  // Data de geração
  const dataAtual = new Date().toLocaleDateString('pt-BR');
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Gerado em: ${dataAtual}`, 105, yPosition + 70, { align: 'center' });
  
  // Salvar o PDF
  const nomeArquivo = `Comprovante_Ativacao_SIMCard_${protocol}.pdf`;
  pdf.save(nomeArquivo);
}

export function generateProtocol(): string {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  const sequencial = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `${ano}${mes}${dia}${sequencial}`;
}