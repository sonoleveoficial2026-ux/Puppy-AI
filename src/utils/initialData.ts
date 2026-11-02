import { PuppyProfile, FoodLabelAnalysisResult, VaccineRecord, BreedInfo, BarkAnalysisResult } from '../types';

export const SAMPLE_PUPPIES: PuppyProfile[] = [
  {
    id: 'pup-1',
    name: 'Bento',
    breed: 'Golden Retriever',
    ageWeeks: 12,
    weightKg: 8.5,
    expectedAdultWeightKg: 32.0,
    gender: 'macho',
    avatarUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80',
    microchipId: '982000361284910',
    tutorName: 'Mariana Silva'
  },
  {
    id: 'pup-2',
    name: 'Luna',
    breed: 'Bulldog Francês',
    ageWeeks: 18,
    weightKg: 6.2,
    expectedAdultWeightKg: 12.0,
    gender: 'femea',
    avatarUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
    microchipId: '982000375914283',
    tutorName: 'Lucas Castro'
  },
  {
    id: 'pup-3',
    name: 'Pipoca',
    breed: 'Vira-Lata (SRD)',
    ageWeeks: 9,
    weightKg: 3.1,
    expectedAdultWeightKg: 14.0,
    gender: 'femea',
    avatarUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    microchipId: '982000491823104',
    tutorName: 'Mariana & Lucas'
  }
];

