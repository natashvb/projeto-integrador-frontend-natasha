// ==========================================
// RE:WIND - LOCADORA RETRÔ
// ==========================================

// CATÁLOGO ORIGINAL - IMAGENS PRESERVADAS

const products = [
  {
    id: 1,
    title: "Cyberpunk 2077",
    type: "jogo",
    genre: "RPG / Ação",
    year: 2020,
    duration: "60–120 horas de campanha",
    price: 24.90,
    rating: "18 anos",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_600x900.jpg",
    synopsis: "Explore Night City, uma metrópole futurista dominada pela tecnologia, pelo poder corporativo e pelo crime. Você assume o papel de V, um mercenário em busca de um implante capaz de mudar sua vida."
  },
  {
    id: 2,
    title: "Red Dead Redemption 2",
    type: "jogo",
    genre: "Ação / Mundo aberto",
    year: 2018,
    duration: "60–100 horas de campanha",
    price: 24.90,
    rating: "18 anos",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg",
    synopsis: "No fim da era do Velho Oeste, Arthur Morgan e a gangue Van der Linde precisam sobreviver enquanto são perseguidos pela lei e enfrentam um mundo em transformação."
  },
  {
    id: 3,
    title: "The Last of Us Part I",
    type: "jogo",
    genre: "Ação / Sobrevivência",
    year: 2022,
    duration: "15–30 horas de campanha",
    price: 22.90,
    rating: "18 anos",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/library_600x900.jpg",
    synopsis: "Em um mundo devastado por uma pandemia, Joel precisa escoltar Ellie através de territórios perigosos. Uma jornada emocionante sobre sobrevivência, perda e laços humanos."
  },
  {
    id: 4,
    title: "Life is Strange",
    type: "jogo",
    genre: "Aventura / Narrativo",
    year: 2015,
    duration: "10–15 horas de campanha",
    price: 19.90,
    rating: "16 anos",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/319630/library_600x900.jpg",
    synopsis: "Max Caulfield descobre que consegue voltar no tempo e passa a investigar acontecimentos misteriosos em sua cidade. Suas escolhas afetam as relações e o rumo da história."
  },
  {
    id: 5,
    title: "Superman",
    type: "filme",
    genre: "Ação / Super-herói",
    year: 2025,
    duration: "2h 9min",
    price: 12.90,
    rating: "12 anos",
    image: "https://image.tmdb.org/t/p/w500/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg",
    synopsis: "Clark Kent tenta equilibrar sua herança kryptoniana com sua vida humana enquanto busca fazer o bem em um mundo cheio de desafios. Uma aventura de super-herói sobre esperança e humanidade."
  },
  {
    id: 6,
    title: "Toy Story",
    type: "filme",
    genre: "Animação / Aventura",
    year: 1995,
    duration: "1h 21min",
    price: 11.90,
    rating: "Livre",
    image: "https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
    synopsis: "Woody é o brinquedo favorito de Andy, até a chegada de Buzz Lightyear. Entre rivalidade e aventura, os dois aprendem a trabalhar juntos e descobrem o valor da amizade."
  },
  {
    id: 7,
    title: "Minions",
    type: "filme",
    genre: "Animação / Comédia",
    year: 2015,
    duration: "1h 31min",
    price: 10.90,
    rating: "Livre",
    image: "https://images.contentstack.io/v3/assets/blt13adb7e2033fcee5/blta631dc51af9b8449/6957289b3628f3f72d21b373/Minions_keyart_desktop_2000x3000.jpg",
    synopsis: "Os Minions partem em uma aventura para encontrar um novo vilão para servir. A busca os leva a situações caóticas, divertidas e cheias de confusão."
  },
  {
    id: 8,
    title: "La La Land",
    type: "filme",
    genre: "Musical / Romance",
    year: 2016,
    duration: "2h 8min",
    price: 13.90,
    rating: "12 anos",
    image: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    synopsis: "Em Los Angeles, uma aspirante a atriz e um pianista de jazz se apaixonam enquanto perseguem seus sonhos. Música, romance e escolhas colocam o futuro dos dois à prova."
  },
  {
    id: 9,
    title: "Shrek",
    type: "filme",
    genre: "Animação / Comédia",
    year: 2001,
    duration: "1h 30min",
    price: 11.90,
    rating: "Livre",
    image: "imagens/shrek.jpg",
    synopsis: "Um ogro que vive tranquilamente em seu pântano parte em uma missão para resgatar uma princesa. Com a ajuda de Burro, ele descobre que as aparências podem enganar."
  }
];

