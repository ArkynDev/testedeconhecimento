document.addEventListener('DOMContentLoaded', function() {
    const disciplineValue = document.getElementById('Discipline').value;
    filterLevels(disciplineValue);
});

document.getElementById('Discipline').addEventListener('change', function() {
    const disciplineValue = this.value;

    filterLevels(disciplineValue);
});

document.getElementById('fetchDataButton').addEventListener('click', function() {
    const disciplineValue = document.getElementById('Discipline').value;
    const levelValue = document.getElementById('Level').value;
    fetchData(disciplineValue, levelValue);
});

function filterLevels(disciplineValue) {
    axios.get('https://sheetdb.io/api/v1/qa698ijt4p2xw', {
        "auth": {
            "username": "21hghuts",
            "password": "7b69qsk0o93gekgvjlts"
        }
    })
    .then(response => {
        const data = response.data;

        const filteredData = data
        .filter(item => item.Discipline === disciplineValue)
        .map(item => item.Level);

        const uniqueData = [...new Set(filteredData)];

        uniqueData.sort();

        const filteredLevel = document.getElementById('Level');
        filteredLevel.innerHTML = '';

        uniqueData.forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            filteredLevel.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
    });
}

function fetchData(disciplineValue, levelValue) {
    axios.get('https://sheetdb.io/api/v1/qa698ijt4p2xw', {
        "auth": {
            "username": "21hghuts",
            "password": "7b69qsk0o93gekgvjlts"
        }
    })
    .then(response => {
        const data = response.data;

        // Filtra os dados com base nos valores dos selects
        const filteredData = data.filter(item => item.Discipline === disciplineValue && item.Level === levelValue);

        // Limpa a div antes de adicionar novos elementos
        const dataDisplay = document.getElementById('dataDisplay');
        dataDisplay.innerHTML = '';

        // Exibe os dados em 6 elementos <p>
        filteredData.forEach(item => {
            const container = document.createElement('div');
            const p = document.createElement('p');
            p.textContent = `Número: ${item.Question}`;
            p.classList.add('question');
            const r1 = document.createElement('p');
            r1.textContent = `a) ${item.A}`;
            r1.classList.add('question-opt');
            const r2 = document.createElement('p');
            r2.textContent = `b) ${item.B}`;
            r2.classList.add('question-opt');
            const r3 = document.createElement('p');
            r3.textContent = `c) ${item.C}`;
            r3.classList.add('question-opt');
            const r4 = document.createElement('p');
            r4.textContent = `d) ${item.D}`;
            r4.classList.add('question-opt');
            const r5 = document.createElement('p');
            r5.textContent = `e) ${item.E}`;
            r5.classList.add('question-opt');
            dataDisplay.appendChild(container);
            container.appendChild(p);
            container.appendChild(r1);
            container.appendChild(r2);
            container.appendChild(r3);
            container.appendChild(r4);
            container.appendChild(r5);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
    });
}