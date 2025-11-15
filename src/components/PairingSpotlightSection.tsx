import { motion } from "framer-motion";

const PairingSpotlightSection = () => {
     return (
          <motion.section
               id="pairing"
               className="relative overflow-hidden rounded-[36px] bg-[#f6efe6]/95 p-10 shadow-[0_40px_90px_-65px_rgba(42,23,13,0.8)]"
               initial={{ opacity: 0, y: 32 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, amount: 0.25 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
          >
               <div className="absolute -left-24 top-0 h-56 w-56 rounded-full bg-[#d6bda1]/45 opacity-70 blur-3xl mix-blend-multiply" />
               <div className="absolute bottom-[-18%] right-[-6%] h-64 w-64 rounded-full bg-[#8d6446]/35 opacity-70 blur-3xl mix-blend-multiply" />

               <div className="relative z-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="space-y-6">
                         <span className="inline-flex max-w-fit items-center gap-2 rounded-full bg-[#e6d5c7]/70 px-4 py-2 text-xs font-semibold tracking-[0.35em] text-[#8c6a4f]">
                              Harmonias do Mês
                         </span>
                         <h3 className="font-serif text-4xl text-[#2f1b12]">
                              Combinações aconchegantes para harmonizar café e doce
                         </h3>
                         <p className="max-w-xl text-sm leading-relaxed text-[#5c4030]">
                              A cada estação selecionamos uma dupla que celebra notas aromáticas e texturas contrastantes.
                              Experimente um ritual guiado que une grãos tostados lentamente com sobremesas de forno recém-saídas da bancada.
                         </p>
                         <div className="grid gap-6 sm:grid-cols-2">
                              <div className="rounded-3xl border border-[#e1d1bf] bg-white/65 p-5 text-sm text-[#5c4030] shadow-[0_20px_50px_-40px_rgba(66,41,25,0.55)]">
                                   <p className="text-[0.65rem] uppercase tracking-[0.32em] text-[#9b7d60]">
                                        Destaque de novembro
                                   </p>
                                   <p className="pt-3 font-serif text-lg text-[#2f1b12]">Flat White de Cacau + Tartelette de Figo</p>
                                   <p className="mt-3 text-xs leading-relaxed">
                                        Camadas cremosas de espresso com chocolate 70% abraçam o dulçor suave do figo caramelizado.
                                   </p>
                              </div>
                              <div className="rounded-3xl border border-[#e1d1bf] bg-white/65 p-5 text-sm text-[#5c4030] shadow-[0_20px_50px_-40px_rgba(66,41,25,0.55)]">
                                   <p className="text-[0.65rem] uppercase tracking-[0.32em] text-[#9b7d60]">
                                        Nota Sensorial
                                   </p>
                                   <p className="pt-3 font-serif text-lg text-[#2f1b12]">Perfil amendoado com especiarias sutis</p>
                                   <p className="mt-3 text-xs leading-relaxed">
                                        A torra média ressoa com cardamomo e fava tonka, criando um contraste suave com a massa amanteigada.
                                   </p>
                              </div>
                         </div>
                    </div>

                    <div className="relative overflow-hidden rounded-[32px] bg-[#f8f1e7]/80 shadow-[0_35px_65px_-40px_rgba(72,47,30,0.6)]">
                         <img
                              alt="Xícara de café com borda coberta de chocolate"
                              className="h-full w-full object-cover"
                              src="https://images.unsplash.com/photo-1615200961449-0d6d5a818f8e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                              loading="lazy"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-[#2f1b12]/45 via-transparent to-transparent" />
                         <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-[#f7efe3]/35 p-6 backdrop-blur">
                              <p className="text-xs uppercase tracking-[0.35em] text-[#e7c9ab]">Ritual guiado</p>
                              <p className="pt-3 font-serif text-2xl text-[#2f1b12]">Sessão sensorial de 20 minutos</p>
                              <p className="mt-3 text-sm text-[#634833]">
                                   Disponível de quinta a domingo às 17h. Garanta sua vaga com antecedência na loja ou pelo WhatsApp.
                              </p>
                         </div>
                    </div>
               </div>
          </motion.section>
     );
};

export default PairingSpotlightSection;
