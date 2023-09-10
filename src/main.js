let shop = document.getElementById("shop");
 

const header = document.getElementById('navbar1');

window.addEventListener('scroll',function(){
    if(window.scrollY > 0){
        header.classList.add('sticky');
    }
    else{
        header.classList.remove('sticky');
    }
})


let Basket = JSON.parse(localStorage.getItem("data"))|| [];


let generateShop = ()=>{
  
    return shop.innerHTML = array.map((x)=>{

        let {id,name,price,desc,img} = x;
  let search = Basket.find((x)=>x.id1 === id) || [];
//   console.log(search)
        return `
        <div id = product-id-${id} class="item">
        <img width= "220" src = "${img}" alt="">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>${price}</h2>
                <div class="buttons">
                    <i onclick = "decrement(${id})"  class="bi bi-dash-lg"></i>
                    <div id = ${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                    <i onclick = "increment(${id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
    </div>
        
        `
    }).join("")

}

          generateShop();




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

    localStorage.setItem("data",JSON.stringify(Basket))
}


let update = ( selecteditem)=>{
     let search = Basket.find((x)=>x.id1 === selecteditem);
     document.getElementById(selecteditem).innerHTML = search.item;
     calculation();
}


let calculation = ()=>{
         let cartIcon = document.getElementById("cartAmount");
         cartIcon.innerHTML =   Basket.map((x)=>
             x.item).reduce((x,y)=>x+y,0)
       
}


calculation();






