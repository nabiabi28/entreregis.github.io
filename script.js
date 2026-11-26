const form = document.getElementById("encuestaForm");
const resultadoDiv = document.getElementById("resultado");
const zonaProgreso = document.getElementById("zonaProgreso");
const barraProgreso = document.getElementById("barraProgreso");
const etiquetaPaso = document.getElementById("etiquetaPaso");
const etiquetaPorcentaje = document.getElementById("etiquetaPorcentaje");
const mensajeAviso = document.getElementById("mensajeAviso");

const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const btnEnviar = document.getElementById("btnEnviar");

const totalPreguntas = 14;
const maxPreocupacion = 25;
const maxDesconocimiento = 16;

// 
let pasoActual = 1;

function leerRespuesta(nombre) {
  const seleccionado = document.querySelector('input[name="' + nombre + '"]:checked');
  if (seleccionado) {
    return seleccionado.value;
  }
  return "";
}

function mostrarPaso(numero) {
  // Ocultar todas las preguntas y mostrar solo la actual
  for (let i = 1; i <= totalPreguntas; i++) {
    const caja = document.getElementById("paso-" + i);
    if (i === numero) {
      caja.className = "pregunta activa";
    } else {
      caja.className = "pregunta";
    }
  }

  // Barra
  const porcentaje = Math.round((numero / totalPreguntas) * 100);
  etiquetaPaso.textContent = "Pregunta " + numero + " de " + totalPreguntas;
  etiquetaPorcentaje.textContent = porcentaje + "%";
  barraProgreso.style.width = porcentaje + "%";

  //
  if (numero === 1) {
    btnAnterior.style.visibility = "hidden";
  } else {
    btnAnterior.style.visibility = "visible";
  }

  if (numero === totalPreguntas) {
    btnSiguiente.style.display = "none";
    btnEnviar.style.display = "inline-block";
  } else {
    btnSiguiente.style.display = "inline-block";
    btnEnviar.style.display = "none";
  }
}

function cambiarPaso(direccion) {
  // Comprobar que respondió 
    if (direccion === 1) {
    const respuestaActual = leerRespuesta("p" + pasoActual);
    if (respuestaActual === "") {
      mensajeAviso.style.display = "block";
      return;
    }
  }

  mensajeAviso.style.display = "none";
  pasoActual = pasoActual + direccion;
  mostrarPaso(pasoActual);
}

// Iniciar en la pregunta 1
mostrarPaso(1);

function obtenerNivel(puntos, maximo) {
  const porcentaje = (puntos / maximo) * 100;
  if (porcentaje < 34) {
    return "Bajo";
  } else if (porcentaje < 67) {
    return "Moderado";
  } else {
    return "Alto";
  }
}

function reiniciarEncuesta() {
  form.reset();
  pasoActual = 1;
  mostrarPaso(1);
  resultadoDiv.style.display = "none";
  form.style.display = "block";
  zonaProgreso.style.display = "block";
}