// ==========================================
// CONFIGURAÇÕES
// ==========================================

const RENTAL_DAYS = 3;

let activeFilter = "todos";
let cart = [];

const catalog = document.getElementById("catalog");
const searchInput = document.getElementById("search");
const emptyMessage = document.getElementById("emptyMessage");
const catalogCount = document.getElementById("catalogCount");
const cartCount = document.getElementById("cartCount");

const detailsModal = document.getElementById("detailsModal");
const detailsContent = document.getElementById("detailsContent");

const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

const rentalDays = document.getElementById("rentalDays");

const successModal = document.getElementById("successModal");
const successMessage = document.getElementById("successMessage");

// ==========================================
// FORMATAÇÃO DE PREÇO
// ==========================================

function money(value) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// ==========================================
// PROTEÇÃO DE TEXTO HTML
// ==========================================

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

// ==========================================
// EXIBIR CATÁLOGO
// ==========================================

function renderCatalog() {

    const query = searchInput.value
        .trim()
        .toLocaleLowerCase("pt-BR");

    const filteredProducts = products.filter(product => {

        const matchesFilter =
            activeFilter === "todos" ||
            product.type === activeFilter;

        const searchableText = [
            product.title,
            product.genre,
            product.synopsis
        ].join(" ").toLocaleLowerCase("pt-BR");

        return matchesFilter && searchableText.includes(query);
    });

    catalog.innerHTML = "";

    catalogCount.textContent =
        `${String(filteredProducts.length).padStart(2, "0")} ITENS`;

    emptyMessage.hidden = filteredProducts.length > 0;

    filteredProducts.forEach(product => {

        const card = document.createElement("article");

        card.className = "product-card";

        const imageContainer = document.createElement("div");
        imageContainer.className = "product-image";

        const img = document.createElement("img");

        img.src = product.image;
        img.alt = `Capa de ${product.title}`;
        img.loading = "lazy";

        img.onerror = function () {
            this.style.display = "none";
            imageContainer.classList.add("no-image");
        };

        const tag = document.createElement("span");

        tag.className = "product-tag";

        tag.textContent =
            product.type === "filme" ? "FILME" : "GAME";

        imageContainer.appendChild(img);
        imageContainer.appendChild(tag);

        const info = document.createElement("div");

        info.className = "product-info";

        info.innerHTML = `
            <span class="product-category">
                ${escapeHTML(product.genre)}
            </span>

            <h3>${escapeHTML(product.title)}</h3>

            <span class="product-year">
                ${product.year} • ${escapeHTML(product.rating)}
            </span>

            <div class="product-bottom">

                <span class="product-price">
                    ${money(product.price)}
                    <small>por ${RENTAL_DAYS} dias</small>
                </span>

                <div class="product-actions">

                    <button
                        class="details-button"
                        data-details="${product.id}">
                        DETALHES
                    </button>

                    <button
                        class="add-button"
                        data-add="${product.id}">
                        + ALUGAR
                    </button>

                </div>
            </div>
        `;

        card.appendChild(imageContainer);
        card.appendChild(info);

        catalog.appendChild(card);
    });
}

// ==========================================
// FILTROS
// ==========================================

document.querySelectorAll(".filter").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".filter").forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        activeFilter = button.dataset.filter;

        renderCatalog();
    });

});

// ==========================================
// PESQUISA
// ==========================================

searchInput.addEventListener("input", renderCatalog);

// ==========================================
// DETALHES DO PRODUTO
// ==========================================

function showDetails(id) {

    const product = products.find(item => item.id === id);

    if (!product) return;

    detailsContent.innerHTML = `
        <span class="eyebrow">
            ${product.type === "filme" ? "FILME" : "JOGO"}
        </span>

        <div class="details-content">

            <img
                src="${product.image}"
                alt="Capa de ${escapeHTML(product.title)}"
                onerror="this.style.display='none'"
            >

            <div>

                <h3>${escapeHTML(product.title)}</h3>

                <p>${escapeHTML(product.synopsis)}</p>

                <p><strong>Gênero:</strong>
                    ${escapeHTML(product.genre)}
                </p>

                <p><strong>Ano:</strong> ${product.year}</p>

                <p><strong>Duração:</strong>
                    ${escapeHTML(product.duration)}
                </p>

                <p><strong>Classificação:</strong>
                    ${escapeHTML(product.rating)}
                </p>

                <div class="details-price">
                    ${money(product.price)} / ${RENTAL_DAYS} dias
                </div>

                <button
                    class="add-button"
                    data-add="${product.id}">
                    + ADICIONAR À SACOLA
                </button>

            </div>
        </div>
    `;

    detailsModal.classList.add("show");
}

