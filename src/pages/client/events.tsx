import { ClientSidebar } from "@/components/client/dashboard/ClientSidebar";
import { DashboardHeader } from "@/components/client/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarCheck, CalendarPlus, Signal, Globe, Wifi } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";

const events = [
  {
    id: 1,
    title: "Workshop 5G para Empreendedores",
    date: "2024-04-15",
    time: "14:00",
    location: "Online",
    description: "Aprenda como a tecnologia 5G pode revolucionar seu negócio. Apresentação das últimas inovações e casos de sucesso.",
    category: "Workshop",
    status: "upcoming",
    icon: Signal,
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: 2,
    title: "Palestra: O Futuro da Conectividade",
    date: "2024-04-20",
    time: "19:00",
    location: "Centro de Convenções",
    description: "Especialistas discutem as tendências e o impacto da tecnologia 5G no futuro da internet móvel e IoT.",
    category: "Palestra",
    status: "upcoming",
    icon: Globe,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 3,
    title: "Encontro de Parceiros Y-TECH",
    date: "2024-05-10",
    time: "09:00",
    location: "Hotel Premium",
    description: "Evento exclusivo para parceiros com apresentação dos novos planos 5G e oportunidades de negócio.",
    category: "Networking",
    status: "upcoming",
    icon: Wifi,
    color: "bg-green-100 text-green-800",
  },
  {
    id: 4,
    title: "Tech Summit 2024",
    date: "2024-05-25",
    time: "10:00",
    location: "Centro de Eventos",
    description: "O maior evento de tecnologia do ano, com foco em 5G, IoT e transformação digital. Não perca!",
    category: "Conferência",
    status: "upcoming",
    icon: Signal,
    color: "bg-yellow-100 text-yellow-800",
  },
];

export default function EventsPage() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-gray-50">
        <ClientSidebar />
        <main className="flex-1">
          <DashboardHeader
            title="Eventos"
            subtitle="Participe dos nossos eventos e fique por dentro das novidades"
            icon={<Calendar className="h-6 w-6" />}
          />
          <div className="container mx-auto p-6">
            <div className="mb-6 flex justify-between items-center">
              <div className="space-x-2">
                <Badge variant="outline" className="bg-white">
                  <CalendarCheck className="mr-1 h-4 w-4" />
                  Próximos Eventos
                </Badge>
                <Badge variant="outline" className="bg-white">
                  <Signal className="mr-1 h-4 w-4" />
                  Tecnologia 5G
                </Badge>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <CalendarPlus className="mr-2 h-4 w-4" />
                Inscrever-se
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="grid gap-6">
                {events.map((event) => (
                  <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="p-6">
                      <CardHeader className="p-0 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" className={event.color}>
                            <event.icon className="mr-1 h-3 w-3" />
                            {event.category}
                          </Badge>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-muted-foreground">
                              {new Date(event.date).toLocaleDateString("pt-BR")} às {event.time}
                            </span>
                          </div>
                        </div>
                        <CardTitle className="text-xl md:text-2xl">{event.title}</CardTitle>
                        <div className="text-sm text-muted-foreground mt-1">
                          📍 {event.location}
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
                        <CardDescription className="text-base mb-4">
                          {event.description}
                        </CardDescription>
                        <div className="flex justify-between items-center">
                          <Button variant="outline">Mais informações</Button>
                          <Button>
                            Participar
                            <Signal className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}