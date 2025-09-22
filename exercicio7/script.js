const metodosConta = {
    
    _validarValor(valor) {
        if (typeof valor !== 'number' || valor <= 0) {
            alert('Operação inválida: O valor deve ser um número maior que zero.');
            return false;
        }
        return true;
    },

    
    creditar(valor) {
        if (this._validarValor(valor)) {
            this.saldo += valor;
        }
    },

    debitar(valor) {
        if (this._validarValor(valor)) {
            if (valor > this.saldo) {
                alert(`Operação inválida: Saldo insuficiente. Saldo atual: ${this.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);
            } else {
                this.saldo -= valor;
            }
        }
    }
};


const contas = [
    { nome: 'Cliente C', saldo: 1500.75, ...metodosConta },
    { nome: 'Cliente A', saldo: 5000.00, ...metodosConta },
    { nome: 'Cliente E', saldo: 800.50,  ...metodosConta },
    { nome: 'Cliente B', saldo: 250.00,  ...metodosConta },
    { nome: 'Cliente D', saldo: 10000.00,...metodosConta },
];

document.addEventListener('DOMContentLoaded', () => {
    const tbodyContas = document.getElementById('tbody-contas');
    const thNome = document.getElementById('th-nome');
    const thSaldo = document.getElementById('th-saldo');
    const valorOperacaoInput = document.getElementById('valor-operacao');
    const nomeCorrentistaInput = document.getElementById('nome-correntista');
    const btnOperacao = document.getElementById('btn-operacao');
    
    function renderizarTabela() {
        tbodyContas.innerHTML = '';

        contas.forEach(conta => {
            const tr = document.createElement('tr');

            const tdNome = document.createElement('td');
            tdNome.textContent = conta.nome;

            const tdSaldo = document.createElement('td');
            tdSaldo.textContent = conta.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            tr.appendChild(tdNome);
            tr.appendChild(tdSaldo);

            tbodyContas.appendChild(tr);
        });
    }

    btnOperacao.addEventListener('click', () => {
        const valor = parseFloat(valorOperacaoInput.value);
        const nome = nomeCorrentistaInput.value.trim();
        const operacao = document.querySelector('input[name="operacao"]:checked').value;

        if (!nome) {
            alert('Por favor, insira o nome do correntista.');
            return;
        }

        const contaEncontrada = contas.find(conta => conta.nome.toLowerCase() === nome.toLowerCase());

        if (!contaEncontrada) {
            alert(`Correntista "${nome}" não encontrado.`);
            return;
        }

        if (isNaN(valor)) {
            alert('Por favor, insira um valor numérico válido.');
            return;
        }

        if (operacao === 'credito') {
            contaEncontrada.creditar(valor);
        } else if (operacao === 'debito') {
            contaEncontrada.debitar(valor);
        }

        renderizarTabela(); 
    });

    thNome.addEventListener('click', () => {
        contas.sort((a, b) => a.nome.localeCompare(b.nome));
        renderizarTabela();
    });

    thSaldo.addEventListener('click', () => {
        contas.sort((a, b) => a.saldo - b.saldo);
        renderizarTabela();
    });

    renderizarTabela();
});
