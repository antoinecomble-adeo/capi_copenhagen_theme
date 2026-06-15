import { r as reactExports, j as jsxRuntimeExports, a8 as useToast, a9 as Notification, aa as ToastProvider, x as reactDomExports } from 'shared';
import { F as FLASH_NOTIFICATIONS_KEY, n as notify, s as subscribeNotify, u as unsubscribeNotify, Z as Z_INDEX_ABOVE_NAVBAR, i as initI18next, l as loadTranslations, T as ThemeProviders, c as createTheme } from 'ErrorScreen';

function FlashNotifications() {
    reactExports.useEffect(() => {
        const raw = window.sessionStorage.getItem(FLASH_NOTIFICATIONS_KEY);
        if (!raw) {
            return;
        }
        try {
            const parsedNotifications = JSON.parse(raw || "[]");
            for (const notification of parsedNotifications) {
                notify(notification);
            }
            window.sessionStorage.removeItem(FLASH_NOTIFICATIONS_KEY);
        }
        catch (e) {
            console.error("Cannot parse flash notifications", e);
        }
    }, []);
    return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
}

const GlobalNotifications = () => {
    const { addToast } = useToast();
    reactExports.useEffect(() => {
        const listener = (n) => {
            addToast(({ close }) => (jsxRuntimeExports.jsxs(Notification, { type: n.type, children: [n.title && jsxRuntimeExports.jsx(Notification.Title, { children: n.title }), n.message, jsxRuntimeExports.jsx(Notification.Close, { onClick: close })] })));
        };
        subscribeNotify(listener);
        return () => unsubscribeNotify(listener);
    }, [addToast]);
    return null;
};

function GlobalNotificationsRoot() {
    return (jsxRuntimeExports.jsxs(ToastProvider, { zIndex: Z_INDEX_ABOVE_NAVBAR, children: [jsxRuntimeExports.jsx(GlobalNotifications, {}), jsxRuntimeExports.jsx(FlashNotifications, {})] }));
}

