import React from 'react';
import * as XLSX from 'xlsx';

const ExcelGenerator = () => {
  // Usamos las preguntas que ya conocemos del código previo
  const preguntas = [
  {
    texto: "1. ¿Cuál de los siguientes pares de elementos pueden contribuir a formar un puente de hidrógeno?",
    opciones: [
      "a. S y Pb",
      "b. Cl y C",
      "c. Br y  C",
      "d. N y O"
    ],
    respuestaCorrecta: 3,
  },
  {
    texto: "2. ¿Cuál de las siguientes afirmaciones es correcta respecto a la presión osmótica?",
    opciones: [
      "a. Disminuye al aumentar la osmolaridad de una solución",
      "b. Es mayor en soluciones hipotónicas",
      "c. Es mayor en soluciones hipertónicas",
      "d. No depende de la concentración de soluto"
    ],
    respuestaCorrecta: 2,
  },
  {
    texto: "3. ¿Qué sucede si se añaden 0,3 g de NaCl a un litro de agua?",
    opciones: [
      "a. El sodio se solvata con el agua por enlaces covalentes",
      "b. El sodio y el cloro se solvatan por la baja constante dieléctrica del agua",
      "c. El sodio y el cloro se separan al máximo, por la elevada constante dieléctrica del agua",
      "d. La solvatación del sodio y del cloro disminuyen, por la elevada constante dieléctrica del agua"
    ],
    respuestaCorrecta: 2,
  },
  {
    texto: "10. ¿Cuál de las siguientes afirmaciones sobre la estructura y función del colágeno es INCORRECTA?",
    opciones: [
      "a. La glicina es el aminoácido más abundante, apareciendo cada tres residuos en la cadena polipeptídica del colágeno.",
      "b. La hidroxilación de prolina en el colágeno es fundamental para la estabilidad de la triple hélice.",
      "c. La vitamina C es esencial para la síntesis adecuada del colágeno.",
      "d. La formación de enlaces iónicos entre moléculas de colágeno aumenta la resistencia mecánica del tejido."
    ],
    respuestaCorrecta: 3,
  },
  {
    texto: "11. ¿Cuál es el principal tipo de enlace estabiliza la estructura secundaria en las proteínas? (0,5pts)",
    opciones: [
      "a. Enlaces iónicos",
      "b. Enlaces peptídicos",
      "c. Puentes de hidrógeno",
      "d. Enlaces covalentes sulfurados"
    ],
    respuestaCorrecta: 2,
  },
  {
    texto: "12. ¿A qué se refiere la estructura terciaria de una proteína?",
    opciones: [
      "a. La cadena lineal de aminoácidos",
      "b. El plegamiento tridimensional completo de una sola cadena polipeptídica",
      "c. La asociación de varias cadenas polipeptídicas",
      "d. La presencia de hélices alfa o láminas beta"
    ],
    respuestaCorrecta: 1,
  },
  {
    texto: "13. ¿Cuál de las siguientes descripciones es la más precisa sobre la estructura y función general del colágeno?",
    opciones: [
      "a. Es una proteína globular que actúa principalmente como enzima en reacciones metabólicas.",
      "b. Todos los tipos de colágeno se encuentran exclusivamente en el ligamento periodontal, sin presencia en otros tejidos del cuerpo.",
      "c. Su principal función es almacenar energía en forma de grasa, similar a los triglicéridos.",
      "d. El colágeno se compone de una triple hélice formada por tres cadenas de polipéptidos, ricas en aminoácidos como glicina, prolina e hidroxiprolina."
    ],
    respuestaCorrecta: 3,
  },
  {
    texto: "14. Considerando exclusivamente los eventos bioquímicos que ocurren dentro del glóbulo rojo, ¿cuál es el proceso fundamental que explica la alteración morfológica de los eritrocitos y sus consecuencias clínicas en la anemia drepanocítica?",
    opciones: [
      "a. Los glóbulos rojos afectados desarrollan receptores de superficie anómalos que atraen y se unen a plaquetas en exceso, formando microtrombos espontáneamente en la circulación.",
      "b. Se caracteriza por una activación de las enzimas antioxidantes en los eritrocitos, e induce un estrés oxidativo severo y la destrucción de la membrana celular.",
      "c. La hemoglobina alterada en esta condición se une al oxígeno con una afinidad excepcionalmente alta, lo que impide su liberación efectiva a los tejidos y causa hipoxia generalizada.",
      "d. La hemoglobina afectada experimenta una polimerización anormal, formando largas fibras rígidas que distorsionan la forma del eritrocito y reducen su capacidad de deformación."
    ],
    respuestaCorrecta: 3,
  },
  {
    texto: "15. Para optimizar la liberación de oxígeno en los tejidos con alta demanda metabólica (como el músculo en ejercicio), la afinidad de la hemoglobina por el oxígeno debe disminuir. ¿Cuál combinación de factores bioquímicos promueve esta disminución de la afinidad?",
    opciones: [
      "a. Una disminución en la temperatura corporal y una reducción en la producción de dióxido de carbono.",
      "b. Una disminución del pH (aumento de H+), un incremento en la presión parcial de CO2 y un aumento en la concentración de 2,3-bisfosfoglicerato (2,3-BPG).",
      "c. Un aumento en el pH y una disminución en la concentración de 2,3-bisfosfoglicerato (2,3-BPG).",
      "d. Una alta saturación de oxígeno inicial en los pulmones y la ausencia de iones cloruro en el plasma sanguíneo."
    ],
    respuestaCorrecta: 1,
  },
  {
    texto: "16. ¿Cuál es la descripción más precisa del grupo hemo en el contexto de la hemoglobina?",
    opciones: [
      "a. Un fragmento de ADN que codifica las instrucciones para la síntesis de la hemoglobina.",
      "b. Es una cadena polipeptídica rica en aminoácidos hidrofóbicos que se une directamente al oxígeno.",
      "c. Un complejo orgánico con un anillo de porfirina que contiene un átomo de hierro ferroso (Fe2+) en su centro, esencial para la unión reversible de oxígeno.",
      "d. Una molécula de glucosa modificada que provee energía a las células sanguíneas."
    ],
    respuestaCorrecta: 2,
  },
  {
    texto: "18. ¿Qué caracteriza al centro activo de una enzima?",
    opciones: [
      "a. Es anhídrido y se encuentra en la superficie de la enzima",
      "b. Contiene agua, está formado por el sitio de unión al sustrato y el sitio catalítico",
      "c. Es anhídrido y se encuentra en un bolsillo hidrofóbico",
      "d. Contiene residuos Val, Leu y Ala que intervienen en la catálisis ácido básica"
    ],
    respuestaCorrecta: 2,
  },
  {
    texto: "19. ¿Cuál de las siguientes afirmaciones es correcta respecto a la Nicotinamida Adenina Dinucleótido?",
    opciones: [
      "a. Es la principal coenzima de las enzimas hidrolasas",
      "b. Se encuentra débilmente unida a la enzima y transporta al ión hidruro",
      "c. Está fuertemente unida a las enzimas oxidoreductasas",
      "d. Transporta dos hidrógenos y se encuentra débilmente unida a las enzimas"
    ],
    respuestaCorrecta: 1,
  },
  {
    texto: "20. ¿Cuál de los siguientes es un mecanismo de acción de las enzimas gingipainas?",
    opciones: [
      "a. Hidrolizan el colágeno de la matriz extracelular al incorporar una molécula de agua",
      "b. Hidrolizan al colágeno de las encías, lo cual requiere de energía",
      "c. Hidrolizan al colágeno de la matriz extracelular, al extraer una molécula de agua",
      "d. Las opciones “a” y “b” son correctas"
    ],
    respuestaCorrecta: 0,
  },
  {
    texto: "21. ¿Qué se puede afirmar de una enzima que tiene una relación Kcat/KM baja?",
    opciones: [
      "a. Puede tener alta afinidad pero un bajo recambio",
      "b. Tiene alta afinidad y eficacia",
      "c. Puede ser poco eficaz y afin",
      "d. Es muy eficaz, tiene alta afinidad por su sustrato y es muy veloz"
    ],
    respuestaCorrecta: 2,
  },
  {
    texto: "22. ¿Qué significa que una molécula sea un modulador alostérico heterotrópico positivo de una enzima?",
    opciones: [
      "a. Que es una molécula ajena a la reacción catalizada por la enzima, que incrementa su actividad al unirse a un sitio diferente al sitio activo de la enzima",
      "b. Que es una molécula perteneciente a la reacción catalizada por la enzima, que incrementa su actividad al unirse a un sitio diferente al sitio activo de la enzima",
      "c. Que es una molécula perteneciente a la reacción catalizada por la enzima, que disminuye su actividad al unirse a un sitio diferente al sitio activo de la enzima",
      "d. Que se une a un sitio alostérico, pero no modifica la actividad de la enzima"
    ],
    respuestaCorrecta: 0,
  },
  {
    texto: "23. ¿Qué sucede en la catálisis covalente?",
    opciones: [
      "a. En la formación de un enlace covalente con el sustrato que facilita el estado de transición",
      "b. En un ataque nucleofílico de la enzima que aumenta la energía de transición",
      "c. En la formación de un enlace covalente entre diferentes partes de una enzima",
      "d. En un ataque electrofílico que aumenta la energía de activación"
    ],
    respuestaCorrecta: 0,
  },
  {
    texto: "16. Dada la reacción bioquímica: A + B → C + D, cuyo valor de ΔG = +23,5 kcal/mol, indique cuál de las siguientes afirmaciones es correcta respecto a dicha reacción:",
    opciones: [
      "a. Es una reacción espontánea, exergónica que tiende a la entropía.",
      "b. Es una reacción no espontánea, exergónica que requiere de ATP.",
      "c. El contenido energético de C y D es menor que el de A y B. La reacción es espontánea.",
      "d. Los compuestos A y B tienen menor energía que C y D. La reacción es no espontánea."
    ],
    respuestaCorrecta: 3,
  },
  {
    texto: "17. ¿Qué es requerido en el anabolismo?",
    opciones: [
      "a. Equivalentes de reducción y ATP.",
      "b. Coenzimas oxidadas y ATP.",
      "c. Coenzimas reducidas y AMP.",
      "d. Acetil CoA y AMP."
    ],
    respuestaCorrecta: 0,
  },
  {
    texto: "18. ¿Cuál de las siguientes es una razón por la cual se libera energía para la hidrólisis del ATP?",
    opciones: [
      "a. Por la presencia de ribosa.",
      "b. Porque el magnesio estabiliza sus cargas.",
      "c. Porque su hidrólisis disminuye la repulsión electrostática entre los átomos de oxígeno.",
      "d. Por el elevado contenido energético de la adenosina que lo compone."
    ],
    respuestaCorrecta: 2,
  },
  {
    texto: "19. ¿Qué tipo de reacción cataliza la enzima Piruvato Deshidrogenasa?",
    opciones: [
      "a. Transaminación.",
      "b. Descarboxilación oxidativa.",
      "c. Hidrólisis.",
      "d. Descarboxilación reductora."
    ],
    respuestaCorrecta: 1,
  },
  {
    texto: "20. ¿Qué función tiene la lipoamida en la enzima E2 de la Piruvato Deshidrogenasa?",
    opciones: [
      "a. Descarboxilación oxidativa del Piruvato.",
      "b. Transferencia del grupo acetilo a la Coenzima A.",
      "c. Regeneración de la forma reducida de la enzima.",
      "d. Regulación de la actividad de la enzima Piruvato Deshidrogenasa."
    ],
    respuestaCorrecta: 1,
  },
  {
    texto: "21. ¿Cuál es el efecto del ayuno sobre la enzima Piruvato Deshidrogenasa (PDH)?",
    opciones: [
      "a. La elevada relación ADP/ATP provoca fosforilación de la PDH, activándola.",
      "b. El ATP actúa como modulador alostérico heterotrópico positivo de la PDH.",
      "c. La baja relación ATP/ADP activa a la PDH por modulación alostérica heterotrópica positiva por parte del ADP.",
      "d. El ADP inhibe a la PDH."
    ],
    respuestaCorrecta: 2,
  },
  {
    texto: "22. ¿De dónde proviene la energía necesaria para la síntesis de Citrato en el Ciclo de Krebs?",
    opciones: [
      "a. De la hidrólisis del enlace tioéster del Actil CoA.",
      "b. De los equivalentes de reducción que van a la cadena de transporte de electrones.",
      "c. De la hidrólisis del oxaloacetato.",
      "d. Del ATP de la glucólisis."
    ],
    respuestaCorrecta: 0,
  },
  {
    texto: "23. ¿Qué enzima del Ciclo de Krebs cataliza la reacción donde hay fosforilación a nivel de sustrato?",
    opciones: [
      "a. Succinato Deshidrogenasa.",
      "b. Piruvato Deshidrogenasa.",
      "c. Succinil CoA sintetasa.",
      "d. ATP/ADP translocasa."
    ],
    respuestaCorrecta: 2,
  },
  {
    texto: "24. ¿Cuántas moléculas de alta energía (ATP o GTP) se producen dentro del ciclo de Krebs?",
    opciones: [
      "a. 30 o 32 dependiendo del tipo de lanzadera.",
      "b. 1.",
      "c. 10.",
      "d. Ninguna porque todas provienen de la cadena de transporte de electrones."
    ],
    respuestaCorrecta: 1,
  },
  {
    texto: "25. ¿Qué efecto tiene el ATP sobre la actividad de la enzima Alfacetoglutarato Deshidrogenasa?",
    opciones: [
      "a. La inhibe por modificación covalente reversible.",
      "b. No tiene ningún efecto.",
      "c. La inhibe por modulación alostérica.",
      "d. La activa por modificación covalente reversible."
    ],
    respuestaCorrecta: 2,
  },
  {
    texto: "26. Es sabido que la enzima Piruvato Carboxilasa sintetiza oxaloacetato a partir de Piruvato y CO₂. ¿Cómo se clasifica esta reacción teniendo en cuenta su vinculación con el Ciclo de Krebs?",
    opciones: [
      "a. Anfibólica.",
      "b. Anfifílica.",
      "c. Catabólica.",
      "d. Anaplerótica."
    ],
    respuestaCorrecta: 3,
  },
  {
    texto: "¿Cuál de las siguientes afirmaciones es correcta respecto a la alfa amilasa salival?",
    opciones: [
      "Su pH óptimo es de 4",
      "Hidroliza enlaces glicosídicos alfa 1-4",
      "Su actividad inicia en la boca y se incrementa en el estómago",
      "Hidroliza enlaces glicosídicos alfa 1-6"
    ],
    respuestaCorrecta: 1,
  },
  {
    texto: "¿En dónde se sintetizan las oligosacaridasas?",
    opciones: [
      "En el páncreas",
      "En las glándulas salivales",
      "En las vellosidades intestinales",
      "En el colon ascendente"
    ],
    respuestaCorrecta: 2,
  },
  {
    texto: "¿Qué caracteriza al transportador sglt1?",
    opciones: [
      "Se encuentra en las glándulas salivales",
      "Tiene km bajo y realiza difusión facilitada",
      "Realiza transporte activo secundario",
      "Transporta exclusivamente fructosa"
    ],
    respuestaCorrecta: 2,
  },
  {
    texto: "¿Qué caracteriza al transportador GLUT 2?",
    opciones: [
      "Es dependiente de insulina",
      "Se encuentra exclusivamente en músculo y adipocito",
      "Es independiente de insulina",
      "Está exclusivamente en el hígado y en el músculo"
    ],
    respuestaCorrecta: 2,
  },
  {
    texto: "¿Cuántas moléculas de ATP se generan en la fase de generación energética de la glicolisis anaerobia?",
    opciones: [
      "a) 2",
      "b) 4",
      "c) 1",
      "d) 30 o 32 dependiendo de la lanzadera que se use"
    ],
    respuestaCorrecta: 1,
  },
  {
    texto: "¿En cuál de las siguientes reacciones de la glicólisis se da una fosforilación de sustrato?",
    opciones: [
      "A. En la reacción catalizada por la glucoquinasa",
      "B. En la fosforilación de fructosa 6 fosfato",
      "C. En la reacción catalizada por la piruvato quinasa",
      "D. En la reacción catalizada por la enolasa"
    ],
    respuestaCorrecta: 2,
  },
  {
    texto: "¿Qué efecto tiene el citrato sobre la actividad enzimática de la enzima fosfofructoquinasa i?",
    opciones: [
      "Actúa como modulador alostérico homotrópico negativo",
      "Destruye al sitio activo de la enzima",
      "Actúa como modulador alostérico heterotrópico negativo",
      "No tiene efecto porque es un intermediario del ciclo de krebs"
    ],
    respuestaCorrecta: 2,
  },
  {
    texto: "¿Qué efecto tiene la fructosa 2,6 bifosfato sobre la enzima fosfofructoquinasa i?",
    opciones: [
      "Actúa como modulador alostérico homotrópico negativo",
      "Destruye al sitio activo de la enzima",
      "Actúa como modulador alostérico heterotrópico positivo",
      "Enlentece a la glicólisis"
    ],
    respuestaCorrecta: 2,
  },
  {
    texto: "¿Por qué la dextrina es uno de los productos de la digestión de los carbohidratos en la boca?",
    opciones: [
      "Porque la alfa amilasa no reconoce a los enlaces glicosídicos alfa 1-4",
      "Porque el pH de la saliva es ligeramente alcalino",
      "Porque la alfa amilasa salival no reconoce a los enlaces alfa 1-6",
      "Porque la lactasa no actúa en la boca"
    ],
    respuestaCorrecta: 2,
  },
  {
    texto: "¿qué se necesita para que actúe la alfa amilasa pancreatica?",
    opciones: [
      "Un pH ácido propiciado por el bicarbonato",
      "Que el oligosacárido tenga enlaces alfa 1-6",
      "Un pH alcalino propiciado por el bicarbonato",
      "Que el íleon tenga un pH alcalino"
    ],
    respuestaCorrecta: 2,
  },
  {
    texto: "¿Cuál de los siguientes transportadores de glucosa requiere de una concentración muy elevada de esta molécula para activarse?",
    opciones: [
      "GLUT 1",
      "GLUT 2",
      "GLUT 3",
      "GLUT 4"
    ],
    respuestaCorrecta: 1,
  },
  {
    texto: "¿Cuál de los siguientes transportadores de glucosa es dependiente de insulina?",
    opciones: [
      "GLUT 1",
      "GLUT 2",
      "GLUT 3",
      "GLUT 4"
    ],
    respuestaCorrecta: 3,
  },
  {
    texto: "¿Cuál de las siguientes es una característica de la glicólisis en el glóbulo rojo?",
    opciones: [
      "a) Es aeróbica, produciendo 30 o 32 ATP",
      "b) Genera 2,3 bifosfoglicerato en una vía alterna",
      "c) C. Es anaeróbica por la ausencia de núcleo",
      "d) Es anaeróbica y produce 30 o 32 ATP"
    ],
    respuestaCorrecta: 1,
  },
  {
    texto: "¿Qué caracteriza a la enzima piruvato quinasa de la glicólisis?",
    opciones: [
      "A. Cataliza a una reacción donde se da fosforilación a nivel de sustrato",
      "B. Cataliza a una reacción reversible",
      "C. Es un monómero",
      "D. Es activa cuando está fosforilada"
    ],
    respuestaCorrecta: 0,
  },
  {
    texto: "¿Qué efecto tiene el ATP sobre la actividad enzimática de la enzima fosfofructoquinasa I?",
    opciones: [
      "Actúa como modulador alostérico homotrópico negativo",
      "Destruye al sitio activo de la enzima",
      "Actúa como modulador alostérico heterotrópico negativo",
      "No tiene ningún efecto"
    ],
    respuestaCorrecta: 2,
  },
  {
    texto: "¿Cuál o cuáles de las siguientes es una enzima regulable de la glicólisis?",
    opciones: [
      "La aldolasa y la fosfofructoquinasa II",
      "La fosfofructoquinasa I",
      "La enolasa",
      "La piruvato quinasa y la enolasa"
    ],
    respuestaCorrecta: 1,
  }
]

  // Función para convertir los datos al formato requerido para Excel
  const convertirDatosParaExcel = (preguntas) => {
    // Crear un array para los datos de Excel
    const datos = [];
    
    // Agregar encabezados
    datos.push(['Pregunta', 'Opción A', 'Opción B', 'Opción C', 'Opción D', 'Respuesta Correcta']);
    
    // Agregar los datos de cada pregunta
    preguntas.forEach(pregunta => {
      // La respuesta correcta como letra
      const letrasRespuestas = ['A', 'B', 'C', 'D'];
      const respuestaLetra = letrasRespuestas[pregunta.respuestaCorrecta];
      
      // Asegurarnos de que todas las opciones existan (por si acaso hay menos de 4)
      const opcionesCompletas = [...pregunta.opciones];
      while (opcionesCompletas.length < 4) {
        opcionesCompletas.push(''); // Rellenar con cadenas vacías si faltan opciones
      }
      
      // Añadir la fila con los datos
      datos.push([
        pregunta.texto,
        opcionesCompletas[0],
        opcionesCompletas[1],
        opcionesCompletas[2],
        opcionesCompletas[3],
        respuestaLetra
      ]);
    });
    
    return datos;
  };

  // Función que se ejecutará cuando se haga clic en el botón
  const generarExcel = () => {
    try {
      // Convertir los datos
      const datosExcel = convertirDatosParaExcel(preguntas);

      // Crear un libro de trabajo
      const libro = XLSX.utils.book_new();

      // Crear una hoja
      const hoja = XLSX.utils.aoa_to_sheet(datosExcel);

      // Ajustar anchos de columna
      const anchos = [
        { wch: 60 }, // Pregunta
        { wch: 25 }, // Opción A
        { wch: 25 }, // Opción B
        { wch: 25 }, // Opción C
        { wch: 25 }, // Opción D
        { wch: 10 }  // Respuesta Correcta
      ];
      hoja['!cols'] = anchos;

      // Añadir la hoja al libro
      XLSX.utils.book_append_sheet(libro, hoja, 'Preguntas de Biomecánica');

      // Escribir y descargar el archivo
      XLSX.writeFile(libro, 'Preguntas_Biomecanica.xlsx');
      
      alert('Archivo Excel generado correctamente.');
    } catch (error) {
      console.error('Error al generar el Excel:', error);
      alert('Ocurrió un error al generar el archivo Excel: ' + error.message);
    }
  };

  return (
    <div className="excel-generator">
      <h2>Generador de Excel de Preguntas de Biomecánica</h2>
      <p>Este componente permite generar un archivo Excel con las preguntas de biomecánica estructuradas en columnas.</p>
      
      <div className="button-container">
        <button 
          className="generate-button" 
          onClick={generarExcel}
        >
          Generar Excel
        </button>
      </div>
      
      <div className="preview-section">
        <h3>Contenido del Excel</h3>
        <p>El archivo Excel contendrá las siguientes columnas:</p>
        <ul>
          <li><strong>Pregunta:</strong> El texto completo de la pregunta</li>
          <li><strong>Opción A:</strong> Primera opción de respuesta</li>
          <li><strong>Opción B:</strong> Segunda opción de respuesta</li>
          <li><strong>Opción C:</strong> Tercera opción de respuesta</li>
          <li><strong>Opción D:</strong> Cuarta opción de respuesta</li>
          <li><strong>Respuesta Correcta:</strong> La letra (A, B, C, D) de la opción correcta</li>
        </ul>
      </div>
    </div>
  );
};

export default ExcelGenerator;