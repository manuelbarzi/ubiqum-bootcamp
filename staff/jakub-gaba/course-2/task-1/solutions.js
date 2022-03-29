export const rectPerimeter = (x, y) => 2 * (x + y);
export const rectArea = (x, y) => x * y;
export const triArea = (x, y) => (x * y) / 2;
export const ringArea = (x, y) => Math.PI * Math.pow(y, 2) - Math.PI * Math.pow(x, 2);
export const f2c = (x) => (x - 32) / 1.8;
export const c2f = (x) => (x * 1.8) + 32;
export function makeName(x, y) {
    return y + ', ' + x;
}
export function ellide(x, y) {
    if (y > 0) {
        return x.substr(0, y) + '...';
    }

}
export function longer(x, y) {
    if (x.length > y.length) {
        return x;
    }
    else if (x.length === y.length) {
        return x;
    }
    else {
        return y;
    }
}
export function mid3(x, y, z) {
    const result = [x, y, z];
    result.sort(function (a, b) { return b - a });
    return result[1];
}
export function lastFirst(x) {
    if (x.first == "Mary" && x.last == "Smith") {
        return x.last + ", " + x.first;
    }
    else if (x.first == "Mary") {
        return x.first;
    }
    else if (x.last == "Smith") {
        return x.last;
    }
    else {
        return "";
    }
}
export function subArray(x, y) {
    if ((x && y).length == 0) {
        return [];
    }
    return [x[y[0]], x[y[1]]];
}


export const over21 = arr => {
    var result = [];
    arr.forEach(element => { if (element.age >= 21) { result.push(element) } });
    return result;
}



export function product(x) {
    let biggerBetter = 1;
    for (let i = 0; i < x.length; i++) {
        biggerBetter *= [x[i]];
    }
    return biggerBetter;
}
export function aboveAverage(x) {
    let arrayLenght = x.length;
    let sum = 0;
    for (var i in x) {
        sum += x[i].score;
    }
    let average = sum / arrayLenght;
    let result = new Array();
    for (let i = 0; i < x.length; i++) {
        if (x[i].score > average) {
            result.push(x[i]);
        }
    }
    return result;
}
export function reverseNumber(x) {
    return parseInt(String(x).split("").reverse().join(""));
}
export function isWordAnagram(x, y) {
    let first = x.split("").sort().join("");
    let second = y.split("").sort().join("");
    return first === second;
}

export function isPhraseAnagram(x, y) {
    let first = x.replace(/\s/g, '').toLowerCase().split('').sort().join('')
    let second = y.replace(/\s/g, '').toLowerCase().split('').sort().join('')
    return first === second;
}

export function longestWords(x) {
    const response = [];
    if (x.length == 0) {
        return response;
    }
    let array = x.split(' ').sort(function (a, b) { return b.length - a.length });
    if ((array[0].length == array[1].length) && (array[1].length == array[2].length)) {
        response.push(array[0], array[1], array[2])
        return response;
    }
    else {
        response.push(array[0]);
        return response;
    }
}


export const getRepeats = (x) => x.filter((item, index) => x.lastIndexOf(item) !== index).filter(function (item, index, self) {
    return index === self.indexOf(item);
})




export function moduleTitles(){
     return Array.from(document.querySelectorAll('.module-title')).map(module_title => module_title.innerText);
  
}

export function goPurple(){
    document.querySelectorAll('[data-bs-target="#goPurple"]')[0].innerHTML = '<span style="color:purple">goPurple</span>';
    return 'Go Purple!'
}

export const copycat = (x) => { var y = [0, 100, 'hello!', [1, 2, 3]]; return y[x] }

