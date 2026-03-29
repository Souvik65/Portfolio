export function Capabilities() {
  return (
    <section className="py-32 px-6 md:px-12 bg-background">
      <h2 className="font-headline font-black text-7xl md:text-9xl uppercase leading-[0.8]">
            Sk<span className="text-stroke">il</span><span className="text-primary-fixed">ls</span>
          </h2>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant/10 border border-outline-variant/10">
          <div className="bg-background p-12 hover:bg-surface-container transition-colors duration-500">
            <div className="text-primary-fixed font-headline font-bold mb-8">01.</div>
            <h3 className="font-headline font-bold text-3xl uppercase mb-6">Creative Development</h3>
            <p className="text-on-surface-variant leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, rerum.
            </p>
          </div>
          <div className="bg-background p-12 hover:bg-surface-container transition-colors duration-500">
            <div className="text-primary-fixed font-headline font-bold mb-8">02.</div>
            <h3 className="font-headline font-bold text-3xl uppercase mb-6">UI Engineering</h3>
            <p className="text-on-surface-variant leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore harum ullam minima dolor voluptates excepturi.
            </p>
          </div>
          <div className="bg-background p-12 hover:bg-surface-container transition-colors duration-500">
            <div className="text-primary-fixed font-headline font-bold mb-8">03.</div>
            <h3 className="font-headline font-bold text-3xl uppercase mb-6">Design Systems</h3>
            <p className="text-on-surface-variant leading-relaxed">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia animi iusto et fugiat
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
