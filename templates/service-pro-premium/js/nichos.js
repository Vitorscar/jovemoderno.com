/* ============================================================
   Service Pro Premium — dados por nicho
   Cada chave é um segmento com tema, conteúdo e seções ativas.
   ============================================================ */

const WHATS_PADRAO = "5561900000000"; // fictício — trocar por cliente real

const nichos = {

  /* ─────────────── ACADEMIA ─────────────── */
  academia: {
    nome: "Iron Shape",
    corPrimaria: "#8B5CF6",
    corSecundaria: "#1A1A2E",
    hero: {
      tipo: "gradient",
      src: "",
      headline: "Transforme seu corpo com acompanhamento profissional",
      subheadline: "Treinos personalizados para todos os níveis, com equipe certificada e estrutura completa.",
      cta1: { texto: "Agendar aula grátis", link: "#agendamento" },
      cta2: { texto: "Falar no WhatsApp", link: "" }
    },
    blocosAtivos: ["hero","diferencial","servicos","processo","planos","agendamento","avaliacoes","faq","localizacao","ctaFinal"],
    diferenciais: [
      { icone: "🏋️", titulo: "Equipamentos novos", desc: "Aparelhos importados de última geração." },
      { icone: "👨‍🏫", titulo: "Profissionais certificados", desc: "Formação superior em Educação Física." },
      { icone: "⏰", titulo: "Horário flexível", desc: "Aberto das 5h às 23h, todos os dias." },
      { icone: "🧘", titulo: "Aulas coletivas", desc: "Spinning, jump, yoga e muito mais." }
    ],
    servicos: [
      { icone: "💪", titulo: "Musculação", desc: "Equipamentos modernos e acompanhamento de professor." },
      { icone: "🔥", titulo: "Treino funcional", desc: "Alta queima calórica e condicionamento físico." },
      { icone: "🥊", titulo: "Boxe & Muay Thai", desc: "Artes marciais para defesa pessoal e preparo." },
      { icone: "👤", titulo: "Personal trainer", desc: "Atendimento exclusivo e individualizado." }
    ],
    processo: [
      { titulo: "Agende sua aula experimental", desc: "Escolha o melhor horário e venha conhecer." },
      { titulo: "Faça uma avaliação física", desc: "Nossos profissionais analisam seu perfil." },
      { titulo: "Treine com acompanhamento", desc: "Siga seu plano de treinos personalizado." }
    ],
    planos: [
      { nome: "Básico", preco: "R$ 89", beneficios: ["Musculação livre","Aulas coletivas","Avaliação inicial"] },
      { nome: "Premium", preco: "R$ 149", beneficios: ["Tudo do Básico","Personal 2x/semana","Nutricionista"] },
      { nome: "VIP", preco: "R$ 249", beneficios: ["Tudo do Premium","Personal ilimitado","Vaga na garagem"] }
    ],
    agendamento: { tipo: "form" },
    avaliacoes: [
      { nome: "Marina S.", texto: "Em 3 meses perdi 8kg e ganhei massa magra!", nota: 5 },
      { nome: "Carlos E.", texto: "Os professores são muito atenciosos, ambiente incrível.", nota: 5 }
    ],
    faq: [
      { pergunta: "Preciso ter experiência?", resposta: "Não! Atendemos desde iniciantes até atletas." },
      { pergunta: "Como funciona a aula experimental?", resposta: "Você agenda um horário e participa normalmente, sem compromisso." }
    ],
    localizacao: { endereco: "Rua do Aço, 200 — Centro", mapa: "" },
    ctaFinal: { texto: "Pronto para mudar de vida?", cta: "Agendar aula grátis", link: "#agendamento" }
  },

  /* ─────────────── ADVOGADO ─────────────── */
  advogado: {
    nome: "Souza & Advogados Associados",
    corPrimaria: "#1E3A5F",
    corSecundaria: "#0F172A",
    hero: {
      tipo: "gradient",
      src: "",
      headline: "Assessoria jurídica com experiência e confiança",
      subheadline: "Mais de 15 anos defendendo seus direitos com atendimento personalizado.",
      cta1: { texto: "Agendar consulta", link: "#agendamento" },
      cta2: { texto: "Falar no WhatsApp", link: "" }
    },
    blocosAtivos: ["hero","diferencial","servicos","processo","equipe","agendamento","avaliacoes","faq","localizacao","ctaFinal"],
    diferenciais: [
      { icone: "⚖️", titulo: "Atuação especializada", desc: "Direito civil, trabalhista e empresarial." },
      { icone: "📋", titulo: "Atendimento personalizado", desc: "Cada caso tratado com exclusividade." },
      { icone: "🏆", titulo: "15 anos de experiência", desc: "Centenas de processos bem-sucedidos." }
    ],
    servicos: [
      { icone: "👥", titulo: "Direito trabalhista", desc: "Reclamações trabalhistas, acordos e defesas." },
      { icone: "🏢", titulo: "Direito empresarial", desc: "Contratos, societário e recuperação judicial." },
      { icone: "🏠", titulo: "Direito imobiliário", desc: "Compra, venda, locação e regularização." },
      { icone: "👨‍👩‍👧‍👦", titulo: "Direito de família", desc: "Divórcio, pensão e guarda." }
    ],
    processo: [
      { titulo: "Consulta inicial", desc: "Entendemos seu caso e as melhores estratégias." },
      { titulo: "Análise documental", desc: "Reunimos provas e elaboramos a defesa." },
      { titulo: "Ação judicial", desc: "Protocolamos e acompanhamos até a decisão final." }
    ],
    equipe: [
      { nome: "Dr. Carlos Souza", funcao: "Sócio fundador", foto: "" },
      { nome: "Dra. Ana Lima", funcao: "Advogada sênior", foto: "" }
    ],
    agendamento: { tipo: "form" },
    avaliacoes: [
      { nome: "João P.", texto: "Resolveram meu caso trabalhista rapidamente. Muito profissional.", nota: 5 }
    ],
    faq: [
      { pergunta: "Quanto custa uma consulta?", resposta: "A primeira consulta é gratuita para avaliar o caso." },
      { pergunta: "Quanto tempo dura um processo?", resposta: "Depende da área e complexidade, explicamos na consulta." }
    ],
    localizacao: { endereco: "Av. Central, 1000 — 15º andar", mapa: "" },
    ctaFinal: { texto: "Pronto para defender seus direitos?", cta: "Agendar consulta", link: "#agendamento" }
  },

  /* ─────────────── DENTISTA ─────────────── */
  dentista: {
    nome: "Sorriso Prime Odontologia",
    corPrimaria: "#06B6D4",
    corSecundaria: "#0A1929",
    hero: {
      tipo: "gradient",
      src: "",
      headline: "Seu sorriso merece cuidado especializado",
      subheadline: "Tratamentos estéticos e clínicos em ambiente moderno, com tecnologia e conforto.",
      cta1: { texto: "Agendar avaliação", link: "#agendamento" },
      cta2: { texto: "Falar no WhatsApp", link: "" }
    },
    blocosAtivos: ["hero","diferencial","servicos","processo","antesDepois","agendamento","avaliacoes","faq","localizacao","ctaFinal"],
    diferenciais: [
      { icone: "🦷", titulo: "Tecnologia digital", desc: "Radiografia digital e escaneamento 3D." },
      { icone: "💉", titulo: "Sem dor", desc: "Anestesia moderna e procedimentos minimamente invasivos." },
      { icone: "⏱️", titulo: "Atendimento pontual", desc: "Seu horário respeitado, sem espera." }
    ],
    servicos: [
      { icone: "🦷", titulo: "Clínica geral", desc: "Limpeza, restauração e tratamento preventivo." },
      { icone: "✨", titulo: "Clareamento", desc: "Dentes mais brancos em poucas sessões." },
      { icone: "😁", titulo: "Ortodontia", desc: "Aparelhos fixos e alinhadores invisíveis." },
      { icone: "🔬", titulo: "Implantes", desc: "Reposição de dentes com técnica avançada." }
    ],
    processo: [
      { titulo: "Avaliação completa", desc: "Exame clínico e radiográfico para diagnóstico." },
      { titulo: "Plano de tratamento", desc: "Apresentamos etapas, prazos e valores." },
      { titulo: "Acompanhamento", desc: "Retornos programados até o resultado final." }
    ],
    antesDepois: {
      titulo: "Antes & Depois",
      imagens: []
    },
    agendamento: { tipo: "form" },
    avaliacoes: [
      { nome: "Patrícia L.", texto: "Fiz clareamento e o resultado ficou incrível!", nota: 5 }
    ],
    faq: [
      { pergunta: "Aceita convênio?", resposta: "Trabalhamos com os principais convênios odontológicos." },
      { pergunta: "Quanto tempo dura o tratamento?", resposta: "Depende do caso. Damos previsão após a avaliação." }
    ],
    localizacao: { endereco: "Rua das Flores, 500 — Sala 12", mapa: "" },
    ctaFinal: { texto: "Pronto para sorrir com confiança?", cta: "Agendar avaliação", link: "#agendamento" }
  },

  /* ─────────────── ESTÉTICA ─────────────── */
  estetica: {
    nome: "Belle Estética Avançada",
    corPrimaria: "#D946A0",
    corSecundaria: "#1A0F24",
    hero: {
      tipo: "gradient",
      src: "",
      headline: "Beleza e bem-estar em cada detalhe",
      subheadline: "Tratamentos faciais e corporais com tecnologia de ponta e profissionais especializadas.",
      cta1: { texto: "Agendar avaliação", link: "#agendamento" },
      cta2: { texto: "Falar no WhatsApp", link: "" }
    },
    blocosAtivos: ["hero","diferencial","servicos","processo","antesDepois","agendamento","avaliacoes","faq","localizacao","ctaFinal"],
    diferenciais: [
      { icone: "✨", titulo: "Tecnologia importada", desc: "Equipamentos de última geração." },
      { icone: "🌸", titulo: "Ambiente acolhedor", desc: "Espaço pensado para o seu relaxamento." },
      { icone: "👩‍⚕️", titulo: "Profissionais certificadas", desc: "Equipe especializada em estética avançada." }
    ],
    servicos: [
      { icone: "💆", titulo: "Limpeza de pele", desc: "Tratamento profundo com extração e hidratação." },
      { icone: "🌟", titulo: "Peeling", desc: "Renovação celular e melhora da textura da pele." },
      { icone: "💉", titulo: "Harmonização facial", desc: "Preenchimento e botox com naturalidade." },
      { icone: "🧴", titulo: "Tratamentos corporais", desc: "Drenagem, massagens e redução de medidas." }
    ],
    processo: [
      { titulo: "Avaliação personalizada", desc: "Analisamos sua pele e seus objetivos." },
      { titulo: "Plano sob medida", desc: "Definimos sessões, produtos e frequência." },
      { titulo: "Resultados acompanhados", desc: "Registro do antes e depois em cada etapa." }
    ],
    antesDepois: {
      titulo: "Resultados reais",
      imagens: []
    },
    agendamento: { tipo: "form" },
    avaliacoes: [
      { nome: "Juliana M.", texto: "Minha pele mudou completamente depois do tratamento.", nota: 5 }
    ],
    faq: [
      { pergunta: "Preciso de avaliação antes?", resposta: "Sim, toda cliente passa por avaliação antes do tratamento." },
      { pergunta: "Os procedimentos doem?", resposta: "Usamos técnicas minimamente invasivas com foco em conforto." }
    ],
    localizacao: { endereco: "Av. Beleza, 300 — Sala 201", mapa: "" },
    ctaFinal: { texto: "Sua beleza merece cuidado profissional", cta: "Agendar avaliação", link: "#agendamento" }
  },

  /* ─────────────── MECÂNICO ─────────────── */
  mecanico: {
    nome: "Auto Center Turbo",
    corPrimaria: "#F59E0B",
    corSecundaria: "#1A1208",
    hero: {
      tipo: "gradient",
      src: "",
      headline: "Cuidado completo para o seu veículo",
      subheadline: "Mecânica geral, revisão, injeção eletrônica e diagnóstico computadorizado.",
      cta1: { texto: "Agendar revisão", link: "#agendamento" },
      cta2: { texto: "Falar no WhatsApp", link: "" }
    },
    blocosAtivos: ["hero","diferencial","servicos","processo","agendamento","avaliacoes","faq","localizacao","ctaFinal"],
    diferenciais: [
      { icone: "🔧", titulo: "Equipe experiente", desc: "Mecânicos com mais de 15 anos de oficina." },
      { icone: "💻", titulo: "Diagnóstico digital", desc: "Scanner automotivo para identificar falhas." },
      { icone: "🛡️", titulo: "Garantia de serviço", desc: "90 dias de garantia em qualquer reparo." }
    ],
    servicos: [
      { icone: "🛠️", titulo: "Revisão completa", desc: "Check-up com mais de 40 itens verificados." },
      { icone: "🔌", titulo: "Injeção eletrônica", desc: "Diagnóstico e reparo com scanner profissional." },
      { icone: "🛑", titulo: "Freios e suspensão", desc: "Pastilhas, discos, amortecedores e alinhamento." },
      { icone: "⚙️", titulo: "Motor e câmbio", desc: "Reparos complexos com peças originais." }
    ],
    processo: [
      { titulo: "Agendamento", desc: "Escolha o melhor dia e horário pelo WhatsApp." },
      { titulo: "Diagnóstico", desc: "Analisamos o veículo e enviamos o orçamento." },
      { titulo: "Reparo e entrega", desc: "Executamos o serviço com garantia por escrito." }
    ],
    agendamento: { tipo: "form" },
    avaliacoes: [
      { nome: "Rodrigo T.", texto: "Resolveram um problema que ninguém achava. Recomendo!", nota: 5 }
    ],
    faq: [
      { pergunta: "Vocês parcelam?", resposta: "Sim, em até 12x no cartão de crédito." },
      { pergunta: "Usam peças originais?", resposta: "Trabalhamos com originais e similares de linha premium." }
    ],
    localizacao: { endereco: "Av. das Oficinas, 700 — Galpão 3", mapa: "" },
    ctaFinal: { texto: "Seu carro em boas mãos", cta: "Agendar revisão", link: "#agendamento" }
  },

  /* ─────────────── ENGENHARIA ─────────────── */
  engenharia: {
    nome: "Estrutura Engenharia & Projetos",
    corPrimaria: "#0EA5E9",
    corSecundaria: "#0A1929",
    hero: {
      tipo: "gradient",
      src: "",
      headline: "Projetos e obras com precisão técnica",
      subheadline: "Engenharia civil e estrutural para construções residenciais e comerciais.",
      cta1: { texto: "Solicitar orçamento", link: "#agendamento" },
      cta2: { texto: "Falar no WhatsApp", link: "" }
    },
    blocosAtivos: ["hero","diferencial","servicos","processo","portfolio","agendamento","avaliacoes","faq","localizacao","ctaFinal"],
    diferenciais: [
      { icone: "📐", titulo: "Projetos 3D", desc: "Visualização completa antes de construir." },
      { icone: "🏆", titulo: "CREA ativo", desc: "Equipe com registro profissional em dia." },
      { icone: "⏱️", titulo: "Prazo cumprido", desc: "Cronograma detalhado e execução disciplinada." }
    ],
    servicos: [
      { icone: "🏠", titulo: "Projeto residencial", desc: "Plantas, estrutura e instalações completas." },
      { icone: "🏢", titulo: "Projeto comercial", desc: "Edifícios corporativos e galpões industriais." },
      { icone: "🛠️", titulo: "Execução de obra", desc: "Gestão completa do início ao acabamento." },
      { icone: "📋", titulo: "Regularização", desc: "Aprovação em prefeitura e documentação." }
    ],
    processo: [
      { titulo: "Briefing", desc: "Entendemos o terreno, o orçamento e o prazo." },
      { titulo: "Projeto", desc: "Desenvolvemos plantas, estrutura e 3D." },
      { titulo: "Execução", desc: "Coordenamos a obra com relatórios periódicos." }
    ],
    portfolio: {
      categorias: ["Residencial","Comercial","Industrial"],
      imagens: []
    },
    agendamento: { tipo: "form" },
    avaliacoes: [
      { nome: "Fernanda G.", texto: "Entregaram nossa casa no prazo combinado. Excelente equipe.", nota: 5 }
    ],
    faq: [
      { pergunta: "Vocês fazem visita técnica?", resposta: "Sim, agendamos uma visita gratuita para avaliação inicial." },
      { pergunta: "Quanto tempo leva um projeto?", resposta: "Depende do porte, mas costuma ficar entre 30 e 90 dias." }
    ],
    localizacao: { endereco: "Av. Engenheiros, 400 — Sala 501", mapa: "" },
    ctaFinal: { texto: "Vamos construir juntos?", cta: "Solicitar orçamento", link: "#agendamento" }
  },

  /* ─────────────── FOTÓGRAFO ─────────────── */
  fotografo: {
    nome: "Lucas Mendes Fotografia",
    corPrimaria: "#D4A373",
    corSecundaria: "#1E1E1E",
    hero: {
      tipo: "gradient",
      src: "",
      headline: "Registrando momentos que duram para sempre",
      subheadline: "Ensaios externos, eventos e books profissionais com direção e edição premium.",
      cta1: { texto: "Ver portfólio", link: "#portfolio" },
      cta2: { texto: "Falar no WhatsApp", link: "" }
    },
    blocosAtivos: ["hero","diferencial","servicos","processo","portfolio","agendamento","avaliacoes","faq","localizacao","ctaFinal"],
    diferenciais: [
      { icone: "📷", titulo: "Equipamento full frame", desc: "Câmeras e lentes de última geração." },
      { icone: "🎬", titulo: "Making of em vídeo", desc: "Incluímos vídeos de bastidores." },
      { icone: "🖼️", titulo: "Edição premium", desc: "Tratamento profissional de todas as fotos." }
    ],
    servicos: [
      { icone: "💍", titulo: "Casamentos", desc: "Cobertura completa com álbum digital." },
      { icone: "👶", titulo: "Ensaios infantis", desc: "Fotos lúdicas em estúdio ou ao ar livre." },
      { icone: "🌆", titulo: "Ensaios externos", desc: "Book em parques, praias e pontos turísticos." },
      { icone: "🏢", titulo: "Eventos corporativos", desc: "Congressos, formaturas e confraternizações." }
    ],
    processo: [
      { titulo: "Briefing", desc: "Conversamos sobre o seu estilo e local." },
      { titulo: "Ensaio", desc: "Realizamos as fotos com direção natural." },
      { titulo: "Pós-produção", desc: "Editamos e entregamos em alta resolução." }
    ],
    portfolio: {
      categorias: ["Casamentos","Infantil","Externo"],
      imagens: []
    },
    agendamento: { tipo: "form" },
    avaliacoes: [
      { nome: "Amanda R.", texto: "As fotos do meu casamento ficaram perfeitas!", nota: 5 }
    ],
    faq: [
      { pergunta: "Qual o prazo de entrega?", resposta: "Álbuns digitais em até 15 dias úteis." }
    ],
    localizacao: { endereco: "Estúdio no Centro — Rua das Artes, 50", mapa: "" },
    ctaFinal: { texto: "Vamos criar algo juntos?", cta: "Solicitar orçamento", link: "#agendamento" }
  },

  /* ─────────────── OUTRO (genérico) ─────────────── */
  outro: {
    nome: "Seu Negócio",
    corPrimaria: "#3B82F6",
    corSecundaria: "#0F172A",
    hero: {
      tipo: "gradient",
      src: "",
      headline: "Sua headline impactante aqui",
      subheadline: "Um subtítulo que reforça a proposta de valor do seu negócio.",
      cta1: { texto: "Fale conosco", link: "#agendamento" },
      cta2: { texto: "Falar no WhatsApp", link: "" }
    },
    blocosAtivos: ["hero","diferencial","servicos","processo","agendamento","avaliacoes","faq","localizacao","ctaFinal"],
    diferenciais: [
      { icone: "⭐", titulo: "Diferencial 1", desc: "Descreva um ponto forte do seu negócio." },
      { icone: "🎯", titulo: "Diferencial 2", desc: "O que te torna único na sua área." },
      { icone: "💎", titulo: "Diferencial 3", desc: "Um benefício claro para o cliente." }
    ],
    servicos: [
      { icone: "🛠️", titulo: "Serviço 1", desc: "Descrição curta do primeiro serviço." },
      { icone: "⚙️", titulo: "Serviço 2", desc: "Descrição curta do segundo serviço." },
      { icone: "📦", titulo: "Serviço 3", desc: "Descrição curta do terceiro serviço." }
    ],
    processo: [
      { titulo: "Primeiro passo", desc: "O que acontece quando o cliente procura você." },
      { titulo: "Segundo passo", desc: "Como você conduz o trabalho." },
      { titulo: "Entrega", desc: "O que o cliente recebe no final." }
    ],
    agendamento: { tipo: "form" },
    avaliacoes: [
      { nome: "Cliente A.", texto: "Excelente atendimento e resultado.", nota: 5 }
    ],
    faq: [
      { pergunta: "Como funciona?", resposta: "Explique de forma simples o seu processo." },
      { pergunta: "Quais formas de pagamento?", resposta: "Liste aqui as opções que você aceita." }
    ],
    localizacao: { endereco: "Endereço do seu negócio", mapa: "" },
    ctaFinal: { texto: "Vamos trabalhar juntos?", cta: "Entrar em contato", link: "#agendamento" }
  }
};

/* Corrige CTA de WhatsApp em todos os nichos */
Object.values(nichos).forEach(n => {
  if (n.hero?.cta2 && !n.hero.cta2.link) {
    n.hero.cta2.link = `https://wa.me/${WHATS_PADRAO}?text=${encodeURIComponent('Olá! Vim pelo site e quero mais informações.')}`;
  }
});