// A linha abaixo diz que assim que o "documento" (a página) for totalmente carregado, deve ser executada a função
document.addEventListener('DOMContentLoaded', function () {
    // Utilizando o método fetch para consumir a API
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => displayProducts(data));
});

function displayProducts(products) {
    // Escolho a div que será alimentada com os produtos.
    const productsContainer = document.getElementById('imagem');

    // Método especial para Arrays. Basicamente: todo conteúdo dentro do método será executado para cada elemento do Array separadamente. 
    
    products.forEach(product => {
        // Crio uma div.
        const card = document.createElement('div');
        card.classList.add('col-lg-3', 'col-md-6');

        card.innerHTML = `
        <a href="single-product.html?id=${product.id}">
            <div class="single-product">
                <div class="container" style="display: flex; justify-content: center; align-items: center; width: 200px; height: 200px;">
                    <img class="img-fluid" src="${product.image}" alt="" style="max-width: 150px; max-height: 180px; margin: 0px;">
                </div>
                <div style=" display: flex; justify-content: center;">
                    <div class="product-details" style="width: 200px;">
                        <h6 class="title">${product.title}</h6>
                        <div class="price">
                            <h6>$${product.price.toFixed(2)}</h6>
                            <h6 class="l-through">$210.00</h6>
                        </div>
                    </div>
                </div>
            </div>
        </a>
`;
        // Adicionar a div criada ao productsContainer.
        productsContainer.appendChild(card);
    });
}
