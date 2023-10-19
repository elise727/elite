let sitekey;

const scriptWithSiteKey = document.querySelector('script[data-sitekey]');
if (scriptWithSiteKey) {
    sitekey = scriptWithSiteKey.getAttribute('data-sitekey');
}

function loadExtScript(src, callback, options) {
    const script = document.createElement('script');
    script.src = src;
    if (options && options.attributes) {
        for (const attr of options.attributes) {
            script.setAttribute(attr.name, attr.value);
        }
    }

    document.onreadystatechange = function () {
        if (document.readyState === 'complete') {
            document.body.appendChild(script);
        }
    }

    if (callback) {
        script.onload = () => callback();
    }
}

window.interdeal = {
    sitekey,
    Position: 'right',
    Menulang: 'EN',
    domains: {
        js: 'https://aacdn.nagich.com/',
        acc: 'https://access.nagich.com/'
    },
    btnStyle: {
        color: {
            main: '#004D49',
            second: '#fff'
        },
        vPosition: ['75%', '75%'], //Y-axis position of the widget, left side is reffering to the desktop version, the right side is for mobile.
        scale: ['0.5', '0.5'], //Size of the widget, the left side is referring to the desktop version, the right side is for mobile.
        icon: {
            type: 10, //You can choose between 1- 14 icons, or set value as string like "Accessibility".
            shape: 'circle', //You can choose the following shapes: "circle", "rectangle", "rounded", "semicircle".
            outline: true //true / false.
        }
    }
};

if (sitekey) {
    loadExtScript('https://aacdn.nagich.com/core/4.2.1/accessibility.js', null, {
        attributes: [
            { name: 'data-cfasync', value: true },
            { name: 'defer', value: true },
            {
                name: 'integrity',
                value:
                    'sha512-RoBJzx90QrN0gC7WfhEIJRxInvLiYuAHS4D/f5h5iRt31pElVr2z7MtGOD+XBK0rKq8mjQaic2jX5gzTZ7WGZQ=='
            },
            { name: 'crossOrigin', value: 'anonymous' },
        ]
    });
}
