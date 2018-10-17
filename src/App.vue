<template>
	<div id="app">
        <div v-if="authenticated" id="nav">
            <nav class="navbar navbar-dark bg-dark static-top">
                <div>
                    <a v-on:click="goSecure($event)" class="navbar-brand mr-1" href="">Marksman</a>
                </div>
                <div style="float: right;">
                    <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>
                        <b-btn variant="danger">Logout</b-btn>
                    </router-link>
                </div>  
            </nav>
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
                subject_name: ''
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
