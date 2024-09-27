let url = `https://super-paint-flamingo.glitch.me/JewelleryData`;
async function fetchAPI() {
    try {
        let res = await fetch(url);
        let data = await res.json();
        appenddata(data);
        console.log(data);
    } catch (error) {
        console.log("error : ", error);
    }
}

// lets call below fetchAPI.
fetchAPI();

function appenddata(data) {
    data.forEach((el) => {

        console.log(el.title)
        var product_div = document.createElement("div")
        product_div.setAttribute("id", "product_div")
        product_div.addEventListener("click", function () {
            product_description(el);
        });


        var product_img = document.createElement("img");
        product_img.src = el.image;

        var product_title = document.createElement("p")
        product_title.setAttribute("id", "product_title")
        product_title.innerText = el.title;

        //creating a div to store product price-------------------------------------------

        var product_price_div = document.createElement("div")
        product_price_div.setAttribute("id", "product_price_div")

        var product_price = document.createElement("p");
        product_price.setAttribute("id", "product_price")
        product_price.innerText = `₹${el.price}`;

        var mrp = document.createElement("p")
        mrp.setAttribute("id", "mrp");
        mrp.innerText = `₹${el.mrp}`;

        var per_discount = document.createElement("p")
        per_discount.setAttribute("id", "per_discount")
        per_discount.innerText = `${Math.round(Math.random() * (50 - 20) + 20)}% off`;

        product_price_div.append(product_price, mrp, per_discount)

        //creating a div to store extra discount------------------------------------------------------------------------

        var ext_discount = document.createElement("div")
        ext_discount.setAttribute("id", "ext_discount")

        var discount_img = document.createElement("img")
        discount_img.setAttribute("id", "discount_img")
        discount_img.src = "https://i.postimg.cc/Kzk9hV5x/discount-3.png"

        var text = document.createElement("p")
        text.setAttribute("id", "text")
        text.innerText = `₹100 discount on 1st order`

        ext_discount.append(discount_img, text)


        //creating a div to store the free delivery--------------------------------------------------------------------

        var delivery = document.createElement("div")
        delivery.setAttribute("id", "delivery")

        var product_delivery = document.createElement("p")
        product_delivery.setAttribute("id", "product_delivery")
        product_delivery.innerText = "Free Delivery"

        delivery.append(product_delivery);

        //creating a div to store the product rating and product review-----------------------------------------------------

        var product_rating_div = document.createElement("div");
        product_rating_div.setAttribute("id", "product_rating_div")


        product_rating_container = document.createElement("div")
        product_rating_container.setAttribute("id", "product_rating_container")


        var product_rating = document.createElement("p")
        product_rating.setAttribute("id", "product_rating")
        product_rating.innerText = `${el.rating}⋆`;

        product_rating_container.append(product_rating);

        var product_review = document.createElement("p");
        product_review.setAttribute("id", "product_review")
        product_review.innerText = `${el.review} Reviews`

        product_rating_div.append(product_rating_container, product_review)

        product_div.append(product_img, product_title, product_price_div, ext_discount, delivery, product_rating_div)

        document.querySelector("#container").append(product_div)
    });
}

async function handleprice() {

    var shortv = document.querySelector("#select_tag").value

    let res = await fetch(url);
    let data = await res.json();

    if (shortv == "high") {
        data.sort(function (a, b) {
            return Number(b.price) - Number(a.price);
        });
    }
    if (shortv == "low") {
        data.sort(function (a, b) {
            return Number(a.price) - Number(b.price);
        });
    }
    if (shortv == "rating") {
        data.sort(function (a, b) {
            return Number(b.rating) - Number(a.rating)
        })
    }
    document.querySelector("#container").innerHTML = "";
    appenddata(data);
}

function product_description(el) {
    data = JSON.stringify(el)
    localStorage.setItem("product_detail", data)
    window.location.href = 'product_description.html'
}
