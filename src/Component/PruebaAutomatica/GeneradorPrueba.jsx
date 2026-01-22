import React from 'react';
import * as XLSX from 'xlsx';

const ExcelGenerator = () => {
  // Usamos las preguntas que ya conocemos del código previo
 const preguntas = [
  {
    texto: "En procariontes, el proceso de replicación comienza en un sitio único del cromosoma circular. ¿Cuál es la característica termodinámica principal de este sitio y cómo se denomina la proteína específica encargada de reconocerlo?",
    opciones: [
      "a) El sitio es el Telómero, rico en Guaninas; es identificado por el complejo Primasa.",
      "b) El sitio es el OriC, rico en secuencias A-T que facilitan la desnaturalización; es reconocido por el complejo de proteínas DnaA.",
      "c) El sitio es la región Promotora, rica en enlaces A-T para dar estabilidad; es reconocido por la Ligasa.",
      "d) El sitio es el OriC, rico en secuencias C-G que facilitan la desnaturalización; es reconocido por el complejo de proteínas Helicasa"
    ],
    respuestaCorrecta: 1, // b
  },
  {
    texto: "¿Cuál es la función principal de las proteínas de unión a cadena sencilla (SSB) durante la replicación?",
    opciones: [
      "a) Reconocer los sitios de terminación de la replicación.",
      "b) Romper los puentes de hidrogeno que unen la doble hélice.",
      "c) Sintetizar pequeñas cadenas de ARN.",
      "d) Evitar que las hebras separadas se vuelvan a unir o formen estructuras secundarias."
    ],
    respuestaCorrecta: 3, // d
  },
  {
    texto: "En pacientes con Amelogénesis Imperfecta ligada al cromosoma X, la mutación se perpetúa. ¿Por qué la replicación discontinua de la hebra rezagada es un desafío adicional para la fidelidad genómica?",
    opciones: [
      "a) Porque la hebra líder no tiene mecanismos de corrección de errores.",
      "b) Porque la hebra rezagada se sintetiza más lento, permitiendo que el calcio del esmalte dañe el ADN.",
      "c) Porque requiere la eliminación y reemplazo de múltiples cebadores de ARN en la hebra rezagada, aumentando las oportunidades de error.",
      "d) Porque la hebra rezagada no tiene mecanismos de corrección de mutaciones."
    ],
    respuestaCorrecta: 2, // c
  },
  {
    texto: "Durante la odontogénesis, los pre-ameloblastos duplican su genoma. ¿Qué descripción integra simultáneamente el carácter semiconservativo, bidireccional y simétrico del proceso?",
    opciones: [
      "a) Dos horquillas avanzan en sentidos opuestos desde el origen, en cada una se sintetiza una hebra líder y una rezagada, y al final cada molécula hija conserva una cadena molde original.",
      "b) La maquinaria avanza en un solo sentido desde el origen de replicación, ambas hebras se sintetizan sin interrupciones.",
      "c) Se forman dos horquillas que se alejan entre sí, se utilizan fragmentos de Okazaki en ambas hebras nuevas y se destruye la hebra original.",
      "d) La burbuja se expande hacia ambos lados, pero ambas hebras crecen de forma continua para evitar errores."
    ],
    respuestaCorrecta: 0, // a
  },
  {
    texto: "¿Cuál de las siguientes enzimas se encarga de la ruptura de los puentes de hidrógeno entre las bases nitrogenadas, separando las dos hebras del ADN?",
    opciones: [
      "a) Helicasa",
      "b) Primasa",
      "c) ADN Polimerasa III",
      "d) ADN Ligasa"
    ],
    respuestaCorrecta: 0, // a
  },
  {
    texto: "¿Cuál de las siguientes enzimas se encarga de sintetizar pequeños fragmentos de ARN llamados cebadores (primers)?",
    opciones: [
      "a) Helicasa",
      "b) Primasa",
      "c) ADN Polimerasa III",
      "d) ADN Ligasa"
    ],
    respuestaCorrecta: 1, // b
  },
  {
    texto: "¿Cuál de las siguientes enzimas se encarga de la elongación de la cadena, catalizando la formación del enlace fosfodiéster y añadiendo desoxirribonucleótidos complementarios?",
    opciones: [
      "a) Helicasa",
      "b) Primasa",
      "c) ADN Polimerasa III",
      "d) ADN Ligasa"
    ],
    respuestaCorrecta: 2, // c
  },
  {
    texto: "Transcripción: ¿En qué se diferencia la transcripción de la replicación del ADN?",
    opciones: [
      "a) En que la replicación se da en el núcleo y la transcripción en el ribosoma",
      "b) En la polaridad y la direccionalidad",
      "c) En la simetría y la direccionalidad",
      "d) En la continuidad y el organelo donde se llevan a cabo"
    ],
    respuestaCorrecta: 2, // c (La replicación es simétrica, la transcripción asimétrica)
  },
  {
    texto: "¿Cuál de las subunidades de la ARN polimerasa de procariotas reconoce al promotor?",
    opciones: [
      "a) La alfa",
      "b) La gamma",
      "c) La omega",
      "d) La sigma"
    ],
    respuestaCorrecta: 3, // d
  },
  {
    texto: "¿Cuál de las siguientes es una característica de la fase de elongación de la transcripción?",
    opciones: [
      "a) Requiere cebador",
      "b) Requiere de dos enlaces de alta energía",
      "c) La ARN polimerasa repara errores",
      "d) No hay superenrollamiento de las hebras de ADN"
    ],
    respuestaCorrecta: 1, // b
  },
  {
    texto: "¿Qué utilidad puede tener una secuencia palindrómica en el ADN durante la transcripción?",
    opciones: [
      "a) Indicar el inicio de la replicación",
      "b) Indicar el sitio de terminación de la transcripción dependiente de Rho",
      "c) Ser reconocida por la subunidad sigma de la ARN polimerasa",
      "d) Indicar el sitio de terminación de la transcripción independiente de Rho"
    ],
    respuestaCorrecta: 3, // d
  },
  {
    texto: "¿Qué caracteriza a los factores de transcripción inducibles?",
    opciones: [
      "a) Pueden ser potenciadores o silenciadores, reconocen secuencias distales",
      "b) Están activos en todo momento y son solo potenciadores",
      "c) Reconocen secuencias proximales para dar inicio a la transcripción",
      "d) Se unen al promotor basal y son silenciadores"
    ],
    respuestaCorrecta: 0, // a
  },
  {
    texto: "¿Qué provoca la acetilación de las histonas?",
    opciones: [
      "a) La formación de una cromatina laxa que permita la introducción del aparato transcripcional",
      "b) El superenrollamiento del ADN",
      "c) La formación de una cromatina compacta que impida la introducción del aparato transcripcional",
      "d) Es una herramienta farmacológica útil para impedir el crecimiento de tumores"
    ],
    respuestaCorrecta: 0, // a
  },
  {
    texto: "¿Con qué finalidad se une GTP al Factor de Iniciación 2 (IF2) en la fase de iniciación de la traducción de proteínas en procariotas?",
    opciones: [
      "a) Para catalizar la formación del enlace peptídico en el centro peptidil-transferasa",
      "b) Para permitir la unión del aminoacil-ARNt al sitio A del ribosoma",
      "c) Para facilitar el ensamblaje de la subunidad 50S y posicionar el fMet-ARNt en el sitio P",
      "d) Para impedir la unión del ARNm a la subunidad 30S y evitar traducciones incorrectas"
    ],
    respuestaCorrecta: 2, // c
  },
  {
    texto: "La doxiciclina es un antibiótico efectivo en enfermedad periodontal. Indique cómo actúa a nivel molecular en la traducción de bacterias:",
    opciones: [
      "a) Se une a la subunidad 50S e inhibe la peptidil-transferasa",
      "b) Se une a la subunidad 30S e impide la unión del aminoacil-ARNt al sitio A del ribosoma",
      "c) Se une al ARNm y produce lectura incorrecta de codones (misreading)",
      "d) Inhibe la translocación del ribosoma al bloquear el factor EF-G"
    ],
    respuestaCorrecta: 1, // b
  },
  {
    texto: "¿Cuáles son los codones de terminación de la traducción?",
    opciones: [
      "a) AUG, UGA, UAA",
      "b) UAA, UAG, UGA",
      "c) UUA, UGA, UGG",
      "d) UGA, AGA, UAA"
    ],
    respuestaCorrecta: 1, // b
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