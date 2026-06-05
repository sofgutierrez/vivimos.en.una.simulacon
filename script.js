document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('stars-container');
    const starCount = 180;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = (Math.random() * 2 + 1) + 'px';
        
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = size;
        star.style.height = size;
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        if (i % 12 === 0) star.style.backgroundColor = '#00ffff';
        if (i % 20 === 0) star.style.backgroundColor = '#ff00ff';

        container.appendChild(star);
    }
});
const questions = [
    { q: "¿Qué ley de Newton dice que F = m · a?", a: "Segunda Ley", o: ["Primera Ley", "Segunda Ley", "Tercera Ley"] },
    { q: "¿Qué magnitud mide el desorden en termodinámica?", a: "Entropía", o: ["Entalpía", "Entropía", "Presión"] },
    { q: "¿Quién propuso la Relatividad?", a: "Albert Einstein", o: ["Newton", "Einstein", "Bohr"] },
    { q: "La ley de acción y reacción es la...", a: "Tercera Ley", o: ["Primera Ley", "Segunda Ley", "Tercera Ley"] },
    { q: "¿Cuál es la unidad de energía?", a: "Julio", o: ["Watt", "Julio", "Newton"] },
    { q: "¿Quién descubrió el radio?", a: "Marie Curie", o: ["Curie", "Meitner", "Franklin"] },
    { q: "La primera ley de Newton es la de...", a: "Inercia", o: ["Inercia", "Fuerza", "Gravedad"] },
    { q: "¿Quién unificó el electromagnetismo?", a: "Maxwell", o: ["Faraday", "Maxwell", "Hertz"] },
    { q: "¿Qué ley habla del cero absoluto?", a: "Tercera Ley", o: ["Primera Ley", "Segunda Ley", "Tercera Ley"] },
    { q: "¿Quién tiene un gato cuántico?", a: "Schrödinger", o: ["Heisenberg", "Planck", "Schrödinger"] },
    { q: "La energía no se crea ni se destruye es la...", a: "Primera Ley", o: ["Ley Cero", "Primera Ley", "Segunda Ley"] },
    { q: "¿Quién descubrió el neutrón?", a: "Chadwick", o: ["Rutherford", "Chadwick", "Thomson"] },
    { q: "La constante 'c' representa la velocidad de la...", a: "Luz", o: ["Luz", "Sonido", "Gravedad"] },
    { q: "¿Quién enunció la gravedad universal?", a: "Newton", o: ["Galileo", "Kepler", "Newton"] },
    { q: "El equilibrio térmico es la ley...", a: "Ley Cero", o: ["Ley Cero", "Primera Ley", "Segunda Ley"] },
    { q: "¿Quién estudió los orbitales atómicos?", a: "Bohr", o: ["Dalton", "Bohr", "Boyle"] },
    { q: "El principio de incertidumbre es de...", a: "Heisenberg", o: ["Pauli", "Heisenberg", "Einstein"] },
    { q: "¿Quién es el padre de la física experimental?", a: "Galileo", o: ["Aristóteles", "Galileo", "Bacon"] },
    { q: "¿Qué gas ideal relaciona P, V y T?", a: "Ley de Gases", o: ["Ley de Ohm", "Ley de Gases", "Ley de Hooke"] },
    { q: "¿Quién descubrió el electrón?", a: "Thomson", o: ["Rutherford", "Chadwick", "Thomson"] }
];

let currentIdx = 0;
let score = 0;

function load() {
    if (currentIdx >= questions.length) {
        showResults();
        return;
    }

    const q = questions[currentIdx];
    document.getElementById("q-count").innerText = `SECTOR: ${currentIdx + 1}/20`;
    document.getElementById("progress-bar").style.width = `${(currentIdx / questions.length) * 100}%`;
    document.getElementById("question-text").innerText = `> ${q.q}`;
    
    const container = document.getElementById("options-container");
    container.innerHTML = "";

    q.o.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerText = opt;
        btn.onclick = () => {
            if (opt === q.a) score++;
            currentIdx++;
            load();
        };
        container.appendChild(btn);
    });
}