form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  // 
  if (leerRespuesta("p14") === "") {
    mensajeAviso.style.display = "block";
    return;
  }

  let preocupacion = 0;
  let desconocimiento = 0;

  const p1 = leerRespuesta("p1");
  if (p1 === "NO") {
    desconocimiento = desconocimiento + 3;
  }

  const p2 = leerRespuesta("p2");
  if (p2 === "DUDOSO") {
    preocupacion = preocupacion + 1;
    desconocimiento = desconocimiento + 1;
  } else if (p2 === "NO") {
    desconocimiento = desconocimiento + 2;
  }

  const p3 = leerRespuesta("p3");
  if (p3 === "SI") {
    preocupacion = preocupacion + 1;
  } else if (p3 === "NO") {
    desconocimiento = desconocimiento + 2;
  }

  const p4 = leerRespuesta("p4");
  if (p4 === "NO") {
    preocupacion = preocupacion + 1;
    desconocimiento = desconocimiento + 3;
  }

  const p5 = leerRespuesta("p5");
  if (p5 === "SI") {
    preocupacion = preocupacion + 2;
    desconocimiento = desconocimiento + 1;
  }

  const p6 = leerRespuesta("p6");
  if (p6 === "VIGILANCIA") {
    preocupacion = preocupacion + 2;
  } else if (p6 === "ESTAFAS" || p6 === "BANCOS") {
    preocupacion = preocupacion + 3;
  }

  const p7 = leerRespuesta("p7");
  if (p7 === "ALGO_CLARA") {
    desconocimiento = desconocimiento + 1;
  } else if (p7 === "POCA_CLARA") {
    preocupacion = preocupacion + 1;
    desconocimiento = desconocimiento + 2;
  } else if (p7 === "NADA_CLARA") {
    preocupacion = preocupacion + 2;
    desconocimiento = desconocimiento + 3;
  }

  const p8 = leerRespuesta("p8");
  if (p8 === "POCO") {
    preocupacion = preocupacion + 2;
  } else if (p8 === "NADA") {
    preocupacion = preocupacion + 3;
  }

  const p9 = leerRespuesta("p9");
  if (p9 === "SI") {
    preocupacion = preocupacion + 3;
  }

  const p10 = leerRespuesta("p10");
  if (p10 === "NO") {
    preocupacion = preocupacion + 1;
  }

  const p11 = leerRespuesta("p11");
  if (p11 === "SI") {
    preocupacion = preocupacion + 3;
  }

  const p12 = leerRespuesta("p12");
  if (p12 === "SI") {
    preocupacion = preocupacion + 3;
  }

  const p13 = leerRespuesta("p13");
  if (p13 === "FRECUENTE") {
    preocupacion = preocupacion + 2;
  } else if (p13 === "RARAMENTE") {
    preocupacion = preocupacion + 1;
  }

  const p14 = leerRespuesta("p14");
  if (p14 === "MAS_O_MENOS") {
    desconocimiento = desconocimiento + 1;
  } else if (p14 === "NO") {
    preocupacion = preocupacion + 1;
    desconocimiento = desconocimiento + 2;
  }

  const nivelPreoc = obtenerNivel(preocupacion, maxPreocupacion);
  const nivelDesc = obtenerNivel(desconocimiento, maxDesconocimiento);

  const pctPreoc = Math.round((preocupacion / maxPreocupacion) * 100);
  const pctDesc = Math.round((desconocimiento / maxDesconocimiento) * 100);

  let perfil = "";
  let icono = "🛡️";

  if (nivelPreoc === "Alto" && nivelDesc === "Alto") {
    icono = "🚨";
    perfil = "Alta preocupación y alto desconocimiento: Siente mucha inquietud y además necesita información clara y medidas prácticas de protección.";
  } else if (nivelPreoc === "Alto") {
    icono = "⚠️";
    perfil = "Alta preocupación con menor desconocimiento: Conoce riesgos o el tema, pero muestra fuerte desconfianza o inquietud por sus datos/cuentas.";
  } else if (nivelDesc === "Alto") {
    icono = "📘";
    perfil = "Mayor desconocimiento que preocupación: No expresa tanta alarma, pero tiene vacíos importantes sobre seguridad digital, phishing o qué hacer ante un robo de datos.";
  } else {
    icono = "✅";
    perfil = "Niveles bajos o moderados: Reporta menor inquietud y mayor familiaridad o claridad frente a los temas consultados.";
  }

  let avisoBancario = "";
  if (p12 === "SI") {
    avisoBancario = '<p class="alerta">⚠️ Nota: Se marcó haber notado movimientos fuera de lo normal en cuentas bancarias. Se recomienda revisar estados de cuenta y contactar al banco por vías oficiales.</p>';
  }

  // Ocultar formulario y mostrar pantalla de resultados
  form.style.display = "none";
  zonaProgreso.style.display = "none";
  resultadoDiv.style.display = "block";

  resultadoDiv.innerHTML =
    '<div class="encabezado-resultado">' +
      '<div class="icono-grande">' + icono + "</div>" +
      "<h2>Resultados de tu Evaluación</h2>" +
    "</div>" +
    '<div class="tarjetas">' +
      '<div class="tarjeta">' +
        "<h3>Preocupación: " + nivelPreoc + "</h3>" +
        "<p><strong>Puntaje:</strong> " + preocupacion + " / " + maxPreocupacion + " (" + pctPreoc + "%)</p>" +
        '<div class="barra-puntos"><div class="relleno-puntos" style="width: ' + pctPreoc + '%"></div></div>' +
      "</div>" +
      '<div class="tarjeta">' +
        "<h3>Desconocimiento: " + nivelDesc + "</h3>" +
        "<p><strong>Puntaje:</strong> " + desconocimiento + " / " + maxDesconocimiento + " (" + pctDesc + "%)</p>" +
        '<div class="barra-puntos"><div class="relleno-puntos" style="width: ' + pctDesc + '%"></div></div>' +
      "</div>" +
    "</div>" +
    '<div class="caja-diagnostico"><strong>Diagnóstico:</strong> ' + perfil + "</div>" +
    '<div class="caja-consejos">' +
      "<h4>3 recomendaciones prácticas para protegerte:</h4>" +
      "<ul>" +
        "<li>No abras enlaces sospechosos que lleguen por SMS o WhatsApp pidiendo datos bancarios.</li>" +
        "<li>Activa la verificación en dos pasos en tus aplicaciones y correo electrónico.</li>" +
        "<li>Ante llamadas de extorsión, cuelga de inmediato y reporta al <strong>089</strong> (Denuncia Anónima).</li>" +
      "</ul>" +
    "</div>" +
    avisoBancario +
    '<button type="button" class="btn btn-anterior" style="margin-top: 18px;" onclick="reiniciarEncuesta()">↺ Regresar al inicio</button>';
});