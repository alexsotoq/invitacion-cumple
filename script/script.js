
// --- 1. Contador Regresivo ---

const fechaEvento = new Date("June 09, 2026 20:00:00").getTime();

const contadorIntervalo = setInterval(function() {
    const ahora = new Date().getTime();
    const distancia = fechaEvento - ahora;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    const elementoDias = document.getElementById("dias");
    const elementoHoras = document.getElementById("horas");
    const elementoMinutos = document.getElementById("minutos");
    const elementoSegundos = document.getElementById("segundos");
    const elementoContador = document.getElementById("contador");


    if (elementoDias && elementoHoras && elementoMinutos && elementoSegundos) {
        elementoDias.innerHTML = dias < 10 ? "0" + dias : dias;
        elementoHoras.innerHTML = horas < 10 ? "0" + horas : horas;
        elementoMinutos.innerHTML = minutos < 10 ? "0" + minutos : minutos;
        elementoSegundos.innerHTML = segundos < 10 ? "0" + segundos : segundos;
    }

    if (distancia < 0) {
        clearInterval(contadorIntervalo);
        if (elementoContador) {
            elementoContador.innerHTML = "¡Es Hoy! ¡A Celebrar!";
            elementoContador.style.fontFamily = "'Oliver', cursive, sans-serif"; 
            elementoContador.style.fontSize = "1.5em";
            elementoContador.style.color = "var(--color-principal)"; 
            elementoContador.style.backgroundColor = "transparent"; 
            elementoContador.style.padding = "0"; 
            elementoContador.style.boxShadow = "none"; 
        }
    }
}, 1000);


// --- 2. Formulario  ---

document.addEventListener('DOMContentLoaded', (event) => {
    const formulario = document.getElementById('formularioAsistencia');
    const mensajeFormulario = document.getElementById('mensajeFormulario');
    const botonConfirmar = document.getElementById('btnConfirmar');

    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const nombreInput = document.getElementById('nombre');
            const correoInput = document.getElementById('correo');
            
            if (!nombreInput || !correoInput || !mensajeFormulario || !botonConfirmar) {
                console.error("Faltan elementos del formulario.");
                return;
            }

            const nombre = nombreInput.value.trim();
            const correo = correoInput.value.trim();

            if (nombre === "" || correo === "") {
                mensajeFormulario.textContent = "Por favor, completa todos los campos para confirmar.";
                mensajeFormulario.style.color = "red";
                return; 
            }

            const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexCorreo.test(correo)) {
                mensajeFormulario.textContent = "Por favor, introduce un correo electrónico válido.";
                mensajeFormulario.style.color = "red";
                return;
            }

            // Mensaje Dinámico
            mensajeFormulario.textContent = `¡Gracias, ${nombre}! Tu asistencia ha sido confirmada. ¡Te esperamos!`;
            mensajeFormulario.style.color = "black"; 

            botonConfirmar.textContent = "Asistencia Confirmada";
            botonConfirmar.style.backgroundColor = "#4CAF50"; 
            botonConfirmar.style.color = "white";
            botonConfirmar.disabled = true; 
            
            // Se resetea el formulario después de 4 segundos
            setTimeout(resetFormulario, 4000); 
        });
    }

    // --- 3. Confetti y Audio ---
    
    // Lanzar Confetti
    function lanzarConfettiInicial() {
        if (typeof confetti === 'function') { 
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            confetti({ particleCount: 75, angle: 60, spread: 55, origin: { x: 0, y: 1 } });
            confetti({ particleCount: 75, angle: 120, spread: 55, origin: { x: 1, y: 1 } });
        } else {
             console.log("Confetti.js no cargado. Revisa el enlace en el HTML.");
        }
    }

    document.body.addEventListener('click', function(e) {
        lanzarConfetiEnPosicion(e.clientX, e.clientY);
    });

    // Confetti al hacer clic
    function lanzarConfetiEnPosicion(x, y) {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 75, // Menos partículas para cada clic
                spread: 60,
                origin: { x: x / window.innerWidth, y: y / window.innerHeight }
            });
        } else {
            console.log("Confetti.js no cargado. Revisa el enlace en el HTML.");
        }
    }

    setTimeout(lanzarConfettiInicial, 500);

    // Audio
    const musica = document.getElementById('musicaFondo');
    
    document.body.addEventListener('click', function() {
        if (musica && musica.paused) {
            musica.play().catch(error => {
                console.log("Error al intentar reproducir audio:", error);
            });
        }
    }, { once: true });
});