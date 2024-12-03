import { ClientSidebar } from "@/components/client/dashboard/ClientSidebar";
import { DashboardHeader } from "@/components/client/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper, ArrowRight, Calendar, Book, Trophy, Users } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "Novo Curso de Marketing Digital",
    date: "2024-03-20",
    description: "Estamos lançando nosso novo curso completo de Marketing Digital! Aprenda as últimas tendências e estratégias para alavancar seus resultados online.",
    category: "Cursos",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    icon: Book,
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: 2,
    title: "Grande Evento de Empreendedorismo",
    date: "2024-03-25",
    description: "Prepare-se para o maior evento de empreendedorismo do ano! Palestrantes renomados, networking e muito conhecimento te esperam.",
    category: "Eventos",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    icon: Calendar,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 3,
    title: "Nova Atualização da Plataforma",
    date: "2024-03-18",
    description: "Implementamos novas funcionalidades e melhorias em nossa plataforma para tornar sua experiência ainda melhor! Confira todas as novidades.",
    category: "Plataforma",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    icon: Trophy,
    color: "bg-green-100 text-green-800",
  },
  {
    id: 4,
    title: "Reconhecimento de Líderes",
    date: "2024-03-15",
    description: "Parabéns aos nossos líderes que alcançaram resultados extraordinários este mês! Conheça suas histórias e estratégias de sucesso.",
    category: "Reconhecimento",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    icon: Users,
    color: "bg-yellow-100 text-yellow-800",
  },
];

export default function NewsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ClientSidebar />
      <main className="flex-1">
        <DashboardHeader
          title="Informativos"
          subtitle="Fique por dentro das últimas novidades"
          icon={<Newspaper className="h-6 w-6" />}
        />
        <div className="container mx-auto p-6">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="grid gap-6">
              {newsItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-48 w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <CardHeader className="p-0 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" className={item.color}>
                            <item.icon className="mr-1 h-3 w-3" />
                            {item.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(item.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <CardTitle className="text-xl md:text-2xl">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <CardDescription className="text-base">
                          {item.description}
                        </CardDescription>
                        <Button variant="link" className="mt-4 p-0">
                          Ler mais <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </main>
    </div>
  );
}