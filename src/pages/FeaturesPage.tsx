import FeatureStateCard from "../components/FeatureStateCard";
import PageShell from "../components/PageShell";
import { steps } from "../data/site";

const activeIndexes = new Set([3, 7, 11]);

export default function FeaturesPage() {
  const cards = Array.from({ length: 12 }, (_, index) => {
    const step = steps[index % steps.length];
    return {
      id: `${step.number}-${index}`,
      step,
      active: activeIndexes.has(index),
    };
  });

  return (
    <PageShell withFooter={false}>
      <h1 className="sr-only">Features</h1>
      <section className="feature-state-surface px-4 py-4 sm:px-5 sm:py-5">
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <FeatureStateCard
              key={card.id}
              active={card.active}
              step={card.step}
            />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
