/*
PLANEJAMENTO — RE:WIND
Tema: locadora retrô de filmes e jogos.
Entrada: catálogo, busca, filtros, dias de aluguel e formulário de reserva.
Processamento: classificar os itens, calcular totais e criar elementos no DOM.
Saída: cards, gráfico, resumo dinâmico, sacola e confirmação demonstrativa.
*/

// DADOS: array de objetos do tema (9 itens, cada um com mais de 3 propriedades).
const products = [
  // JOGOS ORIGINAIS
  { id: 1, title: "Cyberpunk 2077", type: "jogo", genre: "RPG / Ação", year: 2020, duration: "60–120 horas", price: 24.90, rating: "18 anos", image: "imagens/cyberpunk2077.jpg", synopsis: "Explore Night City, uma metrópole futurista dominada pela tecnologia e pelo poder corporativo." },
  { id: 2, title: "Red Dead Redemption 2", type: "jogo", genre: "Ação / Mundo aberto", year: 2018, duration: "60–100 horas", price: 24.90, rating: "18 anos", image: "imagens/rdr2.jpg", synopsis: "Arthur Morgan e sua gangue tentam sobreviver no fim da era do Velho Oeste." },
  { id: 3, title: "The Last of Us Part I", type: "jogo", genre: "Ação / Sobrevivência", year: 2022, duration: "15–30 horas", price: 22.90, rating: "18 anos", image: "imagens/tlou.jpg", synopsis: "Joel precisa escoltar Ellie por um mundo devastado por uma pandemia." },
  { id: 4, title: "Life is Strange", type: "jogo", genre: "Aventura / Narrativo", year: 2015, duration: "10–15 horas", price: 19.90, rating: "16 anos", image: "imagens/lifeisstrange.jpg", synopsis: "Max descobre que consegue voltar no tempo e que suas escolhas mudam a história." },

  // FILMES ORIGINAIS
  { id: 5, title: "Superman", type: "filme", genre: "Ação / Super-herói", year: 2025, duration: "2h 9min", price: 12.90, rating: "12 anos", image: "imagens/superman.jpg", synopsis: "Clark Kent tenta equilibrar sua herança kryptoniana com sua vida humana." },
  { id: 6, title: "Toy Story", type: "filme", genre: "Animação / Aventura", year: 1995, duration: "1h 21min", price: 11.90, rating: "Livre", image: "imagens/toy-story.jpg", synopsis: "Woody e Buzz aprendem a trabalhar juntos e descobrem o valor da amizade." },
  { id: 7, title: "Minions", type: "filme", genre: "Animação / Comédia", year: 2015, duration: "1h 31min", price: 10.90, rating: "Livre", image: "imagens/minions.jpg", synopsis: "Os Minions partem em uma aventura caótica para encontrar um novo vilão." },
  { id: 8, title: "La La Land", type: "filme", genre: "Musical / Romance", year: 2016, duration: "2h 8min", price: 13.90, rating: "12 anos", image: "imagens/lalaland.jpg", synopsis: "Uma atriz e um pianista de jazz se apaixonam enquanto perseguem seus sonhos." },
  { id: 9, title: "Shrek", type: "filme", genre: "Animação / Comédia", year: 2001, duration: "1h 30min", price: 11.90, rating: "Livre", image: "imagens/shrek.jpg", synopsis: "Um ogro parte para resgatar uma princesa e descobre que as aparências enganam." },

  // NOVOS FILMES
  { id: 10, title: "Interestelar", type: "filme", genre: "Ficção científica / Drama", year: 2014, duration: "2h 49min", price: 14.90, rating: "10 anos", image: "imagens/interestelar.jpg", synopsis: "Um grupo de astronautas viaja pelo espaço em busca de um novo lar para a humanidade." },
  { id: 11, title: "Coraline", type: "filme", genre: "Animação / Fantasia", year: 2009, duration: "1h 40min", price: 11.90, rating: "10 anos", image: "imagens/coraline.jpg", synopsis: "Coraline encontra uma versão misteriosa de sua família em um mundo paralelo." },
  { id: 12, title: "O Diabo Veste Prada", type: "filme", genre: "Comédia / Drama", year: 2006, duration: "1h 49min", price: 12.90, rating: "12 anos", image: "imagens/diabo-veste-prada.jpg", synopsis: "Uma jovem jornalista começa a trabalhar para uma poderosa editora de moda." },
  { id: 13, title: "O Castelo Animado", type: "filme", genre: "Animação / Fantasia", year: 2004, duration: "1h 59min", price: 13.90, rating: "Livre", image: "imagens/castelo-animado.jpg", synopsis: "Sophie conhece um misterioso castelo mágico e embarca em uma aventura fantástica." },
  { id: 14, title: "Harry Potter e o Prisioneiro de Azkaban", type: "filme", genre: "Fantasia / Aventura", year: 2004, duration: "2h 22min", price: 13.90, rating: "12 anos", image: "imagens/harry-potter.jpg", synopsis: "Harry retorna a Hogwarts e descobre segredos sobre o misterioso Sirius Black." },
  { id: 15, title: "Jogos Vorazes", type: "filme", genre: "Ação / Ficção científica", year: 2012, duration: "2h 22min", price: 13.90, rating: "14 anos", image: "imagens/jogos-vorazes.jpg", synopsis: "Katniss enfrenta uma competição mortal em uma sociedade controlada pela Capital." },
  { id: 16, title: "Barbie", type: "filme", genre: "Comédia / Fantasia", year: 2023, duration: "1h 54min", price: 13.90, rating: "12 anos", image: "imagens/barbie.jpg", synopsis: "Barbie sai da Barbielândia e conhece o mundo real em uma jornada de descobertas." },

  // NOVOS JOGOS
  { id: 17, title: "The Witcher 3: Wild Hunt", type: "jogo", genre: "RPG / Fantasia", year: 2015, duration: "50–100 horas", price: 22.90, rating: "18 anos", image: "imagens/witcher3.jpg", synopsis: "Assuma o papel de Geralt de Rívia em uma jornada por um mundo repleto de monstros e magia." },
  { id: 18, title: "Detroit: Become Human", type: "jogo", genre: "Aventura / Narrativo", year: 2018, duration: "10–15 horas", price: 21.90, rating: "16 anos", image: "imagens/detroit.jpg", synopsis: "Suas escolhas determinam o destino de androides que começam a questionar sua existência." },
  { id: 19, title: "Resident Evil 4", type: "jogo", genre: "Terror / Ação", year: 2023, duration: "15–25 horas", price: 24.90, rating: "18 anos", image: "imagens/resident-evil-4.jpg", synopsis: "Leon Kennedy precisa resgatar a filha do presidente em uma missão cheia de perigos." },
  { id: 20, title: "The Sims 4", type: "jogo", genre: "Simulação / Vida", year: 2014, duration: "Ilimitado", price: 16.90, rating: "12 anos", image: "imagens/sims4.jpg", synopsis: "Crie personagens, construa casas e controle histórias em um mundo de possibilidades." },
  { id: 21, title: "Hogwarts Legacy", type: "jogo", genre: "RPG / Fantasia", year: 2023, duration: "25–50 horas", price: 24.90, rating: "12 anos", image: "imagens/hogwarts-legacy.jpg", synopsis: "Explore Hogwarts no século XIX e descubra os mistérios de uma antiga magia." },
  { id: 22, title: "Until Dawn", type: "jogo", genre: "Terror / Suspense", year: 2024, duration: "8–12 horas", price: 22.90, rating: "18 anos", image: "imagens/until-dawn.jpg", synopsis: "Um grupo de amigos enfrenta acontecimentos aterrorizantes em uma montanha isolada." },
  { id: 23, title: "Grand Theft Auto VI", type: "jogo", genre: "Ação / Mundo aberto", year: 2026, duration: "A definir", price: 29.90, rating: "18 anos", image: "imagens/gta-vi.jpg", synopsis: "Acompanhe Jason e Lucia em uma aventura criminal pelo estado fictício de Leonida, incluindo Vice City." },
  { id: 24, title: "The Last of Us Part II", type: "jogo", genre: "Ação / Sobrevivência", year: 2020, duration: "20–30 horas", price: 24.90, rating: "18 anos", image: "imagens/tlou2.jpg",
  synopsis: "Ellie embarca em uma jornada intensa de vingança e sobrevivência em um mundo devastado por uma pandemia." }
];

