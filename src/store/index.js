import Vue from 'vue';
import Vuex from 'vuex';
import yachtHelper from './modules/yacht-helper';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        yachtHelper
    }
});