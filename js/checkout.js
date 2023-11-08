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
    const productContainer = document.getElementById('order');

    productContainer.innerHTML = `
        <h2>Your Order</h2>
            <ul class="list">
                <li><a href="#">Product <span>Total</span></a></li>
                <li><a href="#">${product.title} <span class="middle">x 01</span> <span class="last">$${product.price}</span></a></li>
            </ul>
            <ul class="list list_2">
                <li><a href="#">Subtotal <span>$${product.price}</span></a></li>
                <li><a href="#">Shipping <span>Flat rate: $20.00</span></a></li>
                <li><a href="#">Total <span id="total">$2210.00</span></a></li>
            </ul>
            <div class="payment_item">
                <div class="radion_btn">
                    <input type="radio" id="f-option5" name="selector">
                    <label for="f-option5">Check payments</label>
                    <div class="check"></div>
                </div>
                <p>Please send a check to Store Name, Store Street, Store Town, Store State / County,
                    Store Postcode.</p>
            </div>
            <div class="payment_item active">
                <div class="radion_btn">
                    <input type="radio" id="f-option6" name="selector">
                    <label for="f-option6">Paypal </label>
                    <img src="img/product/card.jpg" alt="">
                    <div class="check"></div>
                </div>
                <p>Pay via PayPal; you can pay with your credit card if you don’t have a PayPal
                    account.</p>
            </div>
            <div class="creat_account">
                <input type="checkbox" id="f-option4" name="selector">
                <label for="f-option4">I’ve read and accept the </label>
                <a href="#">terms & conditions*</a>
            </div>
            <a class="primary-btn" href="confirmation.html?id=${product.id}">Proceed to Paypal</a>
    `;

    function calcularTotal() {
        // Recupere o preço do produto
        const productPrice = parseFloat(product.price);


        // Valor do frete (flat rate)
        const flatRate = 20.00;

        // Calcule o valor total somando o subtotal e o frete
        const total = productPrice + flatRate;

        // Atualize o HTML com os valores calculados

        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
        console.log(total);
    }

    // Chamo a função para calcular o total quando a página é carregada
    calcularTotal();
    descricao.innerHTML = `
    ${product.description}
    `

    const teste = localStorage.getItem('quantity'); // Define o valor do campo de quantidade com o que foi armazenado
    console.log(teste)

    //  Adicionar a div criada ao productContainer.
    productContainer.appendChild(card);
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
    var cep = data.cep;
    var cidade = data.localidade;
    var logradouro = data.logradouro;
    localStorage.setItem('cep', cep);
    localStorage.setItem('cidade', cidade);
    localStorage.setItem('bairro', logradouro);

    console.log(data.localidade)

    document.getElementById('rua').value = data.logradouro;
    document.getElementById('bairro').value = data.bairro;
    document.getElementById('cidade').value = data.localidade;
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
        // O valor existe no localStorage, posso usá-lo
        console.log(`Quantidade no carrinho: ${cartQuantity}`);
    } else {
        // Não há valor armazenado no localStorage
        console.log('Nenhum item no carrinho');
    }
});