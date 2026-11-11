import type { Localized } from './learningModules';
const t = (es: string, en: string): Localized => ({ es, en });

export const historySources: Record<string, { label: string; url: string }> = {
  'chm-babbage': { label: 'Computer History Museum · Babbage Engine', url: 'https://www.computerhistory.org/babbage/history/' },
  'chm-ada': { label: 'Computer History Museum · Ada Lovelace', url: 'https://www.computerhistory.org/babbage/adalovelace/' },
  'turing-1936': { label: 'Alan Turing · On Computable Numbers (1936)', url: 'https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf' },
  'chm-turing': { label: 'Computer History Museum · Turing', url: 'https://www.computerhistory.org/timeline/computers/' },
  'chm-computers': { label: 'Computer History Museum · Computer Timeline', url: 'https://www.computerhistory.org/timeline/computers/' },
  manchester: { label: 'University of Manchester · Manchester Baby', url: 'https://www.manchester.ac.uk/about/news/university-celebrates-babys-65th-birthday/' },
  'chm-silicon': { label: 'Computer History Museum · Silicon Engine', url: 'https://www.computerhistory.org/siliconengine/timeline/' },
  'chm-gui': { label: 'Computer History Museum · Computers', url: 'https://www.computerhistory.org/timeline/computers/' },
  'cern-web': { label: 'CERN · The birth of the Web', url: 'https://home.cern/science/computing/the-birth-of-the-web' },
  'internet-society': { label: 'Internet Society · A Brief History of the Internet', url: 'https://www.internetsociety.org/internet/history-internet/brief-history-internet/' },
  dartmouth: { label: 'Dartmouth · Artificial Intelligence at Dartmouth', url: 'https://home.dartmouth.edu/about/artificial-intelligence-ai-coined-dartmouth' },
  'eliza-paper': { label: 'ACM · ELIZA (1966)', url: 'https://dl.acm.org/doi/10.1145/365153.365168' },
  'chm-ai': { label: 'Computer History Museum · AI & Robotics', url: 'https://www.computerhistory.org/timeline/ai-robotics/' },
  'imagenet-paper': { label: 'CVPR · ImageNet (2009)', url: 'https://image-net.org/static_files/papers/imagenet_cvpr09.pdf' },
  'alexnet-paper': { label: 'NeurIPS · AlexNet (2012)', url: 'https://papers.nips.cc/paper_files/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html' },
  'transformer-paper': { label: 'arXiv · Attention Is All You Need', url: 'https://arxiv.org/abs/1706.03762' },
  'gpt3-paper': { label: 'arXiv · Language Models are Few-Shot Learners', url: 'https://arxiv.org/abs/2005.14165' },
  'nist-rmf': { label: 'NIST · AI Risk Management Framework 1.0', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
  'nist-genai': { label: 'NIST · Generative AI Profile', url: 'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence' },
  unesco: { label: 'UNESCO · Recommendation on AI Ethics', url: 'https://www.unesco.org/ethics-ai/en/recommendation' },
};

export type TimelineMilestone = { year: string; title: Localized; why: Localized; room: 'history' | 'ai'; sourceId: string };
export const historyTimeline: TimelineMilestone[] = [
  { year: '1834', title: t('Motor analítico de Babbage', 'Babbage’s Analytical Engine'), why: t('Diseño programable de propósito general.', 'General purpose programmable design.'), room: 'history', sourceId: 'chm-babbage' },
  { year: '1843', title: t('Notas de Ada Lovelace', 'Ada Lovelace’s notes'), why: t('Procedimiento de Bernoulli y visión simbólica.', 'Bernoulli procedure and symbolic vision.'), room: 'history', sourceId: 'chm-ada' },
  { year: '1936', title: t('Computación universal de Turing', 'Turing’s universal computation'), why: t('Modelo de algoritmo y de sus límites.', 'Model of algorithms and their limits.'), room: 'history', sourceId: 'turing-1936' },
  { year: '1946', title: t('Presentación pública de ENIAC', 'ENIAC publicly presented'), why: t('Cálculo electrónico a gran escala.', 'Large-scale electronic computing.'), room: 'history', sourceId: 'chm-computers' },
  { year: '1947', title: t('Transistor en Bell Labs', 'Bell Labs transistor'), why: t('Ruta hacia electrónica de estado sólido.', 'Path toward solid-state electronics.'), room: 'history', sourceId: 'chm-silicon' },
  { year: '1948', title: t('Manchester Baby', 'Manchester Baby'), why: t('Ejecutó un programa en memoria electrónica.', 'Ran a program in electronic memory.'), room: 'history', sourceId: 'manchester' },
  { year: '1956', title: t('Taller de Dartmouth', 'Dartmouth workshop'), why: t('Consolidó la IA como campo.', 'Consolidated AI as a field.'), room: 'ai', sourceId: 'dartmouth' },
  { year: '1958', title: t('Circuito integrado de Kilby', 'Kilby’s integrated circuit'), why: t('Integración de componentes.', 'Component integration.'), room: 'history', sourceId: 'chm-silicon' },
  { year: '1965', title: t('DENDRAL', 'DENDRAL'), why: t('Sistema experto pionero en química.', 'Pioneering chemistry expert system.'), room: 'ai', sourceId: 'chm-ai' },
  { year: '1966', title: t('ELIZA', 'ELIZA'), why: t('Conversación mediante patrones explícitos.', 'Conversation through explicit patterns.'), room: 'ai', sourceId: 'eliza-paper' },
  { year: '1971', title: t('Intel 4004', 'Intel 4004'), why: t('CPU comercial integrada en chip.', 'Commercial CPU integrated on a chip.'), room: 'history', sourceId: 'chm-computers' },
  { year: '1975', title: t('Altair 8800', 'Altair 8800'), why: t('Impulso a la microinformática.', 'Accelerated microcomputing.'), room: 'history', sourceId: 'chm-computers' },
  { year: '1981', title: t('IBM PC', 'IBM PC'), why: t('Adopción empresarial y compatibles.', 'Business adoption and compatibles.'), room: 'history', sourceId: 'chm-computers' },
  { year: '1983', title: t('ARPANET adopta TCP/IP; DNS emerge', 'ARPANET adopts TCP/IP; DNS emerges'), why: t('Interconexión y nombres de red.', 'Internetworking and network names.'), room: 'history', sourceId: 'internet-society' },
  { year: '1984', title: t('Macintosh', 'Macintosh'), why: t('Difusión comercial de interfaces gráficas.', 'Commercial spread of graphical interfaces.'), room: 'history', sourceId: 'chm-computers' },
  { year: '1989', title: t('Propuesta de la World Wide Web', 'World Wide Web proposal'), why: t('Hipertexto conectado en CERN.', 'Connected hypertext at CERN.'), room: 'history', sourceId: 'cern-web' },
  { year: '1997', title: t('Deep Blue vence a Kasparov', 'Deep Blue defeats Kasparov'), why: t('Hito de IA en una tarea estrecha.', 'Narrow-task AI milestone.'), room: 'ai', sourceId: 'chm-ai' },
  { year: '2009', title: t('ImageNet', 'ImageNet'), why: t('Datos etiquetados para evaluación visual.', 'Labelled data for vision evaluation.'), room: 'ai', sourceId: 'imagenet-paper' },
  { year: '2012', title: t('AlexNet', 'AlexNet'), why: t('Avance en clasificación de imágenes.', 'Image-classification breakthrough.'), room: 'ai', sourceId: 'alexnet-paper' },
  { year: '2017', title: t('Transformer', 'Transformer'), why: t('Arquitectura de atención para secuencias.', 'Attention architecture for sequences.'), room: 'ai', sourceId: 'transformer-paper' },
  { year: '2020', title: t('GPT-3', 'GPT-3'), why: t('Escala y aprendizaje con pocos ejemplos.', 'Scale and few-shot learning.'), room: 'ai', sourceId: 'gpt3-paper' },
  { year: '2021', title: t('Recomendación ética de UNESCO', 'UNESCO ethics recommendation'), why: t('Marco global de principios y políticas.', 'Global principles and policy framework.'), room: 'ai', sourceId: 'unesco' },
  { year: '2023', title: t('NIST AI RMF 1.0', 'NIST AI RMF 1.0'), why: t('Gestión de riesgos de IA.', 'AI risk management.'), room: 'ai', sourceId: 'nist-rmf' },
  { year: '2024', title: t('Perfil de IA generativa de NIST', 'NIST Generative AI Profile'), why: t('Riesgos específicos de IA generativa.', 'Generative-AI-specific risks.'), room: 'ai', sourceId: 'nist-genai' },
];

export const significantFacts = [
  { value: '≈18 000', label: t('tubos de vacío en ENIAC', 'vacuum tubes in ENIAC'), why: t('Muestra la escala física de la computación electrónica temprana.', 'Shows the physical scale of early electronic computing.'), sourceId: 'chm-computers' },
  { value: '2 250', label: t('transistores en Intel 4004', 'transistors in Intel 4004'), why: t('Una CPU comercial cabía en un chip.', 'A commercial CPU fit on one chip.'), sourceId: 'chm-computers' },
  { value: '21·06·1948', label: t('programa de Manchester Baby', 'Manchester Baby stored program'), why: t('Demostró instrucciones en memoria electrónica.', 'Demonstrated instructions in electronic memory.'), sourceId: 'manchester' },
  { value: '175 000 M', label: t('parámetros de GPT-3', 'GPT-3 parameters'), why: t('Ilustra la escala del hito de 2020, no inteligencia humana.', 'Illustrates the scale of the 2020 milestone, not human intelligence.'), sourceId: 'gpt3-paper' },
  { value: '2017', label: t('publicación del Transformer', 'Transformer publication'), why: t('La atención pasó a ser un mecanismo arquitectónico central.', 'Attention became a central architectural mechanism.'), sourceId: 'transformer-paper' },
  { value: '23·11·2021', label: t('recomendación de UNESCO', 'UNESCO recommendation'), why: t('Llevó derechos, gobernanza e impacto social al debate mundial.', 'Brought rights, governance and social impact to global debate.'), sourceId: 'unesco' },
];

export const exhibitionObjects = [
  ['1834', 'Motor analítico', 'Analytical Engine', 'Cálculos especializados', 'Specialised calculations', 'Instrucciones y almacén', 'Instructions and store', 'Modelo de propósito general', 'General purpose model', 'chm-babbage'],
  ['1936', 'Máquina de Turing', 'Turing machine', 'Definir el cálculo', 'Define computation', 'Reglas y cinta abstracta', 'Abstract tape and rules', 'Límites de lo computable', 'Limits of computability', 'turing-1936'],
  ['1946', 'ENIAC', 'ENIAC', 'Cálculos extensos', 'Lengthy calculations', 'Electrónica de tubos', 'Vacuum-tube electronics', 'Cálculo electrónico a escala', 'Electronic computing at scale', 'chm-computers'],
  ['1947', 'Transistor', 'Transistor', 'Tamaño y consumo', 'Size and power', 'Estado sólido', 'Solid state', 'Miniaturización gradual', 'Gradual miniaturisation', 'chm-silicon'],
  ['1958', 'Circuito integrado', 'Integrated circuit', 'Muchos componentes separados', 'Many separate components', 'Integración', 'Integration', 'Escala de fabricación', 'Manufacturing scale', 'chm-silicon'],
  ['1971', 'Intel 4004', 'Intel 4004', 'CPU distribuida', 'Distributed CPU', 'CPU en un chip', 'CPU on a chip', 'Microordenadores viables', 'Viable microcomputers', 'chm-computers'],
  ['1975', 'Altair 8800', 'Altair 8800', 'Acceso limitado a ordenadores', 'Limited computer access', 'Microordenador para aficionados', 'Hobbyist microcomputer', 'Nueva comunidad creadora', 'New maker community', 'chm-computers'],
  ['1973', 'Xerox Alto', 'Xerox Alto', 'Interacción difícil', 'Difficult interaction', 'GUI, ratón y red local', 'GUI, mouse and LAN', 'Influencia en interfaces futuras', 'Influence on later interfaces', 'chm-computers'],
  ['1981', 'IBM PC', 'IBM PC', 'Adopción empresarial dispersa', 'Fragmented business adoption', 'Plataforma y compatibles', 'Platform and compatibles', 'Amplio ecosistema', 'Broad ecosystem', 'chm-computers'],
  ['1983', 'TCP/IP', 'TCP/IP', 'Redes aisladas', 'Isolated networks', 'Protocolos de interconexión', 'Internetworking protocols', 'Internet interoperable', 'Interoperable Internet', 'internet-society'],
  ['1989', 'World Wide Web', 'World Wide Web', 'Información difícil de compartir', 'Hard-to-share information', 'Hipertexto y URL', 'Hypertext and URLs', 'Publicación global', 'Global publishing', 'cern-web'],
  ['2017', 'Transformer', 'Transformer', 'Modelado de secuencias costoso', 'Costly sequence modelling', 'Arquitectura basada en atención', 'Attention-based architecture', 'Nuevos modelos de lenguaje', 'New language models', 'transformer-paper'],
].map(([year, es, en, problemEs, problemEn, innovationEs, innovationEn, consequenceEs, consequenceEn, sourceId], index) => ({
  index, year, title: t(es, en), problem: t(problemEs, problemEn), innovation: t(innovationEs, innovationEn), consequence: t(consequenceEs, consequenceEn), sourceId,
}));
