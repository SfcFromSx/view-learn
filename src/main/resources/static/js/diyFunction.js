function randomColor() {
    return 'rgb(' + [
        Math.round(Math.random() * 160),
        Math.round(Math.random() * 160),
        Math.round(Math.random() * 160)
    ].join(',') + ')';
}

function replaceDiyFunction(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'string' && obj[key].startsWith("diy_function")) {
            getFunction(obj, key);
        }
        if (typeof obj[key] === 'object') {
            replaceDiyFunction(obj[key]);
        }
    }
}

function getFunction(object, key) {
    switch (object[key]) {
        case 'diy_function_randomColor':
            object[key] = randomColor();
            break;
        default:
            
    }
}
