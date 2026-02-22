import { dressCodeData } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

/**
 * Dresscode section — description text and large color palette circles.
 * Per CONTEXT.md: only text + palette, no icons/illustrations.
 * Swatches: 56-64px (w-14 h-14 sm:w-16 sm:h-16).
 */
export function DresscodeSection() {
  return (
    <AnimatedSection id="dresscode" className="py-16">
      <Container>
        <SectionHeading>Дресс-код</SectionHeading>
        <p className="text-center mt-6 mb-8 text-lg">
          {dressCodeData.description}
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          {dressCodeData.palette.map((swatch) => (
            <div key={swatch.name} className="text-center">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full mx-auto mb-2 shadow-sm border border-white/50"
                style={{ backgroundColor: swatch.color }}
              />
              <span className="text-sm opacity-70">{swatch.name}</span>
            </div>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
