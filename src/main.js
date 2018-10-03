// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import BootstrapVue from 'bootstrap-vue'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '../node_modules/jquery/dist/jquery.min.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import FBSignInButton from 'vue-facebook-signin-button'
import GSignInButton from 'vue-google-signin-button'

Vue.config.productionTip = false
Vue.use(FBSignInButton)
Vue.use(Vuetify)
Vue.use(BootstrapVue)
Vue.use(GSignInButton)

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	created: function(){
		window.fbAsyncInit = function() {
		    FB.init({
		        appId            : '533799663736208',
		        autoLogAppEvents : true,
		        xfbml            : true,
		        version          : 'v3.1'
		    });
		};

		(function(d, s, id){
		    var js, fjs = d.getElementsByTagName(s)[0];
		    if (d.getElementById(id)) {return;}
		    js = d.createElement(s); js.id = id;
		    js.src = "https://connect.facebook.net/en_US/sdk.js";
		    fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	},
	components: { App },
	template: '<App/>'
})
