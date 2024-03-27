
// Element selector shorthands.
const $ = (query, parent) => (parent || document).querySelector(query);
const $$ = (query, parent) => (parent || document).querySelectorAll(query);


// Data for the items.
const data = []

function add(category, name, image, price, amount, description, ingredients, available) {
    if (!data.find(section => section.category === category)) data.push({ category, items: [] });
    data.find(section => section.category === category).items.push({ name, image, price, amount, description, ingredients, available });
}

function hide() {
    $(".mount").classList.remove("show");
}

function show(name, image, price, amount, description, ingredients) {
    $(".mount").classList.add("show");
    $(".mount h2").innerHTML = name;
    $(".mount .image").style.background = `url(./images/${image}) no-repeat center center`;
    $(".mount .image").style.backgroundSize = "cover";
    $(".mount .price").innerHTML = `$${price} / ${amount}`;
    $(".mount #description p").innerHTML = description;
    $(".mount #ingredients p").innerHTML = ingredients;
}

window.onload = window.onhashchange = () => {
    if (window.location.hash) {
        $("main .default").classList.remove("show");
        $("main .content").classList.add("show");

        if ($("input.nav").checked) $("input.nav").click();

        const category = data.find(section => section.category === window.location.hash.slice(1));
        $('.content h1').innerHTML = category.category.replace(/-/g, ' ');
        $(".gallery").innerHTML = category.items.filter(i => i.available).map(item => `
        <div class="item" style="background: url(./images/${item.image}) no-repeat center center; background-size: 120%;" onclick="show('${item.name}', '${item.image}', '${item.price}', '${item.amount}', '${item.description}', '${item.ingredients.join(', ')}')">
        <div><h2>${item.name}</h2><p>$${item.price} / ${item.amount}</p></div></div>`).join("");

        window.scrollTo({ top: 0, behavior: "smooth" });

    } else {
        $("main .default").classList.add("show");
        $("main .content").classList.remove("show");
    }
}

window.addEventListener("keydown", e => e.key === "Escape" && hide());