export const PRESET_FOODS: FoodLabelAnalysisResult[] = [
  {
    brandName: 'Royal Canin Maxi Puppy - Active Growth',
    category: 'Super Premium',
    targetLifeStage: 'Filhotes de Raças Grandes (2 a 15 meses)',
    energyDensityKcal100g: 395,
    energyDensityKcalKg: 3950,
    guaranteedAnalysis: {
      crudeProteinPercent: 30.0,
      crudeFatPercent: 16.0,
      crudeFiberPercent: 2.9,
      moisturePercent: 9.5,
      calciumPercent: 1.25,
      phosphorusPercent: 1.0,
      dhaEpa: '0.17% DHA (Desenvolvimento cognitivo)',
      chondroprotectors: 'Glucosamina (500mg/kg) + Condroitina (100mg/kg)'
    },
    firstIngredients: [
      { name: 'Farinha de vísceras de aves desidratada', quality: 'excelente', note: 'Fonte nobre de proteína de alta digestibilidade' },
      { name: 'Arroz quebrado', quality: 'boa', note: 'Carboidrato de fácil assimilação entérica' },
      { name: 'Milho integral moído', quality: 'neutra', note: 'Fonte energética tradicional' },
      { name: 'Gordura de frango estabilizada', quality: 'excelente', note: 'Ácidos graxos essenciais ômega-6' },
      { name: 'Óleo de peixe refinado', quality: 'excelente', note: 'Fonte rica de EPA e DHA para cérebro e retina' }
    ],
    preservativesType: 'Antioxidantes naturais (tocoferóis mistos e extrato de alecrim)',
    overallVerdict: 'Fórmula de excelência clínica WSAVA, com aporte ideal de minerais e condroprotetores fundamentais para a saúde osteoarticular de filhotes em crescimento rápido.',
    strengths: [
      'Relação Cálcio:Fósforo impecável (1.25:1)',
      'Enriquecido com DHA para suporte neurológico',
      'Proteína de alto valor biológico (> 85% de digestibilidade)',
      'Mananoligossacarídeos (MOS) e FOS para microbiota saudável'
    ],
    cautions: [
      'Presença de subprodutos de milho em pequena proporção'
    ],
    scoreOutOf10: 9.4
  },
  {
    brandName: 'Premier Formula Filhotes Porte Médio',
    category: 'Super Premium',
    targetLifeStage: 'Filhotes de Raças Médias (desmame a 12 meses)',
    energyDensityKcal100g: 405,
    energyDensityKcalKg: 4050,
    guaranteedAnalysis: {
      crudeProteinPercent: 29.0,
      crudeFatPercent: 18.0,
      crudeFiberPercent: 3.0,
      moisturePercent: 10.0,
      calciumPercent: 1.3,
      phosphorusPercent: 0.95,
      dhaEpa: '0.15% DHA',
      chondroprotectors: 'Sulfato de Condroitina e Glucosamina'
    },
    firstIngredients: [
      { name: 'Farinha de vísceras de frango', quality: 'excelente', note: 'Proteína animal de primeira linha' },
      { name: 'Quirera de arroz', quality: 'boa', note: 'Sem glúten de trigo' },
      { name: 'Proteína isolada de suíno', quality: 'excelente', note: 'Rico em aminoácidos essenciais' },
      { name: 'Gordura de frango', quality: 'excelente', note: 'Palatabilidade e ácidos graxos essenciais' }
    ],
    preservativesType: 'BHA/BHT com adição de tocoferóis naturais',
    overallVerdict: 'Excelente balanceamento energético e protéico para filhotes médios com alta demanda metabólica.',
    strengths: [
      'Relação Ca:P equilibrada (1.37:1)',
      'Adição de prebióticos e polpa de beterraba',
      'Extrato de Yucca para redução de odor fecal'
    ],
    cautions: [
      'Uso de antioxidantes sintéticos em conjunto com naturais'
    ],
    scoreOutOf10: 8.9
  },
  {
    brandName: 'Biofresh Filhotes Super Premium Natural',
    category: 'Super Premium',
    targetLifeStage: 'Filhotes em Crescimento (Todas as Raças)',
    energyDensityKcal100g: 410,
    energyDensityKcalKg: 4100,
    guaranteedAnalysis: {
      crudeProteinPercent: 32.0,
      crudeFatPercent: 19.0,
      crudeFiberPercent: 2.5,
      moisturePercent: 9.0,
      calciumPercent: 1.2,
      phosphorusPercent: 1.0,
      dhaEpa: '0.22% DHA/EPA',
      chondroprotectors: 'Extrato de Mexilhão Verde + Glucosamina'
    },
    firstIngredients: [
      { name: 'Carnes frescas selecionadas (frango e fígado)', quality: 'excelente', note: 'Carnes frescas sem farinhas concentradas' },
      { name: 'Frutas e vegetais frescos (maçã, mamão, cenoura)', quality: 'excelente', note: 'Fitoquímicos e antioxidantes naturais' },
      { name: 'Arroz integral e aveia prensada', quality: 'excelente', note: 'Carboidratos complexos de baixo índice glicêmico' },
      { name: 'Óleo de salmão selvagem', quality: 'excelente', note: 'Rico em ômega-3 biodisponível' }
    ],
    preservativesType: '100% Conservação Natural (Tocoferóis, Extrato de Chá Verde e Alecrim)',
    overallVerdict: 'Fórmula Grain-Inclusive natural de altíssimo padrão, sem conservantes sintéticos, excelente biodisponibilidade para cachorros jovens.',
    strengths: [
      '100% preservada naturalmente sem BHA/BHT',
      'Carnes frescas como primeiros ingredientes',
      'Relação Ca:P estritamente WSAVA (1.20:1)',
      'Frutas e polifenóis ativos'
    ],
    cautions: [
      'Maior teor de gordura: necessita controle rigoroso da porção diária'
    ],
    scoreOutOf10: 9.7
  }
];

