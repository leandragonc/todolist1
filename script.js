const formulario = document.getElementById('formulario');
const listaPendentes = document.getElementById('listaPendentes');
const listaComprados = document.getElementById('listaComprados');
const btnGravar = document.getElementById('gravar');
const btnRecuperar = document.getElementById('recuperar');
const btnLimpar = document.getElementById('limpar');

let itens = [];

// Adicionar item
formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  const produto = document.getElementById('produto').value.trim();
  const quantidade = document.getElementById('quantidade').value;
  const categoria = document.getElementById('categoria').value;

  if (!produto) return;

  const item = {
    id: Date.now(),
    produto,
    quantidade,
    categoria,
    comprado: false
  };

  itens.push(item);
  atualizarListas();
  formulario.reset();
});

// Atualiza listas na tela
function atualizarListas() {
  listaPendentes.innerHTML = '';
  listaComprados.innerHTML = '';

  itens.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.produto} — ${item.quantidade} (${item.categoria})</span>
      <div>
        ${!item.comprado ? `<button onclick="comprar(${item.id})">✔️</button>` : ''}
        <button onclick="remover(${item.id})">🗑️</button>
      </div>
    `;

    if (item.comprado) {
      li.classList.add('feito');
      listaComprados.appendChild(li);
    } else {
      listaPendentes.appendChild(li);
    }
  });
}

// Marcar como comprado
function comprar(id) {
  const item = itens.find(i => i.id === id);
  if (item) item.comprado = true;
  atualizarListas();
}

// Remover item
function remover(id) {
  itens = itens.filter(i => i.id !== id);
  atualizarListas();
}

// Gravar no LocalStorage
btnGravar.addEventListener('click', () => {
  localStorage.setItem('listaCompras', JSON.stringify(itens));
});

// Recuperar
btnRecuperar.addEventListener('click', () => {
  const dados = localStorage.getItem('listaCompras');
  if (dados) {
    itens = JSON.parse(dados);
    atualizarListas();
  } else {
    alert('Nenhum dado salvo.');
  }
});

// Limpar tudo
btnLimpar.addEventListener('click', () => {
  localStorage.removeItem('listaCompras');
  itens = [];
  atualizarListas();
});

// Recuperar automaticamente ao abrir
window.addEventListener('load', () => {
  const dadosSalvos = localStorage.getItem('listaCompras');
  if (dadosSalvos) {
    itens = JSON.parse(dadosSalvos);
    atualizarListas();
  }
});
