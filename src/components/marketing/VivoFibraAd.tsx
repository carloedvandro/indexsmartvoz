import { Button } from "@/components/ui/button";
import { MessageCircle, Globe } from "lucide-react";

export function VivoFibraAd() {
  return (
    <div className="relative w-full max-w-2xl mx-auto bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white rounded-3xl overflow-hidden shadow-2xl">
      {/* Header with logo */}
      <div className="p-6 pb-0">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-purple-800 text-lg">✦</span>
          </div>
          <span>Fibra</span>
        </div>
      </div>

      {/* Main content with image */}
      <div className="relative px-6 py-4">
        {/* People image placeholder - using the uploaded image */}
        <div className="relative h-48 mb-6 rounded-2xl overflow-hidden">
          <img 
            src="/lovable-uploads/f5e9e526-48d7-4a90-88d1-41d0acc4a122.png" 
            alt="Pessoas felizes assistindo" 
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-800/60 to-transparent"></div>
        </div>

        {/* Curved accent line */}
        <div className="absolute top-32 right-0 w-full h-20">
          <svg 
            viewBox="0 0 400 100" 
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path 
              d="M0,50 Q200,0 400,30 L400,100 L0,100 Z" 
              fill="url(#purpleGradient)"
              opacity="0.3"
            />
            <defs>
              <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Main text */}
        <div className="relative z-10 text-center mb-8">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mb-6">
            Se o jogo vem com Vivo Fibra, vem com<br />
            <span className="text-pink-300">a melhor internet para torcer do seu jeito.</span>
          </h1>
        </div>

        {/* Price highlight box */}
        <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold">
                300<span className="text-2xl md:text-3xl font-medium text-purple-300">MEGA</span>
              </div>
            </div>
            <div className="h-16 w-px bg-white/30"></div>
            <div className="text-center">
              <div className="text-sm text-purple-300 mb-1">Por</div>
              <div className="text-4xl md:text-5xl font-bold">
                R$ 120<span className="text-lg text-purple-300">/mês</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="text-center mb-6">
          <div className="text-lg font-medium mb-4">Assine pelo:</div>
          <div className="flex items-center justify-center gap-4">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full flex items-center gap-2">
              <MessageCircle size={20} />
              WhatsApp
            </Button>
            <div className="text-white/60">|</div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full flex items-center gap-2">
              <Globe size={20} />
              Site
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-purple-300 mb-4">
          Fonte: Melhores Serviços 2023. Consulte condições no site.
        </div>

        {/* Bottom logo */}
        <div className="text-left">
          <div className="text-lg font-bold">Vivo Fibra</div>
        </div>
      </div>
    </div>
  );
}