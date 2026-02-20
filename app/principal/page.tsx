"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";

import {
  Car,
  Building2,
  Users,
  Stethoscope,
  KeyRound,
  DollarSign,
  Check,
  Gavel,
  Truck,
  Bike,
  Plane,
  Home,
  ClipboardCheck,
  MessageCircle,
  Zap,
  Shield,
} from "lucide-react";

// Types
interface NavLink {
  href: string;
  label: string;
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

interface HighlightItem {
  title: string;
  img: string;
}

interface SolutionItem {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  desc: string;
  gradient: string;
  href?: string;
}

interface StepItem {
  number: string;
  title: string;
  desc: string;
  link?: string;
}

interface BenefitItem {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  desc: string;
  gradient: string;
}

// Constants
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
];

const HERO_INTERVAL = 6000;

const NAV_LINKS: NavLink[] = [
  { href: "#inicio", label: "Início" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

const SOCIAL_LINKS: SocialLinkItem[] = [
  { Icon: FaWhatsapp, href: "https://wa.me/5592981813103", color: "green", hoverColor: "#22c55e" },
  { Icon: FaInstagram, href: "#", color: "pink", hoverColor: "#ec4899" },
  { Icon: FaFacebookF, href: "#", color: "blue", hoverColor: "#2563eb" },
  { Icon: FaLinkedinIn, href: "", color: "blue", hoverColor: "#1d4ed8" },
];

const HIGHLIGHTS: HighlightItem[] = [
  {
    title: "Veículos",
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
  },
  {
    title: "Pessoas",
    img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
  },
  {
    title: "Empresas",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    title: "Simulação Online",
    img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
  },
];

// ✅ FIXED: Single SOLUTIONS constant with all three groups
const SOLUTIONS: {
  large: SolutionItem[];
  medium: SolutionItem[];
  small: SolutionItem[];
} = {
  large: [
    {
      icon: Car,
      href: "/segurosdeveiculo",
      title: "Para Veículos",
      desc: "Carros, Motos, Van e Frota.",
      gradient: "from-cyan-400 to-blue-500",
    },
    {
      icon: Building2,
      href: "/segurosempresas",
      title: "Para Empresas",
      desc: "Empresarial, Riscos e Vida.",
      gradient: "from-blue-500 to-purple-500",
    },
  ],
  medium: [
    {
      icon: Users,
      href: "/segurospessoas",
      title: "Para Pessoas",
      desc: "Acidentes, Vida e Previdência.",
      gradient: "from-orange-400 to-pink-500",
    },
    {
      icon: Stethoscope,
      href: "/segurosaudeodontologico",
      title: "Saúde e Odontológico",
      desc: "Pessoa Física e Jurídica (PME).",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      icon: KeyRound,
      href: "/consorcios",
      title: "Consórcios",
      desc: "Veículos, Imóveis e Viagem.",
      gradient: "from-teal-400 to-cyan-500",
    },
  ],
  small: [
    {
      icon: DollarSign,
      href: "/financiamentosecreditos",
      title: "Soluções Financeiras",
      desc: "Crédito e Financiamentos.",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      icon: Check,
      href: "/segurogarantia",
      title: "Garantia e Fiança",
      desc: "Aluguel, Licitação e Contratos.",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      icon: Gavel,
      href: "/seguroresponsabilidade",
      title: "Responsabilidade",
      desc: "Profissional e Empresarial.",
      gradient: "from-indigo-400 to-blue-500",
    },
    {
      icon: Truck,
      href: "/segurosparatransportes",
      title: "Transporte de Carga",
      desc: "Embarcador e Transportador.",
      gradient: "from-red-400 to-orange-500",
    },
    {
      icon: Bike,
      href: "/segurobike",
      title: "Bicicleta",
      desc: "Danos, Subtração e Terceiros.",
      gradient: "from-lime-400 to-green-500",
    },
    {
      icon: Plane,
      title: "Viagem",
      desc: "Internacional e Nacional.",
      gradient: "from-sky-400 to-blue-500",
    },
    {
      icon: Home,
      title: "Imóveis",
      desc: "Construção, Condomínio e Imobiliária.",
      gradient: "from-emerald-400 to-teal-500",
    },
  ],
};

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

const BENEFITS: BenefitItem[] = [
  {
    icon: ClipboardCheck,
    label: "Personalizado",
    desc: "Oferecemos o seguro ideal para atender cada uma das suas necessidades.",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    icon: MessageCircle,
    label: "Atendimento Especializado",
    desc: "Aqui você fala com uma equipe de seguros treinada e com experiência no assunto.",
    gradient: "from-green-400 to-emerald-600",
  },
  {
    icon: Zap,
    label: "Agilidade",
    desc: "Sempre trabalhamos para atender o cliente com rapidez e satisfatoriamente.",
    gradient: "from-yellow-400 to-orange-600",
  },
  {
    icon: Shield,
    label: "Confiança",
    desc: "Selecionamos apenas as seguradoras mais conceituadas do Brasil.",
    gradient: "from-purple-400 to-purple-600",
  },
];

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Component Props Interfaces
interface SocialLinkProps {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  href: string;
  color: string;
  hoverColor: string;
}

interface SolutionCardProps {
  item: SolutionItem;
  index: number;
  size?: "large" | "medium" | "small";
  delay?: number;
}

interface FloatingButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  bgColor: string;
  delay: number;
}

// Components
const SocialLink = ({ Icon, href, color, hoverColor }: SocialLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const hoverBgClass = {
    green: "hover:bg-green-500/20",
    pink: "hover:bg-pink-500/20",
    blue: "hover:bg-blue-600/20",
  }[color] || "hover:bg-gray-500/20";

  const hoverTextClass = {
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

const SolutionCard = ({ item, index, size = "medium", delay = 0 }: SolutionCardProps) => {
  const sizeClasses: Record<"large" | "medium" | "small", { container: string; icon: string; title: string; desc: string }> = {
    large: { container: "p-6 md:p-10", icon: "w-10 h-10 md:w-12 md:h-12", title: "text-2xl md:text-3xl", desc: "text-base md:text-lg" },
    medium: { container: "p-5 md:p-8", icon: "w-9 h-9 md:w-10 md:h-10", title: "text-xl md:text-2xl", desc: "text-base md:text-lg" },
    small: { container: "p-4 md:p-6", icon: "w-8 h-8 md:w-9 md:h-9", title: "text-lg md:text-xl", desc: "text-base md:text-lg" },
  };

  const classes = sizeClasses[size];

  const CardContent = (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay + index * 0.08 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: size === "large" ? 1.02 : 1.03 }}
      className={`group bg-white border border-zinc-200 rounded-3xl ${classes.container} shadow-lg hover:shadow-2xl transition-all duration-300 h-full`}
    >
      <motion.div
        className="flex justify-center mb-6"
        whileHover={{ rotate: 6, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <div className={`p-5 bg-gradient-to-br ${item.gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <item.icon className={`${classes.icon} text-white`} strokeWidth={2} />
        </div>
      </motion.div>

      <h3 className={`${classes.title} font-bold text-zinc-800 mb-2`}>
        {item.title}
      </h3>

      <p className={`${classes.desc} text-zinc-600`}>{item.desc}</p>
    </motion.div>
  );

  if (item.href) {
    return (
      <Link href={item.href} className="block cursor-pointer h-full">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
};

const FloatingButton = ({ href, icon, label, bgColor, delay }: FloatingButtonProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: "spring", stiffness: 200, delay }}
    className="relative group"
  >
    <span className="absolute right-24 top-1/2 -translate-y-1/2 bg-black text-white text-base px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-lg">
      {label}
    </span>

    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      className={`relative w-16 h-16 flex items-center justify-center rounded-full ${bgColor} shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white`}
      aria-label={label}
    >
      {bgColor.includes("green") && (
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 rounded-full border-2 border-green-300"
        />
      )}
      <span className="absolute inset-0 rounded-full border-4 border-white opacity-60" />
      {icon}
    </motion.a>
  </motion.div>
);

export default function Page() {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, HERO_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev || "";
      };
    }
    return;
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      if (closeMenuButtonRef.current) {
        closeMenuButtonRef.current.focus();
      } else if (firstMobileLinkRef.current) {
        firstMobileLinkRef.current.focus();
      }
    }
  }, [mobileMenuOpen]);

  const whatsappIcon = useMemo(
    () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className="w-7 h-7 z-10"
      >
        <path d="M20.52 3.48A11.91 11.91 0 0012.05 0C5.4 0 .05 5.35.05 12c0 2.11.55 4.18 1.6 6L0 24l6.17-1.62A11.93 11.93 0 0012.05 24c6.65 0 12-5.35 12-12 0-3.2-1.25-6.21-3.53-8.52z" />
      </svg>
    ),
    []
  );

  const phoneIcon = useMemo(
    () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
        className="w-6 h-6 z-10"
      >
        <path d="M6.62 10.79a15.07 15.07 0 006.59 6.59l2.2-2.2a1 1 0 011-.24 11.36 11.36 0 003.55.57 1 1 0 011 1V21a1 1 0 01-1 1C10.3 22 2 13.7 2 3a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.55 1 1 0 01-.24 1l-2.21 2.24z" />
      </svg>
    ),
    []
  );

  return (
    <main id="main-content" className="bg-zinc-100 text-zinc-800">
      {/* Skip link */}
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
      <section id="inicio" className="relative h-[32rem] md:h-[38rem] overflow-hidden">
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
                  alt="HB Seguros"
                  fill
                  priority={index === 0}
                  className="object-cover"
                  quality={80}
                />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-[#051c21]/80 backdrop-blur-[2px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4 md:px-6"
        >
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold max-w-4xl leading-tight mb-6">
            Proteção inteligente para o que realmente importa.
          </h1>
          <p className="mt-4 text-zinc-200 max-w-2xl text-base md:text-2xl leading-relaxed">
            Parceria com as maiores seguradoras do mercado. Segurança, confiança
            e soluções sob medida.
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
              Conheça Seguros
            </a>
          </div>
        </motion.div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
          >
            {HIGHLIGHTS.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
              >
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.6 }}>
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={500}
                    height={300}
                    className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 group-hover:from-black/90 group-hover:to-black/50 transition" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl md:text-3xl font-bold tracking-wide drop-shadow-lg">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section
        id="solucoes"
        className="py-24 text-center bg-gradient-to-b from-zinc-50 to-white"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
        >
          Conheça nossas soluções
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-gray-600 mb-12 px-4 md:px-6 text-base md:text-xl leading-relaxed"
        >
          Conheça todas as soluções que temos disponíveis em nosso site...
        </motion.p>

        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6">

          {/* ── ROW 1: Large (2 cards) ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SOLUTIONS.large.map((item, i) => (
              <SolutionCard key={i} item={item} index={i} size="large" />
            ))}
          </div>

          {/* ── ROW 2: Medium (3 cards) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOLUTIONS.medium.map((item, i) => (
              <SolutionCard key={i} item={item} index={i} size="medium" delay={0.16} />
            ))}
          </div>

          {/* ── TÍTULO: Outras Soluções ── */}
            <div className="pt-16 pb-6 text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></span>
                <h3 className="text-3xl md:text-4xl font-bold text-zinc-800 tracking-tight">
                  Outras Soluções
                </h3>
                <span className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></span>
              </div>

              <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto">
                Proteção completa para cada detalhe da sua vida e negócio.
              </p>
            </div>

          {/* ── ROW 3: Small — primeiros 4 ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SOLUTIONS.small.slice(0, 4).map((item, i) => (
              <SolutionCard key={i} item={item} index={i} size="small" delay={0.4} />
            ))}
          </div>

          {/* ── ROW 4: Small — restantes (3 cards) centralizados ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:max-w-3xl lg:mx-auto">
            {SOLUTIONS.small.slice(4).map((item, i) => (
              <SolutionCard key={i} item={item} index={i} size="small" delay={0.56} />
            ))}
          </div>

        </div>
      </section>

      {/* FLOATING BUTTONS */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 flex flex-col items-end gap-4 md:gap-5 z-50">
        <FloatingButton
          href="https://wa.me/5592981813103"
          icon={whatsappIcon}
          label="Fale no WhatsApp"
          bgColor="bg-green-500"
          delay={0.5}
        />
        <FloatingButton
          href="tel:+5592981813103"
          icon={phoneIcon}
          label="Ligar Agora"
          bgColor="bg-blue-600"
          delay={0.7}
        />
      </div>

      {/* HOW TO CONTRACT */}
      <section id="sobre" className="py-24 bg-gradient-to-b from-white to-zinc-50 text-center">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-20 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
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

                <h3 className="text-lg font-bold text-[#051c21] mb-3">{item.title}</h3>

                <p className="text-lg md:text-xl text-zinc-600 max-w-xs leading-relaxed">
                  {item.desc}
                </p>

                {item.link && (
                  <a
                    href="https://wa.me/5592981813103"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#051c21] text-lg md:text-xl font-semibold mt-3 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7cdbde]"
                  >
                    {item.link}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 bg-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mt-6 max-w-2xl mx-auto "
        >
          Por que contratar seguros através da nossa corretora?
        </motion.h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 md:gap-12 px-4 md:px-6">
          {BENEFITS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="flex flex-col items-center gap-5"
            >
              <motion.div
                whileHover={{ rotate: 8, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 250 }}
                className={`p-6 bg-gradient-to-br ${item.gradient} rounded-3xl shadow-lg hover:shadow-xl transition`}
              >
                <item.icon className="w-10 h-10 text-white" strokeWidth={2} />
              </motion.div>

              <div className="text-center">
                <span className="text-lg font-bold text-zinc-800 block mb-2">
                  {item.label}
                </span>
                <p className="text-lg md:text-xl text-zinc-600 leading-relaxed max-w-xs">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-[#0c5461] to-[#07333b] text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Pronto para proteger seu futuro?
        </h2>
        <p className="mt-6 text-zinc-300 max-w-2xl mx-auto text-xl md:text-2xl leading-relaxed">
          Fale com um especialista e receba uma proposta personalizada.
        </p>

        <a
          href="https://wa.me/5592981813103"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-10 bg-gradient-to-r from-[#7cdbde] to-blue-500 hover:from-[#5bc9cd] hover:to-blue-600 transition px-12 py-5 rounded-xl text-lg md:text-xl font-bold shadow-2xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#7cdbde]/40"
        >
          Solicitar Cotação
        </a>
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
              <h3 className="text-white text-lg font-bold mb-6">Redes Sociais</h3>
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
                  className="p-4 bg-gradient-to-r from-pink-500 to-orange-400 hover:opacity-90 transition rounded-xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300"
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
              <h3 className="text-white text-lg font-bold mb-6">Links Rápidos</h3>
              <div className="grid grid-cols-2 gap-4 text-lg">
                <a href="tel:+5592981813103" className="hover:text-gray-400 transition">
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
              As informações contidas nesta página são meramente comerciais e não
              substituem as condições da apólice.
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