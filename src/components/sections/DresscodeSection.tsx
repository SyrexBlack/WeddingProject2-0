import { dressCodeData } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

/**
 * Dresscode section — luxurious palette display with dramatic swatches.
 * Constrained description width, lifted color circles with hover effects,
 * wrapped in a subtle card container.
 */
export function DresscodeSection() {
  return (
    <AnimatedSection id="dresscode" className="py-20 md:py-28">
      <Container>
        <SectionHeading>Дресс-код</SectionHeading>
        <p className="text-center mt-6 mb-10 text-base md:text-lg leading-relaxed max-w-md mx-auto">
          {dressCodeData.description}
        </p>
        <div className="bg-white/60 rounded-2xl p-8 md:p-12 max-w-xl mx-auto border border-chocolate/5">
          <div className="flex justify-center gap-5 md:gap-8 flex-wrap">
            {dressCodeData.palette.map((swatch) => (
              <div key={swatch.name} className="text-center">
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto mb-2 shadow-md border-2 border-white transition-transform duration-300 hover:scale-110"
                  style={{ backgroundColor: swatch.color }}
                />
                <span className="text-xs uppercase tracking-wider opacity-60 mt-2">{swatch.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}
