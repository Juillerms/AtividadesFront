document.addEventListener('DOMContentLoaded', () => {

    const textoInput = document.getElementById('texto');
    const origemInput = document.getElementById('origem');
    const destinoInput = document.getElementById('destino');
    const novoTextoDiv = document.getElementById('novo_texto');
    const trocarBtn = document.getElementById('trocar');
    const censurarBtn = document.getElementById('censurar');
    const limparBtn = document.getElementById('limpar');

    // --- Objeto Ad-hoc para manipulação de texto ---
    const textManipulator = {
        texto: '',
        palavrasTrocaOrigem: [],
        palavrasTrocaDestino: [],
        palavrasCensuradas: [
            'chato', 'irritante', 'feio', 'bobo', 'terrível',
            'horrível', 'péssimo', 'ruim', 'medonho', 'assustador'
        ],

        trocar: function() {
            let textoModificado = this.texto;
            for (let i = 0; i < this.palavrasTrocaOrigem.length; i++) {
                const origem = this.palavrasTrocaOrigem[i];
                const destino = this.palavrasTrocaDestino[i];
                const regex = new RegExp(`\\b${origem}\\b`, 'gi');
                textoModificado = textoModificado.replace(regex, destino);
            }
            return textoModificado;
        },

        censurar: function() {
            let textoModificado = this.texto;
            this.palavrasCensuradas.forEach(palavra => {
                const regex = new RegExp(`\\b${palavra}\\b`, 'gi');
                textoModificado = textoModificado.replace(regex, 'XXX');
            });
            return textoModificado;
        }
    };

    // --- Funções Auxiliares ---

    
    function getFormattedDate() {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = now.toLocaleDateString('pt-BR', options);
        return `Recife, ${dateString}.`;
    }

    function displayResult(newText) {
        novoTextoDiv.innerHTML = `<strong>${getFormattedDate()}</strong><br><br>${newText}`;
    }

    trocarBtn.addEventListener('click', () => {
        const texto = textoInput.value.trim();
        const origemStr = origemInput.value.trim();
        const destinoStr = destinoInput.value.trim();

        if (!texto || !origemStr || !destinoStr) {
            alert('Por favor, preencha todos os campos: Texto, Origem e Destino.');
            return;
        }

        const origemArray = origemStr.split(',').map(p => p.trim()).filter(p => p);
        const destinoArray = destinoStr.split(',').map(p => p.trim()).filter(p => p);

        if (origemArray.length !== destinoArray.length) {
            alert('As listas de palavras de Origem e Destino devem ter o mesmo tamanho.');
            return;
        }

        textManipulator.texto = texto;
        textManipulator.palavrasTrocaOrigem = origemArray;
        textManipulator.palavrasTrocaDestino = destinoArray;

        const resultado = textManipulator.trocar();
        displayResult(resultado);
    });

    censurarBtn.addEventListener('click', () => {
        const texto = textoInput.value.trim();

        if (!texto) {
            alert('Por favor, preencha o campo Texto.');
            return;
        }

        textManipulator.texto = texto;
        const resultado = textManipulator.censurar();
        displayResult(resultado);
    });

    limparBtn.addEventListener('click', () => {
        textoInput.value = '';
        origemInput.value = '';
        destinoInput.value = '';
        novoTextoDiv.innerHTML = '';
        textoInput.focus();
    });

});

