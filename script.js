const nomeProduto = document.getElementById('name')
const quantidade = document.getElementById('quantity')
const categoria = document.getElementById('category')
const listaPendentes = document.getElementById('pendingList')
const listaComprados = document.getElementById('boughtList')

const botaoGravar = document.getElementById('saveBtn')
const botaoRecuperar = document.getElementById('loadBtn')
const botaoLimpar = document.getElementById('clearBtn')

let pendentes = []
let comprados = []

function atualizarListas() {
  listaPendentes.innerHTML = ''
  listaComprados.innerHTML = ''

  // Itens pendentes
  pendentes.forEach((item, i) => {
    const li = document.createElement('li')
    li.innerHTML = `
      <div>${item.nome} — ${item.qtd} (${item.categoria})</div>
      <div>
        <button onclick="marcarComoComprado(${i})">✔️</button>
        <button onclick="excluirItem(${i})">🗑️</button>
      </div>
    `
    listaPendentes.appendChild(li)
  })

  // Itens comprados
  comprados.forEach((item, i) => {
    const li = document.createElement('li')
    li.innerHTML = `
      <div class="feito">${item.nome} — ${item.qtd} (${item.categoria})</div>
      <button onclick="excluirComprado(${i})">Excluir</button>
    `
    listaComprados.appendChild(li)
  })
}

// Adicionar item novo
document.getElementById('itemForm').addEventListener('submit', (e) => {
  e.preventDefault()

  if (nomeProduto.value === '' || quantidade.value <= 0) {
    alert('Preencha o nome e a quantidade!')
    return
  }

  const novoItem = {
    nome: nomeProduto.value,
    qtd: quantidade.value,
    categoria: categoria.value
  }

  pendentes.push(novoItem)
  nomeProduto.value = ''
  quantidade.value = 1
  atualizarListas()
})

function marcarComoComprado(i) {
  comprados.push(pendentes[i])
  pendentes.splice(i, 1)
  atualizarListas()
}

function excluirItem(i) {
  pendentes.splice(i, 1)
  atualizarListas()
}

function excluirComprado(i) {
  comprados.splice(i, 1)
  atualizarListas()
}

// LocalStorage
botaoGravar.addEventListener('click', () => {
  localStorage.setItem('pendentes', JSON.stringify(pendentes))
  localStorage.setItem('comprados', JSON.stringify(comprados))
  alert('Dados gravados com sucesso!')
})

botaoRecuperar.addEventListener('click', () => {
  pendentes = JSON.parse(localStorage.getItem('pendentes')) || []
  comprados = JSON.parse(localStorage.getItem('comprados')) || []
  atualizarListas()
  alert('Dados recuperados!')
})

botaoLimpar.addEventListener('click', () => {
  localStorage.removeItem('pendentes')
  localStorage.removeItem('comprados')
  pendentes = []
  comprados = []
  atualizarListas()
  alert('Dados apagados!')
})

// Carregar automaticamente ao abrir a página
window.onload = () => {
  pendentes = JSON.parse(localStorage.getItem('pendentes')) || []
  comprados = JSON.parse(localStorage.getItem('comprados')) || []
  atualizarListas()
}
