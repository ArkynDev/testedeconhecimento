document.addEventListener('DOMContentLoaded', function() {
    const disciplineValue = document.getElementById('Discipline').value;
    filterCategories(disciplineValue);
});

document.getElementById('Discipline').addEventListener('change', function() {
    const disciplineValue = this.value;
    filterCategories(disciplineValue);
});

document.getElementById('fetchDataButton').addEventListener('click', function() {
    const disciplineValue = document.getElementById('Discipline').value;
    const categoryValue = document.getElementById('Category').value;
    const levelValue = document.getElementById('Level').value;
    const questionLimit = parseInt(document.getElementById('questionLimit').value);
    generateTst(disciplineValue, categoryValue, levelValue, questionLimit);
});

function filterCategories(disciplineValue) {
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
        .map(item => item.Category);

        const uniqueData = [...new Set(filteredData)];
        uniqueData.sort();

        const filteredCategory = document.getElementById('Category');
        filteredCategory.innerHTML = '';

        uniqueData.forEach(item => {
            const categoryOption = document.createElement('option');
            categoryOption.value = item;
            categoryOption.textContent = item;
            filteredCategory.appendChild(categoryOption);
        })


        const categoryValue = document.getElementById('Category').value;
        console.log(categoryValue);
        filterLevels(disciplineValue, categoryValue);
    })
    .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
    });
}

function filterLevels(disciplineValue, categoryValue) {
    axios.get('https://sheetdb.io/api/v1/qa698ijt4p2xw', {
        "auth": {
            "username": "21hghuts",
            "password": "7b69qsk0o93gekgvjlts"
        }
    })
    .then(response => {
        const data = response.data;

        const filteredData = data
        .filter(item => item.Discipline === disciplineValue && item.Category === categoryValue)
        .map(item => item.Level);

        const uniqueData = [...new Set(filteredData)];
        uniqueData.sort();

        const filteredLevel = document.getElementById('Level');
        filteredLevel.innerHTML = '';

        uniqueData.forEach(item => {
            const levelOption = document.createElement('option');
            levelOption.value = item;
            levelOption.textContent = `${item}° ano`;
            filteredLevel.appendChild(levelOption);
        })
    })
    .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
    });
}

function generateTst(disciplineValue, categoryValue, levelValue, questionLimit) {
    axios.get('https://sheetdb.io/api/v1/qa698ijt4p2xw', {
        "auth": {
            "username": "21hghuts",
            "password": "7b69qsk0o93gekgvjlts"
        }
    })
    .then(response => {
        const data = response.data;
        const filteredData = data
        .filter(item => 
            item.Discipline === disciplineValue &&
            item.Category === categoryValue &&
            item.Level === levelValue
        );

        const shuffledData = shuffleArray(filteredData);
        const limitedData = shuffledData.slice(0, questionLimit);

        const dataDisplay = document.getElementById('dataDisplay');
        dataDisplay.innerHTML = '';

        console.log("!!!");

        limitedData.forEach((item, index) => {
            console.log(item);
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question-block');

            const question = document.createElement('p');
            question.textContent = `${index + 1}- ${item.Question}`;
            question.classList.add('question');
            questionDiv.appendChild(question);

            const r1 = document.createElement('p');
            r1.textContent = `a) ${item.A}`;
            r1.classList.add('question-opt');
            if(item.A === item.Correct){
                r1.classList.add('correct');
            }
            questionDiv.appendChild(r1);

            const r2 = document.createElement('p');
            r2.textContent = `b) ${item.B}`;
            r2.classList.add('question-opt');
            if(item.B === item.Correct){
                r2.classList.add('correct');
            }
            questionDiv.appendChild(r2);

            const r3 = document.createElement('p');
            r3.textContent = `c) ${item.C}`;
            r3.classList.add('question-opt');
            if(item.C === item.Correct){
                r3.classList.add('correct');
            }
            questionDiv.appendChild(r3);

            const r4 = document.createElement('p');
            r4.textContent = `d) ${item.D}`;
            r4.classList.add('question-opt');
            if(item.D === item.Correct){
                r4.classList.add('correct');
            }
            questionDiv.appendChild(r4);

            const r5 = document.createElement('p');
            r5.textContent = `e) ${item.E}`;
            r5.classList.add('question-opt');
            if(item.E === item.Correct){
                r5.classList.add('correct');
            }
            questionDiv.append(r1, r2, r3, r4, r5);

            dataDisplay.appendChild(questionDiv); 
        });
    })
    .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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