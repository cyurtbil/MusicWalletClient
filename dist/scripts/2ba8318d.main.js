"use strict";var app=angular.module("MusicWallet",["ngRoute"]);app.constant("ServerUrl","http://musicwallet2.herokuapp.com/"),app.run(["$rootScope","authFactory","$location",function(a,b,c){a.$on("$routeChangeStart",function(){b.isAuthenticated()?(b.setHeaderAuthorization(),$("body").removeClass("bg"),("/login"===c.path()||"/register"===c.path())&&$("body").addClass("bg")):"/register"===c.path()?(c.path("/register"),$("body").addClass("bg")):($("body").addClass("bg"),c.path("/login"))})}]),app.config(["$routeProvider",function(a){a.when("/register",{templateUrl:"templates/register.html"}).when("/login",{templateUrl:"templates/login.html"}).when("/",{templateUrl:"templates/home.html"}).when("/search",{templateUrl:"templates/search.html"}).when("/who",{templateUrl:"templates/who.html"}).when("/profile/:id",{templateUrl:"templates/profile.html"}).when("/wallet/:id",{templateUrl:"templates/wallet.html"}).otherwise({redirectTo:"/login"})}]),app.controller("RegisterController",["$scope","authFactory","dataFactory","userFactory","$location",function(a,b,c,d,e){$(document).ready(function(){$("body").addClass("bg")}),a.registerUser=function(a){var c={user:a};d.registerUser(c).then(function(a){b.createUserSession(a.data),e.path("/")})}}]),app.controller("LoginController",["authFactory","$location","$scope",function(a,b,c){c.login=function(c){a.login(c).then(function(c){a.createUserSession(c.data),b.path("/")})}}]),app.controller("HomeController",["$scope","authFactory","$location","dataFactory","walletFactory","$sce","userFactory","songFactory","colorService",function(a,b,c,d,e,f,g,h,i){d.fetchUsers().then(function(b){a.currentUser=g.findCurrentUser(b.data.users)}),d.fetchWallets().then(function(b){a.wallets=b.data.wallets,a.uniqueWalletNames=e.createUniqueWalletNamesArray(b.data.wallets)}),a.selected=!1,a.viewSongsOfAll=function(b,c,d){c.preventDefault(),a.selected=!0,a.walletSongs=e.extractSongsFromClickedWallet(d,a.currentUser,b)},a.fixUrl=function(a){return f.trustAsResourceUrl(a)},a.hoverIn=function(a,b){i.defineColor(a,b.delegateTarget)},a.hoverOut=function(a){$(a.delegateTarget).css("background-color","#8e1e1e"),$(a.delegateTarget).children().css("color","white")},a.addToWallet=function(b,c){h.addSong(b,c).then(function(){var b=a.walletSongs.filter(function(a){return a.url===c})[0],d=a.walletSongs.indexOf(b);a.walletSongs.splice(d,1)})}}]),app.controller("NavbarController",["$scope","authFactory","dataFactory","userFactory","$window","$location",function(a,b,c,d,e){c.fetchUsers().then(function(b){a.currentUser=d.findCurrentUser(b.data.users)}),a.logout=function(){b.logout().then(function(){e.sessionStorage.removeItem("MusicWallet.user")})},a.toggleNavbar=function(){$("#collapse").stop(!0,!0).slideToggle(300)},a.changeHamburger=function(){$("#hamburger .line:eq(0)").toggleClass("line1"),$("#hamburger .line:eq(1)").toggleClass("line2"),$("#hamburger .line:eq(2)").toggleClass("line3")}}]),app.controller("SearchController",["$scope","dataFactory","$sce","userFactory","songFactory",function(a,b,c,d,e){b.fetchUsers().then(function(b){a.currentUser=d.findCurrentUser(b.data.users)}),a.searchSongs=function(c){$('form[name="searchSongForm"]').stop(!0,!0).animate({top:"10px"},1e3),b.fetchTracksFromCloud(c).then(function(b){a.trackSources=b.data.urls})},a.fixUrl=function(a){return c.trustAsResourceUrl(a)},a.addToWallet=function(b,c){e.addSong(b,c).then(function(b){var c=a.trackSources.indexOf(b.data.url);a.trackSources.splice(c,1)})}}]),app.controller("ProfileController",["$scope","dataFactory","userFactory","walletFactory","$sce","songFactory",function(a,b,c,d,e,f){b.fetchUsers().then(function(b){a.currentUser=c.findCurrentUser(b.data.users),d.resetWalletActivation(a.currentUser.wallets)}),a.viewSongs=function(b,c){d.resetWalletActivation(c),b.active=!0,d.getWallet(b.id).then(function(b){a.walletSongs=b.data.songs})},a.fixUrl=function(a){return e.trustAsResourceUrl(a)},a.removeFromWallet=function(b){f.removeSong(b).then(function(){var c=a.walletSongs.indexOf(b);a.walletSongs.splice(c,1)})},a.MoveToWallet=function(b,c){f.updateSong(b,c).then(function(){var b=a.walletSongs.indexOf(c);a.walletSongs.splice(b,1)})}}]),app.controller("WhoController",["$scope","dataFactory","colorService","walletFactory","userFactory",function(a,b,c,d,e){a.search={},b.fetchUsers().then(function(b){a.users=b.data.users,a.currentUser=e.findCurrentUser(b.data.users)}),b.fetchWallets().then(function(b){a.uniqueWalletNames=d.createUniqueWalletNamesArray(b.data.wallets)}),a.getMaxUserWallet=function(a){var b=_.max(a.wallets,function(a){return a.song_count}),d=b.name,e=b.song_count;return c.defineColor(d,"."+d),[d,e,b.id]}}]),app.controller("WalletController",["$scope","dataFactory","userFactory","$location","walletFactory","$sce","songFactory",function(a,b,c,d,e,f,g){b.fetchUsers().then(function(b){a.currentUser=c.findCurrentUser(b.data.users)}),e.getWallet(e.getWalletIdfromUrl(d.path())).then(function(b){a.currentWallet=b.data,a.walletSongs=b.data.songs}),a.fixUrl=function(a){return f.trustAsResourceUrl(a)},a.addToWallet=function(b,c){g.addSong(b,c.url).then(function(){var b=a.walletSongs.indexOf(c);a.walletSongs.splice(b,1)})}}]),app.factory("authFactory",["$http","ServerUrl","$window","$location",function(a,b,c){var d=function(a){c.sessionStorage.setItem("MusicWallet.user",a.token),g()},e=function(){return a.get(b+"logout")},f=function(){return!!c.sessionStorage.getItem("MusicWallet.user")},g=function(){a.defaults.headers.common.Authorization="Token token="+c.sessionStorage.getItem("MusicWallet.user")},h=function(c){return a.post(b+"login",c)};return{createUserSession:d,logout:e,isAuthenticated:f,setHeaderAuthorization:g,login:h}}]),app.factory("dataFactory",["$http","ServerUrl",function(a,b){var c=function(){return a.get(b+"wallets.json")},d=function(c){return a.post(b+"cloud/get_tracks",c)},e=function(){return a.get(b+"users.json")};return{fetchWallets:c,fetchTracksFromCloud:d,fetchUsers:e}}]),app.factory("walletFactory",["$http","ServerUrl",function(a,b){var c=function(a){var b=[];return a.forEach(function(a){b.push(a.name)}),b.filter(function(a,b,c){return c.indexOf(a)===b})},d=function(c){return a.get(b+"wallets/"+c+".json")},e=function(a,b,c){var d=[],e=f(a,c);return e.forEach(function(a){a.user_id!==b.id&&a.songs.forEach(function(a){d.push(a)})}),d},f=function(a,b){return a.filter(function(a){return a.name===b})},g=function(a){a.forEach(function(a){a.active=!1})},h=function(a){return parseInt(a.match(/\d+$/)[0])};return{createUniqueWalletNamesArray:c,getWallet:d,extractSongsFromClickedWallet:e,resetWalletActivation:g,getWalletIdfromUrl:h}}]),app.factory("userFactory",["$window","$http","ServerUrl",function(a,b,c){var d=function(a){var b=e();return a.filter(function(a){return a.token===b})[0]},e=function(){return a.sessionStorage.getItem("MusicWallet.user")},f=function(a){return b.post(c+"users.json",a)};return{findCurrentUser:d,registerUser:f}}]),app.factory("songFactory",["$http","ServerUrl",function(a,b){var c=function(c,d){var e={song:{url:d,wallet_id:c.id}};return a.post(b+"songs.json",e)},d=function(c){return a["delete"](b+"songs/"+c.id+".json")},e=function(c,d){var e={song:{url:d.url,wallet_id:c.id}};return a.put(b+"songs/"+d.id+".json",e)};return{addSong:c,removeSong:d,updateSong:e}}]),app.service("colorService",[function(){return{defineColor:function(a,b){switch(a){case"Dark":$(b).css("background-color","black");break;case"Chill":$(b).css("background-color","rgb(95, 147, 225)");break;case"Happy":$(b).css("background-color","rgb(239, 164, 86)");break;case"Party":$(b).css("background-color","rgb(177, 177, 13)");break;case"Dance":$(b).css("background-color","rgb(30, 142, 141)");break;case"Sport":$(b).css("background-color","rgb(11, 44, 114)");break;case"Mixed Moods":$(b).css({"background-color":"white",border:"black"}),$(b).children().css("color","black");break;case"Sad":$(b).css("background-color","grey");break;case"Angry":$(b).css("background-color","rgb(106, 5, 5)");break;case"Dreamy":$(b).css("background-color","purple");break;case"Illegal":$(b).css("background-color","rgb(101, 79, 6)");break;case"Pumped":$(b).css("background-color","rgb(190, 24, 24)")}}}}]);