// ==========================================
// ADICIONAR À SACOLA
// ==========================================

function addToCart(id) {

    const product = products.find(item => item.id === id);

    if (!product) return;

    const alreadyAdded = cart.some(item => item.id === id);

    if (alreadyAdded) {
        alert("Este produto já está na sua sacola!");
        return;
    }

    cart.push(product);

    updateCart();

    detailsModal.classList.remove("show");

    alert(`${product.title} foi adicionado à sua sacola!`);
}

// ==========================================
// REMOVER DA SACOLA
// ==========================================

function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    updateCart();
}

// ==========================================
// ATUALIZAR SACOLA
// ==========================================

function updateCart() {

    cartCount.textContent = cart.length;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="cart-empty">
                <h3>SUA SACOLA ESTÁ VAZIA.</h3>
                <p>Escolha um filme ou jogo para começar!</p>
            </div>
        `;
    }

    cart.forEach(product => {

        const element = document.createElement("div");

        element.className = "cart-item";

        element.innerHTML = `
            <div>
                <h4>${escapeHTML(product.title)}</h4>

                <p>${money(product.price)} / ${RENTAL_DAYS} dias</p>
            </div>

            <button
                class="remove-item"
                data-remove="${product.id}">
                REMOVER ×
            </button>
        `;

        cartItems.appendChild(element);
    });

    calculateTotal();
}

// ==========================================
// CALCULAR VALOR
// ==========================================

function calculateTotal() {

    const days = Number(rentalDays.value);

    const total = cart.reduce((sum, product) => {

        // Os preços originais correspondem a 3 dias.
        return sum + (product.price * days / RENTAL_DAYS);

    }, 0);

    cartTotal.textContent = money(total);
}

rentalDays.addEventListener("change", calculateTotal);

// ==========================================
// ABRIR SACOLA
// ==========================================

document.getElementById("openCart").addEventListener("click", () => {

    updateCart();

    cartModal.classList.add("show");
});

// ==========================================
// FECHAR MODAIS
// ==========================================

document.querySelectorAll("[data-close]").forEach(button => {

    button.addEventListener("click", () => {

        const modal = document.getElementById(button.dataset.close);

        if (modal) {
            modal.classList.remove("show");
        }
    });

});

[detailsModal, cartModal, successModal].forEach(modal => {

    modal.addEventListener("click", event => {

        if (event.target === modal) {
            modal.classList.remove("show");
        }

    });

});

// ==========================================
// CLIQUES NOS BOTÕES DOS PRODUTOS
// ==========================================

document.addEventListener("click", event => {

    const detailsButton = event.target.closest("[data-details]");
    const addButton = event.target.closest("[data-add]");
    const removeButton = event.target.closest("[data-remove]");

    if (detailsButton) {
        showDetails(Number(detailsButton.dataset.details));
    }

    if (addButton) {
        addToCart(Number(addButton.dataset.add));
    }

    if (removeButton) {
        removeFromCart(Number(removeButton.dataset.remove));
    }

});

// ==========================================
// FINALIZAR LOCAÇÃO
// ==========================================

document.getElementById("checkoutButton").addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Sua sacola está vazia! Escolha um produto primeiro.");

        return;
    }

    const days = Number(rentalDays.value);

    const total = cart.reduce((sum, product) => {

        return sum + (product.price * days / RENTAL_DAYS);

    }, 0);

    const quantity = cart.length;

    successMessage.textContent =
        `Sua locação demonstrativa foi registrada com ${quantity} produto(s), por ${days} dia(s), totalizando ${money(total)}. Nenhum pagamento foi realizado.`;

    cart = [];

    rentalDays.value = RENTAL_DAYS;

    updateCart();

    cartModal.classList.remove("show");

    successModal.classList.add("show");

});

// ==========================================
// VOLTAR AO CATÁLOGO
// ==========================================

document.getElementById("finishButton").addEventListener("click", () => {

    successModal.classList.remove("show");

    document.getElementById("catalogo").scrollIntoView({
        behavior: "smooth"
    });

});

// ==========================================
// INICIAR PROJETO
// ==========================================

renderCatalog();

updateCart();

console.log("RE:WIND Locadora iniciada com sucesso!");