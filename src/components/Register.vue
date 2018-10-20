<!-- <template>
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
</template> -->
<template>
    <v-app id="inspire" style="background=#ffffff; padding-top:10%">
	    <section class="banner-area">
		    <div class="container">
			    <div class="row fullscreen align-items-center justify-content-between">
				    <div class="col-lg-6 col-md-6 banner-left">
					    <!-- class not working -->
    <img src="../assets/icons/M.png" style="display:block;margin-left:auto;margin-right:auto;width:400px;"/>

                        <br>
					    <p>
						    Track all your marks at university and be the best you can be.
					    </p>
				    </div>
				    <div class="col-lg-6 col-md-6 banner-right d-flex align-self-end">
                        <div class="card mb-3">
                            <div class="card-header"><strong style="font-size:15pt">Become a Marksman</strong>
                            </div>
                            <v-spacer></v-spacer>
                            <v-card-text>
                                <v-form>
                                    <v-text-field 
                                    prepend-icon="person" 
                                    name="username" 
                                    type="text" 
                                    v-model="input.username" 
                                    label="Username"
                                    placeholder="Create a username"></v-text-field>
                                    <v-text-field 
                                    id="password" 
                                    prepend-icon="lock" 
                                    name="password" 
                                    type="password" 
                                    v-model="input.password" 
                                    label="Password"
                                    placeholder="Create a password"
                                    required></v-text-field>
                                    <v-text-field 
                                    id="retype_password" 
                                    prepend-icon="lock" 
                                    name="retype_password" 
                                    type="retype_password" 
                                    v-model="input.retype_password" 
                                    label="Verify password"
                                    placeholder="Retype password"
                                    required></v-text-field>
                                    <v-text-field 
                                    prepend-icon="email" 
                                    name="email" 
                                    type="email" 
                                    subject                   label="Email" 
                                    placeholder="eg. marksman@gmail.com"
                                    required
                                    v-model="input.email"></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn class="vbtn" color="grey" style="text-transform: capitalize;" v-on:click="back()">Back</v-btn>
                                <v-btn class="vbtn" color="primary" style="text-transform: capitalize;" v-on:click="registerAccount()">Register</v-btn>
                            </v-card-actions>
                        </div>
				    </div>
			    </div>
		    </div>					
	    </section>
    </v-app>
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
                        && this.input.email != "" 
                        && this.input.retype_password == this.input.password) {
                    const email = this.input.email;
                    const username = this.input.username;
                    const password = this.input.password;
                    fetch('http://localhost:8081/createAccount', {
                        method: 'POST',
                        headers: {"Content-Type": "application/json"},
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
            },
            back() {
                this.$router.replace({ name: "login" });
            }
        }
    }
</script>

<style scoped>

    app {
        color: #000000;
        font-family: Helvetica, 'Open Sans', Arial, sans-serif;
        font-size: 48px;
        font-weight: bold;
        text-align: center;
        padding-top: 80px;
    }
    
    p {
        font-family: Arial;
        text-align: center;
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

    .fb-signin-button {
        font-weight: bold;
        margin-left: 10px;
        width: 100px;
        text-align: center;
        height: 30px;
        display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #4267b2;
        color: #fff;
        cursor: pointer;
    }

    .g-signin-button {
        margin-left: 10px;
        cursor: pointer;
        font-weight: bold;
        width: 100px;
        text-align: center;
        display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: red;
        color: white;
        /*box-shadow: 0 3px 0 #0f69ff;*/
    }

    .vbtn {
        color: white;
        font-weight: bold;
    }

</style>
