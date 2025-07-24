import React, { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { useMediaQuery } from '@react-hook/media-query';
import Image from './image';

interface Testimonial {
  image?: string;
  text: string;
  name: string;
  jobtitle: string;
  rating: number;
}

interface BookTestimonialProps {
  testimonials: Testimonial[];
}

export const BookTestimonial = ({ testimonials }: BookTestimonialProps) => {
  const book = useRef<typeof HTMLFlipBook>(null);
  const isSmallScreen = useMediaQuery('(min-width: 640px)');
  const smallerDevice = isSmallScreen ? false : true;

  const handleFlip = (pageNum: number) => {
    (book.current as any)?.pageFlip()?.flip(pageNum);
    (book.current as any)?.pageFlip()?.flipNext(false);
  }

  // Placeholder logo
  const serenityLogo = 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop&crop=center';

  return (
    <div className="w-full h-[500px] flex justify-center items-center py-10">
      <HTMLFlipBook
        ref={book}
        width={300}
        height={450}
        showCover={true}
        usePortrait={smallerDevice}
        onFlip={(e) => console.log(e.data)}
        onChangeState={(e) => console.log(e.data)}
        className={''}
        style={{}}
        startPage={0}
        size={'fixed'}
        minWidth={0}
        maxWidth={0}
        minHeight={0}
        maxHeight={0}
        drawShadow={true}
        flippingTime={1000}
        startZIndex={0}
        autoSize={false}
        maxShadowOpacity={0}
        mobileScrollSupport={true}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={0}
        showPageCorners={true}
        disableFlipByClick={false}
      >
        {/* Cover Page */}
        <div className="relative bg-gradient-to-br from-primary to-primary/80 border rounded-lg p-8 text-white flex flex-col items-center justify-center shadow-lg cursor-grab">
          <div className="flex justify-center items-center">
            <Image src={serenityLogo} alt="Logo" width={100} height={100} className="rounded-full" />
          </div>
          <h1 className="text-4xl mb-36 text-center relative z-10 font-bold">Depoimentos</h1>
          <div className="w-full h-1 bg-white mb-6 relative z-10"></div>
          <div className='text-center'>
            <span className="text-lg text-white text-center hover:text-gray-300 transition-colors duration-300 relative z-10">
              Veja o que nossos clientes estão dizendo
            </span>
          </div>
        </div>

        {/* Index Page */}
        <div className="w-full h-full flex justify-center items-center bg-gray-50 border border-gray-300 box-border">
          <div className="page-front text-start text-white p-3 bg-primary/80">Índice</div>
          <div className="flex flex-col justify-start items-start p-8 space-y-3">
            <div>
              <ol className="grid grid-cols-2 gap-2">
                {testimonials.map((testimonial, index) => (
                  <React.Fragment key={index}>
                    <li onClick={() => handleFlip(index + 2)} className="flex justify-start items-center text-xs cursor-pointer hover:text-primary transition-colors">
                      <Image 
                        src={testimonial.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=20&h=20&fit=crop&crop=face'} 
                        alt='avatar' 
                        width={20} 
                        height={20} 
                        className='rounded-full mr-2' 
                      />
                      {testimonial.name}
                    </li>
                    <li className="flex justify-end text-xs items-center text-muted-foreground">{index + 2}</li>
                  </React.Fragment>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Testimonial Pages */}
        {testimonials.map((testimonial, index) => (
          <div key={index} className="w-full h-full flex flex-col justify-start items-center bg-white border border-gray-300 box-border cursor-grab p-6">
            <div className="page-front text-end text-white p-3 bg-primary/80 self-end mb-4">{index + 2}</div>
            
            <div className='flex justify-center items-center mt-4'>
              <Image 
                src={testimonial.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'} 
                alt='avatar' 
                width={100} 
                height={100} 
                className='rounded-full border-4 border-primary/20' 
              />
            </div>
            
            <div className='flex flex-col justify-center items-center mt-4'>
              <span className="font-semibold text-lg text-foreground">{testimonial.name}</span>
              <span className='text-muted-foreground text-sm'>{testimonial.jobtitle}</span>
            </div>
            
            <div className='p-5 font-serif text-center mt-4 flex-1 flex items-center'>
              <p className="text-foreground/80 italic">"{testimonial.text}"</p>
            </div>
            
            <div className='flex justify-center items-center mt-4'>
              {[...Array(testimonial.rating)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-400">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
              ))}
              {[...Array(5 - testimonial.rating)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-muted">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
              ))}
            </div>
          </div>
        ))}

        {/* Thank You Page */}
        <div className="bg-gradient-to-br from-primary to-primary/80 border p-8 text-white flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4 text-center font-serif">Obrigado!</h1>
          <p className="text-lg text-center">Agradecemos seu feedback</p>
        </div>
      </HTMLFlipBook>
    </div>
  );
};