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
                            <div class="card-header"><strong style="font-size:15pt">Login</strong>
                                <div style="float:right">
                                    <span style="font-weight: bold;">Sign in with: </span>
                                    <fb-signin-button :params="fbSignInParams" @success="onSignInSuccess" @error="onSignInError">
                                        Facebook
                                    </fb-signin-button>
                                    
                                    <g-signin-button :params="googleSignInParams" @success="onSignInSuccess" @error="onSignInError">
                                        Google
                                    </g-signin-button>                
                                </div>   
                            </div>
                            <v-spacer></v-spacer>
                            <v-card-text>
                                <v-form>
                                    <v-text-field prepend-icon="person" name="login" type="text" v-model="input.username" label="Username"></v-text-field>
                                    <v-text-field id="password" prepend-icon="lock" name="password" type="password" v-model="input.password" label="Password"></v-text-field>
                                </v-form>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn class = "vbtn" style="text-transform: capitalize;" color ="primary" v-on:click="register()" depressed target="_blank">Register</v-btn>
                                <v-btn class="vbtn" style="text-transform: capitalize;" color="green" text v-on:click="login()">Login</v-btn>
                            </v-card-actions>
                        
                        </div>
				    </div>
			    </div>
		    </div>					
	    </section>
    </v-app>
</template>

<!-- <template>
    <div id="login">
        <div id="title">
            <h1>MARKSMAN</h1>
        </div>
        <div id="inputBox">
            <h2>Type in your Username and Password</h2>
            <input type="text" name="username" v-model="input.username" placeholder="Username" />
            <input type="password" name="password" v-model="input.password" placeholder="Password" />
            <button type="button" v-on:click="login()">Login</button>
            <br />
            <br />
            <button type="button" v-on:click="register()">Don't have an account?</button>

        </div>
    </div>
</template> -->

<script>
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                },
                googleSignInParams: {
                    client_id: '70896974977-l1buj1md4d3n9okh9omce20fnaqsp9es.apps.googleusercontent.com'
                    // Web: 70896974977-l1buj1md4d3n9okh9omce20fnaqsp9es.apps.googleusercontent.com
                    // Native: 70896974977-rm9e7ei3dl3b64tntpi3co1rif7crfd3.apps.googleusercontent.com
                }
            }
        },
        methods: {

            login() {
                if(this.input.username != "" && this.input.password != "") {
                    const email = '';
                    const username = this.input.username;
                    const password = this.input.password;
                    fetch('http://localhost:8081/login', {
                        method: 'POST',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({username, password, email})
                    }).then(response => {
                        if (response.status === 200) {
                            response.text().then(body => {
                                this.$emit("id", body);
                                this.$emit("authenticated", true);
                                this.$router.replace({ name: "secure" });
                            })                           
                        } else {
                            console.log("The username and / or password is incorrect");
                        }
                    });
                } else {
                    console.log("A username and password must be present");
                }
            },
            register() {
                this.$router.replace({ name: "register" });
            },
            onSignInSuccess (googleUser) {
                const profile = googleUser.getBasicProfile()
            },
            onSignInError (error) {
              console.log('OH NOES', error)
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
