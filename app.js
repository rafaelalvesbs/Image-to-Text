const imageInput = document.getElementById("imageUpload");
const loader = document.getElementById("loader");
const output = document.getElementById("output");
const resultContainer = document.getElementById("result-container");
const copyBtn = document.getElementById("copyBtn");

imageInput.addEventListener("change", async () => {
    const file = imageInput.files[0];
    if (!file) return;

    // Mostra loader e esconde resultados
    loader.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    copyBtn.classList.add("hidden");
    output.style.opacity = 0;
    output.textContent = "";

    try {
        const worker = await Tesseract.createWorker({
            logger: m => console.log(m)
        });

        await worker.load();
        await worker.loadLanguage("por");
        await worker.initialize("por");

        const { data } = await worker.recognize(file);

        output.textContent = data.text.trim();
        loader.classList.add("hidden");

        resultContainer.classList.remove("hidden");
        output.style.opacity = 1;
        copyBtn.classList.remove("hidden");

        await worker.terminate();
    } catch (err) {
        console.error(err);
        loader.classList.add("hidden");
        output.textContent = "Erro ao processar a imagem.";
        resultContainer.classList.remove("hidden");
        copyBtn.classList.add("hidden");
        output.style.opacity = 1;
    }
});

// Copiar texto
copyBtn.addEventListener("click", () => {
    const text = output.innerText.trim();
    if (!text) {
        alert("Nenhum texto para copiar!");
        return;
    }
    navigator.clipboard.writeText(text)
        .then(() => alert("Texto copiado!"))
        .catch(() => alert("Erro ao copiar."));
});