const RENTAL_REFERENCE_DAYS = 3;
let activeFilter = "todos";
let cart = [];

const catalog = document.querySelector("#catalog");
const searchInput = document.querySelector("#search");
const catalogCount = document.querySelector("#catalogCount");
const catalogSummary = document.querySelector("#catalogSummary");
const emptyMessage = document.querySelector("#emptyMessage");
const productDialog = document.querySelector("#productDialog");
const dialogContent = document.querySelector("#dialogContent");
const cartDialog = document.querySelector("#cartDialog");
const cartItems = document.querySelector("#cartItems");
const cartCount = document.querySelector("#cartCount");
const cartTotal = document.querySelector("#cartTotal");
const cartSummary = document.querySelector("#cartSummary");
const rentalDays = document.querySelector("#rentalDays");

// FUNÇÕES E ESCOPO: função de formatação e função de classificação.
function formatMoney(value) {
  return Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function classifyProduct(product) {
  if (product.price >= 20) {
    return "Destaque premium";
  } else if (product.price >= 12) {
    return "Preço intermediário";
  } else {
    return "Preço econômico";
  }
}

function getProductTypeLabel(type) {
  let label; // escopo local: esta variável só existe dentro da função.
  switch (type) {
    case "filme":
      label = "FILME";
      break;
    case "jogo":
      label = "GAME";
      break;
    default:
      label = "ITEM";
  }
  return label;
}

// LÓGICA: dados → classificar → resumir com for...of, acumulador e while.
function summarizeCatalog(items) {
  let totalValue = 0;
  let totalMovies = 0;
  let totalGames = 0;

  for (const item of items) {
    totalValue += item.price;
    if (item.type === "filme") {
      totalMovies += 1;
    } else if (item.type === "jogo") {
      totalGames += 1;
    } else {
      console.warn("Tipo de produto não reconhecido:", item.type);
    }
  }

  let checked = 0;
  while (checked < items.length) {
    checked += 1;
  }

  return { total: items.length, movies: totalMovies, games: totalGames, average: items.length ? totalValue / items.length : 0, checked };
}

// ARRAYS E DOM: map, filter e reduce aplicados ao catálogo.
function getVisibleProducts() {
  const searchTerm = searchInput.value.trim().toLocaleLowerCase("pt-BR");
  const matchingProducts = products.filter((product) => {
    const matchesType = activeFilter === "todos" || product.type === activeFilter;
    const text = `${product.title} ${product.genre} ${product.synopsis}`.toLocaleLowerCase("pt-BR");
    return matchesType && text.includes(searchTerm);
  });

  const cardData = matchingProducts.map((product) => ({
    ...product,
    label: getProductTypeLabel(product.type),
    priceLabel: formatMoney(product.price),
    classification: classifyProduct(product)
  }));

  const filteredPriceSum = cardData.reduce((sum, product) => sum + product.price, 0);
  return { cardData, filteredPriceSum };
}

function createTextElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = text;
  return element;
}