export const INITIAL_VACCINES: VaccineRecord[] = [
  {
    id: 'vac-1',
    name: 'V10 / V8 (1ª Dose)',
    description: 'Proteção contra Cinomose, Parvovirose, Hepatite, Coronavirose, Adenovirose e 4 sorovares de Leptospirose.',
    targetWeek: 6,
    dateAdministered: '2026-09-15',
    veterinarian: 'Dra. Camila Nogueira (CRMV 24910)',
    batchNumber: 'V10-9948B-ZOETIS',
    status: 'concluida',
    isCore: true
  },
  {
    id: 'vac-2',
    name: 'V10 / V8 (2ª Dose)',
    description: 'Reforço essencial para quebrar a janela de imunidade materna residual.',
    targetWeek: 10,
    dateAdministered: '2026-10-13',
    veterinarian: 'Dra. Camila Nogueira (CRMV 24910)',
    batchNumber: 'V10-10492-ZOETIS',
    status: 'concluida',
    isCore: true
  },
  {
    id: 'vac-3',
    name: 'V10 / V8 (3ª Dose)',
    description: 'Consolidação sorológica da imunidade humoral infantil canina.',
    targetWeek: 14,
    dateAdministered: undefined,
    veterinarian: 'Agendado na Clínica PetCare',
    batchNumber: undefined,
    status: 'agendada',
    isCore: true
  },
  {
    id: 'vac-4',
    name: 'V10 / V8 (4ª Dose Opcional ou Reforço 16 sem)',
    description: 'Recomendada pela WSAVA para filhotes em áreas com alta circulação viral ou raças de alto risco (Rottweiler, Doberman, Pitbull).',
    targetWeek: 16,
    status: 'futura',
    isCore: true
  },
  {
    id: 'vac-5',
    name: 'Vacina Antirrábica (Raiva Canina)',
    description: 'Obrigatória por lei no Brasil e países membros da OIE. Dose única a partir das 12 semanas.',
    targetWeek: 16,
    status: 'futura',
    isCore: true
  },
  {
    id: 'vac-6',
    name: 'Tosse dos Canis (Gripe Canina / Bordetella)',
    description: 'Prevenção contra Traqueobronquite Infecciosa Canina. Indispensável para filhotes que frequentam parques ou creches.',
    targetWeek: 10,
    dateAdministered: '2026-10-13',
    veterinarian: 'Dra. Camila Nogueira',
    batchNumber: 'BRD-4912-INTRANASAL',
    status: 'concluida',
    isCore: false
  },
  {
    id: 'vac-7',
    name: 'Vacina contra Giárdia Canina',
    description: 'Diminui a intensidade dos sinais clínicos e a eliminação de cistos no ambiente doméstico.',
    targetWeek: 12,
    status: 'agendada',
    isCore: false
  }
];

