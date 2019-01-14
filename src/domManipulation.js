function addHeadStyle(doc, headStyles, styleName, style) {
    const styleElement = doc.createElement('style');
    styleElement.type = 'text/css';
    styleElement.appendChild(doc.createTextNode(styleName + style));
    doc.head.appendChild(styleElement);
    headStyles[styleName] = styleElement;
}

function removeHeadStyle(doc, headStyles, styleName) {
    doc.head.removeChild(headStyles[styleName]);
    delete headStyles[styleName];
}

function addHeadScript(doc, src, code, onload) {
    const scriptElement = doc.createElement('script');
    scriptElement.type = 'text/javascript';
    if (src) {
        scriptElement.src = src;
    }
    if (code) {
        scriptElement.appendChild(doc.createTextNode(code));
    }
    if (onload) {
        scriptElement.onload = onload;
    }
    doc.head.appendChild(scriptElement);
}

function addCssClass(domElement, className) {
    domElement.className += ' ' + className;
}

function removeCssClass(domElement, className) {
    const oldClass = domElement.className;
    const newClass = domElement.className.replace(new RegExp('\\b' + className + '\\b'), '');

    if (oldClass !== newClass) {
        domElement.className = newClass;
    }
}

function handleListeners(domElement, listeners, add, flag) {
    if (add && !domElement[flag]) {
        for (const key of Object.keys(listeners)) {
            domElement.addEventListener(key, listeners[key]);
        }
        domElement[flag] = true;
    } else if (!add && domElement[flag]) {
        for (const key of Object.keys(listeners)) {
            domElement.removeEventListener(key, listeners[key]);
        }
        domElement[flag] = false;
    }
}

function handleStyleClasses(domElement, classNames, add, flag) {
    if (add && domElement[flag]) {
        classNames.map(className => {
            self.addClassToStyle(domElement, className);
        });
        domElement[flag] = true;
    } else if (!add && domElement[flag]) {
        classNames.map(className => {
            self.removeClassFromStyle(domElement, className);
        });
        domElement[flag] = false;
    }
}