"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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

const heroImages = [
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600",
];

export default function Page() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-zinc-100 text-zinc-800 ">
      {/* SUB MENU */}
      <header className="w-full bg-black shadow-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="text-lg font-bold text-white">HB Seguros</div>

          {/* Navegação */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white">
            <a href="#" className="hover:text-gray-600 transition">
              Início
            </a>
            <a href="#" className="hover:text-gray-600 transition">
              Soluções
            </a>
            <a href="#" className="hover:text-gray-600 transition">
              Sobre
            </a>
            <a href="#" className="hover:text-gray-600 transition">
              Contato
            </a>
          </nav>

          {/* Botão */}
          <div className="hidden md:block">
            <button className="bg-green-600 hover:bg-green-700 transition px-5 py-2 rounded-lg text-xs font-semibold text-white shadow">
              Falar no WhatsApp
            </button>
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <button className="text-zinc-700">☰</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative h-[500px] overflow-hidden">
        {heroImages.map((img, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            animate={{
              opacity: index === current ? 1 : 0,
              scale: index === current ? 1.05 : 1,
            }}
            transition={{ duration: 1.5 }}
          >
            <Image
              src={img}
              alt="HB Seguros"
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        ))}

        <div className="absolute inset-0 bg-black/60" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6"
        >
          <h1 className="text-3xl md:text-5xl font-bold max-w-3xl leading-tight">
            Proteção inteligente para o que realmente importa.
          </h1>
          <p className="mt-4 text-zinc-200 max-w-xl">
            Parceria com as maiores seguradoras do mercado. Segurança, confiança
            e soluções sob medida.
          </p>

          <div className="mt-8 flex gap-4 flex-wrap justify-center">
            <button className="bg-gray-600 hover:bg-gray-800 transition px-6 py-3 rounded-xl text-sm font-semibold shadow-md">
              Fale Conosco
            </button>
            <button className="bg-white/10 hover:bg-white/20 transition px-6 py-3 rounded-xl text-sm font-semibold border border-white/30">
              Simular Agora
            </button>
          </div>
        </motion.div>
      </section>

      {/* DESTAQUES PRINCIPAIS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                title: "Veículos",
                img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
              },
              {
                title: "Pessoas",
                img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800",
              },
              {
                title: "Empresas",
                img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
              },
              {
                title: "Simulação Online",
                img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer"
              >
                {/* IMAGEM */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </motion.div>

                {/* OVERLAY ESCURO */}
                <motion.div
                  initial={{ opacity: 0.5 }}
                  whileHover={{ opacity: 0.65 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition"
                ></motion.div>

                {/* TÍTULO */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <h3 className="text-white text-lg font-semibold tracking-wide">
                    {item.title}
                  </h3>
                </motion.div>

                {/* BORDA ANIMADA */}
                <motion.div
                  whileHover={{ borderColor: "gray" }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 border-2 border-transparent rounded-xl"
                ></motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUÇÕES */}
      <section className="py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl font-bold mb-4"
        >
          Conheça nossas soluções
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-zinc-600 mb-14 px-6"
        >
          Oferecemos seguros para automóveis, vida, residenciais e empresariais,
          além de consórcios e soluções financeiras. Nossa equipe está pronta
          para garantir sua tranquilidade.
        </motion.p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
          {[
            {
              icon: Car,
              title: "Para Veículos",
              desc: "Carros, Motos e Frota.",
            },
            {
              icon: Building2,
              title: "Para Empresas",
              desc: "Empresarial e Riscos.",
            },
            { icon: Users, title: "Para Pessoas", desc: "Vida e Previdência." },
            { icon: Stethoscope, title: "Saúde", desc: "Pessoa Física e PME." },
            {
              icon: KeyRound,
              title: "Consórcios",
              desc: "Veículos e Imóveis.",
            },
            {
              icon: DollarSign,
              title: "Financeiro",
              desc: "Crédito e Financiamento.",
            },
            { icon: Check, title: "Garantia", desc: "Fiança e Contratos." },
            { icon: Gavel, title: "Responsabilidade", desc: "Profissional." },
            { icon: Truck, title: "Carga", desc: "Transporte." },
            { icon: Bike, title: "Bicicleta", desc: "Danos e Terceiros." },
            { icon: Plane, title: "Viagem", desc: "Nacional e Internacional." },
            { icon: Home, title: "Imóveis", desc: "Construção e Condomínio." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="group bg-white border border-zinc-200 
                   rounded-2xl p-6 shadow-sm hover:shadow-xl 
                   transition-all duration-300 cursor-pointer"
            >
              <motion.div
                className="flex justify-center mb-4"
                whileHover={{ rotate: 6 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div
                  className="p-4 bg-zinc-100 rounded-xl 
                       group-hover:bg-gray-100 
                       transition-colors duration-300"
                >
                  <item.icon
                    className="w-8 h-8 text-zinc-700 
                         group-hover:text-black
                         transition-colors duration-300"
                  />
                </div>
              </motion.div>

              <h3 className="text-sm font-semibold text-zinc-800">
                {item.title}
              </h3>

              <p className="text-xs text-zinc-500 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BOTÕES FLUTUANTES PREMIUM */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-5 z-50">
        {/* WHATSAPP */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
          className="relative group"
        >
          <span
            className="absolute right-16 top-1/2 -translate-y-1/2
                 bg-black text-white text-xs px-3 py-1 rounded-md
                 opacity-0 group-hover:opacity-100
                 transition whitespace-nowrap"
          >
            Fale no WhatsApp
          </span>

          <motion.a
            href="https://wa.me/5592981813103"
            target="_blank"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-16 h-16 flex items-center justify-center
                 rounded-full bg-green-500
                 shadow-2xl transition-all duration-300"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 rounded-full border-2 border-green-300"
            />

            <span className="absolute inset-0 rounded-full border-4 border-white opacity-60"></span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-7 h-7 z-10"
            >
              <path d="M20.52 3.48A11.91 11.91 0 0012.05 0C5.4 0 .05 5.35.05 12c0 2.11.55 4.18 1.6 6L0 24l6.17-1.62A11.93 11.93 0 0012.05 24c6.65 0 12-5.35 12-12 0-3.2-1.25-6.21-3.53-8.52z" />
            </svg>
          </motion.a>
        </motion.div>

        {/* TELEFONE */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.7 }}
          className="relative group"
        >
          <span
            className="absolute right-16 top-1/2 -translate-y-1/2
                 bg-black text-white text-xs px-3 py-1 rounded-md
                 opacity-0 group-hover:opacity-100
                 transition whitespace-nowrap"
          >
            Ligar Agora
          </span>

          <motion.a
            href="tel:+5592981813103"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-14 h-14 flex items-center justify-center
                 rounded-full bg-blue-600
                 shadow-xl transition-all duration-300"
          >
            <span className="absolute inset-0 rounded-full border-4 border-white opacity-60"></span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              className="w-6 h-6 z-10"
            >
              <path d="M6.62 10.79a15.07 15.07 0 006.59 6.59l2.2-2.2a1 1 0 011-.24 11.36 11.36 0 003.55.57 1 1 0 011 1V21a1 1 0 01-1 1C10.3 22 2 13.7 2 3a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.55 1 1 0 01-.24 1l-2.21 2.24z" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      {/* COMO CONTRATAR */}
      <section className="py-20 bg-zinc-100 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl font-semibold text-zinc-700 mb-16"
          >
            Como contratar seguros conosco:
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
            {[
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
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="flex flex-col items-center"
              >
                {/* Número */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 250 }}
                  className="w-16 h-16 flex items-center justify-center 
                       rounded-full border border-zinc-300 
                       text-lg font-semibold text-zinc-700 mb-6 bg-white"
                >
                  {item.number}
                </motion.div>

                {/* Título */}
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.2 + 0.2 }}
                  viewport={{ once: true }}
                  className="text-sm font-semibold text-zinc-800 mb-2"
                >
                  {item.title}
                </motion.h3>

                {/* Descrição */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                  className="text-sm text-zinc-600 max-w-xs"
                >
                  {item.desc}
                </motion.p>

                {/* Link opcional */}
                {item.link && (
                  <motion.a
                    href="#"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="text-blue-600 text-sm mt-2 hover:underline"
                  >
                    {item.link}
                  </motion.a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="py-20 bg-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl font-bold mb-12"
        >
          Por que contratar através da nossa corretora?
        </motion.h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 px-6">
          {[
            { icon: ClipboardCheck, label: "Atendimento Personalizado" },
            { icon: MessageCircle, label: "Suporte Especializado" },
            { icon: Zap, label: "Agilidade no Processo" },
            { icon: Shield, label: "Confiança e Transparência" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                whileHover={{ rotate: 8, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 250 }}
                className="p-5 bg-zinc-100 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <item.icon className="w-8 h-8 text-black" />
              </motion.div>

              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.15 + 0.2 }}
                viewport={{ once: true }}
                className="text-sm font-medium"
              >
                {item.label}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-zinc-900 text-center text-white">
        <h2 className="text-3xl font-bold">Pronto para proteger seu futuro?</h2>
        <p className="mt-4 text-zinc-400">
          Fale com um especialista e receba uma proposta personalizada.
        </p>

        <button className="mt-8 bg-gray-600 hover:bg-gray-700 transition px-8 py-3 rounded-xl text-sm font-semibold shadow-lg">
          Solicitar Cotação
        </button>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-950 text-zinc-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* GRID PRINCIPAL */}
          <div className="grid md:grid-cols-3 gap-12 border-b border-zinc-800 pb-12">
            {/* EMPRESA */}
            <div>
              <h3 className="text-white font-semibold mb-4">
                HB10 Corretora de Seguros
              </h3>

              <ul className="space-y-2 text-sm text-zinc-400">
                <li>🏨 Rua Ramos Ferreira, 560 - Centro</li>
                <li>🗺️ 69010-120 - Manaus/AM</li>
                <li>📞 (92) 98181-3103</li>
                <li>🕒 Seg à Sex das 08h30 às 16h00</li>
                <li>✉ contato@hb10seguros.com.br</li>
              </ul>
            </div>


            {/* REDES SOCIAIS */}
            <div>
              <h3 className="text-white font-semibold mb-4">Redes Sociais</h3>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="bg-green-600 hover:bg-green-700 transition 
                 px-4 py-2 rounded-md text-xs font-medium"
                >
                  WhatsApp
                </a>

                <a
                  href="#"
                  className="bg-gradient-to-r from-pink-500 to-orange-400 
                 hover:opacity-90 transition 
                 px-4 py-2 rounded-md text-xs font-medium"
                >
                  Instagram
                </a>

                <a
                  href="#"
                  className="bg-blue-600 hover:bg-blue-700 transition 
                 px-4 py-2 rounded-md text-xs font-medium"
                >
                  Facebook
                </a>

                <a
                  href="#"
                  className="bg-sky-600 hover:bg-sky-700 transition 
                 px-4 py-2 rounded-md text-xs font-medium"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* LINKS RÁPIDOS */}
            <div>
              <h3 className="text-white font-semibold mb-4">Links Rápidos</h3>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <a href="#" className="hover:text-gray-500 transition">
                  Ligar Agora
                </a>

                <a href="#" className="hover:text-gray-500 transition">
                  Simulação Online
                </a>

                <a href="#" className="hover:text-gray-500 transition">
                  Página Inicial
                </a>

                <a href="#" className="hover:text-gray-500 transition">
                  Seguros e Produtos
                </a>

                <a href="#" className="hover:text-gray-500 transition">
                  Atendimento
                </a>

                <a href="#" className="hover:text-gray-500 transition">
                  Contatos
                </a>
              </div>
            </div>
          </div>

          {/* LINHA INFERIOR */}
          <div className="text-center text-xs text-zinc-500 mt-8 space-y-2">
            <p>
              As informações contidas nesta página são meramente comerciais e
              não substituem as condições da apólice.
            </p>
            <p>
              Este site garante a segurança na coleta e tratamento de dados, em
              conformidade com a LGPD.
            </p>
            <p>
              © {new Date().getFullYear()} HB10 Corretora de Seguros — Todos os
              direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
