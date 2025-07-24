import { BookTestimonial } from "./3d-book-testimonial";

const testimonials = [
  {
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'Esta plataforma revolucionou completamente nossos resultados de vendas. Recomendo para todos os afiliados.',
    name: 'Ana Silva',
    jobtitle: 'Afiliada Premium',
    rating: 5,
  },
  {
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'O sistema de comissões é muito transparente e os pagamentos sempre chegam em dia. Excelente!',
    name: 'Carlos Santos',
    jobtitle: 'Gerente de Vendas',
    rating: 4,
  },
  {
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'Interface intuitiva e dashboard completo. Consegui escalar minha rede rapidamente.',
    name: 'Pedro Oliveira',
    jobtitle: 'Empresário Digital',
    rating: 5,
  },
  {
    image: 'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'A melhor plataforma de afiliados que já usei. Suporte excepcional e ferramentas profissionais.',
    name: 'Maria Costa',
    jobtitle: 'Consultora de Marketing',
    rating: 5,
  },
  {
    image: 'https://images.unsplash.com/photo-1507003211169-0a6dd7228f2d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8fHx8fA%3D%3D',
    text: 'Consegui alcançar todos os níveis de comissão em poucos meses. Sistema muito bem estruturado.',
    name: 'João Ferreira',
    jobtitle: 'Afiliado Sênior',
    rating: 4,
  },
  {
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'Plataforma completa com todas as ferramentas necessárias para ter sucesso no marketing de afiliados.',
    name: 'Lucia Martinez',
    jobtitle: 'Influenciadora Digital',
    rating: 5,
  },
];

export const BookTestimonialDemo = () => {
  return (
    <div className="flex w-full min-h-screen justify-center items-center bg-gradient-to-br from-background to-muted/20 p-8">
      <BookTestimonial testimonials={testimonials} />
    </div>
  );
};