import { ClientSidebar } from "@/components/client/dashboard/ClientSidebar";
import { DashboardHeader } from "@/components/client/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Newspaper } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "Novo Curso Disponível",
    date: "2024-03-20",
    description: "Aprenda as últimas tendências em marketing digital com nosso novo curso.",
    category: "Cursos",
  },
  {
    id: 2,
    title: "Atualização da Plataforma",
    date: "2024-03-19",
    description: "Confira as novidades e melhorias implementadas em nossa última atualização.",
    category: "Plataforma",
  },
  {
    id: 3,
    title: "Evento Presencial",
    date: "2024-03-18",
    description: "Grande encontro de empreendedores acontecerá no próximo mês.",
    category: "Eventos",
  },
];

export default function NewsPage() {
  return (
    <div className="flex min-h-screen">
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
                <Card key={item.id} className="hover:bg-accent/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                      <span className="text-sm text-muted-foreground">
                        {new Date(item.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <CardDescription>
                      Categoria: {item.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </main>
    </div>
  );
}