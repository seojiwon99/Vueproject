<template>
    <div>
        <header>
            <div class="navbar navbar-default">
                <div class="navbar-header">
                    <h1 v-text="sitename"></h1>
                </div>
                <div class="nav navbar-nav navbar-right cart">
                    <router-link active-class="active" tag="button" class="btn btn-default btn-lg" v-bind:to="{name : 'Form'}">
                        <span class="glyphicon glyphicon-shopping-cart">{{cartItemCount}}체크아웃</span>
                    </router-link>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
    export default {
        name : 'my-header',
        data : function(){
            return {
                sitename : 'Vue.js 애완용품샵'
            }
        },
        props : ['cartItemCount'],
        methods: {
            showChekcout(){
                this.$router.push({name : 'Form'})
            }
        },
    }
</script>

<style scoped>
    a {
        text-decoration: none;
        color: black;
    }
</style>
