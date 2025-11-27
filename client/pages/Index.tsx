import { Link } from "react-router-dom";
import { ArrowRight, Zap, Leaf, Users, Shield } from "lucide-react";

export default function Index() {
  return (
    <div className="w-full">
      {/* Hero Banner */}
      <section className="relative py-20 sm:py-32 bg-gradient-to-br from-card via-background to-card overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-accent blur-3xl -z-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Install & Maintenance
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Telecommunication Infrastructure
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Building sustainable connectivity for the digital future with
              cutting-edge telecommunications solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
              >
                Admin Panel
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Gallery Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our Specialized Equipment
            </h2>
            <p className="text-muted-foreground text-lg">
              Tools and machinery for reliable deployment and maintenance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Fiber Optic Splicing Unit",
                desc: "Precision equipment for seamless fiber connections",
                icon: "🔧",
              },
              {
                title: "OTDR Testing Equipment",
                desc: "Advanced diagnostics for network quality assurance",
                icon: "📊",
              },
              {
                title: "Tower Maintenance Lift",
                desc: "Safe and efficient infrastructure maintenance solutions",
                icon: "🏗️",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-card rounded-xl p-8 border border-border hover:border-primary transition group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainable Approach */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our Sustainable Approach
            </h2>
            <p className="text-muted-foreground text-lg">
              How we deliver telecom solutions differently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Energy Efficiency",
                desc: "40% less energy than conventional systems through optimized designs",
                icon: Zap,
              },
              {
                num: "02",
                title: "Low Impact Deployment",
                desc: "Minimizing environmental disruption through advanced techniques",
                icon: Leaf,
              },
              {
                num: "03",
                title: "Material Innovation",
                desc: "Using recycled and sustainable materials for all components",
                icon: Shield,
              },
              {
                num: "04",
                title: "Shared Infrastructure",
                desc: "Reducing redundant construction through infrastructure sharing",
                icon: Users,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-card rounded-xl p-8 border border-border hover:border-primary transition"
                >
                  <div className="text-primary text-sm font-bold mb-3 opacity-50">
                    {item.num}
                  </div>
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-card to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Build Sustainable Infrastructure?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Our experts are ready to discuss your project requirements and
            environmental goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition"
            >
              Go to Admin Panel
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
