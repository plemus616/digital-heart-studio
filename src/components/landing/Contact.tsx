import { useState } from "react";
import { Mail, Phone, Send, MessageCircle, Clock, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  const [budget, setBudget] = useState([500]);
  const [activeStep, setActiveStep] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "d4e8ac31-e1c8-4690-bcff-5648775b124f", // Reemplazar con tu access key de web3forms.com
          name: formData.name,
          email: formData.email,
          message: `
Tipo de Proyecto: ${projectTypes.find(p => p.id === formData.projectType)?.label || 'No especificado'}
Presupuesto: ${formatBudget(budget[0])}

Mensaje:
${formData.message}
          `.trim(),
          subject: `Nuevo contacto de ${formData.name} - GCloud`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("¡Mensaje enviado! Te contactaremos pronto.");
        setFormData({ name: "", email: "", projectType: "", message: "" });
        setBudget([500]);
        setActiveStep(1);
      } else {
        toast.error("Hubo un error. Por favor intenta de nuevo.");
      }
    } catch (error) {
      toast.error("Error al enviar el mensaje. Verifica tu conexión.");
      console.error("Error:", error);
    }
  };

  const formatBudget = (value: number) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const projectTypes = [
    { id: "web", label: "Página Web", icon: "🌐" },
    { id: "ecommerce", label: "E-commerce", icon: "🛒" },
    { id: "app", label: "Aplicación Web", icon: "📱" },
    { id: "redesign", label: "Rediseño", icon: "✨" },
  ];

  return (
    <section id="contacto" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-background" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider uppercase">
            Hagámoslo realidad
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold mt-3 mb-4">
            Tu próximo paso <span className="text-gradient">empieza aquí</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            No es solo un formulario. Es el inicio de algo grande para tu negocio.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Quick contact pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href="mailto:contacto@gcloud.com.gt"
              className="group flex items-center gap-3 px-5 py-3 glass rounded-full hover:bg-primary/10 transition-all"
            >
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-sm">contacto@gcloud.com.gt</span>
            </a>
            <a
              href="tel:+50245723733"
              className="group flex items-center gap-3 px-5 py-3 glass rounded-full hover:bg-primary/10 transition-all"
            >
              <Phone className="w-5 h-5 text-primary" />
              <span className="text-sm">+502 4572-3733</span>
            </a>
            <div className="flex items-center gap-3 px-5 py-3 glass rounded-full">
              <Clock className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">Respuesta en menos de 24h</span>
            </div>
          </div>

          {/* Interactive Form */}
          <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 md:p-12">
            {/* Progress indicator */}
            <div className="flex items-center justify-center gap-2 mb-10">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    step <= activeStep 
                      ? "bg-gradient-to-r from-primary to-accent w-12" 
                      : "bg-border w-8"
                  }`}
                />
              ))}
            </div>

            {/* Step 1: Project Type */}
            {activeStep === 1 && (
              <div className="space-y-6 animate-fade-up">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold mb-2">¿Qué quieres crear?</h3>
                  <p className="text-muted-foreground">Selecciona el tipo de proyecto</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {projectTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, projectType: type.id });
                        setActiveStep(2);
                      }}
                      className={`group p-6 rounded-2xl border-2 transition-all duration-300 hover:border-primary hover:bg-primary/5 ${
                        formData.projectType === type.id 
                          ? "border-primary bg-primary/10" 
                          : "border-border"
                      }`}
                    >
                      <div className="text-3xl mb-3">{type.icon}</div>
                      <div className="font-medium text-sm">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Budget & Details */}
            {activeStep === 2 && (
              <div className="space-y-8 animate-fade-up">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold mb-2">¿Cuál es tu presupuesto?</h3>
                  <p className="text-muted-foreground">Ajusta el slider según tu presupuesto estimado</p>
                </div>

                <div className="max-w-2xl mx-auto space-y-8">
                  {/* Budget Display */}
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl glass border-2 border-primary/50 bg-primary/5">
                      <span className="text-4xl font-bold text-gradient">
                        {formatBudget(budget[0])}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      {budget[0] < 3000
                        ? "Proyecto básico - Landing page o sitio simple"
                        : budget[0] < 8000
                        ? "Proyecto estándar - Web con más funcionalidades"
                        : budget[0] < 15000
                        ? "Proyecto avanzado - Soluciones personalizadas"
                        : "Proyecto premium - Full personalización"}
                    </p>
                  </div>

                  {/* Slider */}
                  <div className="px-4">
                    <Slider
                      value={budget}
                      onValueChange={setBudget}
                      min={500}
                      max={20000}
                      step={500}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-3">
                      <span>Q500</span>
                      <span>Q20,000+</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      ← Volver
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveStep(3)}
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                    >
                      Continuar →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Contact Info */}
            {activeStep === 3 && (
              <div className="space-y-6 animate-fade-up">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 text-primary mb-2">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-sm font-medium">Último paso</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">¿Cómo te contactamos?</h3>
                  <p className="text-muted-foreground">Cuéntanos más sobre tu proyecto</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Tu nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      placeholder="¿Cómo te llamas?"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Cuéntanos tu idea
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                    placeholder="¿Qué problema quieres resolver? ¿Qué te imaginas? No te preocupes por los detalles técnicos, eso lo resolvemos juntos..."
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← Volver
                  </button>
                  
                  <button
                    type="submit"
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity glow-primary"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Enviar mensaje
                  </button>
                </div>
              </div>
            )}
          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;
