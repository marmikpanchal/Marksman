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
  <v-app id="inspire">
      <h1>Marksman</h1>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Become a Marksman</v-toolbar-title>
                <v-spacer></v-spacer>
                
              </v-toolbar>
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
                    prepend-icon="email" 
                    name="email" 
                    type="email" 
                    label="Email" 
                    placeholder="eg. marksman@gmail.com"
                    required
                    v-model="input.email"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" v-on:click="registerAccount()">Register</v-btn>
                <v-btn color="grey" v-on:click="back()">Back</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
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
            },
            back() {
                this.$router.replace({ name: "login" });
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

    h1 {
        text-align: center;
        padding-top: 80px;
        font-size: 48px;
    }
</style>