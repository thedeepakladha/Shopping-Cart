
const header = document.getElementById('navbar1');

window.addEventListener('scroll',function(){
    if(window.scrollY > 0){
        header.classList.add('sticky');
    }
    else{
        header.classList.remove('sticky');
    }
})


let label = document.getElementById('label');
let ShoppingCart = document.getElementById('shopping-cart');


let Basket = JSON.parse(localStorage.getItem("data")) || [];


let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = Basket.map((x) =>
        x.item).reduce((x, y) => x + y, 0)

}


calculation();


let generateCartItems = () => {
    if (Basket.length !== 0) {
        return ShoppingCart.innerHTML = Basket.map((x) => {
            let { id1, item } = x;
            let search = array.find((y) => y.id === id1) ;
            return `
         
<div class="cart-item">
<img width = "100"src="${search.img}" alt="">
<div class="details">
    <div class="title-price-x">
    <h4 class = "title-price">
    <p>${search.name}</p>
    <p class = "cart-item-price">$${search.price}</p>
    </h4>
    <i onclick = "removeItem(${id1})" class="bi bi-x-lg"></i>
    </div>
    

    <div class="buttons">
    <i onclick = "decrement(${id1})"  class="bi bi-dash-lg"></i>
    <div id = ${id1} class="quantity">${item}</div>
    <i onclick = "increment(${id1})" class="bi bi-plus-lg"></i>
</div>
  
    <h3>$${item * search.price}</h3>
</div>

</div>
        `
        }).join("")

    }
    else {
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
           <h2>cart is Empty</h2>
           <a href="index.html">
           <button class = "HomeBtn">Back To Home</button>
           </a>
                
           `;
    }
}

generateCartItems();



let increment = (id)=>{
    let selecteditem = id;
let search =  Basket.find((x)=>x.id1 === selecteditem);
if(search === undefined){
       Basket.push({
        id1 : selecteditem,
        item : 1,
       })
}
else{
     search.item += 1;
}
generateCartItems();
update( selecteditem);
localStorage.setItem("data",JSON.stringify(Basket))
}

let decrement = (id)=>{
let selecteditem = id;
let search = Basket.find((x)=> x.id1 === selecteditem)

if(search === undefined)return;
else if(search.item === 0){
    return;
}
else{
    search.item -= 1;
}
update( selecteditem); 
Basket = Basket.filter((x)=>x.item !== 0);
generateCartItems();
localStorage.setItem("data",JSON.stringify(Basket))
}


let update = ( selecteditem)=>{
 let search = Basket.find((x)=>x.id1 === selecteditem);
 document.getElementById(selecteditem).innerHTML = search.item;
 calculation();
 TotalAmount();
}


let removeItem  = (id)  =>{
    let selectedItem = id;
   Basket = Basket.filter((x)=>x.id1 !== selectedItem);
 
   TotalAmount();
   calculation()
   generateCartItems();
   localStorage.setItem("data",JSON.stringify(Basket));
} 


let TotalAmount = ()=>{
    if(Basket.length !== 0){
        let amount = Basket.map((x)=>{
            let {id1,item} = x;
            let search = array.find((y) => y.id === id1) || [];
            return item*search.price;
        }).reduce((x,y) => x+y,0);
        label.innerHTML = `
          <h2>Total Bill : $${amount}</h2>
          <button onclick = "checkOut1()" class = "checkout">Checkout</button>
          <button onclick = "clearCart()" class = "removeAll">Clear cart</button>
        `
    }
   
   else return;
};

TotalAmount();


let clearCart = ()=>{
  Basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data",JSON.stringify(Basket))
}

function  checkOut1() {
    window.location='checkout.html';
    Basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data",JSON.stringify(Basket))
  }




