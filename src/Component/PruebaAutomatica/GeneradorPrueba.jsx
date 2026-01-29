import React from 'react';
import * as XLSX from 'xlsx';

const ExcelGenerator = () => {
  // Usamos las preguntas que ya conocemos del código previo
 const preguntas = [
  {
    texto: "¿Cuál de las siguientes descripciones define correctamente el enlace que otorga direccionalidad a la estructura primaria del ADN?",
    opciones: [
      "a) Enlace fosfodiéster entre el carbono 3' de una desoxirribosa y el fosfato unido al carbono 5' de la siguiente",
      "b) Enlace peptídico entre los grupos amino y carboxilo de nucleótidos adyacentes",
      "c) Puente de hidrógeno entre las bases nitrogenadas de la misma cadena",
      "d) Enlace glucosídico entre bases complementarias de hebras opuestas"
    ],
    respuestaCorrecta: 0, // a
  },
  {
    texto: "Si una muestra de ADN presenta un alto contenido de Guanina y Citosina (G-C), ¿qué propiedad estructural se espera observar?",
    opciones: [
      "a) Menor estabilidad ante la desnaturalización térmica por tener tres puentes de hidrógeno",
      "b) Mayor facilidad para la separación de las hebras por la presencia de dos puentes de hidrógeno",
      "c) Mayor temperatura de fusión (Tm) debido a que el par G-C se estabiliza mediante tres puentes de hidrógeno",
      "d) Una estructura secundaria tipo Z-ADN de forma predominante"
    ],
    respuestaCorrecta: 2, // c
  },
  {
    texto: "¿Cuál de las siguientes opciones describe mejor el conjunto de fuerzas que estabilizan la doble hélice de ADN en el entorno celular?",
    opciones: [
      "a) Principalmente enlaces covalentes entre las bases nitrogenadas y el esqueleto azúcar-fosfato",
      "b) Exclusivamente fuerzas iónicas entre los grupos fosfato cargados negativamente",
      "c) Puentes de hidrógeno entre bases, apilamiento hidrofóbico y repulsión electrostática mitigada por cationes",
      "d) Enlaces peptídicos y fuerzas de Van der Waals únicamente"
    ],
    respuestaCorrecta: 2, // c
  },
  {
    texto: "En procariontes, ¿cuál es la característica termodinámica del sitio de origen (OriC) y qué proteína lo reconoce inicialmente?",
    opciones: [
      "a) Es una región rica en G-C (alta Tm) y la proteína se denomina helicasa",
      "b) Es una región rica en A-T (baja Tm) y la proteína se denomina DnaA",
      "c) Es una región con alta metilación y la proteína se denomina primasa",
      "d) Es una región con secuencias repetitivas y la proteína se denomina ADN polimerasa I"
    ],
    respuestaCorrecta: 1, // b
  },
  {
    texto: "¿Cuál es la función principal de las proteínas de unión a cadena sencilla (SSB) durante la replicación?",
    opciones: [
      "a) Cortar los fragmentos de Okazaki",
      "b) Estabilizar las hebras separadas e impedir que se reapareen",
      "c) Unir nucleótidos al extremo 3' de la cadena nueva",
      "d) Formar el cebador de ARN"
    ],
    respuestaCorrecta: 1, // b
  },
  {
    texto: "En relación a la Amelogénesis Imperfecta (gen AMELX), ¿por qué la replicación discontinua es un desafío para la fidelidad genómica?",
    opciones: [
      "a) Porque la hebra rezagada no usa ADN polimerasa",
      "b) Porque requiere síntesis en fragmentos de Okazaki y múltiples eventos de cebado, aumentando puntos de error",
      "c) Porque la hebra rezagada se replica obligatoriamente en sentido 3'→5'",
      "d) Porque el proceso no requiere la actividad de la helicasa"
    ],
    respuestaCorrecta: 1, // b
  },
  {
    texto: "¿Qué descripción integra simultáneamente el carácter semiconservativo, bidireccional y simétrico de la replicación?",
    opciones: [
      "a) Dos horquillas avanzan en sentidos opuestos, en cada una hay una hebra líder y una rezagada, conservando una cadena original",
      "b) La maquinaria avanza en un solo sentido y el ADN resultante es una mezcla aleatoria de fragmentos",
      "c) Se forman dos horquillas que se alejan entre sí y se destruye la hebra original para ser reemplazada",
      "d) La burbuja se expande hacia ambos lados, pero ambas hebras crecen de forma continua para evitar errores"
    ],
    respuestaCorrecta: 0, // a
  },
  {
    texto: "¿Cuál de las siguientes enzimas se encarga de romper los puentes de hidrógeno para separar las dos hebras del ADN?",
    opciones: [
      "a) Helicasa",
      "b) ADN Polimerasa III",
      "c) ADN Ligasa",
      "d) Topoisomerasa"
    ],
    respuestaCorrecta: 0, // a
  },
  {
    texto: "¿Qué enzima sintetiza los cebadores (primers) que proporcionan el extremo 3'-OH libre para iniciar la síntesis?",
    opciones: [
      "a) Helicasa",
      "b) Primasa",
      "c) ADN Polimerasa I",
      "d) ADN Multimerasa"
    ],
    respuestaCorrecta: 1, // b
  },
  {
    texto: "¿Cuál de las siguientes enzimas se encarga de la elongación de la cadena añadiendo desoxirribonucleótidos complementarios?",
    opciones: [
      "a) ADN Polimerasa III",
      "b) ADN Ligasa",
      "c) Primasa",
      "d) Helicasa"
    ],
    respuestaCorrecta: 0, // a
  },
  {
    texto: "¿En qué se diferencia fundamentalmente la transcripción de la replicación del ADN?",
    opciones: [
      "a) La transcripción produce ARN a partir de ADN; la replicación duplica el genoma completo",
      "b) La transcripción requiere cebador obligatoriamente; la replicación no",
      "c) La transcripción ocurre solo en mitocondrias; la replicación solo en cloroplastos",
      "d) La transcripción produce proteínas directamente; la replicación produce lípidos"
    ],
    respuestaCorrecta: 0, // a
  },
  {
    texto: "¿Cuál de las subunidades de la ARN polimerasa de procariotas es responsable del reconocimiento específico del promotor?",
    opciones: [
      "a) La subunidad beta",
      "b) El factor sigma (σ)",
      "c) La subunidad alfa",
      "d) La subunidad omega"
    ],
    respuestaCorrecta: 1, // b
  },
  {
    texto: "¿Cuál de las siguientes es una característica propia de la fase de elongación de la transcripción?",
    opciones: [
      "a) La ARN polimerasa se une al promotor y forma el complejo cerrado",
      "b) Se incorporan ribonucleótidos complementarios y la enzima avanza por el ADN molde",
      "c) Ocurre un apareamiento directo entre dos moléculas de ARNm",
      "d) Se degrada el ADN molde para liberar la cadena de ARN"
    ],
    respuestaCorrecta: 1, // b
  },
  {
    texto: "¿Qué utilidad funcional tienen las secuencias palindrómicas en el ADN?",
    opciones: [
      "a) Sirven como sitios de unión para proteínas o forman horquillas para la terminación",
      "b) Impiden físicamente que ocurra la replicación",
      "c) Aparecen exclusivamente en organismos eucariotas superiores",
      "d) Obligan a que el ADN se mantenga de forma monocatenaria"
    ],
    respuestaCorrecta: 0, // a
  },
  {
    texto: "¿Qué caracteriza a los factores de transcripción de tipo inducible?",
    opciones: [
      "a) Se expresan de forma constitutiva e invariable en todos los tejidos",
      "b) Su actividad depende de señales externas (hormonas, estrés) que los activan o inhiben",
      "c) Son proteínas que solo existen en organismos procariotas",
      "d) Tienen la función única de unirse a la cola poli-A del ARNm"
    ],
    respuestaCorrecta: 1, // b
  },
  {
    texto: "¿Qué consecuencia biológica provoca la acetilación de las colas de las histonas?",
    opciones: [
      "a) Compactación extrema de la cromatina e inhibición de la expresión génica",
      "b) Relajación de la cromatina al disminuir la carga positiva de las histonas, favoreciendo la transcripción",
      "c) Ruptura del esqueleto de azúcar-fosfato del ADN",
      "d) Aumento masivo de la metilación en las islas CpG del ADN"
    ],
    respuestaCorrecta: 1, // b
  },
  {
    texto: "¿Con qué finalidad se une GTP al Factor de Iniciación 2 (IF2) en la traducción procariota?",
    opciones: [
      "a) Para aportar energía para el ensamblaje del complejo de iniciación y la unión de la subunidad grande",
      "b) Para catalizar la formación del primer enlace peptídico",
      "c) Para permitir la translocación del ribosoma del sitio P al sitio A",
      "d) Para señalizar el reconocimiento del codón AUG por la subunidad 50S"
    ],
    respuestaCorrecta: 0, // a
  },
  {
    texto: "¿Cómo actúa la doxiciclina a nivel molecular para inhibir la traducción bacteriana?",
    opciones: [
      "a) Se une a la subunidad 50S e inhibe la actividad de la peptidil transferasa",
      "b) Se une a la subunidad 30S e impide la unión del aminoacil-ARNt al sitio A",
      "c) Interactúa con el factor EF-G para evitar el movimiento del ribosoma",
      "d) Provoca una lectura errónea al distorsionar la estructura del sitio A"
    ],
    respuestaCorrecta: 1, // b
  },
  {
    texto: "¿Cuáles son los tres codones de terminación (stop) de la traducción?",
    opciones: [
      "a) UGG, UAA y UAC",
      "b) AUG, GUA y UAG",
      "c) UAA, UAU y UGA",
      "d) UAA, UAG y UGA"
    ],
    respuestaCorrecta: 3, // d
  }
];

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