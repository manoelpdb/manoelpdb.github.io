document.querySelectorAll(".lookAtMouse").forEach((img) => {
  const maxTilt = 15;

  img.addEventListener("mousemove", (e) => {
    const rect = img.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    img.style.transform = `perspective(600px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg)`;
  });

  img.addEventListener("mouseleave", () => {
    img.style.transform = "";
  });
});

const background = {
  morning: "linear-gradient(160deg, #ffd9a0 0%, #f08a5d 45%, #3b5b8c 100%)",
  evening: "linear-gradient(160deg, #7fc8f8 0%, #3a7bd5 50%, #1d3a7a 100%)",
  night: `radial-gradient(circle at 15% 20%, rgba(95, 216, 240, 0.6), transparent 50%), linear-gradient(160deg, #1d3a7a 0%, #0b1030 100%)`,
};

function dayPeriod() {
  const hora = new Date().getHours();

  if (hora >= 5 && hora < 12) return "morning";
  if (hora >= 12 && hora < 18) return "evening";
  return "night";
}

function applyBack() {
  document.body.style.background = background[dayPeriod()];
}

applyBack();
setInterval(applyBack, 60000);

/* art randomize */

const gallery = [
  "https://i.imgur.com/QAnxI0T.png",
  "https://i.imgur.com/8B7lyxl.png",
  "https://i.imgur.com/nTfW6BM.png",
  "https://i.imgur.com/6Eld3eY.png",
  "https://i.imgur.com/WSby7b8.png",
  "https://i.imgur.com/mATQl1y.png",
  "https://i.imgur.com/gRDyrXz.png",
  "https://i.imgur.com/VpGvmCA.png",
  "https://i.imgur.com/u8f8m1G.png",
  "https://i.imgur.com/phbYuZb.png",
  "https://i.imgur.com/qZZZbLb.png",
  "https://i.imgur.com/Tkd4qSx.png",
];

const imgs = document.querySelectorAll(".galleryImg > img");
const TEMPO_TROCA = 4000;

let fila = [];
let indice = 0;

function embaralhar(lista) {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function proximaImagem() {
    if (indice >= fila.length) {
        fila = embaralhar(gallery);
        indice = 0;
    }
    return fila[indice++];
}

function mostrarProximas() {
    const escolhidas = [];

    imgs.forEach(img => {
        let nova = proximaImagem();
        let tentativas = 0;

        // evita repetir uma imagem que já está em outra posição nesta troca
        while (escolhidas.includes(nova) && tentativas < gallery.length) {
            nova = proximaImagem();
            tentativas++;
        }

        img.src = nova;
        escolhidas.push(nova);
    });
}

mostrarProximas();
setInterval(mostrarProximas, TEMPO_TROCA);

const zoom = document.getElementById('zoom');
const zoomImg = document.getElementById('zoomImg');

imgs.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
        zoomImg.src = img.src;
        zoom.showModal();
    });
});

zoom.addEventListener('click', () => zoom.close());