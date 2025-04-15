
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, Link as LinkIcon, ChevronRight, ChevronDown, ThumbsUp, ThumbsDown, HelpCircle } from 'lucide-react';
import ParticlesBackground from '@/components/client/products/ParticlesBackground';
import { useNavigate } from 'react-router-dom';

export default function DeepResearchGuide() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  const navigate = useNavigate();

  const toggleFaq = (index: number) => {
    if (expandedFaqs.includes(index)) {
      setExpandedFaqs(expandedFaqs.filter(i => i !== index));
    } else {
      setExpandedFaqs([...expandedFaqs, index]);
    }
  };

  const steps = [
    {
      title: "O que é o Deep Research",
      content: "O Deep Research é um modo avançado de pesquisa, inicialmente introduzido pelo Gemini (Google) e inspirou funcionalidades similares no ChatGPT. Este modo permite criar um plano de pesquisa detalhado a partir do seu prompt, coletar informações de múltiplas fontes e gerar respostas mais abrangentes.",
      image: "/lovable-uploads/f022b81e-7533-4e36-ae24-0a886fa5c775.png"
    },
    {
      title: "Como Acessar",
      content: "No Gemini, o precursor desta funcionalidade está disponível nas contas pagas. Para ativar, selecione 'Deep Research' no canto superior esquerdo ao escolher o modelo. No ChatGPT, recursos similares estão sendo implementados nas versões mais recentes.",
      image: "/lovable-uploads/4466d3c0-c9b2-44c7-9f5a-3797eb461412.png"
    },
    {
      title: "Como Utilizar",
      content: "Após ativar o Deep Research, insira sua pergunta ou tópico de pesquisa. O sistema irá preparar um plano de pesquisa baseado no seu prompt e você poderá fazer ajustes antes da execução. Este modo é especialmente útil para coletar informações de múltiplas fontes.",
      image: "/lovable-uploads/d98d0068-66cc-43a4-b5a6-a19db8743dbc.png"
    },
    {
      title: "Pontos Fortes e Limitações",
      content: "O Deep Research se destaca pela capacidade de coletar links de diversas fontes, oferecendo maior abrangência. No entanto, a qualidade dos resumos pode variar, principalmente porque nem sempre são selecionadas fontes de alta qualidade. É recomendado revisar criticamente as fontes e informações apresentadas.",
      image: "/lovable-uploads/f022b81e-7533-4e36-ae24-0a886fa5c775.png"
    }
  ];

  const faqs = [
    {
      question: "O Deep Research está disponível em todas as versões do ChatGPT?",
      answer: "Não, assim como no Gemini, recursos de pesquisa avançada como o Deep Research geralmente estão disponíveis apenas em versões pagas ou premium dos assistentes de IA."
    },
    {
      question: "Como posso melhorar a qualidade dos resultados no Deep Research?",
      answer: "Para obter melhores resultados, seja específico em seu prompt inicial, ajuste o plano de pesquisa sugerido antes da execução e revise criticamente as fontes apresentadas nos resultados."
    },
    {
      question: "O Deep Research pode substituir uma pesquisa acadêmica tradicional?",
      answer: "Embora seja uma ferramenta poderosa para coleta inicial de informações, o Deep Research não substitui completamente a pesquisa acadêmica tradicional. É recomendado usar como ponto de partida e complementar com métodos de pesquisa mais rigoros."
    },
    {
      question: "Quais são as limitações do Deep Research?",
      answer: "As principais limitações incluem variação na qualidade dos resumos gerados, possível inclusão de fontes não confiáveis, e limitações no acesso a conteúdo restrito ou muito recente que ainda não foi indexado."
    }
  ];

  return (
    <div className="min-h-screen bg-[#020017] text-white font-sans relative">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <ParticlesBackground style="matrix" />
      </div>

      {/* Header */}
      <header className="relative z-10 py-6 border-b border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-[#ff1d8e]" />
            <h1 className="text-2xl font-bold">Guia do Deep Research</h1>
          </div>
          <Button 
            variant="ghost" 
            className="text-white hover:text-[#ff1d8e]"
            onClick={() => navigate('/')}
          >
            Voltar
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">Dominando o <span className="text-[#ff1d8e]">Deep Research</span></h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Aprenda a utilizar o poderoso modo Deep Research para realizar pesquisas mais profundas e abrangentes com assistentes de IA.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-4 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-gray-900 bg-opacity-70 rounded-lg p-6 cursor-pointer border-2 transition-all duration-300 ${
                activeStep === index ? 'border-[#ff1d8e]' : 'border-transparent hover:border-gray-700'
              }`}
              onClick={() => setActiveStep(index)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#ff1d8e] w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <h3 className="font-bold text-lg">{step.title}</h3>
              </div>
              {activeStep === index && (
                <p className="text-gray-300 text-sm mb-4">{step.content}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Active Step Detail */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900 bg-opacity-70 rounded-lg p-8 mb-16"
        >
          <h3 className="text-2xl font-bold mb-6">{steps[activeStep].title}</h3>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <p className="text-gray-300 text-lg leading-relaxed">
                {steps[activeStep].content}
              </p>
              {activeStep === 2 && (
                <div className="mt-6 p-4 border border-[#ff1d8e] rounded-lg bg-[#ff1d8e20]">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <HelpCircle size={18} />
                    Dica Pro
                  </h4>
                  <p className="text-sm">
                    Para resultados melhores, inclua no seu prompt inicial exatamente o que você deseja descobrir e quais tipos de fontes você prefere. Por exemplo: "Pesquise sobre técnicas modernas de hidroponia utilizando fontes acadêmicas e sites especializados em agricultura."
                  </p>
                </div>
              )}
              <div className="mt-8 flex gap-4">
                <Button 
                  disabled={activeStep === 0} 
                  onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                  className="bg-gray-800 text-white hover:bg-gray-700"
                >
                  Anterior
                </Button>
                <Button 
                  disabled={activeStep === steps.length - 1} 
                  onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                  className="bg-[#ff1d8e] text-white hover:bg-[#ff1d8e]/80"
                >
                  Próximo
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src={steps[activeStep].image} 
                alt={`Ilustração de ${steps[activeStep].title}`} 
                className="max-w-full rounded-lg shadow-lg border border-gray-700" 
              />
            </div>
          </div>
        </motion.div>

        {/* Demo Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Search className="text-[#ff1d8e]" />
            Exemplo Interativo
          </h3>
          <div className="bg-gray-900 bg-opacity-70 rounded-lg p-6 border border-gray-800">
            <div className="border border-gray-800 rounded-lg overflow-hidden mb-6">
              <div className="bg-gray-800 p-3 flex items-center gap-2">
                <Search size={16} />
                <p className="text-sm font-medium">Prompt de exemplo</p>
              </div>
              <div className="p-4">
                <p className="text-gray-300 italic">
                  "Realize uma pesquisa detalhada sobre técnicas avançadas de cultivo hidropônico para pequenos espaços urbanos. Inclua informações sobre custo-benefício, dificuldade de implementação e rendimento esperado."
                </p>
              </div>
            </div>
            
            <div className="border border-gray-800 rounded-lg overflow-hidden">
              <div className="bg-gray-800 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} />
                  <p className="text-sm font-medium">Plano de Pesquisa Gerado</p>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                  Editar Plano
                </Button>
              </div>
              <div className="p-4">
                <ol className="list-decimal list-inside space-y-3 text-sm text-gray-300">
                  <li>Pesquisar definições e princípios básicos de hidroponia para pequenos espaços urbanos</li>
                  <li>Identificar as técnicas mais avançadas e inovadoras para hidroponia urbana</li>
                  <li>Analisar custos de implementação e manutenção das diferentes técnicas</li>
                  <li>Comparar níveis de dificuldade de implementação entre as técnicas</li>
                  <li>Pesquisar dados sobre rendimento esperado de diferentes culturas hidropônicas</li>
                  <li>Buscar casos de sucesso e estudos práticos de hidroponia urbana</li>
                </ol>
              </div>
            </div>
            
            <div className="mt-6 p-4 border border-gray-800 rounded-lg bg-gray-900">
              <h4 className="text-lg font-bold mb-4">Fontes Encontradas</h4>
              <div className="space-y-3">
                {[
                  {title: "Hidroponia urbana: Um guia completo - UrbanFarmTech", url: "https://urbanfarmtech.com/guia-hidroponia"},
                  {title: "Técnicas avançadas de cultivo hidropônico para apartamentos - AgroSmart", url: "https://agrosmart.edu/hidroponia-apartamentos"},
                  {title: "Estudo comparativo de técnicas hidropônicas para espaços reduzidos - Journal of Urban Agriculture", url: "https://urbanag.org/studies/hydroponic-comparison"},
                  {title: "Análise de custo-benefício: Hidroponia vs. Cultivo tradicional - EcoAgriculture", url: "https://ecoagriculture.net/cost-analysis"},
                  {title: "Guia passo a passo para montar seu sistema hidropônico caseiro - YouTube", url: "https://youtube.com/hydroponic-tutorial"}
                ].map((source, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2 hover:bg-gray-800 rounded transition-colors">
                    <LinkIcon size={16} className="text-[#ff1d8e] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">{source.title}</p>
                      <a href={source.url} className="text-xs text-[#ff1d8e] hover:underline">{source.url}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6">Perguntas Frequentes</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border border-gray-800 rounded-lg overflow-hidden"
              >
                <button 
                  className="w-full p-4 flex justify-between items-center bg-gray-900 hover:bg-gray-800 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium text-left">{faq.question}</span>
                  {expandedFaqs.includes(index) ? (
                    <ChevronDown size={20} />
                  ) : (
                    <ChevronRight size={20} />
                  )}
                </button>
                {expandedFaqs.includes(index) && (
                  <div className="p-4 bg-gray-900 bg-opacity-50">
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Feedback Section */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Este guia foi útil?</h3>
          <div className="flex justify-center gap-4">
            <Button variant="outline" className="flex gap-2 items-center">
              <ThumbsUp size={18} />
              Sim, foi útil
            </Button>
            <Button variant="outline" className="flex gap-2 items-center">
              <ThumbsDown size={18} />
              Precisa melhorar
            </Button>
          </div>
        </div>

        {/* Resources */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Para mais informações, visite{" "}
            <a href="https://playtec.net" className="text-[#ff1d8e] hover:underline">
              https://playtec.net
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
