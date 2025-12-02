const imageInput = document.getElementById('imageInput');
const previewImg = document.getElementById('previewImg');
const convertBtn = document.getElementById('convertBtn');
const outputText = document.getElementById('outputText');

let selectedImage = null;

// Mostrar pré-visualização da imagem
imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      previewImg.src = event.target.result;
      previewImg.style.display = 'block';
      selectedImage = event.target.result;
    }
    reader.readAsDataURL(file);
  }
});

// Converter imagem para texto
convertBtn.addEventListener('click', () => {
  if (!selectedImage) {
    alert("Por favor, selecione uma imagem primeiro!");
    return;
  }

  outputText.value = "Processando...";

  Tesseract.recognize(
    selectedImage,
    'por', // linguagem PT-BR
    { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    outputText.value = text;
  }).catch(err => {
    outputText.value = "Erro ao processar a imagem.";
    console.error(err);
  });
});
