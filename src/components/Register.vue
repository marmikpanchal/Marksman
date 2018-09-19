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
  <v-layout align-center justify-center fill-height>
    <v-flex xs12 sm10 md8 lg6>
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            :error-messages="errorMessages"
            label="Username"
            placeholder="marksmanuser"
            required
            name="username" 
            v-model="input.username" 
          ></v-text-field>
          <v-text-field
            label="Password"
            required
            type="password" 
            name="password" 
            v-model="input.password" 
            placeholder="Password"
          ></v-text-field>
          <v-text-field
            label="Email"
            placeholder="marksman@gmail.com"
            required
            type="email" 
            name="email" 
            v-model="input.email"
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-5"></v-divider>
        <v-card-actions>
          <v-btn flat>Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip
              v-if="formHasErrors"
              left
            >
              <v-btn
                slot="activator"
                icon
                class="my-0"
                @click="resetForm"
              >
                <v-icon>refresh</v-icon>
              </v-btn>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="primary" v-on:click="registerAccount()">Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
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