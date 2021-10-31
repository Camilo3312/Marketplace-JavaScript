products = [];
cart = [];

const btn_open_add_products = document.querySelector('#btn_open_add_products');
const add_product = document.querySelector('.add_product');
const btn_close = document.querySelector('.btn_close');
const image_product = document.querySelector('#image_product');
// const btn_add_product = document.querySelector('#btn_add_product'); 
const show_image = document.querySelector('.show_image');  
const container_products = document.querySelector('.products');   
const container_products_cart = document.querySelector('.container_products');   
const message_box = document.querySelector('.message_box');   
const btn_shopping_cart = document.querySelector('.btn_shopping_cart');   
const shopping_cart = document.querySelector('.shopping_cart');   
const show_total = document.querySelector('.total');   

const show = (element) => {
    element.classList.toggle('ocult');
}
total = 0;

const calcTotal = () => {

    products.forEach(product => {
        total = total + parseInt(product.price);
    });

    show_total.textContent = 'Total: $' + total;
}

const addProducts = (product) => {
    products.push(product)
    showProducts();
}

const addCart = (e) => {
    const id_product = parseInt(e.target.getAttribute('id_product'));    

    product = {
        id: id_product,
        cuanty: 1
    };

    if(cart.length < 1) {
        cart.push(product);
    }
    else {
        let state = false;
        for(let product of cart) {
            if(product.id === id_product) {
                product.cuanty += 1;
                state = false;
                break;
            }
            else {
                state = true;
            }
        };

        if(state) {
            cart.push(product);
        }
    }  

    calcTotal();
    showCart();
}

const removeCart = (e) => {
    
    const id_product = parseInt(e.target.getAttribute('id_product'));   
      
    for(let product of cart) {
        if(product.id === id_product) {
            if(product.cuanty == 1) {
                break;              
            }
            product.cuanty += -1;
        }
    };

    showCart();
}

const showProducts = () => {
    container_products.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        const hader_card = document.createElement('div');
        const image_product = document.createElement('img');
        const body_card = document.createElement('div');
        const price_product = document.createElement('p');
        const name_product = document.createElement('p');
        const container_info_product = document.createElement('div');
        const info_product = document.createElement('p');
        const btn_add_cart = document.createElement('button');

        card.classList.add('card');
        hader_card.classList.add('header_card');
        body_card.classList.add('body_card');
        price_product.classList.add('price_product');
        name_product.classList.add('name_product');
        container_info_product.classList.add('container_info_product');
        info_product.classList.add('info_product');
        btn_add_cart.setAttribute('id','btn_add_cart');
        btn_add_cart.setAttribute('id_product',product.id);

        btn_add_cart.addEventListener('click', addCart)

        image_product.setAttribute('src', product.image);
        price_product.textContent = '$ ' + product.price;
        name_product.textContent = product.name;
        info_product.textContent = product.description;
        btn_add_cart.textContent = 'Agregar al carrito';

        hader_card.appendChild(image_product);
        body_card.appendChild(price_product);
        body_card.appendChild(name_product);
        container_info_product.appendChild(info_product);
        body_card.appendChild(container_info_product);
        card.appendChild(hader_card);
        card.appendChild(body_card);
        card.appendChild(btn_add_cart);

        container_products.appendChild(card);
    });
}

const showCart = () => {
    container_products_cart.innerHTML = '';
    cart.forEach(product => {

        const products_cart = products.filter(item => {
            return product.id === item.id;
        });

        const card_phone_cart = document.createElement('div');
        const image_product_cart = document.createElement('img');
        const name_product_cart = document.createElement('p');
        const actions = document.createElement('div');
        const quit_product = document.createElement('button');
        const add_prodcut = document.createElement('button');
        const cont = document.createElement('p');
        const price_product_cart = document.createElement('p');
        
        card_phone_cart.classList.add('card_phone_cart');
        image_product_cart.setAttribute('src',products_cart[0].image);
        name_product_cart.classList.add('name_product_cart');
        actions.classList.add('actions');
        quit_product.setAttribute('id','btn_action');
        add_prodcut.setAttribute('id','btn_action');
        quit_product.setAttribute('id_product', product.id);
        add_prodcut.setAttribute('id_product', product.id);
        cont.classList.add('cont');
        price_product_cart.classList.add('price_prodcut_cart');

        add_prodcut.addEventListener('click', addCart);
        quit_product.addEventListener('click', removeCart);

        name_product_cart.textContent = products_cart[0].name;
        add_prodcut.textContent = '+';
        quit_product.textContent = '-';
        cont.textContent = product.cuanty;
        price_product_cart.textContent = '$ ' + parseInt(products_cart[0].price * product.cuanty);

        actions.appendChild(quit_product);
        actions.appendChild(cont);
        actions.appendChild(add_prodcut);

        card_phone_cart.appendChild(image_product_cart);
        card_phone_cart.appendChild(name_product_cart);
        card_phone_cart.appendChild(actions);
        card_phone_cart.appendChild(price_product_cart);

        container_products_cart.appendChild(card_phone_cart);

        calcTotal();
    });
}

const validateAddProduct = () => {
    message_box.classList.toggle('ocult');
}

// Actions
let cont = 0;

btn_add_product.addEventListener('click', () => {

    const image = URL.createObjectURL(image_product.files[0]);

    cont += 1;
    product = {
        id: cont,
        price: 2344000,
        name: 'Samsung Galaxi fold',
        description: 'Lorem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores ipsa blanditiis quae est',
        cuanty: 20,
        image: image
    };

    addProducts(product);
    validateAddProduct();
    
});

btn_open_add_products.addEventListener('click', () => {
    show(add_product);
});

btn_close.addEventListener('click', () => {
    show(add_product);
});

btn_shopping_cart.addEventListener('click', () => {
    show(shopping_cart);
});

image_product.addEventListener('change', () => {
    const file_image = URL.createObjectURL(image_product.files[0]);

    let image = document.createElement('img');
    image.setAttribute('src', file_image);
    show_image.innerHTML = '';
    show_image.append(image);
});

// const getUsers = async ()  => {
//     const response = await fetch('https://back-python-flask.herokuapp.com/users');
//     const datas = await response.json();
//     console.log(datas);  
// }

showProducts();