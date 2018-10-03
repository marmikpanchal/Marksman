<template>
	<div id="app">
        <div id="nav">
            <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>
                <button>Logout</button>
            </router-link>
        </div>
        <router-view @authenticated="setAuthenticated" @id="setId" @subject_id="setSubjectId" @subject_name="setSubjectName"/>
        <!-- <router-view @id="setId" /> -->
    </div>
</template>

<script>
	export default {
		name: 'App',
        data() {
            return {
                authenticated: false,
                user_id: 0,
                subject_id: 0,
                subject_name: '',
                mockAccount: {
                    username: "ligma",
                    password: "ballz"
                }
            }
        },

        // if not currently authenticated, navigate to login component
        // prevent anyone from trying to directly navigate to a protected page while not authenticated
        mounted() {
            if(!this.authenticated) {
                this.$router.replace({ name: "login" });
            }
        },

        methods: {
            setAuthenticated(status) {
                this.authenticated = status;
            },
            logout() {
                this.authenticated = false;
            },
            setId(id) {
                this.user_id = id;
            },
            setSubjectId(id) {
                this.subject_id = id;
            },
            setSubjectName(name) {
                this.subject_name = name;
            }
            
        }
	}
</script>

<style>
#app {
	body {
        background-color: #F0F0F0;
    }
    h1 {
        padding: 0;
        margin-top: 0;
    }
    #app {
        width: 1024px;
        margin: auto;
    }
}
</style>