export const BREED_DATABASE: BreedInfo[] = [
  {
    id: 'golden-retriever',
    name: 'Golden Retriever',
    namePt: 'Golden Retriever',
    group: 'Esportivo / Caça / Companhia',
    origin: 'Escócia / Reino Unido',
    adultWeightRangeKg: [27, 36],
    lifeSpanYears: [10, 12],
    energyLevel: 'alta',
    coatCare: 'alto',
    trainability: 'facil',
    temperament: ['Amigável', 'Inteligente', 'Confiável', 'Devotado', 'Gentil com crianças'],
    nutritionNotes: 'Crescimento rápido exige controle estrito da relação Ca:P (1.1 a 1.4:1) para evitar displasia coxofemoral. Evite dietas hipercalóricas nos primeiros 12 meses.',
    healthPredispositions: ['Displasia coxofemoral', 'Displasia de cotovelo', 'Catarata juvenil', 'Cardiomiopatia'],
    sampleImageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'french-bulldog',
    name: 'French Bulldog',
    namePt: 'Bulldog Francês',
    group: 'Não-esportivo / Companhia',
    origin: 'França / Inglaterra',
    adultWeightRangeKg: [9, 14],
    lifeSpanYears: [10, 14],
    energyLevel: 'moderada',
    coatCare: 'baixo',
    trainability: 'moderado',
    temperament: ['Brincalhão', 'Afetuoso', 'Paciente', 'Sociável', 'Alerta'],
    nutritionNotes: 'Raça braquicefálica com sensibilidade digestiva e tendência a gases. Prefira croquetes com formato anatômico ergonômico e proteínas de alta digestibilidade.',
    healthPredispositions: ['Síndrome braquicefálica', 'Dermatite atópica', 'Hérnia de disco (IVDD)', 'Sensibilidade a calor'],
    sampleImageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'shih-tzu',
    name: 'Shih Tzu',
    namePt: 'Shih Tzu',
    group: 'Toy / Companhia',
    origin: 'Tibet / China',
    adultWeightRangeKg: [4.5, 8.5],
    lifeSpanYears: [12, 16],
    energyLevel: 'moderada',
    coatCare: 'alto',
    trainability: 'moderado',
    temperament: ['Carinhoso', 'Alegre', 'Leal', 'Dócil', 'Tranquilo'],
    nutritionNotes: 'Metabolismo basal acelerado na infância com risco de hipoglicemia se ficar mais de 6 horas sem comer até 16 semanas. Fracione em 4 refeições diárias.',
    healthPredispositions: ['Olho seco (KCS)', 'Urolitíase', 'Problemas dentários', 'Estenose de narinas'],
    sampleImageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'german-shepherd',
    name: 'German Shepherd',
    namePt: 'Pastor Alemão',
    group: 'Pastoreio / Trabalho',
    origin: 'Alemanha',
    adultWeightRangeKg: [28, 42],
    lifeSpanYears: [9, 13],
    energyLevel: 'muito alta',
    coatCare: 'moderado',
    trainability: 'facil',
    temperament: ['Corajoso', 'Inteligente', 'Protetor', 'Leal', 'Focado'],
    nutritionNotes: 'Sensibilidade entérica natural com maior permeabilidade intestinal. Ração com alta digestibilidade, prebióticos e índice de cálcio restrito a 1.2% máximo.',
    healthPredispositions: ['Displasia coxofemoral', 'Mielopatia degenerativa', 'Insuficiência pancreática exócrina (EPI)'],
    sampleImageUrl: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'poodle',
    name: 'Poodle (Toy / Médio)',
    namePt: 'Poodle (Toy & Médio)',
    group: 'Não-esportivo / Companhia',
    origin: 'Alemanha / França',
    adultWeightRangeKg: [3.5, 12],
    lifeSpanYears: [14, 18],
    energyLevel: 'alta',
    coatCare: 'alto',
    trainability: 'facil',
    temperament: ['Extremamente Inteligente', 'Atento', 'Fiel', 'Ágil', 'Instigante'],
    nutritionNotes: 'Crescimento dental acelerado com predisposição a tártaro e doença periodontal precoce. Croquetes com textura mecânica de escovação.',
    healthPredispositions: ['Luxação de patela', 'Atrofia progressiva de retina (PRA)', 'Doença periodontal'],
    sampleImageUrl: 'https://images.unsplash.com/photo-1605244863941-3a3ed921c60d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'srd-viralata',
    name: 'Mixed Breed / Mutts (SRD)',
    namePt: 'Vira-Lata (SRD / Sem Raça Definida)',
    group: 'Companhia / Versátil',
    origin: 'Brasil / Diversos',
    adultWeightRangeKg: [8, 24],
    lifeSpanYears: [13, 17],
    energyLevel: 'alta',
    coatCare: 'baixo',
    trainability: 'facil',
    temperament: ['Resiliente', 'Muito Afetuoso', 'Esperto', 'Carismático', 'Adaptável'],
    nutritionNotes: 'Grande vigor híbrido. Avalie o porte das patas e o peso aos 4 meses para estimar o peso adulto com mais precisão e ajustar o MER.',
    healthPredispositions: ['Geralmente menor incidência de doenças genéticas recessivas'],
    sampleImageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80'
  }
];

