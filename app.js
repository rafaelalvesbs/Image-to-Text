const imageInput = document.getElementById("imageInput");
const output = document.getElementById("output");
const loader = document.getElementById("loader");
const copyBtn = document.getElementById("copyBtn");

// Carregar e processar imagem
imageInput.addEventListener("change", async () => {
    const file = imageInput.files[0];
    if (!file) return;

    output.style.display = "none";
    copyBtn.style.display = "none";
    loader.style.display = "block";

    const worker = await Tesseract.createWorker("eng");

    const result = await worker.recognize(file);

    loader.style.display = "none";

    output.innerText = result.data.text;
    output.style.display = "block";

    copyBtn.style.display = "block";

    await worker.terminate();
});

// Copiar texto
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(output.innerText);
    copyBtn.innerText = "Copiado!";
    setTimeout(() => (copyBtn.innerText = "Copiar Texto"), 1200);
});
