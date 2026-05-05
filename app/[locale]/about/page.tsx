import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Timeline } from '@/components/sections/Timeline';
import { Developers } from '@/components/sections/Developers';
import { CTABlock } from '@/components/sections/CTABlock';
import { ScrollReveal, ScrollRevealItem } from '@/components/animations/ScrollReveal';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';
import { PersonJsonLd } from '@/components/seo/PersonJsonLd';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata(props: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return buildMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    pathname: '/about',
    locale,
    ogImage: '/og/og-about.jpg',
  });
}

export default async function AboutPage(props: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'about' });
  const timeline = (t.raw('timeline') as { place: string; role: string; body: string }[]) ?? [];
  const developers = (t.raw('developers') as { name: string; body: string }[]) ?? [];
  const strengths = (t.raw('strengths') as string[]) ?? [];

  return (
    <>
      <PersonJsonLd />

      <section className="bg-paper">
        <Container width="wide" className="pb-24 pt-16 md:pb-32 md:pt-24">
          <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16 lg:gap-20">
            <FadeInOnScroll className="md:col-span-7">
              <div>
                <p className="text-caption uppercase tracking-wide text-inkLight">
                  <span className="mr-3 inline-block h-px w-8 align-middle bg-inkLight/60" />
                  {t('eyebrow')}
                </p>
                <h1 className="mt-6 font-serif text-hero text-balance text-ink">
                  {t('title')}
                </h1>
                <p className="mt-4 font-serif text-[22px] leading-snug text-inkMuted">
                  {t('subtitle')}
                </p>
                <blockquote className="mt-7 border-l border-accent pl-5 font-serif text-sub italic text-ink">
                  «{t('quote')}»
                </blockquote>
                <p className="mt-7 max-w-prose text-body text-inkMuted">
                  {t('intro')}
                </p>
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll delay={0.1} className="md:col-span-5">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-fog md:aspect-[4/5]">
                <Image
                  src="/images/hero/daniil-suit.jpg"
                  alt={t('title')}
                  fill
                  priority
                  sizes="(min-width: 768px) 42vw, 100vw"
                  className="object-cover"
                />
              </div>
            </FadeInOnScroll>
          </div>
        </Container>
        <div className="mx-auto h-px max-w-wide bg-hairline" />
      </section>

      <Timeline title={t('timelineTitle')} items={timeline} />

      <Developers
        title={t('developersTitle')}
        intro={t('developersIntro')}
        items={developers}
      />

      <section className="bg-fog/40 py-24 md:py-32">
        <Container width="wide">
          <SectionHeading title={t('strengthsTitle')} />
          <ScrollReveal className="mt-12 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
            {strengths.map((s, i) => (
              <ScrollRevealItem key={s}>
                <div className="h-full bg-paper p-8">
                  <p className="tabular text-caption uppercase tracking-wide text-inkLight">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-4 font-serif text-[20px] leading-snug text-ink">
                    {s}
                  </p>
                </div>
              </ScrollRevealItem>
            ))}
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-paper py-24 md:py-32 lg:py-40">
        <Container width="text">
          <FadeInOnScroll>
            <SectionHeading title={t('philosophyTitle')} />
            <p className="mt-8 text-sub text-pretty text-inkMuted">
              {t('philosophyBody')}
            </p>
          </FadeInOnScroll>
        </Container>
      </section>

      <CTABlock
        title={t('philosophyTitle')}
        sub={t('philosophyBody')}
      />
    </>
  );
}
