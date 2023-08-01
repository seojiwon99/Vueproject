<template>
    <div>
        <my-header v-bind:cartItemCount="cartItemCount"></my-header>
        <main>
            <div v-for="(product, index) in storedProducts" :key="index">
                <div class="row">
                    <div class="col-md-5 col-md-offset-0">
                        <figure>
                            <img v-bind:src="product.image" width="100%" height="290">
                        </figure>
                    </div>
                    <div class="col-md-6 col-md-offset-0 description">
                        <h1 v-text="product.title"></h1>
                        <p v-html="product.description"></p>
                        <p class="price">
                            {{product.price | formatPrice}}
                        </p>
                        <button class="btn btn-primary btn-lg" @click="addToCart(product)" v-if="canAddToCart(product)">장바구니 담기</button>
                        <button class="btn btn-primary btn-lg" disabled="true" v-else>장바구니 담기</button>
                        <span class="inventory-message" v-if="product.availableInventory - cartCount(product.id) === 0">품절!</span>
                        <span class="inventory-message" v-else-if="product.availableInventory - cartCount(product.id) < 5">{{product.availableInventory - cartCount(product.id)}}남았습니다!</span>
                        <span class="inventory-message" v-else>지금 구매하세요</span>
                        <div class="rating">
                            <span v-bind:class="{'rating-active' : checkRating(n, product)}" v-for="n in 5">☆</span>
                        </div>
                    </div>
                </div>
            </div> 
        </main>
    </div>
</template>


<script>
    import MyHeader from './Header.vue'
    export default {
        name : 'imain',
        data(){
            return {
                products: [],
                cart: []
            }
        },
        components : {MyHeader},

        created : function(){
            fetch('/static/products.json')
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.products = json.products;
            })
        },

        filters :{
            formatPrice : function(price){
                if(!parseInt(price))
                return '';

                if(price > 99999){  // 1,000.00
                    var priceStr = (price/100).toFixed(2);  // 소수점 둘째까지 ? 1000.00
                    var priceAry = priceStr.split('').reverse();
                    var idx = 3;
                    while(priceAry.length > idx + 3){
                        priceAry.splice(idx + 3 ,0 ,',');
                        idx +=4;
                    }
                    return '$' + priceAry.reverse().join(''); //배열을 문자열로 바꿀때
                }else{
                    return '$' + (price / 100).toFixed(2);
                }

            }
        },
        methods: {
            showCheckout : function(){
                this.showProduct = this.showProduct? false : true;
            },
            addToCart : function(product){
                this.cart.push(product.id);
            },
            submitForm(){
                alert('제출 완료');
            },
            cartCount : function(id){
                let count = 0;
                for(let i =0; i< this.cart.length; i++){
                    if(this.cart[i] == id){
                        count++;
                    }
                }
                return count;
            },
            canAddToCart : function(product){
                return product.availableInventory > this.cartCount(product.id);
            },
            checkRating : function(n ,product){
                return product.rating - n >= 0;
            },

        },
        computed : {
            cartItemCount : function(){
            return this.cart.length; // cartCount(id)
            },
            storedProducts : function(){    // 정렬
                if(this.products.length > 0){
                    let productAry = this.products;
                    return productAry.sort(function(first,second){  // 정렬(오름차순/내림차순)
                        if(first.title < second.title){
                            return -1;
                        }else{
                            return 1;
                        }
                    })

                }
            },
            // canAddToCart : function(product){
            //     return product.availableInventory > this.cartCount(product.id);
            // }
        },

    }
</script>