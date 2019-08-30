import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import zh from './zh'
import en from './en'
import han from './han'
import jp from './jp'
let locale = window.localStorage.getItem('locale') || '';
if(locale == ''){
  locale = 'zh';
  window.localStorage.setItem('locale','zh');
}
export default new VueI18n({
  locale:locale,
  messages:{
    zh:zh,
    en:en,
    han:han,
    jp:jp
  }
})
