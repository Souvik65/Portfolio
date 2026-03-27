export function Capabilities() {
  return (
    <section className="py-32 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant/10 border border-outline-variant/10">
          <div className="bg-background p-12 hover:bg-surface-container transition-colors duration-500">
            <div className="text-primary-fixed font-headline font-bold mb-8">01.</div>
            <h4 className="font-headline font-bold text-3xl uppercase mb-6">Creative Development</h4>
            <p className="text-on-surface-variant leading-relaxed">
              Pushing browser limits with custom shaders, WebGL experiences, and physics-based interactions that transcend typical web layouts.
            </p>
          </div>
          <div className="bg-background p-12 hover:bg-surface-container transition-colors duration-500">
            <div className="text-primary-fixed font-headline font-bold mb-8">02.</div>
            <h4 className="font-headline font-bold text-3xl uppercase mb-6">UI Engineering</h4>
            <p className="text-on-surface-variant leading-relaxed">
              Building robust, high-performance React applications with a focus on buttery-smooth motion and technical scalability.
            </p>
          </div>
          <div className="bg-background p-12 hover:bg-surface-container transition-colors duration-500">
            <div className="text-primary-fixed font-headline font-bold mb-8">03.</div>
            <h4 className="font-headline font-bold text-3xl uppercase mb-6">Design Systems</h4>
            <p className="text-on-surface-variant leading-relaxed">
              Creating systematic visual languages that scale across products, ensuring consistency between creative vision and code execution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