function renderCatalog() {
  const { cardData, filteredPriceSum } = getVisibleProducts();
  catalog.replaceChildren();

  // map transforma os dados e createElement/textContent criam os elementos com segurança.
  cardData.map((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const imageBox = document.createElement("div");
    imageBox.className = "product-image";
    imageBox.dataset.fallback = product.title;

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = `Capa de ${product.title}`;
    image.loading = "lazy";
    image.addEventListener("error", () => {
      image.remove();
      imageBox.classList.add("no-image");
    }, { once: true });

    const tag = createTextElement("span", "product-tag", product.label);
    imageBox.append(image, tag);

    const info = document.createElement("div");
    info.className = "product-info";
    info.append(
      createTextElement("span", "product-category", product.genre),
      createTextElement("h3", "", product.title),
      createTextElement("span", "product-year", `${product.year} • ${product.rating}`)
    );

    const bottom = document.createElement("div");
    bottom.className = "product-bottom";
    const price = createTextElement("span", "product-price", product.priceLabel);
    price.append(createTextElement("small", "", "por 3 dias"));

    const actions = document.createElement("div");
    actions.className = "product-actions";
    const detailsButton = createTextElement("button", "details-button", "DETALHES");
    detailsButton.type = "button";
    detailsButton.dataset.details = String(product.id);
    const addButton = createTextElement("button", "add-button", "+ ALUGAR");
    addButton.type = "button";
    addButton.dataset.add = String(product.id);
    actions.append(detailsButton, addButton);
    bottom.append(price, actions);
    info.append(bottom);
    card.append(imageBox, info);
    catalog.append(card);
    return card;
  });

  const count = cardData.length;
  catalogCount.textContent = `${String(count).padStart(2, "0")} ITENS`;
  emptyMessage.hidden = count > 0;
  catalogSummary.textContent = `Exibindo ${count} de ${products.length} itens. Soma dos preços de referência: ${formatMoney(filteredPriceSum)}.`;
  updateChart();
}

