import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  animationDuration: number;
  animationDelay: number;
}

export function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLElement[] = [];
    const particleCount = 50;

    function createParticle(): HTMLElement {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 3 + 1;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const opacity = Math.random() * 0.5 + 0.3;
      const color = Math.random() > 0.5 ? '37, 99, 235' : '124, 58, 237';
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.background = `rgba(${color}, ${opacity})`;
      particle.style.animationDuration = `${Math.random() * 4 + 4}s`;
      particle.style.animationDelay = `${Math.random() * 2}s`;
      
      return particle;
    }

    function initParticles() {
      if (!container) return;
      for (let i = 0; i < particleCount; i++) {
        const particle = createParticle();
        container.appendChild(particle);
        particles.push(particle);
      }
    }

    function addParticle() {
      if (!container) return;
      const particle = createParticle();
      container.appendChild(particle);
      particles.push(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.remove();
          const index = particles.indexOf(particle);
          if (index > -1) {
            particles.splice(index, 1);
          }
        }
      }, 8000);
    }

    initParticles();
    const interval = setInterval(addParticle, 200);

    return () => {
      clearInterval(interval);
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.remove();
        }
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    />
  );
}