function __variableDynamicImportRuntime0__(path) {
  switch (path) {
    case '../shared/translations/locales/af.json': return import('af');
    case '../shared/translations/locales/ar-x-pseudo.json': return import('ar-x-pseudo');
    case '../shared/translations/locales/ar.json': return import('ar');
    case '../shared/translations/locales/az.json': return import('az');
    case '../shared/translations/locales/be.json': return import('be');
    case '../shared/translations/locales/bg.json': return import('bg');
    case '../shared/translations/locales/bn.json': return import('bn');
    case '../shared/translations/locales/bs.json': return import('bs');
    case '../shared/translations/locales/ca.json': return import('ca');
    case '../shared/translations/locales/cs.json': return import('cs');
    case '../shared/translations/locales/cy.json': return import('cy');
    case '../shared/translations/locales/da.json': return import('da');
    case '../shared/translations/locales/de-de.json': return import('de-de');
    case '../shared/translations/locales/de-x-informal.json': return import('de-x-informal');
    case '../shared/translations/locales/de.json': return import('de');
    case '../shared/translations/locales/el.json': return import('el');
    case '../shared/translations/locales/en-001.json': return import('en-001');
    case '../shared/translations/locales/en-150.json': return import('en-150');
    case '../shared/translations/locales/en-au.json': return import('en-au');
    case '../shared/translations/locales/en-ca.json': return import('en-ca');
    case '../shared/translations/locales/en-gb.json': return import('en-gb');
    case '../shared/translations/locales/en-my.json': return import('en-my');
    case '../shared/translations/locales/en-ph.json': return import('en-ph');
    case '../shared/translations/locales/en-se.json': return import('en-se');
    case '../shared/translations/locales/en-us.json': return import('en-us');
    case '../shared/translations/locales/en-x-dev.json': return import('en-x-dev');
    case '../shared/translations/locales/en-x-keys.json': return import('en-x-keys');
    case '../shared/translations/locales/en-x-obsolete.json': return import('en-x-obsolete');
    case '../shared/translations/locales/en-x-pseudo.json': return import('en-x-pseudo');
    case '../shared/translations/locales/en-x-test.json': return import('en-x-test');
    case '../shared/translations/locales/es-419.json': return import('es-419');
    case '../shared/translations/locales/es-ar.json': return import('es-ar');
    case '../shared/translations/locales/es-cl.json': return import('es-cl');
    case '../shared/translations/locales/es-es.json': return import('es-es');
    case '../shared/translations/locales/es-mx.json': return import('es-mx');
    case '../shared/translations/locales/es-pe.json': return import('es-pe');
    case '../shared/translations/locales/es.json': return import('es');
    case '../shared/translations/locales/et.json': return import('et');
    case '../shared/translations/locales/eu.json': return import('eu');
    case '../shared/translations/locales/fa-af.json': return import('fa-af');
    case '../shared/translations/locales/fa.json': return import('fa');
    case '../shared/translations/locales/fi.json': return import('fi');
    case '../shared/translations/locales/fil.json': return import('fil');
    case '../shared/translations/locales/fo.json': return import('fo');
    case '../shared/translations/locales/fr-ca.json': return import('fr-ca');
    case '../shared/translations/locales/fr-dz.json': return import('fr-dz');
    case '../shared/translations/locales/fr-mu.json': return import('fr-mu');
    case '../shared/translations/locales/fr.json': return import('fr');
    case '../shared/translations/locales/ga.json': return import('ga');
    case '../shared/translations/locales/he.json': return import('he');
    case '../shared/translations/locales/hi.json': return import('hi');
    case '../shared/translations/locales/hr.json': return import('hr');
    case '../shared/translations/locales/hu.json': return import('hu');
    case '../shared/translations/locales/hy.json': return import('hy');
    case '../shared/translations/locales/id.json': return import('id');
    case '../shared/translations/locales/is.json': return import('is');
    case '../shared/translations/locales/it-ch.json': return import('it-ch');
    case '../shared/translations/locales/it.json': return import('it');
    case '../shared/translations/locales/ja.json': return import('ja');
    case '../shared/translations/locales/ka.json': return import('ka');
    case '../shared/translations/locales/kk.json': return import('kk');
    case '../shared/translations/locales/kl-dk.json': return import('kl-dk');
    case '../shared/translations/locales/km.json': return import('km');
    case '../shared/translations/locales/ko.json': return import('ko');
    case '../shared/translations/locales/ku.json': return import('ku');
    case '../shared/translations/locales/ky.json': return import('ky');
    case '../shared/translations/locales/lt.json': return import('lt');
    case '../shared/translations/locales/lv.json': return import('lv');
    case '../shared/translations/locales/mk.json': return import('mk');
    case '../shared/translations/locales/mn.json': return import('mn');
    case '../shared/translations/locales/ms.json': return import('ms');
    case '../shared/translations/locales/mt.json': return import('mt');
    case '../shared/translations/locales/my.json': return import('my');
    case '../shared/translations/locales/ne.json': return import('ne');
    case '../shared/translations/locales/nl-be.json': return import('nl-be');
    case '../shared/translations/locales/nl.json': return import('nl');
    case '../shared/translations/locales/no.json': return import('no');
    case '../shared/translations/locales/pl.json': return import('pl');
    case '../shared/translations/locales/pt-br.json': return import('pt-br');
    case '../shared/translations/locales/pt.json': return import('pt');
    case '../shared/translations/locales/ro-md.json': return import('ro-md');
    case '../shared/translations/locales/ro.json': return import('ro');
    case '../shared/translations/locales/ru.json': return import('ru');
    case '../shared/translations/locales/si.json': return import('si');
    case '../shared/translations/locales/sk.json': return import('sk');
    case '../shared/translations/locales/sl.json': return import('sl');
    case '../shared/translations/locales/sq.json': return import('sq');
    case '../shared/translations/locales/sr-me.json': return import('sr-me');
    case '../shared/translations/locales/sr.json': return import('sr');
    case '../shared/translations/locales/sv.json': return import('sv');
    case '../shared/translations/locales/sw-ke.json': return import('sw-ke');
    case '../shared/translations/locales/ta.json': return import('ta');
    case '../shared/translations/locales/th.json': return import('th');
    case '../shared/translations/locales/tr.json': return import('tr');
    case '../shared/translations/locales/uk.json': return import('uk');
    case '../shared/translations/locales/ur-pk.json': return import('ur-pk');
    case '../shared/translations/locales/ur.json': return import('ur');
    case '../shared/translations/locales/uz.json': return import('uz');
    case '../shared/translations/locales/vi.json': return import('vi');
    case '../shared/translations/locales/zh-cn.json': return import('zh-cn');
    case '../shared/translations/locales/zh-tw.json': return import('zh-tw');
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }
/**
 * Note: Historically named "flash notifications" after Rails flash messages.
 * This function now renders all notifications, not only flash ones.
 * The name is kept for backward compatibility with document_head.hbs.
 */
async function renderFlashNotifications(settings, baseLocale) {
    initI18next(baseLocale);
    await loadTranslations(baseLocale, [
        () => __variableDynamicImportRuntime0__(`../shared/translations/locales/${baseLocale}.json`),
    ]);
    try {
        const container = document.createElement("div");
        document.body.appendChild(container);
        reactDomExports.render(jsxRuntimeExports.jsx(ThemeProviders, { theme: createTheme(settings), children: jsxRuntimeExports.jsx(GlobalNotificationsRoot, {}) }), container);
    }
    catch (e) {
        console.error("Cannot render flash notifications", e);
    }
}

export { renderFlashNotifications };
