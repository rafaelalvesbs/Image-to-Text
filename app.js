const imageInput = document.getElementById("imageUpload");
const loader = document.getElementById("loader");
const output = document.getElementById("output");
const resultContainer = document.getElementById("result-container");

imageInput.addEventListener("change", async () => {
    const file = imageInput.files[0];

    if (!file) return;

    // mostra loader
    loader.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    output.textContent = "";

    try {
        const worker = await Tesseract.createWorker("por", 1);

        const { data } = await worker.recognize(file);

        output.textContent = data.text;
        resultContainer.classList.remove("hidden");

        await worker.terminate();
    } catch (err) {
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
