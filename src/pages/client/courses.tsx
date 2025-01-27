import { Book, PlayCircle, Clock, Trophy } from "lucide-react";
import { ClientSidebar } from "@/components/client/dashboard/ClientSidebar";
import { DashboardHeader } from "@/components/client/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider } from "@/components/ui/sidebar";

const courses = [
  {
    id: 1,
    title: "Marketing Digital Avançado",
    description: "Aprenda estratégias avançadas de marketing digital",
    progress: 75,
    duration: "12 horas",
    lessons: 24,
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
  {
    id: 2,
    title: "Liderança e Gestão de Equipes",
    description: "Desenvolva habilidades essenciais de liderança",
    progress: 45,
    duration: "8 horas",
    lessons: 16,
    category: "Liderança",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  },
  {
    id: 3,
    title: "Vendas Consultivas",
    description: "Técnicas modernas de vendas consultivas",
    progress: 30,
    duration: "10 horas",
    lessons: 20,
    category: "Vendas",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  },
  {
    id: 4,
    title: "Gestão Financeira para Empreendedores",
    description: "Fundamentos de gestão financeira para seu negócio",
    progress: 0,
    duration: "15 horas",
    lessons: 30,
    category: "Finanças",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
  },
];

const CourseCard = ({ course }) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
    <div className="relative h-48 overflow-hidden">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-4 right-4">
        <Badge variant="secondary" className="bg-white/90">
          {course.category}
        </Badge>
      </div>
    </div>
    <CardHeader>
      <CardTitle className="text-xl">{course.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground mb-4">{course.description}</p>
      <div className="space-y-4">
        <div className="bg-gray-100 rounded-full h-2">
          <div
            className="bg-primary rounded-full h-2 transition-all"
            style={{ width: `${course.progress}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Book className="w-4 h-4" />
            <span>{course.lessons} aulas</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            <span>{course.progress}% concluído</span>
          </div>
        </div>
        <Button className="w-full">
          <PlayCircle className="mr-2 h-4 w-4" />
          {course.progress === 0 ? "Começar Curso" : "Continuar Curso"}
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default function ClientCourses() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full bg-[#F8F9FE] overflow-hidden">
        <ClientSidebar />
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <DashboardHeader
            title="Meus Cursos"
            subtitle="Gerencie seus cursos e continue seus estudos"
            icon={<Book className="w-6 h-6" />}
          />
          <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}