function updateChart() {
  const summary = summarizeCatalog(products);

  // Ajusta a altura das barras proporcionalmente ao catálogo.
  const maxHeight = 150;
  const maxCount = Math.max(summary.movies, summary.games, 1);
  const scale = maxHeight / maxCount;

  const filmHeight = Math.max(8, summary.movies * scale);
  const gameHeight = Math.max(8, summary.games * scale);

  const filmY = 185 - filmHeight;
  const gameY = 185 - gameHeight;

  document.querySelector("#filmBar").setAttribute("y", String(filmY));
  document.querySelector("#filmBar").setAttribute("height", String(filmHeight));

  document.querySelector("#gameBar").setAttribute("y", String(gameY));
  document.querySelector("#gameBar").setAttribute("height", String(gameHeight));

  document.querySelector("#filmValue").textContent = String(summary.movies);
  document.querySelector("#filmValue").setAttribute("y", String(filmY - 10));

  document.querySelector("#gameValue").textContent = String(summary.games);
  document.querySelector("#gameValue").setAttribute("y", String(gameY - 10));

  document.querySelector("#chartDesc").textContent =
    `O catálogo tem ${summary.movies} filmes e ${summary.games} jogos.`;
}

function showDetails(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  dialogContent.replaceChildren();
  const wrapper = document.createElement("div");
  wrapper.className = "dialog-product";
  const image = document.createElement("img");
  image.src = product.image;
  image.alt = `Capa de ${product.title}`;
  image.addEventListener("error", () => image.remove(), { once: true });

  const text = document.createElement("div");
  text.append(
    createTextElement("span", "eyebrow", getProductTypeLabel(product.type)),
    createTextElement("h3", "", product.title),
    createTextElement("p", "", product.synopsis),
    createTextElement("p", "", `Gênero: ${product.genre}`),
    createTextElement("p", "", `Ano: ${product.year} • Duração: ${product.duration}`),
    createTextElement("p", "", `Classificação: ${product.rating}`),
    createTextElement("p", "product-price", `${formatMoney(product.price)} por 3 dias`)
  );
  const addButton = createTextElement("button", "add-button", "ADICIONAR À SACOLA");
  addButton.type = "button";
  addButton.dataset.add = String(product.id);
  text.append(addButton);
  wrapper.append(image, text);
  dialogContent.append(wrapper);
  productDialog.showModal();
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const alreadyAdded = cart.some((item) => item.id === productId);
  if (alreadyAdded) {
    cartSummary.textContent = "Este título já está na sua sacola.";
    return;
  }
  cart.push(product);
  updateCart();
  cartSummary.textContent = `${product.title} foi adicionado à sacola.`;
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCart();
}

function calculateCartTotal() {
  const days = Number(rentalDays.value); // coerção explícita de tipo exigida na atividade.
  return cart.reduce((sum, product) => sum + (product.price * days / RENTAL_REFERENCE_DAYS), 0);
}

