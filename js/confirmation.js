// A linha abaixo diz que assim que o "documento" (a página) for totalmente carregado, deve ser executada a função  
document.addEventListener('DOMContentLoaded', function () {


    // A linha abaixo apenas define o id do produto chamado. 

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    //Utilizando o método fetch para consumir a API
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(data => displayProduct(data));
});

function displayProduct(product) {

    // Escolho a div que será alimentada com o produto. 
    const cepcity = document.getElementById('cidade');
    const cep = document.getElementById('cep');
    const cepbairro = document.getElementById('bairro');

    const cepcity2 = document.getElementById('cidade2');
    const cep2 = document.getElementById('cep2');
    const cepbairro2 = document.getElementById('bairro2');

    const data = document.getElementById('data');
    const datatual = new Date();
    const productotal = document.getElementById('productotal');

    const preco = document.getElementById('preco');
    const subtotal = document.getElementById('subtotal');

    // Adiciono algumas classes do bootstrap

    // Coloco todo o conteúdo vinda da API dentro da div que acabei de criar. 
    //Você pode experimentar colocar alguns "console.log" para experimentar qual conteúdo está sendo recebido ou exibido. 
    console.log(product)


    var valorcep = localStorage.getItem('cep');
    var cidade = localStorage.getItem('cidade');
    var bairro = localStorage.getItem('bairro');

    data.innerHTML = `${datatual.toDateString()}`;
    productotal.innerHTML = `${product.price}`;

    cepcity.innerHTML = `${cidade}`;
    cep.innerHTML = `${valorcep}`;
    cepbairro.innerHTML = `${bairro}`;

    cepcity2.innerHTML = `${cidade}`;
    cep2.innerHTML = `${valorcep}`;
    cepbairro2.innerHTML = `${bairro}`;

    preco.innerHTML = `${product.price}`;
    subtotal.innerHTML = `${product.price}`;

    function calcularTotal() {
        // Recuperar o preço do produto
        const productPrice = parseFloat(product.price);


        // Valor do frete (flat rate)
        const flatRate = 20.00;

        // Calcular o valor total somando o subtotal e o frete
        const total = productPrice + flatRate;

        // Atualizar o HTML com os valores calculados

        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
        console.log(total);
    }

    // Chamar a função para calcular o total quando a página é carregada
    calcularTotal();
    descricao.innerHTML = `
    ${product.description}
    `

    const teste = localStorage.getItem('quantity'); // Definir o valor do campo de quantidade com o que foi armazenado
    console.log(teste)

}
document.addEventListener('DOMContentLoaded', function () {
    const cepInput = document.getElementById('cep');
    cepInput.addEventListener('input', function () {
        const valorCep = cepInput.value;
        if (valorCep.length === 8) {
            fetch(`https://viacep.com.br/ws/${valorCep}/json/`)
                .then(response => response.json())
                .then(data => preencheCamposEndereco(data))
                .catch(error => console.log('Erro:', error));
        } else {
            // Posso pode adicionar tratamento para CEP inválido aqui, como limpar os campos.
        }
    });
});

function preencheCamposEndereco(data) {
    console.log(data.localidade)
    document.getElementById('rua').value = data.logradouro;
    document.getElementById('bairro').value = data.bairro;
    document.getElementById('cidade').value = data.localidade;
    document.getElementById('uf').value = data.uf;
    document.getElementById('ibge').value = data.ibge;
}

function limpa_formulário_cep() {
    // Adicionar aqui a lógica para limpar os campos do formulário, se necessário.
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        document.getElementById('rua').value = conteudo.logradouro;
        document.getElementById('bairro').value = conteudo.bairro;
        document.getElementById('cidade').value = conteudo.localidade;
        document.getElementById('uf').value = conteudo.uf;
        document.getElementById('ibge').value = conteudo.ibge;
    } else {
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Verificar se há um valor de quantidade no localStorage
    const cartQuantity = localStorage.getItem('cartQuantity');
    console.log(cartQuantity);

    if (cartQuantity !== null) {
        // O valor existe no localStorage, você pode usá-lo
        console.log(`Quantidade no carrinho: ${cartQuantity}`);
        // Faça o que quiser com a quantidade aqui
    } else {
        // Não há valor armazenado no localStorage
        console.log('Nenhum item no carrinho');
    }
});