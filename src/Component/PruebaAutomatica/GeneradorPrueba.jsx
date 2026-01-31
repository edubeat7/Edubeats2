import React from 'react';
import * as XLSX from 'xlsx';

const ExcelGenerator = () => {
  // Usamos las preguntas que ya conocemos del código previo
 const preguntas = [
  {
    texto: "¿Cuál es la característica estructural del agua que permite la formación de puentes de hidrógeno y determina su constante dieléctrica?",
    opciones: [
      "A. La formación de enlaces covalentes coordinados entre el oxígeno de una molécula y el hidrógeno de otra.",
      "B. La geometría lineal de la molécula que facilita el empaquetamiento denso en estado líquido.",
      "C. La capacidad del oxígeno para compartir cuatro electrones con cada átomo de hidrógeno.",
      "D. La naturaleza de dipolo eléctrico de la molécula debido a la diferencia de electronegatividad entre el oxígeno y el hidrógeno."
    ],
    respuestaCorrecta: 3 // D
  },
  {
    texto: "Desde el punto de vista bioquímico, ¿por qué el alto calor específico del agua es vital para el mantenimiento de la homeostasis en la cavidad oral?",
    opciones: [
      "A. Mantiene la viscosidad de la saliva constante independientemente de la temperatura de los alimentos ingeridos.",
      "B. Permite que la saliva absorba grandes cantidades de energía térmica sin cambios bruscos en la temperatura de la boca y sin ocasionar daños a los tejidos.",
      "C. Facilita la transferencia rápida de calor desde los alimentos calientes hacia la pulpa dental.",
      "D. Garantiza que el agua se evapore rápidamente de la mucosa oral para enfriar los tejidos mediante conducción."
    ],
    respuestaCorrecta: 1 // B
  },
  {
    texto: "La molécula de agua posee una geometría angular de 104.5°. ¿Cuál es la consecuencia inmediata de esta estructura unida a la diferencia de electronegatividad entre sus átomos?",
    opciones: [
      "A) La formación de un dipolo eléctrico con una carga parcial negativa sobre el oxígeno.",
      "B) La anulación de los momentos dipolares, resultando en una molécula apolar.",
      "C) La capacidad de formar enlaces covalentes dobles con otras moléculas de agua.",
      "D) El aumento de la distancia de enlace entre los átomos de hidrógeno."
    ],
    respuestaCorrecta: 0 // A
  },
  {
    texto: "En el contexto de los puentes de hidrógeno, ¿cuál es el número máximo de interacciones de este tipo que una sola molécula de agua puede establecer con sus vecinas en estado líquido?",
    opciones: [
      "A) Dos: una a través de cada átomo de hidrógeno.",
      "B) Tres: dos a través del oxígeno y una a través de un hidrógeno.",
      "C) Cuatro: dos a través de los hidrógenos y dos a través de los pares de electrones libres del oxígeno.",
      "D) Seis: dependiendo de la presión hidrostática del medio."
    ],
    respuestaCorrecta: 2 // C
  },
  {
    texto: "El agua tiene un alto calor de vaporización (2,260kJ/kg). Bioquímicamente, ¿qué proceso físico describe mejor esta propiedad?",
    opciones: [
      "A) La energía necesaria para romper los enlaces covalentes OH dentro de la molécula.",
      "B) La energía requerida para romper los puentes de hidrógeno y liberar las moléculas al estado gaseoso.",
      "C) La capacidad de absorber calor sin que la temperatura del sistema aumente.",
      "D) El movimiento vibracional de los átomos de oxígeno antes de la ebullición."
    ],
    respuestaCorrecta: 1 // B
  },
  {
    texto: "¿Qué ocurre termodinámicamente cuando una sustancia hidrofóbica se introduce en agua (efecto hidrofóbico)?",
    opciones: [
      "A) El agua se vuelve más desordenada, aumentando la entropía del sistema.",
      "B) Las moléculas de agua forman una estructura tipo \"jaula\" (clatrato) más ordenada alrededor de la sustancia, disminuyendo la entropía local.",
      "C) La sustancia hidrofóbica forma puentes de hidrógeno de alta energía con el solvente.",
      "D) El agua disuelve la sustancia mediante la formación de capas de solvatación iónica."
    ],
    respuestaCorrecta: 1 // B
  },
  {
    texto: "El agua es un reactivo químico en muchas rutas metabólicas. ¿En qué consiste específicamente una reacción de hidrólisis?",
    opciones: [
      "A) En la eliminación de una molécula de agua para formar un enlace entre dos monómeros.",
      "B) En la ruptura de un enlace químico mediante la adición de los componentes de una molécula de agua.",
      "C) En la transferencia de electrones desde el agua hacia un sustrato orgánico.",
      "D) En la disociación del agua en iones H+ y OH- sin afectar al soluto."
    ],
    respuestaCorrecta: 1 // B
  },
  {
    texto: "¿Cuál de las siguientes afirmaciones define correctamente el concepto de \"producto iónico del agua\" (Kw)?",
    opciones: [
      "A) Es la suma de las concentraciones de protones e hidroxilos en una solución ácida.",
      "B) Es la relación entre la masa del agua y su volumen a 4°C.",
      "C) Es la medida de la capacidad del agua para resistir cambios bruscos de pH.",
      "D) Es el valor constante que resulta del producto de las concentraciones de H+ y OH- a una temperatura dada."
    ],
    respuestaCorrecta: 3 // D
  },
  {
    texto: "Las moléculas anfipáticas tienen la propiedad de poseer una región polar y una región apolar. ¿Cómo se organizan estas moléculas al ser rodeadas por agua?",
    opciones: [
      "A) Exponiendo sus cadenas hidrocarbonadas al solvente para maximizar el contacto.",
      "B) Orientando sus grupos polares hacia el agua y protegiendo sus colas apolares en el interior de agregados.",
      "C) Disolviéndose individualmente mediante la formación de puentes de hidrógeno en toda su estructura.",
      "D) Precipitando en el fondo del recipiente sin establecer ninguna interacción con el agua."
    ],
    respuestaCorrecta: 1 // B
  },
  {
    texto: "Debido a su alta constante dieléctrica, el agua es un excelente solvente para compuestos iónicos. ¿Cuál es el mecanismo principal de esta propiedad?",
    opciones: [
      "A) El agua aumenta la fuerza de atracción entre los cationes y los aniones.",
      "B) El agua transfiere protones a los iones para convertirlos en moléculas neutras.",
      "C) El agua disminuye la fuerza electrostática entre los iones al interponerse entre ellos y formar esferas de solvatación.",
      "D) El agua actúa como un catalizador sólido que fragmenta los cristales de sal."
    ],
    respuestaCorrecta: 2 // C
  },
  {
    texto: "La tensión superficial del agua es notablemente alta en comparación con otros líquidos. ¿A qué se debe este fenómeno?",
    opciones: [
      "A) A la repulsión entre las nubes electrónicas de los átomos de oxígeno.",
      "B) A las fuerzas de cohesión interna generadas por la red de puentes de hidrógeno.",
      "C) A la presencia de solutos disueltos que empujan las moléculas hacia la superficie.",
      "D) A la gravedad que actúa con más fuerza sobre las moléculas de la capa superior."
    ],
    respuestaCorrecta: 1 // B
  },
  {
    texto: "Si el pH de una solución acuosa disminuye de 7 a 5, ¿qué ha sucedido con la concentración de protones [H+]?",
    opciones: [
      "A) Ha disminuido 2 veces.",
      "B) Ha aumentado 2 veces.",
      "C) Ha aumentado 100 veces.",
      "D) Ha disminuido 100 veces."
    ],
    respuestaCorrecta: 2 // C
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