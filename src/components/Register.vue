<template>
    <div id="register">
        <div id="title">

            <h1>Join us</h1>
            <p> This is where we steal your identity and credit card details </p>
        </div>

        <div id="registerBox">
            <h2>Type in your new username and password</h2>
            <input type="text" name="username" v-model="input.username" placeholder="Username" />
            <input type="password" name="password" v-model="input.password" placeholder="Password" />
            <input type="text" name="email" v-model="input.email" placeholder="Email" />
            <button type="button" v-on:click="registerAccount()">Create new account</button>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'Register',
        data() {
            return {
                input: {
                    username: "",
                    password: "",
                    email: ""
                }
            }
        },
        methods: {
            registerAccount() {
                if(this.input.username != "" && this.input.password != "" 
                        && this.input.email != "") {
                    
                    const email = this.input.email;
                    const username = this.input.username;
                    const password = this.input.password;
                    fetch('http://localhost:8081/createAccount', {
                        method: 'POST',
                        body: JSON.stringify({username, password, email})
                    }).then(response => {
                        if (response.status === 201) {
                            response.text().then(body => {
                                this.$emit("id", body);
                                this.$emit("authenticated", true);
                                this.$router.replace({ name: "secure" });
                            })                           
                        } else if (response.status === 400) {

                            console.log("Account was not created");
                        } else {
                            console.log("Something went wrong ----ALVIN");
                        }
                    });    

                } else {
                    console.log("Enter all fields");
                }
            }
        }
    }
</script>

<style scoped>
    #register {
        background-color: #FFFFFF;
        border: 1px solid #CCCCCC;
        padding: 20px;
        margin-top: 10px;
    }
</style>