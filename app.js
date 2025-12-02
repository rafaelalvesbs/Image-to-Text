const imageInput = document.getElementById("imageUpload");
const loader = document.getElementById("loader");
const output = document.getElementById("output");
const resultContainer = document.getElementById("result-container");

imageInput.addEventListener("change", async () => {
    const file = imageInput.files[0];
    if (!file) return;

    loader.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    output.textContent = "";

    try {
        // Worker atualizado para Tesseract.js v5
        const worker = await Tesseract.createWorker({
            logger: m => console.log(m)
        });

        await worker.load();
        await worker.loadLanguage("por");
        await worker.initialize("por");

        const { data } = await worker.recognize(file);

        output.textContent = data.text;
        resultContainer.classList.remove("hidden");

        await worker.terminate();
    } catch (err) {
        console.error(err);
        output.textContent = "Erro ao processar a imagem.";
        resultContainer.classList.remove("hidden");
    }

    loader.classList.add("hidden");
});

/* COPIAR TEXTO */
document.getElementById("copyBtn").addEventListener("click", () => {
    const text = output.innerText;

    if (!text.trim()) {
        alert("Nenhum texto para copiar!");
        return;
    }

    navigator.clipboard.writeText(text)
        .then(() => alert("Texto copiado!"))
        .catch(() => alert("Erro ao copiar."));
});
