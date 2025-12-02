const input = document.getElementById("imageInput");
const loader = document.getElementById("loader");
const output = document.getElementById("output");

let worker = null;

// Carrega apenas 1 vez (muito mais rápido)
async function initWorker() {
    if (!worker) {
        worker = await Tesseract.createWorker("eng", 1, {
            corePath: "https://cdn.jsdelivr.net/npm/tesseract.js-core@5/tesseract-core.wasm.js"
        });
    }
}

initWorker();

input.addEventListener("change", async () => {
    const file = input.files[0];
    if (!file) return;

    if (!file.type.match(/image\/(png|jpe?g)/)) {
        output.style.opacity = 1;
        output.textContent = "Erro: envie uma imagem PNG ou JPG.";
        return;
    }

    loader.style.display = "block";
    output.style.opacity = 0;
    output.textContent = "";

    try {
        const result = await worker.recognize(file);
        output.textContent = result.data.text.trim();
    } catch (e) {
        output.textContent = "Ocorreu um erro ao processar a imagem.";
        console.error(e);
    }

    loader.style.display = "none";
    output.style.opacity = 1;
});
