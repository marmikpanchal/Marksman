<template>
    <div id="login">
        <div id="title">
            <h1>MARKSMAN</h1>
        </div>
        <div id="inputBox">
            <h2>Type in your Username and Password</h2>
            <input type="text" name="username" v-model="input.username" placeholder="Username" />
            <input type="password" name="password" v-model="input.password" placeholder="Password" />
            <button type="button" v-on:click="login()">Login</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            login() {
                if(this.input.username != "" && this.input.password != "") {
                    if(this.input.username == this.$parent.mockAccount.username 
                        && this.input.password == this.$parent.mockAccount.password) {
                        this.$emit("authenticated", true);
                        this.$router.replace({ name: "secure" });
                    } else {
                        console.log("The username and / or password is incorrect");
                    }
                } else {
                    console.log("A username and password must be present");
                }
            }
        }
    }
</script>

<style scoped>

    h1 {
        color: #000000;
        font-family: Helvetica, 'Open Sans', Arial, sans-serif;
        font-size: 48px;
        font-weight: bold;
    }

    #title {
        padding-top: 80px;
        text-align: center;
    }

    #inputBox {
        text-align: center;
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>