function updateCart() {
  cartItems.replaceChildren();
  cartCount.textContent = String(cart.length);

  if (cart.length === 0) {
    cartItems.append(createTextElement("p", "cart-empty", "Sua sacola está vazia. Escolha um filme ou jogo!"));
  } else {
    cart.forEach((product) => {
      const row = document.createElement("div");
      row.className = "cart-item";
      const description = document.createElement("div");
      description.append(
        createTextElement("strong", "", product.title),
        createTextElement("p", "", `${formatMoney(product.price)} / 3 dias`)
      );
      const removeButton = createTextElement("button", "remove-item", "REMOVER ×");
      removeButton.type = "button";
      removeButton.dataset.remove = String(product.id);
      row.append(description, removeButton);
      cartItems.append(row);
    });
  }

  cartTotal.textContent = formatMoney(calculateCartTotal());
  cartSummary.textContent = `${cart.length} item(ns) na sacola.`;
}

// EVENTOS: delegação no catálogo; continua funcionando nos cards criados depois.
catalog.addEventListener("click", (event) => {
  const detailsButton = event.target.closest("[data-details]");
  const addButton = event.target.closest("[data-add]");
  if (detailsButton) showDetails(Number(detailsButton.dataset.details));
  if (addButton) addToCart(Number(addButton.dataset.add));
});

// Delegação no documento também atende ao botão de adicionar dentro do modal.
document.addEventListener("click", (event) => {
  const addButton = event.target.closest("#dialogContent [data-add]");
  const removeButton = event.target.closest("[data-remove]");
  if (addButton) {
    addToCart(Number(addButton.dataset.add));
    productDialog.close();
  }
  if (removeButton) removeFromCart(Number(removeButton.dataset.remove));
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((filterButton) => {
      const selected = filterButton === button;
      filterButton.classList.toggle("active", selected);
      filterButton.setAttribute("aria-pressed", String(selected));
    });
    renderCatalog();
  });
});

searchInput.addEventListener("input", renderCatalog);
rentalDays.addEventListener("change", updateCart);

document.querySelector("#openCart").addEventListener("click", () => {
  updateCart();
  cartDialog.showModal();
});
document.querySelector("#closeCart").addEventListener("click", () => cartDialog.close());
document.querySelector("#closeDetails").addEventListener("click", () => productDialog.close());

document.querySelector("#checkoutButton").addEventListener("click", () => {
  if (cart.length === 0) {
    cartSummary.textContent = "Adicione pelo menos um item antes de finalizar.";
    return;
  }
  const total = calculateCartTotal();
  const quantity = cart.length;
  cartSummary.textContent = `Simulação concluída: ${quantity} item(ns), total de ${formatMoney(total)}. Nenhum pagamento foi realizado.`;
  cart = [];
  rentalDays.value = "3";
  updateCart();
});

document.querySelector("#reservationForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#customerName").value.trim();
  const feedback = document.querySelector("#formFeedback");
  feedback.textContent = `Solicitação demonstrativa registrada para ${name}. Nenhum dado foi enviado.`;
  event.currentTarget.reset();
});

// Botão hambúrguer: aria-expanded muda e o menu abre/fecha por teclado ou clique.
const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Abrir menu" : "Fechar menu");
  mainNav.classList.toggle("open", !isExpanded);
});

document.querySelectorAll("[data-nav-filter]").forEach((link) => {
  link.addEventListener("click", () => {
    activeFilter = link.dataset.navFilter;
    document.querySelectorAll("[data-filter]").forEach((button) => {
      const selected = button.dataset.filter === activeFilter;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    renderCatalog();
  });
});

// Estado .ativo na navegação conforme a seção visível.
const navLinks = [...document.querySelectorAll(".nav-link")];
const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle("ativo", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  observedSections.forEach((section) => observer.observe(section));
}

renderCatalog();
updateCart();
console.log("RE:WIND iniciada — catálogo, filtros, gráfico e sacola prontos.");
