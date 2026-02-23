"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartPulse,
  Smile,
  Building2,
  User,
  Baby,
  ChevronDown,
  Stethoscope,
  ShieldPlus,
} from "lucide-react";

import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";

/* =========================
   TYPES
========================= */

interface NavLink {
  href: string;
  label: string;
}

interface ProductItem {
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  gradient: string;
}

interface StepItem {
  number: string;
  title: string;
  desc: string;
  link?: string;
}

interface SocialLinkItem {
  Icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  href: string;
  color: string;
  hoverColor: string;
}

interface SocialLinkProps {
  Icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  href: string;
  color: string;
  hoverColor: string;
}

/* =========================
   SOCIAL LINK COMPONENT
========================= */

const SocialLink = ({ Icon, href, color, hoverColor }: SocialLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const hoverBgClass =
    {
      green: "hover:bg-green-500/20",
      pink: "hover:bg-pink-500/20",
      blue: "hover:bg-blue-600/20",
    }[color] || "hover:bg-gray-500/20";

  const hoverTextClass =
    {
      green: "group-hover:text-green-400",
      pink: "group-hover:text-pink-400",
      blue: "group-hover:text-blue-400",
    }[color] || "group-hover:text-gray-400";

  return (
    <a
      href={href}
      className={`group p-3 rounded-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-110 ${hoverBgClass}`}
      aria-label={`Link para ${color}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon
        className={`h-6 w-6 transition-all duration-300 text-white ${hoverTextClass}`}
        style={{
          filter: isHovered ? `drop-shadow(0 0 8px ${hoverColor})` : "none",
          transition: "all 0.3s",
        }}
      />
    </a>
  );
};

/* =========================
   DATA
========================= */

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1600&q=80",
  "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1600&q=80",
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80",
];

const HERO_INTERVAL = 6000;

const NAV_LINKS: NavLink[] = [
  { href: "/principal", label: "Início" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    Icon: FaWhatsapp,
    href: "https://wa.me/5592981813103",
    color: "green",
    hoverColor: "#22c55e",
  },
  { Icon: FaInstagram, href: "#", color: "pink", hoverColor: "#ec4899" },
  { Icon: FaFacebookF, href: "#", color: "blue", hoverColor: "#2563eb" },
  { Icon: FaLinkedinIn, href: "", color: "blue", hoverColor: "#1d4ed8" },
];

const PRODUCTS: ProductItem[] = [
  {
    title: "Seguro Saúde Empresarial",
    shortDesc: "Plano de saúde coletivo para sua empresa.",
    fullDesc:
      "Planos coletivos empresariais com cobertura ambulatorial, hospitalar e acesso a uma ampla rede credenciada. Ofereça um benefício essencial aos seus colaboradores e aumente a produtividade da equipe.",
    icon: Building2,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Seguro Saúde Individual",
    shortDesc: "Plano de saúde para você e sua família.",
    fullDesc:
      "Cobertura médica completa para você e seus dependentes, com acesso a consultas, exames, internações e cirurgias em hospitais e clínicas credenciadas em todo o Brasil.",
    icon: User,
    gradient: "from-emerald-500 to-teal-500",
  },
];

const STEPS: StepItem[] = [
  {
    number: "1",
    title: "Defina seu Seguro",
    desc: "Estamos preparados para atender todos os ramos de seguro.",
  },
  {
    number: "2",
    title: "Acesse nosso Atendimento",
    desc: "Entre em contato pelo Site, WhatsApp ou Telefone.",
    link: "Clique aqui",
  },
  {
    number: "3",
    title: "Orçamento",
    desc: "Nosso time de especialistas irá apresentar as melhores opções disponíveis.",
  },
  {
    number: "4",
    title: "Contrate",
    desc: "Tão logo você aceite a proposta, providenciamos seu seguro rapidamente.",
  },
];

/* =========================
   PAGE COMPONENT
========================= */

export default function Page() {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openCard, setOpenCard] = useState<string | null>(null);

  const closeMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, HERO_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      id="main-content"
      className="bg-zinc-100 text-zinc-800 text-base md:text-xl lg:text-2xl"
    >
      {/* Skip link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-white focus:text-black focus:px-4 focus:py-2 rounded z-50"
      >
        Ir para o conteúdo
      </a>

      {/* HEADER */}
      <header className="bg-[#051c21] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-bold text-2xl tracking-wide">HB Seguros</div>

          <nav className="hidden md:flex items-center gap-6 text-lg md:text-xl font-medium text-white">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-800 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7cdbde]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <nav className="hidden md:flex items-center gap-6 text-white">
            {SOCIAL_LINKS.map((social, idx) => (
              <SocialLink key={idx} {...social} />
            ))}
          </nav>

          <button
            className="md:hidden text-white text-4xl"
            aria-label="Menu"
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* MOBILE NAV */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-[#051c21] border-b border-[#07333b] z-40"
          >
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-white">HB Seguros</div>
                <button
                  ref={closeMenuButtonRef}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Fechar menu"
                  className="text-white text-2xl p-2 rounded hover:bg-white/10 transition"
                >
                  ×
                </button>
              </div>

              <div className="flex flex-col mt-2">
                {NAV_LINKS.map((link, idx) => (
                  <a
                    key={link.href}
                    ref={idx === 0 ? firstMobileLinkRef : null}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 px-2 rounded text-white text-lg font-medium hover:bg-white/5 transition"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-3">
                {SOCIAL_LINKS.map((social, idx) => (
                  <SocialLink key={idx} {...social} />
                ))}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section id="inicio" className="relative h-130 md:h-150 overflow-hidden">
        <AnimatePresence mode="wait">
          {HERO_IMAGES.map((img, index) =>
            index === currentHeroImage ? (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1.05 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={img}
                  alt="HB Seguros Saúde e Odontológico"
                  fill
                  priority={index === 0}
                  className="object-cover"
                  quality={80}
                />
              </motion.div>
            ) : null,
          )}
        </AnimatePresence>

        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/70" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4 md:px-6"
        >
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold max-w-4xl leading-tight mb-6">
            Saúde e bem-estar para você e sua família.
          </h1>
          <p className="mt-4 text-zinc-200 max-w-2xl text-base md:text-2xl leading-relaxed">
            Parceria com as maiores operadoras do mercado. Planos de saúde e
            odontológicos sob medida para cada necessidade.
          </p>

          <div className="mt-10 flex gap-5 flex-wrap justify-center">
            <a
              href="https://wa.me/5592981813103"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#051c21]/70 hover:bg-[#051c21]/90 transition px-10 py-5 rounded-xl text-lg md:text-xl font-semibold border border-white/30 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7cdbde]"
            >
              Fale Conosco
            </a>
            <a
              href="#solucoes"
              className="bg-white/10 hover:bg-white/20 transition px-10 py-5 rounded-xl text-lg md:text-xl font-semibold border border-white/30 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Conheça os Planos
            </a>
          </div>
        </motion.div>
      </section>

      {/* PRODUTOS */}
      <section id="solucoes" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-center">
            Seguro Saúde e Odontológico
          </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                      {PRODUCTS.map((item) => {
                        const isOpen = openCard === item.title;
          
                        return (
                          <motion.div
                            key={item.title}
                            layout
                            onClick={() => setOpenCard(isOpen ? null : item.title)}
                            className="cursor-pointer bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition border border-zinc-200"
                          >
                            <div className="flex justify-between items-start">
                              <div
                                className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-linear-to-br ${item.gradient} mb-6`}
                              >
                                <item.icon
                                  className="w-6 h-6 text-white"
                                  strokeWidth={2}
                                />
                              </div>
          
                              <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ChevronDown className="w-5 h-5 text-zinc-500" />
                              </motion.div>
                            </div>
          
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
          
                            <p className="text-zinc-600 text-sm">{item.shortDesc}</p>
                            
                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="text-zinc-700 text-sm mt-4 overflow-hidden"
                                >
                                  <p className="mb-4">{item.fullDesc}</p>
          
                                  <div className="mt-2">
                                    <a
                                      href="https://wa.me/5592981813103"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="inline-block bg-[#051c21]/70 hover:bg-[#051c21]/90 transition px-6 py-3 rounded-lg text-sm font-semibold text-white border border-white/20 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7cdbde]"
                                    >
                                      Fale Conosco
                                    </a>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </section>

      {/* COMO CONTRATAR */}
      <section
        id="sobre"
        className="py-24 bg-linear-to-b from-white to-zinc-50 text-center"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold mb-20 bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
          >
            Como contratar seguros conosco
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
            {STEPS.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 250 }}
                  className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-zinc-300 text-3xl font-bold text-[#051c21] mb-6 bg-white shadow-lg"
                >
                  {item.number}
                </motion.div>

                <h3 className="text-lg font-bold text-[#051c21] mb-3">
                  {item.title}
                </h3>

                <p className="text-lg md:text-xl text-zinc-600 max-w-xs leading-relaxed">
                  {item.desc}
                </p>



                {item.link && (
                  <a
                    href="https://wa.me/5592981813103"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#051c21] text-lg md:text-xl font-semibold mt-3 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7cdbde] transition animate-pulse"
                  >
                    {item.link}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contato" className="bg-[#07333b] text-zinc-300 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-16 border-b border-zinc-700 pb-16">
            <div>
              <h3 className="text-white text-lg font-bold mb-6">
                HB10 Corretora de Seguros
              </h3>
              <ul className="space-y-3 text-lg text-zinc-400">
                <li>🏨 Rua Ramos Ferreira, 560 - Centro</li>
                <li>🗺️ 69010-120 - Manaus/AM</li>
                <li>📞 (92) 98181-3103</li>
                <li>🕒 Seg à Sex das 08h30 às 16h00</li>
                <li>✉ contato@hb10seguros.com.br</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white text-lg font-bold mb-6">
                Redes Sociais
              </h3>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/5592981813103"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-green-600 hover:bg-green-700 transition rounded-xl hover:scale-110"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="w-6 h-6 text-white" />
                </a>
                <a
                  href="#"
                  className="p-4 bg-linear-to-r from-pink-500 to-orange-400 hover:opacity-90 transition rounded-xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-6 h-6 text-white" />
                </a>
                <a
                  href="#"
                  className="p-4 bg-blue-600 hover:bg-blue-700 transition rounded-xl hover:scale-110"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-6 h-6 text-white" />
                </a>
                <a
                  href="#"
                  className="p-4 bg-sky-600 hover:bg-sky-700 transition rounded-xl hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white text-lg font-bold mb-6">
                Links Rápidos
              </h3>
              <div className="grid grid-cols-2 gap-4 text-lg">
                <a
                  href="tel:+5592981813103"
                  className="hover:text-gray-400 transition"
                >
                  Ligar Agora
                </a>
                <a href="#solucoes" className="hover:text-gray-400 transition">
                  Simulação Online
                </a>
                <a href="#inicio" className="hover:text-gray-400 transition">
                  Página Inicial
                </a>
                <a href="#solucoes" className="hover:text-gray-400 transition">
                  Seguros e Produtos
                </a>
                <a
                  href="https://wa.me/5592981813103"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400 transition"
                >
                  Atendimento
                </a>
                <a href="#contato" className="hover:text-gray-400 transition">
                  Contatos
                </a>
              </div>
            </div>
          </div>

          <div className="text-center text-lg text-zinc-500 mt-10 space-y-3">
            <p>
              As informações contidas nesta página são meramente comerciais e
              não substituem as condições da apólice.
            </p>
            <p>
              Este site garante a segurança na coleta e tratamento de dados, em
              conformidade com a LGPD.
            </p>
            <p className="font-semibold">
              © {new Date().getFullYear()} HB10 Corretora de Seguros — Todos os
              direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}