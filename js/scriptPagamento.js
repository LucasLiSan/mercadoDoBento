// 1. JSON modelo

const produtos = [
    {
        codigoBarras: "7896311709533",
        nome: "WHEY PROTEIN MORANGO",
        preco: 100.0,
        imagem: "assets/imgs/wheyMorango.jpg"
    },
    {
        codigoBarras: "7891000245600",
        nome: "ABACAXI",
        preco: 10.0,
        imagem: "assets/imgs/abacaxi.png"
    },
    {
        codigoBarras: "7894000147890",
        nome: "BISCOITO RECHEADO OREO",
        preco: 5.5,
        imagem: "assets/imgs/biscoitoOreo.png"
    }
];

// 2. Elementos HTML principais
const barCodeInput = document.getElementById("barCode");
const itemNameInput = document.getElementById("itemName");
const qtdInput = document.getElementById("qtdItem");
const priceItemInput = document.getElementById("priceItem");
const priceTotalInput = document.getElementById("priceTotal");
const totalPayInput = document.getElementById("total-pay");
const listBuy = document.querySelector(".list-buy");
const prodImg = document.querySelector(".prodImg img");

// 3. Variável de controle do total geral
let totalGeral = 0;

// 4. Atualizar dados ao mudar quantidade
qtdInput.addEventListener("input", atualizarTotais);

function atualizarTotais() {
    const qtd = parseInt(qtdInput.value);
    const preco = parseFloat(priceItemInput.value);

    if (!isNaN(qtd) && !isNaN(preco)) {
        const total = qtd * preco;
        priceTotalInput.value = total.toFixed(2);
    }
}

// 5. Buscar produto por código de barras
function carregarProduto(codigo) {
    const produto = produtos.find(p => p.codigoBarras === codigo);
    if (!produto) {
        alert("Produto não encontrado");
        return;
    }

    itemNameInput.value = produto.nome;
    priceItemInput.value = produto.preco.toFixed(2);
    qtdInput.value = 1;
    priceTotalInput.value = produto.preco.toFixed(2);
    prodImg.src = produto.imagem;
}

// 6. Adicionar produto à lista
function adicionarProduto() {
    const codigo = barCodeInput.value;
    const nome = itemNameInput.value;
    const qtd = parseInt(qtdInput.value);
    const precoUnit = parseFloat(priceItemInput.value);
    const precoTotal = parseFloat(priceTotalInput.value);

    if (!codigo || !nome || isNaN(qtd) || isNaN(precoUnit)) {
        alert("Informações inválidas");
        return;
    }

    // Criar item visual
    const div = document.createElement("div");
    div.className = "itemDescription";
    div.innerHTML = `
        <span>${codigo}</span>
        <span>${nome}</span>
        <span>${qtd}</span>
        <span>R$ ${precoUnit.toFixed(2)}</span>
        <span>R$ ${precoTotal.toFixed(2)}</span>
    `;

    listBuy.appendChild(div);

    // Atualizar total geral
    totalGeral += precoTotal;
    totalPayInput.value = totalGeral.toFixed(2);
}

// 7. Simulação: apertar "Enter" na leitura de código de barras
barCodeInput.addEventListener("keydown", e => {
    if (e.key === "Enter") { carregarProduto(barCodeInput.value); }
});

// 8. Adiciona item ao apertar Enter no campo de quantidade
qtdInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        atualizarTotais();
        adicionarProduto();
    }
});

// 9. Carrega produto inicial (pode tirar depois)
carregarProduto(barCodeInput.value);