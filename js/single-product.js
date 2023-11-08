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
    const productContainer = document.getElementById('produto');
    const descricao = document.getElementById('descricao');

    productContainer.innerHTML = `
        <div class="col-lg-6">
            <div class="s_Product_carousel">
                <div class="single-prd-item" style="width: 540px;height: 583px;display: flex;justify-content: center;align-items: center;">
                    <img class="img-fluid" src=${product.image} alt="" style="width: 480px; max-height: 580px;">
                </div>
            </div>
        </div>
        <div class="col-lg-5 offset-lg-1">
            <div class="s_product_text">
                <h3>${product.title}</h3>
                <h2>$${product.price}</h2>
                <ul class="list">
                    <li><a class="active" href="#"><span>Category</span> : ${product.category}</a></li>
                    <li><a href="#"><span>Availibility</span> : In Stock</a></li>
                </ul>
                <p>${product.description}</p>
                <div class="product_count">
                    <label for="qty">Quantity:</label>
                    <input type="text" name="qty" id="sst" maxlength="12" value="1" title="Quantity:" class="input-text qty">
                    <button onclick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst )) result.value++;return false;"
                     class="increase items-count" type="button"><i class="lnr lnr-chevron-up"></i></button>
                    <button onclick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst ) &amp;&amp; sst > 0 ) result.value--;return false;"
                     class="reduced items-count" type="button"><i class="lnr lnr-chevron-down"></i></button>
                </div>
                <div class="card_area d-flex align-items-center">
                    <a class="primary-btn" href="checkout.html?id=${product.id}">Add to Cart</a>
                    <a class="icon_btn" href="#"><i class="lnr lnr lnr-diamond"></i></a>
                    <a class="icon_btn" href="#"><i class="lnr lnr lnr-heart"></i></a>
                </div>
            </div>
        </div>
    `;

    descricao.innerHTML = `
    ${product.description}
    `
}