function showResults() {
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("results-screen").style.display = "block";
    document.getElementById("final-score").innerText = score;
    document.getElementById("rank-text").innerText = score > 15 ? "ESTADO: COMANDANTE" : "ESTADO: CADETE";
}

load();
// === LÓGICA DEL CHAT FLOTANTE INTERACTIVO ===
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// 1. Abrir y cerrar el chat al dar clic al circulito
chatToggle.addEventListener('click', () => {
    if (chatWindow.style.display === 'none') {
        chatWindow.style.display = 'flex';
    } else {
        chatWindow.style.display = 'none';
    }
});

// Base de datos de respuestas de la IA
const aiResponses = {
    pixel: "La Longitud de Planck (1.6 x 10^-35 m) es la resolución máxima de nuestro hardware cósmico. Intentar renderizar algo más pequeño crearía un mini agujero negro. ¡La realidad está pixelada!",
    planck: "La Longitud de Planck (1.6 x 10^-35 m) es la resolución máxima de nuestro hardware cósmico. Intentar renderizar algo más pequeño crearía un mini agujero negro. ¡La realidad está pixelada!",
    lag: "El universo evita el lag limitando la velocidad máxima de la información a la velocidad de la luz (300,000 km/s). Es la tasa máxima de refresco del procesador central.",
    luz: "El universo evita el lag limitando la velocidad máxima de la información a la velocidad de la luz (300,000 km/s). Es la tasa máxima de refresco del procesador central.",
    render: "El universo usa 'Frustum Culling' subatómico. Por la superposición cuántica, las partículas son ondas hasta que un observador las mira y las fuerza a renderizarse. ¡Ahorro de energía pura!",
    mirar: "El universo usa 'Frustum Culling' subatómico. Por la superposición cuántica, las partículas son ondas hasta que un observador las mira y las fuerza a renderizarse. ¡Ahorro de energía pura!",
    holograma: "Stephen Hawking y Juan Martín Maldacena demostraron que toda la información 3D de nuestra realidad podría estar grabada en una frontera plana de 2D, como una tarjeta de crédito o un chip de videojuegos.",
    cuerdas: "Según la Teoría de Cuerdas, la materia está hecha de filamentos diminutos que vibran como una guitarra. Dependiendo de la vibración, crean una partícula u otra. ¡El universo es un software musical! 🎻",
    hola: "¡Hola! Soy el Oráculo Cósmico. Pregúntame sobre: pixeles, lag, cuerdas o el experimento cuántico.",
};

function handleSend() {
    const text = userInput.value.trim().toLowerCase();
    if (!text) return;

    // Mostrar mensaje del usuario
    appendMessage(userInput.value, 'user-msg', '[Tú]');
    userInput.value = '';

    // Efecto de carga
    const loadingId = appendMessage('Procesando datos cuánticos...', 'ai-msg', '[Oráculo]');
    
    setTimeout(() => {
        document.getElementById(loadingId).remove();

        let reply = "Esa información no computa en esta simulación. Prueba preguntando sobre 'pixeles', 'lag', 'cuerdas' o 'hologramas'.";
        
        for (const key in aiResponses) {
            if (text.includes(key)) {
                reply = aiResponses[key];
                break;
            }
        }

        appendMessage(reply, 'ai-msg', '[Oráculo]');
    }, 600);
}

function appendMessage(content, className, senderName) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${className}`;
    const uniqueId = 'msg-' + Math.random().toString(36).substr(2, 9);
    msgDiv.id = uniqueId;
    msgDiv.innerHTML = `<strong>${senderName}:</strong> ${content}`;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return uniqueId;
}

// Escuchar eventos para enviar mensaje
sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});