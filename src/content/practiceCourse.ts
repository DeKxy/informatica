import type { Localized } from './learningModules';
const t = (es: string, en: string): Localized => ({ es, en });
type Option = { id: string; label: Localized };
type Prompt = { id: string; label: Localized; answer: string; explanation: Localized };
export type PracticeExercise = {
  id: string; title: Localized; brief: Localized; hint: Localized; takeaway: Localized;
  kind: 'choice' | 'match' | 'order'; options: Option[]; prompts: Prompt[];
};
const option = (id: string, es: string, en: string): Option => ({ id, label: t(es, en) });
const prompt = (id: string, es: string, en: string, answer: string, whyEs: string, whyEn: string): Prompt => ({ id, label: t(es, en), answer, explanation: t(whyEs, whyEn) });
export const practiceCourses: Record<'cybersecurity' | 'history-ai', PracticeExercise[]> = {
  cybersecurity: [
    {
      id: 'practice-cyber-phishing', kind: 'choice', title: t('Un mensaje urgente', 'An urgent message'),
      brief: t('Caso ficticio: recibes «Tu cuenta se cierra hoy. Inicia sesión en campus-verificacion.example». No has solicitado ninguna gestión.', 'Fictional case: you receive “Your account closes today. Sign in at campus-verification.example”. You have not requested any action.'),
      hint: t('La urgencia y un enlace no verificado requieren comprobar por un canal independiente.', 'Urgency and an unverified link call for an independent check.'),
      options: [option('open', 'Abrir el enlace y comprobar el logotipo', 'Open the link and check the logo'), option('verify', 'Abrir la web oficial por mi cuenta y consultar allí', 'Open the official site independently and check there'), option('reply', 'Responder con mis credenciales para verificar', 'Reply with my credentials to verify')],
      prompts: [prompt('action', '¿Qué haces primero?', 'What do you do first?', 'verify', 'El logotipo se puede copiar. Acceder por un canal conocido permite contrastar el aviso sin entregar credenciales al remitente.', 'A logo can be copied. A known channel lets you verify the notice without handing credentials to the sender.')],
      takeaway: t('Verifica el canal antes de actuar sobre el mensaje.', 'Verify the channel before acting on the message.'),
    },
    {
      id: 'practice-cyber-cia', kind: 'match', title: t('¿Qué estás protegiendo?', 'What are you protecting?'),
      brief: t('Clasifica el objetivo principal de cada medida en un aula virtual.', 'Classify the main objective of each measure in a virtual classroom.'),
      hint: t('Piensa en quién puede ver, si los datos cambian y si el servicio sigue disponible.', 'Think about who can see, whether data changes and whether the service stays available.'),
      options: [option('confidentiality', 'Confidencialidad', 'Confidentiality'), option('integrity', 'Integridad', 'Integrity'), option('availability', 'Disponibilidad', 'Availability')],
      prompts: [prompt('grades', 'Solo cada estudiante puede leer sus notas.', 'Only each student can read their own grades.', 'confidentiality', 'Limita la divulgación a personas autorizadas.', 'It limits disclosure to authorised people.'), prompt('changes', 'Se detecta una modificación no autorizada de una nota.', 'An unauthorised grade change is detected.', 'integrity', 'Se protege la exactitud frente a cambios indebidos.', 'It protects accuracy against improper changes.'), prompt('service', 'Un sistema redundante mantiene el aula accesible ante una avería.', 'A redundant system keeps the classroom accessible after a failure.', 'availability', 'El objetivo principal es mantener el acceso al servicio.', 'The main goal is to maintain access to the service.')],
      takeaway: t('Una medida puede ayudar a varios objetivos; aquí identificamos su función principal.', 'A measure may support several goals; here we identify its main function.'),
    },
    {
      id: 'practice-cyber-response', kind: 'order', title: t('Credenciales expuestas', 'Exposed credentials'),
      brief: t('Has introducido una contraseña de un servicio educativo en una página sospechosa. Ordena este protocolo simplificado de respuesta personal.', 'You entered an educational service password on a suspicious page. Order this simplified personal response protocol.'),
      hint: t('Primero deja de interactuar con la página. Usa después un canal oficial, contiene el acceso y comunica el incidente.', 'First stop interacting with the page. Then use an official channel, contain access and report the incident.'),
      options: [option('stop', 'Cerrar la página sospechosa y no aportar más datos', 'Close the suspicious page and provide no more data'), option('password', 'Desde la web oficial, cambiar la contraseña comprometida', 'Change the compromised password through the official site'), option('sessions', 'Revocar sesiones desconocidas y revisar la autenticación multifactor', 'Revoke unknown sessions and review multi-factor authentication'), option('report', 'Notificar al soporte oficial y revisar posibles usos indebidos', 'Notify official support and review possible misuse')], prompts: [],
      takeaway: t('En una organización sigue su protocolo y avisa al equipo responsable cuanto antes; estas acciones pueden coordinarse en paralelo.', 'In an organisation follow its protocol and alert the responsible team promptly; these actions can be coordinated in parallel.'),
    },
    {
      id: 'practice-cyber-evidence', kind: 'match', title: t('De la pista a la conclusión', 'From clue to conclusion'),
      brief: t('Una investigación OSINT ficticia analiza datos públicos. Distingue una observación de una hipótesis y de una conclusión no justificada.', 'A fictional OSINT investigation examines public data. Distinguish an observation from a hypothesis and an unsupported conclusion.'),
      hint: t('Que dos datos coincidan no demuestra que tengan el mismo origen o propietario.', 'Two matching details do not prove they have the same origin or owner.'),
      options: [option('observation', 'Observación', 'Observation'), option('hypothesis', 'Hipótesis por contrastar', 'Hypothesis to test'), option('unsupported', 'Conclusión no justificada', 'Unsupported conclusion')],
      prompts: [prompt('photo', 'Dos páginas públicas muestran la misma imagen.', 'Two public pages display the same image.', 'observation', 'Describe lo que se ha observado, sin atribuir identidad.', 'It describes what was observed without attributing identity.'), prompt('related', 'Las páginas podrían estar relacionadas.', 'The pages might be related.', 'hypothesis', 'Es una posibilidad que requiere fuentes independientes.', 'It is a possibility that needs independent sources.'), prompt('identity', 'La imagen demuestra que ambas cuentas pertenecen a la misma persona.', 'The image proves both accounts belong to the same person.', 'unsupported', 'Una imagen puede copiarse; no basta para demostrar identidad.', 'An image can be copied; it cannot establish identity on its own.')],
      takeaway: t('Documenta la incertidumbre y evita identificar personas a partir de una coincidencia.', 'Document uncertainty and avoid identifying people from a single match.'),
    },
    {
      id: 'practice-cyber-metadata', kind: 'choice', title: t('Antes de publicar una foto', 'Before publishing a photo'),
      brief: t('Un archivo de ejemplo incluye coordenadas GPS y fecha de captura. Lo quieres compartir públicamente. No se necesita subir ningún archivo real.', 'An example file contains GPS coordinates and a capture date. You want to share it publicly. No real upload is needed.'),
      hint: t('La información visible y los metadatos son dos fuentes distintas de exposición.', 'Visible information and metadata are two separate sources of exposure.'),
      options: [option('rename', 'Cambiar el nombre del archivo', 'Rename the file'), option('review', 'Revisar la imagen, quitar los metadatos innecesarios y comprobar la copia', 'Review the image, remove unnecessary metadata and check the copy'), option('trust', 'Asumir que todas las plataformas eliminan todos los datos', 'Assume every platform removes all data')],
      prompts: [prompt('decision', '¿Qué opción reduce la exposición de forma verificable?', 'Which option verifiably reduces exposure?', 'review', 'Renombrar no elimina metadatos. Además, un cartel o un edificio visible puede revelar ubicación incluso sin GPS.', 'Renaming does not remove metadata. A visible sign or building may reveal location even without GPS.')],
      takeaway: t('Comparte solo los datos necesarios y verifica el archivo resultante.', 'Share only necessary data and verify the resulting file.'),
    },
    {
      id: 'practice-cyber-case', kind: 'match', title: t('Caso final · Investigar con criterio', 'Final case · Research with judgement'),
      brief: t('Preparas un informe sobre una web pública de ejemplo. Elige una respuesta responsable para cada situación.', 'You are preparing a report on an example public website. Choose a responsible response for each situation.'),
      hint: t('Define una pregunta, contrasta la información y limita los datos personales.', 'Define a question, cross-check information and limit personal data.'),
      options: [option('scope', 'Definir la pregunta y los límites de la investigación', 'Define the research question and boundaries'), option('corroborate', 'Buscar el original y contrastar fecha y contexto', 'Find the original and check date and context'), option('minimise', 'Omitir datos personales que no sean necesarios', 'Omit unnecessary personal data'), option('stop', 'Detenerse ante un recurso restringido', 'Stop at a restricted resource')],
      prompts: [prompt('begin', 'Antes de recopilar datos…', 'Before collecting data…', 'scope', 'Una pregunta concreta evita recopilar datos sin propósito.', 'A clear question prevents purposeless collection.'), prompt('claim', 'Encuentras una captura sin fuente…', 'You find a screenshot with no source…', 'corroborate', 'Una captura aislada puede estar desactualizada o manipulada.', 'An isolated screenshot may be outdated or manipulated.'), prompt('report', 'El informe incluye una dirección personal irrelevante…', 'The report includes an irrelevant home address…', 'minimise', 'Que un dato sea público no hace necesaria su difusión.', 'A public detail is not automatically necessary to publish.'), prompt('login', 'Un enlace exige una cuenta que no tienes autorizada…', 'A link requires an account you are not authorised to use…', 'stop', 'La investigación pública no autoriza a sortear controles de acceso.', 'Public research does not authorise bypassing access controls.')],
      takeaway: t('Un buen informe explica fuentes, límites y grado de confianza.', 'A good report explains sources, limitations and confidence.'),
    },
  ],
  'history-ai': [
    {
      id: 'practice-history-engine', kind: 'match', title: t('Dentro de una máquina de cálculo', 'Inside a calculating machine'),
      brief: t('Relaciona las piezas del motor analítico de Babbage con sus funciones conceptuales.', 'Match parts of Babbage’s Analytical Engine to their conceptual functions.'),
      hint: t('Almacenar y calcular son funciones distintas.', 'Storing and calculating are different functions.'),
      options: [option('memory', 'Memoria', 'Memory'), option('compute', 'Cálculo', 'Computation'), option('input', 'Instrucciones y entrada', 'Instructions and input'), option('output', 'Salida', 'Output')],
      prompts: [prompt('store', 'Store / almacén', 'Store', 'memory', 'Conserva valores para operaciones posteriores.', 'It stores values for later operations.'), prompt('mill', 'Mill / molino', 'Mill', 'compute', 'Realiza operaciones sobre los valores.', 'It performs operations on values.'), prompt('cards', 'Tarjetas perforadas', 'Punched cards', 'input', 'Representan instrucciones y entrada para la máquina.', 'They represent instructions and input for the machine.'), prompt('printer', 'Impresora', 'Printer', 'output', 'Comunica los resultados.', 'It communicates the results.')],
      takeaway: t('La separación entre memoria, proceso y entrada/salida ayuda a entender máquinas posteriores.', 'Separating memory, processing and input/output helps explain later machines.'),
    },
    {
      id: 'practice-history-timeline', kind: 'order', title: t('Cuatro hitos conectados', 'Four connected milestones'),
      brief: t('Ordena los hitos de más antiguo a más reciente. Los detalles y las fuentes están disponibles en el módulo de aprendizaje.', 'Order these milestones from earliest to latest. Details and sources are available in the learning module.'),
      hint: t('Empieza por las notas del siglo XIX; la propuesta de la Web llega después del microprocesador.', 'Start with the nineteenth-century notes; the Web proposal comes after the microprocessor.'),
      options: [option('ada', 'Notas de Ada Lovelace', 'Ada Lovelace’s notes'), option('baby', 'Programa en memoria electrónica del Manchester Baby', 'Manchester Baby program in electronic memory'), option('chip', 'Microprocesador Intel 4004', 'Intel 4004 microprocessor'), option('web', 'Propuesta de la World Wide Web en CERN', 'World Wide Web proposal at CERN')], prompts: [],
      takeaway: t('1843 → 1948 → 1971 → 1989. Son hitos distintos, no una lista de «primeros ordenadores» equivalentes.', '1843 → 1948 → 1971 → 1989. These are different milestones, not equivalent claims about “first computers”.'),
    },
    {
      id: 'practice-history-web', kind: 'choice', title: t('Internet y la Web', 'Internet and the Web'),
      brief: t('Alguien afirma que Internet y la Web son exactamente lo mismo. Elige la explicación más precisa.', 'Someone claims that the Internet and the Web are exactly the same. Choose the most precise explanation.'),
      hint: t('Piensa en la diferencia entre una infraestructura y un servicio que la utiliza.', 'Think of the difference between infrastructure and a service using it.'),
      options: [option('same', 'Son dos nombres para una misma aplicación', 'They are two names for the same application'), option('layer', 'Internet conecta redes; la Web enlaza recursos y utiliza esa infraestructura', 'The Internet connects networks; the Web links resources using that infrastructure'), option('reverse', 'Internet es una página dentro de la Web', 'The Internet is a page within the Web')],
      prompts: [prompt('explain', '¿Cómo lo explicarías?', 'How would you explain it?', 'layer', 'El correo electrónico también puede utilizar Internet sin ser una página web.', 'Email can also use the Internet without being a web page.')],
      takeaway: t('Distinguir capas evita confundir servicios con la infraestructura que los hace posibles.', 'Distinguishing layers avoids confusing services with their underlying infrastructure.'),
    },
    {
      id: 'practice-history-models', kind: 'match', title: t('Reglas, aprendizaje y generación', 'Rules, learning and generation'),
      brief: t('Identifica el mecanismo descrito en cada sistema. Clasificamos el mecanismo, no su aparente inteligencia.', 'Identify the mechanism described in each system. Classify the mechanism, not its apparent intelligence.'),
      hint: t('Busca si hay reglas explícitas, ejemplos etiquetados o generación de contenido.', 'Look for explicit rules, labelled examples or content generation.'),
      options: [option('rules', 'Reglas explícitas', 'Explicit rules'), option('supervised', 'Aprendizaje supervisado', 'Supervised learning'), option('generative', 'Modelo generativo', 'Generative model')],
      prompts: [prompt('rule', 'Un programa responde según patrones escritos a mano.', 'A program responds using hand-written patterns.', 'rules', 'La conducta sigue instrucciones explícitas.', 'Its behaviour follows explicit instructions.'), prompt('labels', 'Un clasificador ajusta parámetros con fotos etiquetadas.', 'A classifier fits parameters using labelled photos.', 'supervised', 'Las etiquetas proporcionan objetivos durante el entrenamiento.', 'Labels provide targets during training.'), prompt('text', 'Un modelo produce texto nuevo a partir de patrones aprendidos.', 'A model produces new text from learned patterns.', 'generative', 'Generar texto no garantiza que sus afirmaciones sean ciertas.', 'Generating text does not guarantee factual claims are true.')],
      takeaway: t('Una respuesta convincente no permite deducir por sí sola cómo funciona el sistema.', 'A convincing response alone does not reveal how a system works.'),
    },
    {
      id: 'practice-history-source', kind: 'choice', title: t('Una respuesta sin fuente', 'An answer with no source'),
      brief: t('Una IA redacta una fecha histórica con mucha seguridad, pero no aporta una referencia comprobable. Vas a incluirla en una exposición.', 'An AI gives a historical date with great confidence but no verifiable reference. You plan to include it in an exhibition.'),
      hint: t('La seguridad del lenguaje no es una medida de fiabilidad.', 'Confident language is not a reliability measure.'),
      options: [option('copy', 'Copiarla porque la respuesta suena segura', 'Copy it because the response sounds confident'), option('vote', 'Preguntar tres veces y elegir la respuesta más frecuente', 'Ask three times and choose the most frequent answer'), option('verify', 'Buscar documentación original o una institución de referencia y comprobar el contexto', 'Find original documentation or an authoritative institution and check the context')],
      prompts: [prompt('action', '¿Cómo verificas la afirmación?', 'How do you verify the claim?', 'verify', 'Repetir una respuesta no crea fuentes independientes. Debes comprobar que la referencia existe y apoya la afirmación concreta.', 'Repeating an answer does not create independent sources. Check that the reference exists and supports the specific claim.')],
      takeaway: t('Usa la IA como punto de partida y conserva referencias verificables.', 'Use AI as a starting point and keep verifiable references.'),
    },
    {
      id: 'practice-history-final', kind: 'match', title: t('Caso final · IA en el aula', 'Final case · AI in the classroom'),
      brief: t('Una herramienta genera recomendaciones de estudio. Relaciona cada riesgo con una revisión adecuada.', 'A tool generates study recommendations. Match each risk to an appropriate review.'),
      hint: t('Cada revisión debe responder al riesgo concreto: datos, equidad, fiabilidad o supervisión.', 'Each review should address the specific risk: data, fairness, reliability or oversight.'),
      options: [option('privacy', 'Minimizar datos y comprobar permisos de uso', 'Minimise data and check permission to use it'), option('bias', 'Evaluar resultados en distintos grupos y contextos', 'Evaluate results across groups and contexts'), option('facts', 'Contrastar con fuentes verificables', 'Cross-check against verifiable sources'), option('human', 'Ofrecer revisión humana y una vía de corrección', 'Provide human review and a correction process')],
      prompts: [prompt('personal', 'Se solicita información personal que no hace falta.', 'It requests unnecessary personal information.', 'privacy', 'Reduce la exposición y define para qué se usan los datos.', 'Reduce exposure and define how the data is used.'), prompt('groups', 'Funciona peor con ciertos grupos de estudiantes.', 'It performs worse for certain student groups.', 'bias', 'Un promedio global puede ocultar diferencias relevantes.', 'An overall average may hide relevant differences.'), prompt('citation', 'Inventa una referencia bibliográfica.', 'It invents a bibliographic reference.', 'facts', 'Verifica la existencia y el contenido de la fuente.', 'Verify both the existence and the content of the source.'), prompt('appeal', 'Una recomendación errónea perjudica a un estudiante.', 'An incorrect recommendation disadvantages a student.', 'human', 'La persona afectada necesita una revisión y posibilidad de corregir el resultado.', 'The affected person needs review and a way to correct the result.')],
      takeaway: t('La responsabilidad incluye diseño, evaluación y uso; no se delega en la herramienta.', 'Responsibility includes design, evaluation and use; it is not delegated to the tool.'),
    },
  ],
};
export const practiceIds = Object.values(practiceCourses).flatMap(course => course.map(exercise => exercise.id));