export const BARK_PRESETS: BarkAnalysisResult[] = [
  {
    vocalizationType: 'High-Pitched Repetitive Bark',
    vocalizationTypePt: 'Latido Agudo e Repetitivo',
    primaryEmotion: 'Excitação / Convite para Brincar (Play Solicitation)',
    confidencePercent: 94,
    acousticFeatures: {
      pitch: 'alto',
      tempo: 'rapido',
      urgency: 'baixa'
    },
    interpretation: 'O filhote está cheio de energia positiva acumulada, querendo interação humana ou chamando para correr/buscar um brinquedo.',
    recommendation: 'Engaje em um jogo de 10 minutos de enriquecimento ambiental ou comando básico de treino com petisco recompensatório.',
    bodyLanguageSigns: ['Reverência de brincadeira (frente baixa e traseiro empinado)', 'Cauda abanando solta', 'Olhos brilhantes e boca aberta sem tensão']
  },
  {
    vocalizationType: 'Low-Frequency Short Alert Bark',
    vocalizationTypePt: 'Latido Baixo e Espaçado de Alerta',
    primaryEmotion: 'Alerta Territorial / Insegurança Inicial',
    confidencePercent: 88,
    acousticFeatures: {
      pitch: 'baixo',
      tempo: 'lento',
      urgency: 'moderada'
    },
    interpretation: 'Detectou algum ruído incomum (passos no corredor, interfone, entrega) e está avisando a matilha da novidade no território.',
    recommendation: 'Não grite "quieto" (ele pensará que você está latindo junto). Acalme com voz suave, ofereça um brinquedo mastigável para redirecionar.',
    bodyLanguageSigns: ['Orelhas eretas voltadas para a fonte de som', 'Postura tensa parada', 'Pêlos da nuca levemente eriçados']
  },
  {
    vocalizationType: 'Soft High Whimpering / Crying',
    vocalizationTypePt: 'Gemidinho Agudo e Choro',
    primaryEmotion: 'Necessidade / Pedido de Atenção ou Fome',
    confidencePercent: 92,
    acousticFeatures: {
      pitch: 'alto',
      tempo: 'moderado',
      urgency: 'moderada'
    },
    interpretation: 'Típico chamado filial: precisa fazer xixi/cocô, quer colo, está com frio ou o comedouro está vazio.',
    recommendation: 'Verifique imediatamente a planilha de refeições e leve ao tapete higiênico. Se for hora de dormir, faça transição com paninho com seu cheiro.',
    bodyLanguageSigns: ['Olhar pedinte direto nos seus olhos', 'Girar em círculos próximo à porta ou ao pote', 'Patas levantadas']
  },
  {
    vocalizationType: 'Prolonged Howl / Yowl',
    vocalizationTypePt: 'Uivo Prolongado de Saudades',
    primaryEmotion: 'Ansiedade por Separação / Busca de Contato',
    confidencePercent: 90,
    acousticFeatures: {
      pitch: 'medio',
      tempo: 'lento',
      urgency: 'alta'
    },
    interpretation: 'Tentativa ancestral de vocalizar para que a família/tutor retorne. Sinal de solidão temporária.',
    recommendation: 'Pratique treinos de desensibilização com saídas curtas (2 a 5 min), use feromônios apaziguadores sintéticos (DAP) e som ambiente calmo.',
    bodyLanguageSigns: ['Focinho apontado para cima', 'Andar de um lado para o outro', 'Olhar desolado']
  },
  {
    vocalizationType: 'Play Growl / Grumble',
    vocalizationTypePt: 'Rosnado Brincalhão de Cabo de Guerra',
    primaryEmotion: 'Prazer Lúdico Inofensivo (Tug-of-War Joy)',
    confidencePercent: 96,
    acousticFeatures: {
      pitch: 'medio',
      tempo: 'rapido',
      urgency: 'baixa'
    },
    interpretation: 'Totalmente benigno! Ruído sonoro expressivo que filhotes emitem quando mordem cordas ou brinquedos com seus tutores.',
    recommendation: 'Deixe o filhote vencer de vez em quando para construir autoconfiança canina.',
    bodyLanguageSigns: ['Corpo relaxado e sinuoso', 'Mordedura suave no objeto sem rigidez facial']
  }
];
