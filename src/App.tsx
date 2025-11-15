import { motion } from "framer-motion";
import {
     ArrowRight,
     ChevronDown,
     Facebook,
     Instagram,
     Menu,
     MessageCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";

import PairingSpotlightSection from "./components/PairingSpotlightSection";
import ExpandableGallery from "./components/ui/gallery-animation";
import headerLogo from "./assets/header-logo.png";
import docesArtesanaisCard from "./assets/doces-artesanais-card.png";
import heroFloatingImage from "./assets/hero-floating-image.png";
import hazelnutCoffee from "./assets/hazelnut-coffee.jpg";
import tonicColdBrew from "./assets/tonic-cold-brew.jpg";
import teamShared from "./assets/team-shared.png";

type MenuItem = {
     name: string;
     description: string;
     price: string;
     image: string;
     accent: string;
};

type Barista = {
     name: string;
     role: string;
     story: string;
     image: string;
};

const featuredDrinks: MenuItem[] = [
     {
          name: "Café Avelã Veludo",
          description:
               "Espresso orgânico com calda de avelã artesanal, leite de aveia e um toque de espuma de baunilha.",
          price: "R$ 18,50",
          image: hazelnutCoffee,
          accent: "from-[#5a3c2d] to-[#9c6d44]",
     },
     {
          name: "Tônico Cold Brew Âmbar",
          description:
               "Cold brew de origem única repousado lentamente, servido com tônico de cedro e névoa de laranja.",
          price: "R$ 16,50",
          image: tonicColdBrew,
          accent: "from-[#3F2A20] to-[#B88755]",
     },
     {
          name: "Nuvem Moca Meia-Noite",
          description:
               "Ganache de cacau 72% com sal marinho fumado, leite vaporizado e cobertura de creme com cardamomo.",
          price: "R$ 19,50",
          image:
               "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=1200&q=80",
          accent: "from-[#422418] to-[#C3A27A]",
     },
];

const allDrinks: MenuItem[] = [
     ...featuredDrinks,
     {
          name: "Cappuccino de Especiarias",
          description:
               "Cremoso e aromático com canela, noz-moscada e um toque de xarope de melaço escuro.",
          price: "R$ 17,00",
          image:
               "https://images.unsplash.com/photo-1640735099606-8181a8c8f5a7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=80",
          accent: "from-[#6B4423] to-[#A87040]",
     },
     {
          name: "Flat White Defumado",
          description:
               "Duplo espresso com leite vaporizado e notas de defumado, criando uma experiência única e marcante.",
          price: "R$ 16,00",
          image:
               "https://public.youware.com/users-website-assets/prod/c8d83d64-ab08-43af-b839-829913645e37/bac7bc2363e943d082d3af3a19d20fc1.jpg",
          accent: "from-[#4A3728] to-[#8B6F47]",
     },
     {
          name: "Café Floral de Rosa",
          description:
               "Espresso suave com pétalas de rosa comestíveis, mel de flor de laranjeira e leite integral.",
          price: "R$ 19,00",
          image:
               "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=80",
          accent: "from-[#8B4A5C] to-[#D4A5B5]",
     },
     {
          name: "Espresso Duplo Puro",
          description:
               "Expressão máxima do nosso café de origem única, dois shots de espresso fresco e intenso.",
          price: "R$ 12,50",
          image:
               "https://images.unsplash.com/photo-1558416165-5fb04b79b0e7?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=80",
          accent: "from-[#3D2817] to-[#6B4C2E]",
     },
     {
          name: "Macchiato de Chocolate",
          description:
               "Espresso com chocolate belga derretido e uma nuvem de espuma de leite com cacau em pó.",
          price: "R$ 17,50",
          image:
               "https://images.unsplash.com/photo-1589478877352-e6ae73e58f26?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=1200&q=80",
          accent: "from-[#5C3D2E] to-[#A0694D]",
     },
     {
          name: "Café com Leite Artesanal",
          description:
               "Clássico reinventado com leite fresco cuidadosamente aquecido e espresso de qualidade premium.",
          price: "R$ 13,00",
          image:
               "https://images.unsplash.com/photo-1760306081298-93e10f2be897?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          accent: "from-[#7A6450] to-[#C5A898]",
     },
];

const pastries: MenuItem[] = [
     {
          name: "Croissant de Manteiga Queimada",
          description:
               "Camadas de manteiga cultivada laminadas por uma noite e pinceladas com cobertura de mel queimado.",
          price: "R$ 12,00",
          image:
               "https://images.unsplash.com/photo-1741525937807-a096ddaeb0d1?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          accent: "from-[#B17450] to-[#F3D1A5]",
     },
     {
          name: "Bolo de Canela e Nozes",
          description:
               "Enrolado com canela, xarope de bordo e nozes torradas, finalizado com sal defumado.",
          price: "R$ 13,50",
          image:
               "https://plus.unsplash.com/premium_photo-1726768902207-56be0e92c50b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          accent: "from-[#A05A3B] to-[#E8C7A0]",
     },
     {
          name: "Bolo de Azeite Earl Grey",
          description:
               "Massa aromática de bergamota com creme mascarpone, limão em conserva e pétalas cristalizadas.",
          price: "R$ 15,00",
          image:
               "https://plus.unsplash.com/premium_photo-1716918178946-5922b4e8645d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          accent: "from-[#7A5336] to-[#DABCA1]",
     },
     {
          name: "Entremet de Chocolate e Pera",
          description:
               "Bavaroise aveludada com pera caramelizada e espelho de chocolate amargo.",
          price: "R$ 18,00",
          image:
               "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          accent: "from-[#5A3A2C] to-[#C19A7B]",
     },
     {
          name: "Tarte de Pistache e Framboesa",
          description:
               "Base crocante com creme frangipane de pistache e geleia fresca de framboesa.",
          price: "R$ 17,50",
          image:
               "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80",
          accent: "from-[#6A4D3F] to-[#D7B7A2]",
     },
     {
          name: "Éclair de Chá Preto",
          description:
               "Massa choux com creme pâtissier infundido em chá preto e cobertura de caramelo.",
          price: "R$ 14,50",
          image:
               "https://plus.unsplash.com/premium_photo-1715015440855-7d95cf92608a?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          accent: "from-[#5B3D2B] to-[#B68A6B]",
     },
     {
          name: "Mini Pavlova Cítrica",
          description:
               "Merengue crocante com curd de limão siciliano e frutas cítricas em gomos.",
          price: "R$ 13,90",
          image:
               "https://images.unsplash.com/photo-1609105772057-3fa55ed2ceb7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          accent: "from-[#8C5B3F] to-[#E9C9A4]",
     },
     {
          name: "Brownie de Cacau Intenso",
          description:
               "Brownie com três camadas de cacau e flor de sal, finalizado com nibs crocantes.",
          price: "R$ 11,50",
          image:
               "https://images.unsplash.com/photo-1599999178983-66ac2ce1e755?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          accent: "from-[#472D1F] to-[#B08B6F]",
     },
     {
          name: "Cheesecake de Lavanda",
          description:
               "Base de biscoito de amêndoa com cheesecake leve e geleia de lavanda.",
          price: "R$ 16,80",
          image:
               "https://plus.unsplash.com/premium_photo-1713895023423-7d1d3a3d2c17?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          accent: "from-[#7C5B4D] to-[#DCC7B3]",
     },
];

const baristas: Barista[] = [
     {
          name: "Amina Flores",
          role: "Mestra Tostadora",
          story:
               "Cuida de nossa torra sazonal e lidera rituais de degustação semanais, compartilhando histórias dos produtores de origem.",
          image: teamShared,
     },
     {
          name: "Theo Ramirez",
          role: "Artista de Latte",
          story:
               "Arquiteto de nossos pours assinados, tecendo motivos botânicos com precisão de espuma cremosa.",
          image: teamShared,
     },
     {
          name: "Lena Park",
          role: "Curadora de Eventos",
          story:
               "Desenha parcerias mensais de pastelaria e oferece oficinas intimistas sobre rituais atentos de alimentação.",
          image: teamShared,
     },
];

const sectionTransition = {
     initial: { opacity: 0, y: 40 },
     whileInView: { opacity: 1, y: 0 },
     viewport: { once: true, amount: 0.25 },
     transition: { duration: 0.8, ease: "easeOut" },
};

const organicBlobClass =
     "absolute rounded-full opacity-70 blur-3xl mix-blend-multiply";

const socialLinks: { label: string; href: string; icon: LucideIcon }[] = [
     {
          label: "Instagram",
          href: "https://www.instagram.com",
          icon: Instagram,
     },
     {
          label: "Facebook",
          href: "https://www.facebook.com",
          icon: Facebook,
     },
     {
          label: "WhatsApp",
          href: "https://wa.me/5512999999999",
          icon: MessageCircle,
     },
];

function App() {
     const [menuOpen, setMenuOpen] = useState(false);
     const [showAllDrinks, setShowAllDrinks] = useState(false);
     const [showAllPastries, setShowAllPastries] = useState(false);

     const navLinks = useMemo(
          () => [
               { label: "Menu", href: "#menu" },
               { label: "Doces", href: "#pastries" },
               { label: "Galeria", href: "#gallery" },
               { label: "Equipe", href: "#baristas" },
               { label: "Quem Somos", href: "#about" },
               { label: "Trabalhe Conosco", href: "#careers" },
               { label: "Visita", href: "#visit" },
          ],
          [],
     );

     const pastriesToDisplay = useMemo(
          () => (showAllPastries ? pastries : pastries.slice(0, 3)),
          [showAllPastries],
     );

     const galleryImages = useMemo(
          () => [
               "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=1600&q=80",
               "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80",
               "https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=1600&q=80",
               "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80",
               "https://images.unsplash.com/photo-1527169402691-feff5539e52c?auto=format&fit=crop&w=1600&q=80",
               "https://images.unsplash.com/photo-1497544778154-5fccd636c5e1?auto=format&fit=crop&w=1600&q=80",
               "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1600&q=80",
               "https://images.unsplash.com/photo-1510972527921-ce03766a1cf1?auto=format&fit=crop&w=1600&q=80",
               "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1600&q=80",
               "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=1600&q=80",
          ],
          [],
     );

     return (
          <div
               className="min-h-screen bg-[#f3ede5] text-[#2f1b12] antialiased"
               style={{
                    backgroundImage:
                         "linear-gradient(135deg, rgba(243,237,229,0.9) 0%, rgba(232,221,206,0.85) 50%, rgba(218,202,183,0.9) 100%), url('https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=1600&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
               }}
          >
               <header className="sticky top-0 z-50 px-4 pt-5">
                    <nav className="mx-auto flex w-[90%] items-center justify-between rounded-full border border-[#fdf9f3]/70 bg-[rgba(244,236,224,0.86)] px-5 py-4 shadow-[0_20px_40px_-25px_rgba(77,48,32,0.55)] backdrop-blur-lg transition-all duration-300">
                         <div className="flex items-center gap-3">
                              <button
                                   type="button"
                                   aria-label="Ir para a página inicial"
                                   className="relative inline-flex items-center justify-center rounded-2xl border border-[#d8bfa5]/60 bg-[#f6efe6]/90 px-5 py-3 shadow-[0_18px_40px_-28px_rgba(60,38,24,0.55)] transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5a3c2d]/40"
                                   style={{
                                        backgroundColor: "rgb(90, 60, 45)",
                                        borderRadius: "100px"
                                   }}>
                                   <img
                                        src={headerLogo}
                                        alt="Logotipo Pingo Doce"
                                        className="h-12 w-auto object-contain"
                                   />
                              </button>
                              <div>
                                   <p className="text-[0.65rem] uppercase tracking-[0.38em] text-[#9b7d60]">CAFETERIA DE DOCERIA</p>
                                   <h1 className="font-serif text-xl tracking-tight text-[#2f1b12]">PINGO DOCE</h1>
                              </div>
                         </div>

                         <div className="hidden items-center gap-8 text-sm font-medium text-[#5c4030] md:flex">
                              {navLinks.map((link) => (
                                   <a
                                        key={link.href}
                                        className="transition-colors duração-200 hover:text-[#2f1b12]"
                                        href={link.href}
                                   >
                                        {link.label}
                                   </a>
                              ))}
                         </div>

                         <div className="hidden items-center gap-3 md:flex">
                              <span className="text-xs uppercase tracking-[0.35em] text-[#9b7d60]">
                                   8am - 8pm
                              </span>
                              <a
                                   href="#order"
                                   className="inline-flex items-center gap-2 rounded-full bg-[#5a3c2d] px-5 py-2.5 text-sm font-semibold text-[#f7f1e9] shadow-[0_15px_30px_-20px_rgba(50,33,22,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4a2f22]"
                              >
                                   Peça Já
                                   <ArrowRight className="h-4 w-4" />
                              </a>
                         </div>

                         <button
                              aria-label="Toggle navigation"
                              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d9c6b1] bg-[#f7f1e9] text-[#5a3c2d] shadow-[0_20px_40px_-25px_rgba(77,48,32,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#2f1b12] md:hidden"
                              onClick={() => setMenuOpen((prev) => !prev)}
                              type="button"
                         >
                              <Menu className="h-5 w-5" />
                         </button>
                    </nav>

                    {menuOpen && (
                         <motion.div
                              animate={{ opacity: 1, y: 0 }}
                              className="mx-auto mt-3 flex w-[90%] flex-col gap-4 rounded-3xl border border-[#f1e5d5] bg-[#f9f3ea] px-5 py-6 text-sm font-medium text-[#5c4030] shadow-[0_25px_60px_-35px_rgba(60,38,24,0.6)] md:hidden"
                              exit={{ opacity: 0, y: -10 }}
                              initial={{ opacity: 0, y: -10 }}
                         >
                              {navLinks.map((link) => (
                                   <a
                                        key={link.href}
                                        className="rounded-full border border-transparent px-4 py-3 transition-all duração-200 hover:border-[#d8bfa5] hover:bg-[#f3e7d9]"
                                        href={link.href}
                                        onClick={() => setMenuOpen(false)}
                                   >
                                        {link.label}
                                   </a>
                              ))}
                              <a
                                   className="inline-flex items-center justify-center gap-2 rounded-full bg-[#5a3c2d] px-4 py-3 text-[#f7f1e9]"
                                   href="#order"
                                   onClick={() => setMenuOpen(false)}
                              >
                                   Peça Já
                                   <ArrowRight className="h-4 w-4" />
                              </a>
                         </motion.div>
                    )}
               </header>
               <main className="mx-auto flex w-[90%] flex-col gap-32 pb-24 pt-20">
                    <section
                         id="order"
                         className="relative grid gap-12 overflow-hidden rounded-[40px] bg-[#f6efe6]/90 p-10 shadow-[0_40px_90px_-60px_rgba(42,23,13,0.75)] lg:grid-cols-[1.05fr_0.95fr]"
                    >
                         <div className="absolute inset-0">
                              <div className={`${organicBlobClass} -left-24 -top-24 h-64 w-64 bg-[#c9b29b]/50`} />
                              <div className={`${organicBlobClass} -right-16 bottom-6 h-72 w-72 bg-[#8f6a4d]/40`} />
                              <div
                                   className="absolute inset-0 mix-blend-soft-light"
                                   style={{
                                        backgroundImage:
                                             "linear-gradient(120deg, rgba(255,255,255,0.35) 0%, rgba(214,201,184,0.18) 35%, rgba(173,149,123,0.22) 100%), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80')",
                                        backgroundSize: "cover",
                                        opacity: 0.2,
                                   }}
                              />
                         </div>

                         <motion.div
                              animate={{ opacity: 1, y: 0 }}
                              className="relative z-10 flex flex-col justify-center gap-10"
                              initial={{ opacity: 0, y: 60 }}
                              transition={{ duration: 1.1, ease: "easeOut" }}
                         >
                              <span className="inline-flex max-w-fit items-center gap-2 rounded-full bg-[#e6d5c7]/70 px-4 py-2 text-xs font-semibold tracking-[0.35em] text-[#8c6a4f]">DOCERIA E CAFETERIA-DOCES ARTESANAIS</span>
                              <div className="relative space-y-6">
                                   <motion.img
                                        src={heroFloatingImage}
                                        alt="Doce artesanal flutuando"
                                        className="pointer-events-none absolute -left-10 -top-12 w-28 drop-shadow-[0_25px_45px_-30px_rgba(37,22,15,0.55)] sm:-left-14 sm:-top-16 sm:w-36 md:-left-16 md:-top-20 md:w-40 lg:-left-20 lg:-top-24 lg:w-44"
                                        initial={{ opacity: 0, y: -12, rotate: -8 }}
                                        animate={{ opacity: 1, y: [-4, 3, -4], rotate: [-8, -4, -8] }}
                                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                                   />
                                   <motion.h2
                                        animate={{ opacity: 1, y: 0 }}
                                        className="font-serif text-4xl leading-tight text-[#25160f] sm:text-[44px] md:text-[56px] md:leading-[1.08]"
                                        initial={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 1.05, delay: 0.2, ease: "easeOut" }}
                                        style={{
                                             opacity: "1",
                                             transform: "none",
                                             fontSize: "96px"
                                        }}
                                   >
                                        PINGO DOCE
                                   </motion.h2>
                                   <motion.p
                                        animate={{ opacity: 1, y: 0 }}
                                        className="max-w-xl text-base leading-relaxed text-[#5c4030] sm:text-lg"
                                        initial={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
                                   >Um santuário moderno para momentos doces e inspiradores.</motion.p>
                              </div>
                              <motion.div
                                   animate={{ opacity: 1, y: 0 }}
                                   className="flex flex-col gap-4 sm:flex-row"
                                   initial={{ opacity: 0, y: 20 }}
                                   transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
                              >
                                   <a
                                        href="#menu"
                                        className="inline-flex items-center justify-center rounded-full bg-[#5a3c2d] px-8 py-3 text-sm font-semibold text-[#f7f1e9] shadow-[0_25px_45px_-30px_rgba(60,38,24,0.85)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4b2f21]"
                                   >EXPLORE NOSSO MENU</a>
                                   <a
                                        href="#visit"
                                        className="inline-flex items-center justify-center rounded-full border border-[#9e7c5c]/45 bg-white/70 px-8 py-3 text-sm font-semibold text-[#5c4030] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#5a3c2d]"
                                   >FALE CONOSCO</a>
                              </motion.div>
                              <div className="flex flex-wrap gap-6 text-[#7a5b43]">
                                   {[
                                        { label: "Receitas exclusivas", value: "20" },
                                        { label: "CAFÉS artesanais", value: "6" },
                                        { label: "Doces da semana", value: "18" },
                                   ].map((stat) => (
                                        <div key={stat.label} className="flex flex-col">
                                             <span className="font-serif text-3xl text-[#2f1b12]">{stat.value}</span>
                                             <span className="text-[0.65rem] tracking-[0.28em] uppercase">
                                                  {stat.label}
                                             </span>
                                        </div>
                                   ))}
                              </div>
                         </motion.div>

                         <motion.div
                              animate={{ opacity: 1, scale: 1 }}
                              className="relative z-10 h-full rounded-[32px] bg-[#f8f1e7]/75 p-6 shadow-[0_35px_65px_-40px_rgba(72,47,30,0.6)]"
                              initial={{ opacity: 0, scale: 0.94 }}
                              transition={{ duration: 1.05, delay: 0.3, ease: "easeOut" }}
                         >
                              <div className="relative h-full w-full overflow-hidden rounded-[28px]">
                                   <img
                                        src={docesArtesanaisCard}
                                        alt="Seleção de doces artesanais da Pingo Doce"
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                   />
                                   <div className="absolute inset-0 bg-gradient-to-t from-[#2c1a12]/60 via-transparent to-transparent" />
                                   <div
                                        className="absolute bottom-6 left-6 right-6 rounded-3xl bg-[#f7efe3]/85 p-6 backdrop-blur"
                                        style={{
                                             backgroundColor: "#f1e3d052"
                                        }}>
                                        <p
                                             className="text-xs uppercase tracking-[0.35em] text-[#9c7a58]"
                                             style={{
                                                  color: "#f6efe6"
                                             }}>CAFETERIA E DOCERIA</p>
                                        <p
                                             className="pt-3 font-serif text-2xl text-[#2f1b12]"
                                             style={{
                                                  color: "#f6efe4"
                                             }}>DOCES SURREAIS</p>

                                   </div>
                              </div>
                         </motion.div>
                    </section>

                    <PairingSpotlightSection />

                    <motion.section id="menu" className="space-y-14" {...sectionTransition}>
                         <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                              <div>
                                   <p className="text-xs uppercase tracking-[0.4em] text-[#9b7d60]">Bebidas em Destaque</p>
                                   <h3 className="mt-2 font-serif text-4xl text-[#2f1b12]">
                                        Selecionadas para os dias frescos
                                   </h3>
                              </div>
                              <motion.button
                                   onClick={() => setShowAllDrinks(!showAllDrinks)}
                                   className="inline-flex items-center gap-2 text-sm font-semibold text-[#5a3c2d] underline-offset-4 transition-colors duration-200 hover:text-[#2f1b12]"
                                   whileHover={{ gap: "0.625rem" }}
                              >
                                   <motion.div
                                        animate={{ rotate: showAllDrinks ? 180 : 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                   >
                                        <ChevronDown className="h-5 w-5" strokeWidth={2.5} />
                                   </motion.div>
                                   {showAllDrinks ? "Mostrar menos" : "Ver lista completa de bebidas"}
                              </motion.button>
                         </div>
                         <div className="grid gap-12 lg:grid-cols-3">
                              {(showAllDrinks ? allDrinks : featuredDrinks).map((item) => (
                                   <motion.article
                                        key={item.name}
                                        className="group relative overflow-hidden rounded-[28px] bg-[#f9f1e7]/70 shadow-[0_25px_60px_-45px_rgba(54,33,21,0.7)]"
                                        whileHover={{ y: -6 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ duration: 0.6 }}
                                   >
                                        <div
                                             className="relative h-56 overflow-hidden"
                                             style={{
                                                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.0) 40%, rgba(46,31,21,0.65) 100%), url('${item.image}')`,
                                                  backgroundSize: "cover",
                                                  backgroundPosition: "center",
                                             }}
                                        >
                                             <div className="absolute inset-0" />
                                             <div className="absolute right-4 top-4 inline-flex items-center rounded-full bg-white/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.38em] text-[#5a3c2d]">
                                                  Sazonal
                                             </div>
                                        </div>
                                        <div className="space-y-4 p-6">
                                             <div className={`inline-flex items-center rounded-full bg-gradient-to-r ${item.accent} px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-[#f7f1e9] shadow-md`}>
                                                  Bebida
                                             </div>
                                             <h4 className="font-serif text-2xl text-[#2f1b12]">{item.name}</h4>
                                             <p className="text-sm leading-relaxed text-[#5c4030]">{item.description}</p>
                                             <div className="flex items-center justify-between pt-2">
                                                  <span className="font-serif text-xl text-[#2f1b12]">{item.price}</span>
                                                  <button className="rounded-full border border-[#d8bfa5] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#5a3c2d] transition-all duration-200 hover:border-[#9c7a58]">
                                                       Adicionar
                                                  </button>
                                             </div>
                                        </div>
                                   </motion.article>
                              ))}
                         </div>
                    </motion.section>

                    <motion.section id="pastries" className="space-y-12" {...sectionTransition}>
                         <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                              <div className="space-y-4">
                                   <p className="text-xs uppercase tracking-[0.4em] text-[#9b7d60]">Balcão de Doces</p>
                                   <h3 className="font-serif text-4xl text-[#2f1b12]">
                                        Feitos com farinhas tradicionais e fermentação lenta
                                   </h3>
                              </div>
                              <motion.button
                                   onClick={() => setShowAllPastries(!showAllPastries)}
                                   className="inline-flex items-center gap-2 text-sm font-semibold text-[#5a3c2d] underline-offset-4 transition-colors duration-200 hover:text-[#2f1b12]"
                                   whileHover={{ gap: "0.625rem" }}
                              >
                                   <motion.div
                                        animate={{ rotate: showAllPastries ? 180 : 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                   >
                                        <ChevronDown className="h-5 w-5" strokeWidth={2.5} />
                                   </motion.div>
                                   {showAllPastries ? "Mostrar menos" : "Ver vitrine completa de doces"}
                              </motion.button>
                         </div>
                         <div className="grid gap-10 lg:grid-cols-3">
                              {pastriesToDisplay.map((item) => (
                                   <motion.article
                                        key={item.name}
                                        className="group relative overflow-hidden rounded-[26px] border border-[#eadbc6] bg-[#f9f3ea]/90 p-6 shadow-[0_20px_50px_-38px_rgba(66,41,25,0.55)]"
                                        whileHover={{ y: -4 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ duration: 0.6 }}
                                   >
                                        <div className="relative overflow-hidden rounded-3xl">
                                             <img
                                                  alt={item.name}
                                                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                  src={item.image}
                                                  loading="lazy"
                                             />
                                             <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-[#2f1b12]/35 via-transparent to-transparent" />
                                        </div>
                                        <div className="space-y-3 pt-5">
                                             <div className={`inline-flex items-center rounded-full bg-gradient-to-r ${item.accent} px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#3e2618]`}>Doce</div>
                                             <h4 className="font-serif text-2xl text-[#2f1b12]">{item.name}</h4>
                                             <p className="text-sm leading-relaxed text-[#5c4030]">{item.description}</p>
                                             <div className="flex items-center justify-between">
                                                  <span className="font-serif text-xl text-[#2f1b12]">{item.price}</span>
                                                  <span className="text-xs uppercase tracking-[0.28em] text-[#9c7a58]">Combina com Café</span>
                                             </div>
                                        </div>
                                   </motion.article>
                              ))}
                         </div>
                    </motion.section>

                    <motion.section
                         id="gallery"
                         className="space-y-8 rounded-[36px] border border-[#e0d2c1] bg-[#f7f0e6]/80 p-10 shadow-[0_35px_80px_-60px_rgba(46,28,16,0.7)]"
                         {...sectionTransition}
                    >
                         <div className="space-y-3">
                              <p className="text-xs uppercase tracking-[0.45em] text-[#9b7d60]">Momentos e detalhes</p>
                              <h3 className="font-serif text-5xl text-[#2f1b12]">NOSSA GALERIA</h3>
                              <p className="max-w-3xl text-sm leading-relaxed text-[#5c4030]">
                                   Um passeio visual pelos rituais, texturas e atmosferas que inspiram cada capítulo da Pingo Doce.
                                   Passe o cursor para expandir e clique para ampliar nossas cenas favoritas.
                              </p>
                         </div>
                         <ExpandableGallery images={galleryImages} className="w-full" />
                    </motion.section>

                    <motion.section id="baristas" className="space-y-12" {...sectionTransition}>
                         <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                              <div>
                                   <p className="text-xs uppercase tracking-[0.4em] text-[#9b7d60]">Conheça Nossa Equipe</p>
                                   <h3 className="mt-2 font-serif text-4xl text-[#2f1b12]">
                                        Os artesãos por trás de cada criação
                                   </h3>
                              </div>
                              <p className="max-w-xl text-sm leading-relaxed text-[#5c4030]">
                                   Nossa equipe mistura ritual, artístico e hospitalidade, trazendo anos de experiência de
                                   padarias renomadas ao redor do mundo em um único espaço acolhedor.
                              </p>
                         </div>
                         <div className="grid gap-12 md:grid-cols-3">
                              {baristas.map((barista, index) => (
                                   <motion.article
                                        key={barista.name}
                                        className="relative overflow-hidden rounded-[32px] bg-[#f6efe6]/90 p-6 shadow-[0_30px_70px_-55px_rgba(46,28,16,0.75)]"
                                        transition={{ delay: index * 0.08, duration: 0.7, ease: "easeOut" }}
                                        whileHover={{ y: -6 }}
                                   >
                                        <div className="relative h-56 overflow-hidden rounded-[26px]">
                                             <img
                                                  alt={barista.name}
                                                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                  src={barista.image}
                                                  loading="lazy"
                                             />
                                             <div className="absolute inset-x-0 bottom-0 rounded-t-[26px] bg-gradient-to-t from-[#26160d]/75 via-transparent to-transparent p-5">
                                                  <p className="font-serif text-2xl text-[#f6efe6]">{barista.name}</p>
                                                  <p className="text-xs uppercase tracking-[0.28em] text-[#d0b99d]">{barista.role}</p>
                                             </div>
                                        </div>
                                        <p className="pt-5 text-sm leading-relaxed text-[#5c4030]">{barista.story}</p>
                                   </motion.article>
                              ))}
                         </div>
                    </motion.section>

                    <motion.section id="about" className="space-y-16" {...sectionTransition}>
                         <div className="space-y-2">
                              <p className="text-xs uppercase tracking-[0.4em] text-[#9b7d60]">Nossa Jornada</p>
                              <h3 className="font-serif text-4xl text-[#2f1b12]">Quem Somos</h3>
                              <p className="text-sm leading-relaxed text-[#5c4030] max-w-2xl">Fundada em 2019, Pingo Doce nasceu de uma paixão genuína por artesanato, ingredientes puros e momentos compartilhados. Nossa missão é criar um espaço onde cada visita se torna uma experiência memorável de sabor e aconchego.</p>
                         </div>

                         <div className="relative">
                              <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-[#5a3c2d]/20 via-[#5a3c2d]/40 to-[#5a3c2d]/20" />

                              <div className="space-y-16">
                                   {[
                                        {
                                             year: "2019",
                                             title: "O Início",
                                             description:
                                                  "Abriu-se a primeira porta da Pingo Doce com apenas 3 receitas de família e muita dedicação.",
                                        },
                                        {
                                             year: "2020",
                                             title: "Adaptação e Crescimento",
                                             description:
                                                  "Transformamos desafios em oportunidades, expandindo nossas linhas de xaropes artesanais.",
                                        },
                                        {
                                             year: "2021",
                                             title: "Parcerias Locais",
                                             description:
                                                  "Iniciamos colaborações com produtores locais, fortalecendo nossa comunidade.",
                                        },
                                        {
                                             year: "2022",
                                             title: "Workshops e Experiências",
                                             description:
                                                  "Lançamos os primeiros workshops de culinária artesanal e rituais de café.",
                                        },
                                        {
                                             year: "2023",
                                             title: "Reconhecimento",
                                             description:
                                                  "Fomos eleitos melhor doceria artesanal da região pelos nossos clientes.",
                                        },
                                        {
                                             year: "2024",
                                             title: "Visão do Futuro",
                                             description:
                                                  "Expandindo nossas ofertas mantendo o compromisso com qualidade e autenticidade.",
                                        },
                                   ].map((milestone, index) => {
                                        const isEven = index % 2 === 0;

                                        return (
                                             <motion.div
                                                  key={milestone.year}
                                                  className="relative grid items-center gap-8 md:grid-cols-[1fr_auto_1fr]"
                                                  initial={{ opacity: 0, y: 20 }}
                                                  whileInView={{ opacity: 1, y: 0 }}
                                                  viewport={{ once: true, amount: 0.3 }}
                                                  transition={{ duration: 0.6, delay: index * 0.08 }}
                                             >
                                                  <div
                                                       className={`order-1 flex w-full ${isEven
                                                            ? "md:order-1 md:justify-end"
                                                            : "md:order-3 md:justify-start"
                                                            }`}
                                                  >
                                                       <div
                                                            className={`w-full max-w-lg md:max-w-xl rounded-3xl border-2 border-[#d8bfa5] bg-[#f6efe6]/90 p-6 shadow-[0_25px_60px_-45px_rgba(54,33,21,0.7)] ${isEven ? "md:text-right" : ""
                                                                 }`}
                                                       >
                                                            <div
                                                                 className={`flex flex-col space-y-3 ${isEven ? "md:items-end" : ""
                                                                      }`}
                                                            >
                                                                 <span className="text-xs uppercase tracking-[0.4em] text-[#9b7d60] font-semibold">
                                                                      {milestone.year}
                                                                 </span>
                                                                 <h5 className="font-serif text-2xl text-[#2f1b12]">{milestone.title}</h5>
                                                                 <p className="text-sm leading-relaxed text-[#5c4030]">
                                                                      {milestone.description}
                                                                 </p>
                                                            </div>
                                                       </div>
                                                  </div>

                                                  <div className="order-2 relative flex flex-col items-center md:order-2">
                                                       <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="h-full w-[2px] bg-gradient-to-b from-transparent via-[#5a3c2d]/40 to-transparent" />
                                                       </div>
                                                       <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#f3ede5] bg-[#5a3c2d] text-base font-semibold text-[#f6efe6] shadow-lg">
                                                            {milestone.year}
                                                       </div>
                                                  </div>

                                                  <div
                                                       className={`order-3 flex w-full ${isEven
                                                            ? "md:order-3 md:justify-start"
                                                            : "md:order-1 md:justify-end"
                                                            }`}
                                                  >
                                                       <div className="relative w-full max-w-xs sm:max-w-sm overflow-hidden rounded-[24px] shadow-[0_25px_60px_-45px_rgba(54,33,21,0.7)]">
                                                            <div
                                                                 className="h-40 w-full bg-gradient-to-br sm:h-48"
                                                                 style={{
                                                                      backgroundImage:
                                                                           "linear-gradient(135deg, rgba(90,60,45,0.15) 0%, rgba(155,125,96,0.1) 100%), url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=700&q=80')",
                                                                      backgroundSize: "cover",
                                                                      backgroundPosition: "center",
                                                                 }}
                                                            />
                                                       </div>
                                                  </div>
                                             </motion.div>
                                        );
                                   })}
                              </div>
                         </div>
                    </motion.section>

                    {/*CARREIRAS*/}

                    {/* TÍTULO CARREIRAS FORA DO CARD */}
                    <motion.section
                         id="careers"
                         className="relative overflow-hidden rounded-[36px] border border-[#e7d7c3]/70 bg-[#f8f1e7]/95 p-10 shadow-[0_45px_90px_-60px_rgba(42,23,13,0.75)]"
                         style={{
                              backgroundImage:
                                   "linear-gradient(140deg, rgba(255,220,186,0.65) 0%, rgba(255,210,180,0.5) 40%, rgba(250,190,150,0.4) 100%), url('https://public.youware.com/users-website-assets/prod/c8d83d64-ab08-43af-b839-829913645e37/c259be75384e413ebfe1d560541a260e.jpg')",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                         }}
                         {...sectionTransition}
                    >

                         <div className="absolute inset-0 bg-white/35" />
                         <div className="relative z-10 mb-8 text-center md:text-left">
                              <p
                                   className="text-xs uppercase tracking-[0.35em] text-[#c26c38]"
                                   style={{
                                        textAlign: "center"
                                   }}>Equipe PINGO DOCE</p>

                         </div>

                         <h2 className="relative z-10 mb-10 text-center font-serif text-5xl tracking-wide text-[#2f1b12]">
                              Trabalhe Conosco
                         </h2>

                         <div className="absolute inset-0 bg-white/35" />

                         <div className="relative z-10 grid gap-6 md:grid-cols-2 md:grid-rows-2">

                              {/* CARD PRINCIPAL  Trabalhe Conosco*/}
                              <div className="rounded-[24px] border border-white/25 bg-white/60 p-6 text-[#5a3c2d] shadow-[0_25px_60px_-40px_rgba(10,8,6,0.35)] backdrop-blur">

                                   <h3 className="mt-0 font-serif text-4xl text-[#2f1b12]">
                                        Traga sua energia e alegria para nossa cozinha de sonhos
                                   </h3>

                                   <p className="mt-3 text-sm leading-relaxed text-[#5c4030]">
                                        Buscamos pessoas apaixonadas por hospitalidade, doces autorais e experiências calorosas.
                                        Aqui, cada equipe compartilha histórias, aprende novas técnicas e celebra conquistas com
                                        sorriso no rosto.
                                   </p>
                              </div>

                              {/* CARD VAGAS */}
                              <div className="flex items-center justify-center rounded-[24px] border border-white/20 bg-white/45 p-6 text-[#5a3c2d] shadow-[0_25px_60px_-40px_rgba(10,8,6,0.35)] backdrop-blur">
                                   <div className="space-y-3 text-center">
                                        <p className="font-serif text-3xl text-[#2f1b12]">Vagas Abertas</p>
                                        <p className="text-sm leading-relaxed text-[#5c4030]">
                                             Baristas criativos, confeiteiras com afeto e anfitriões acolhedores para jornadas
                                             integrais e parciais.
                                        </p>
                                        <a
                                             href="mailto:talentos@pingodoce.com"
                                             className="inline-flex items-center justify-center rounded-full bg-[#f08142] px-5 py-2 text-sm font-semibold text-white shadow-[0_18px_35px_-25px_rgba(240,129,66,0.85)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d76f35]"
                                        >
                                             Enviar portfólio
                                        </a>
                                   </div>
                              </div>

                              {/* CARD TEXTO */}
                              <div className="space-y-4 rounded-[24px] border border-white/20 bg-white/50 p-6 text-[#5a3c2d] shadow-[0_25px_60px_-40px_rgba(10,8,6,0.35)] backdrop-blur">
                                   <p className="text-sm leading-relaxed text-[#5c4030]">
                                        Somos uma casa acolhedora que oferece treinamentos contínuos, degustações internas
                                        semanais e benefícios alinhados aos nossos valores de bem-estar. Se você vibra com sabores
                                        artesanais e camaradagem, queremos conhecer sua história.
                                   </p>
                                   <p className="text-xs uppercase tracking-[0.4em] text-[#c26c38]">
                                        Cresça conosco — aprendizados, viagens e experiências sensoriais exclusivas
                                   </p>
                              </div>

                              {/* HIGHLIGHTS */}
                              <div className="grid gap-4 rounded-[24px] border border-white/20 bg-white/50 p-6 text-[#5a3c2d] shadow-[0_25px_60px_-40px_rgba(10,8,6,0.35)] backdrop-blur">
                                   {[
                                        {
                                             metric: "Ambiente alegre",
                                             label: "Dinâmicas de equipe semanais",
                                        },
                                        {
                                             metric: "Mentorias criativas",
                                             label: "Workshops com chefs convidados",
                                        },
                                        {
                                             metric: "Ritual de staff",
                                             label: "Sessão de café especial toda sexta",
                                        },
                                   ].map((highlight) => (
                                        <div
                                             key={highlight.metric}
                                             className="flex items-center justify-between rounded-2xl bg-white/65 px-4 py-3"
                                        >
                                             <p className="font-serif text-xl text-[#2f1b12]">{highlight.metric}</p>
                                             <p className="text-[0.68rem] uppercase tracking-[0.32em] text-[#c26c38] text-right">
                                                  {highlight.label}
                                             </p>
                                        </div>
                                   ))}
                              </div>
                         </div>
                    </motion.section>


                    <motion.section id="visit" className="relative overflow-hidden rounded-[36px] bg-[#f6efe6]/95 p-10 shadow-[0_40px_90px_-65px_rgba(42,23,13,0.8)]" {...sectionTransition}>
                         <div className={`${organicBlobClass} -left-24 top-0 h-56 w-56 bg-[#c7ae91]/45`} />
                         <div className={`${organicBlobClass} bottom-0 right-[-10%] h-64 w-64 bg-[#8a6347]/40`} />
                         <div className="relative z-10 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
                              <div className="space-y-6">
                                   <p className="text-xs uppercase tracking-[0.4em] text-[#9b7d60]">Visite-nos</p>
                                   <h3 className="font-serif text-4xl text-[#2f1b12]">Um refúgio para manhãs tranquilas e encontros noturnos</h3>
                                   <p className="text-sm leading-relaxed text-[#5c4030]">Localizado no adorável Shopping Pátio Pinda em Pindamonhangaba/SP, nosso espaço é revestido em linho, madeira recuperada e o aroma de doces caseiros recém-feitos. Reserve uma sessão de degustação, organize um workshop exclusivo ou simplesmente visite para um momentinho restaurador.</p>
                                   <div className="grid gap-6 sm:grid-cols-3">
                                        {[
                                             { title: "Localização", detail: "Shopping Pátio Pinda, São Paulo" },
                                             { title: "Horário", detail: "Diariamente 8:00am – 8:00pm" },
                                             { title: "Contato", detail: "oi@pingodoce.com" },
                                        ].map((info) => (
                                             <div key={info.title} className="rounded-3xl bg-white/65 p-4 text-sm text-[#5c4030] shadow-[0_20px_50px_-40px_rgba(66,41,25,0.6)]">
                                                  <p className="text-[0.65rem] uppercase tracking-[0.32em] text-[#9b7d60]">{info.title}</p>
                                                  <p className="mt-2 font-serif text-lg text-[#2f1b12]">{info.detail}</p>
                                             </div>
                                        ))}
                                   </div>
                              </div>
                              <div className="relative overflow-hidden rounded-[28px]">
                                   <img
                                        alt="Espaço aconchego da doceria"
                                        className="h-full w-full object-cover"
                                        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80"
                                        loading="lazy"
                                   />
                                   <div className="absolute inset-0 bg-gradient-to-t from-[#2f1b12]/50 via-transparent to-transparent" />
                              </div>
                         </div>
                    </motion.section>

                    <motion.section id="visit" className="relative overflow-hidden rounded-[36px] bg-[#f6efe6]/95 p-10 shadow-[0_40px_90px_-65px_rgba(42,23,13,0.8)]" {...sectionTransition}>
                         <div className={`${organicBlobClass} -left-24 top-0 h-56 w-56 bg-[#c7ae91]/45`} />
                         <div className={`${organicBlobClass} bottom-0 right-[-10%] h-64 w-64 bg-[#8a6347]/40`} />
                         <div className="relative z-10 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
                              <div className="space-y-6">
                                   <p className="text-xs uppercase tracking-[0.4em] text-[#9b7d60]">Visite-nos</p>
                                   <h3 className="font-serif text-4xl text-[#2f1b12]">Um refúgio para manhãs tranquilas e encontros noturnos</h3>
                                   <p className="text-sm leading-relaxed text-[#5c4030]">Localizado no adorável Shopping Pátio Pinda em Pindamonhangaba/SP, nosso espaço é revestido em linho, madeira recuperada e o aroma de doces caseiros recém-feitos. Reserve uma sessão de degustação, organize um workshop exclusivo ou simplesmente visite para um momentinho restaurador.</p>
                                   <div className="grid gap-6 sm:grid-cols-3">
                                        {[
                                             { title: "Localização", detail: "Shopping Pátio Pinda, São Paulo" },
                                             { title: "Horário", detail: "Diariamente 8:00am – 8:00pm" },
                                             { title: "Contato", detail: "oi@pingodoce.com" },
                                        ].map((info) => (
                                             <div key={info.title} className="rounded-3xl bg-white/65 p-4 text-sm text-[#5c4030] shadow-[0_20px_50px_-40px_rgba(66,41,25,0.6)]">
                                                  <p className="text-[0.65rem] uppercase tracking-[0.32em] text-[#9b7d60]">{info.title}</p>
                                                  <p className="mt-2 font-serif text-lg text-[#2f1b12]">{info.detail}</p>
                                             </div>
                                        ))}
                                   </div>
                              </div>
                              <div className="relative overflow-hidden rounded-[28px]">
                                   <img
                                        alt="Espaço aconchego da doceria"
                                        className="h-full w-full object-cover"
                                        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80"
                                        loading="lazy"
                                   />
                                   <div className="absolute inset-0 bg-gradient-to-t from-[#2f1b12]/50 via-transparent to-transparent" />
                              </div>
                         </div>
                    </motion.section>

                    <motion.section
                         id="location"
                         className="relative overflow-hidden rounded-[36px] bg-[#f6efe6]/95 p-10 shadow-[0_40px_90px_-65px_rgba(42,23,13,0.8)]"
                         {...sectionTransition}
                    >
                         <div className={`${organicBlobClass} -left-24 top-0 h-56 w-56 bg-[#c7ae91]/45`} />
                         <div className={`${organicBlobClass} bottom-0 right-[-10%] h-64 w-64 bg-[#8a6347]/40`} />
                         <div className="relative z-10 grid gap-10 lg:grid-cols-2">
                              <div className="rounded-[32px] border border-[#d8bfa5]/60 bg-white/75 p-8 shadow-[0_30px_70px_-55px_rgba(46,28,16,0.7)] backdrop-blur-sm">
                                   <p className="text-xs uppercase tracking-[0.4em] text-[#9b7d60]">Conecte-se</p>
                                   <h3 className="mt-4 font-serif text-3xl text-[#2f1b12]">Estamos a um clique e um passeio de você</h3>
                                   <p className="mt-4 text-sm leading-relaxed text-[#5c4030]">
                                        Acompanhe nossas criações, eventos e bastidores. Temos um cantinho acolhedor esperando por você em Pindamonhangaba.
                                   </p>
                                   <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                        {socialLinks.map(({ label, href, icon: Icon }) => (
                                             <a
                                                  key={label}
                                                  href={href}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-[#d8bfa5] bg-[#f6efe6]/85 px-6 py-3 text-sm font-semibold text-[#5a3c2d] shadow-[0_20px_40px_-35px_rgba(60,38,24,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#5a3c2d] hover:bg-[#5a3c2d] hover:text-[#f7f1e9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5a3c2d]/30"
                                             >
                                                  <Icon className="h-5 w-5" />
                                                  {label}
                                             </a>
                                        ))}
                                   </div>
                              </div>
                              <div className="space-y-4">
                                   <div className="rounded-[32px] border border-[#d8bfa5]/60 bg-white/75 p-8 shadow-[0_30px_70px_-55px_rgba(46,28,16,0.7)] backdrop-blur-sm">
                                        <p className="text-xs uppercase tracking-[0.4em] text-[#9b7d60]">Como chegar</p>


                                        <div className="mt-6 overflow-hidden rounded-[26px] border border-[#d8bfa5]/50">
                                             <iframe
                                                  title="Mapa da Pingo Doce Doceria"
                                                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.829094395685!2d-45.45842312386067!3d-22.914678438501845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cca8a1e8ddc031%3A0x42390deadbeef123!2sShopping%20P%C3%A1tio%20Pinda!5e0!3m2!1spt-BR!2sbr!4v1730330320000!5m2!1spt-BR!2sbr"
                                                  className="h-[320px] w-full border-0"
                                                  loading="lazy"
                                                  referrerPolicy="no-referrer-when-downgrade"
                                                  allowFullScreen
                                             />
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </motion.section>

                    <motion.section id="contact" className="relative overflow-hidden rounded-[36px] bg-[#f6efe6]/95 p-10 shadow-[0_40px_90px_-65px_rgba(42,23,13,0.8)]" {...sectionTransition}>
                         <div className={`${organicBlobClass} -left-24 top-0 h-56 w-56 bg-[#c7ae91]/45`} />
                         <div className={`${organicBlobClass} bottom-0 right-[-10%] h-64 w-64 bg-[#8a6347]/40`} />
                         <div className="relative z-10 space-y-8">
                              <div className="space-y-2">
                                   <p className="text-xs uppercase tracking-[0.4em] text-[#9b7d60]">Entre em Contato</p>
                                   <h3 className="font-serif text-4xl text-[#2f1b12]">Envie-nos uma mensagem</h3>
                                   <p className="text-sm leading-relaxed text-[#5c4030]">Adoraríamos ouvir de você. Preencha o formulário abaixo e entraremos em contato em breve.</p>
                              </div>
                              <form className="grid gap-6 md:grid-cols-2">
                                   <div className="space-y-2">
                                        <label htmlFor="name" className="block text-sm font-medium text-[#2f1b12]">Nome</label>
                                        <input
                                             id="name"
                                             type="text"
                                             placeholder="Seu nome"
                                             className="w-full rounded-3xl border border-[#d8bfa5] bg-white/70 px-6 py-3 text-sm text-[#2f1b12] placeholder-[#9b7d60] transition-all duration-200 focus:border-[#5a3c2d] focus:outline-none focus:ring-2 focus:ring-[#5a3c2d]/20"
                                        />
                                   </div>
                                   <div className="space-y-2">
                                        <label htmlFor="email" className="block text-sm font-medium text-[#2f1b12]">Email</label>
                                        <input
                                             id="email"
                                             type="email"
                                             placeholder="seu@email.com"
                                             className="w-full rounded-3xl border border-[#d8bfa5] bg-white/70 px-6 py-3 text-sm text-[#2f1b12] placeholder-[#9b7d60] transition-all duration-200 focus:border-[#5a3c2d] focus:outline-none focus:ring-2 focus:ring-[#5a3c2d]/20"
                                        />
                                   </div>
                                   <div className="space-y-2 md:col-span-2">
                                        <label htmlFor="subject" className="block text-sm font-medium text-[#2f1b12]">Assunto</label>
                                        <input
                                             id="subject"
                                             type="text"
                                             placeholder="Como podemos ajudá-lo?"
                                             className="w-full rounded-3xl border border-[#d8bfa5] bg-white/70 px-6 py-3 text-sm text-[#2f1b12] placeholder-[#9b7d60] transition-all duration-200 focus:border-[#5a3c2d] focus:outline-none focus:ring-2 focus:ring-[#5a3c2d]/20"
                                        />
                                   </div>
                                   <div className="space-y-2 md:col-span-2">
                                        <label htmlFor="message" className="block text-sm font-medium text-[#2f1b12]">Mensagem</label>
                                        <textarea
                                             id="message"
                                             placeholder="Sua mensagem aqui..."
                                             rows={5}
                                             className="w-full rounded-3xl border border-[#d8bfa5] bg-white/70 px-6 py-3 text-sm text-[#2f1b12] placeholder-[#9b7d60] transition-all duration-200 focus:border-[#5a3c2d] focus:outline-none focus:ring-2 focus:ring-[#5a3c2d]/20 resize-none"
                                        />
                                   </div>
                                   <button
                                        type="submit"
                                        className="w-full rounded-full bg-[#5a3c2d] px-8 py-3 text-sm font-semibold text-[#f7f1e9] shadow-[0_25px_45px_-30px_rgba(60,38,24,0.85)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4b2f21] md:col-span-2"
                                   >
                                        Enviar Mensagem
                                   </button>
                              </form>
                         </div>
                    </motion.section>
               </main>
               <footer className="border-t border-[#e0d2c1] bg-[#f6efe6]/90 py-8">
                    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-center text-sm text-[#5c4030] md:flex-row md:text-left">
                         <p className="font-serif text-lg text-[#2f1b12]">Pingo Doce Doceria</p>
                         <p>© {new Date().getFullYear()}Confeitaria Artesanal. Feito com amor no Shopping Pátio Pinda.</p>
                         <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-[#9b7d60]">
                              <span>Assado diariamente</span>
                              <span>•</span>
                              <span>Feito lentamente</span>
                         </div>
                    </div>
               </footer>
          </div>
     );
}

export default App;

