<template>
  <v-app id="inspire">
      <h1>Marksman</h1>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
                Sign in with:
                <fb-signin-button :params="fbSignInParams" @success="onSignInSuccess" @error="onSignInError">
                    Facebook
                </fb-signin-button>
                
               <!--  <v-tooltip bottom>
                  <v-btn slot="activator" :href="source" icon large target="_blank">
                    <v-icon medium></v-icon>
                  </v-btn>
                  <span>Login with Facebook</span>
                </v-tooltip>
                <v-tooltip right>
                  <v-btn slot="activator" icon large href="https://codepen.io/johnjleider/pen/wyYVVj" target="_blank">
                    <v-icon medium></v-icon>
                  </v-btn>
                  <span>Login with Google</span>
                </v-tooltip> -->
              </v-toolbar>
              
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" type="text" v-model="input.username" label="Username"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" type="password" v-model="input.password" label="Password"></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-on:click="register()" depressed target="_blank">Register</v-btn>
                <v-btn color="primary" v-on:click="login()">Login</v-btn>
              </v-card-actions>
            
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
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

    h1 {
        text-align: center;
        padding-top: 80px;
        font-size: 48px;
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
</style>