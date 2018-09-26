import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'
import labels from './lang/language';

Vue.use(MLInstaller)

export default new MLCreate({
    initial: 'EN',
    save: process.env.NODE_ENV === 'production',
    languages: [
        new MLanguage('EN').create(labels.en),
        new MLanguage('PT').create(labels.pt)
    ]
});