import Vue from 'nativescript-vue'
import App from './components/App'
import VueDevtools from 'nativescript-vue-devtools'
import Vuex from 'vuex';
import {TNSFontIcon, fonticon} from 'nativescript-fonticon';


TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': './assets/css/font-awesome.css',
  'ion': './ionicons.css'
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

// setting up for SQLite

const Sqlite = require("nativescript-sqlite");

// Setting up to store state of application

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    database: null,
    data: []
  },
  mutations: {
    init(state, data) {
      state.database = data.database;

    },
    load(state, data) {
    console.log("entering load in mutation");
      state.data = [];
      for(var i = 0; i < data.data.length; i++) {
          state.data.push({
              faaID: data.data[i][0],
              airportName: data.data[i][1]
              
          });
          console.log(data.data[i][0]);
          console.log(data.data[i][1]);
      }
    },
    save(state, data) {
      state.data.push({
          faaID: data.data.faaID,
          airportName: data.data.airportName
      });
    },
   },
  actions: {
    // open a database and execute a query for creating a table
    init(context) {
        console.log("inside init");
      (new Sqlite("pilotvoice.db")).then(db => {
          db.execSQL("CREATE TABLE IF NOT EXISTS airportTable (faaID TEXT UNIQUE PRIMARY KEY, airportName TEXT)").then(id => {
              context.commit("init", { database: db });
              console.log("CREATE TABLE SECTION", db);
          }, error => {
              console.log("CREATE TABLE ERROR", error);
          });
      }, error => {
          console.log("OPEN DB ERROR", error);
      });
  },
  insert(context, data) {
      context.state.database.execSQL("INSERT INTO airportTable (faaID, airportName) VALUES (?, ?)", [data.faaID, data.airportName]).then(id => {
          context.commit("save", { data: data });
      }, error => {
          console.log("INSERT ERROR", error);
      }); 
  },
  query(context) {
      context.state.database.all("SELECT faaID, airportName FROM airportTable", []).then(result => {
          context.commit("load", { data: result });
      }, error => {
          console.log("SELECT ERROR", error);
      });
  }
   }
});

Vue.prototype.$store = store;

Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer)

store.dispatch("init");

new Vue({
  render: h => h('frame', [h(App)])
}).$start()


