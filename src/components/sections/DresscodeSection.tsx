import { dressCodeData } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

/**
 * Dresscode section — luxurious palette display with dramatic swatches.
 */
export function DresscodeSection() {
  return (
    <AnimatedSection id="dresscode" className="py-20 md:py-28">
      <Container>
        <SectionHeading>Дресс-код</SectionHeading>
        <p className="text-center mt-6 mb-10 text-base md:text-lg leading-relaxed max-w-md mx-auto text-chocolate/80">
          {dressCodeData.description}
        </p>
        <div className="bg-white/70 rounded-2xl p-6 sm:p-8 md:p-12 max-w-xl mx-auto border border-chocolate/8">
          <div className="grid grid-cols-3 gap-3 sm:gap-5 md:gap-8 justify-items-center">
            {dressCodeData.palette.map((swatch) => (
              <div key={swatch.name} className="text-center w-full max-w-[92px] sm:max-w-[120px]">
                <div
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full mx-auto mb-2 shadow-md border-2 border-white transition-transform duration-300 hover:scale-110"
                  style={{ backgroundColor: swatch.color }}
                />
                <span className="block text-[10px] sm:text-xs uppercase tracking-[0.08em] text-chocolate/65 mt-1 leading-tight text-center">
                  {swatch.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}
