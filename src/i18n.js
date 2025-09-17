import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      hi: "Hi, I'm",
      title1: 'CREATIVE',
      title2: 'FULL STACK',
      title3: 'DEVELOPER',
      role: 'Modern Web Architect',
      description:
        'A dedicated Full Stack Web Developer from Kosovo, specializing in React, Node.js, and modern web technologies. I create dynamic, responsive applications that deliver exceptional user experiences.',
      contact: 'Get in touch',
      seeWork: 'See work',
    },
  },
  sq: {
    translation: {
      hi: 'Përshëndetje, unë jam',
      title1: 'KREATIV',
      title2: 'FULL STACK',
      title3: 'ZHVILLUES',
      role: 'Arkitekt Modern i Web-it',
      description:
        'Një Zhvillues Full Stack i përkushtuar nga Kosova, i specializuar në React, Node.js dhe teknologjitë moderne të web-it. Unë krijoj aplikacione dinamike dhe të përgjegjshme që ofrojnë përvoja të shkëlqyera për përdoruesit.',
      contact: 'Kontakto',
      seeWork: 'Shiko punët',
    },
  },
  de: {
    translation: {
      hi: 'Hi, ich bin',
      title1: 'KREATIV',
      title2: 'FULL STACK',
      title3: 'ENTWICKLER',
      role: 'Moderner Web-Architekt',
      description:
        'Ein engagierter Full-Stack-Webentwickler aus dem Kosovo, spezialisiert auf React, Node.js und moderne Web-Technologien. Ich erstelle dynamische, responsive Anwendungen, die hervorragende Benutzererlebnisse bieten.',
      contact: 'Kontaktieren',
      seeWork: 'Arbeiten ansehen',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
