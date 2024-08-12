const dataFolder = '/data';
const fileExtension = '.json';

// Função para construir o caminho do arquivo
function getFilePath(fileName) {
    return `${dataFolder}/${fileName}${fileExtension}`;
}

function loadJson(fileName) {
    const filePath = getFilePath(fileName);

    axios.get(filePath)
        .then(response => {
            // Exibe os dados no console para verificação
            console.log('Dados carregados:', response.data);

        })
        .catch(error => {
            console.error('Erro ao carregar o JSON:', error);
        });
}

document.getElementById('Discipline').addEventListener('change', function() {
    loadJson(this.value);
});

loadJson(document.getElementById('Discipline').value);

