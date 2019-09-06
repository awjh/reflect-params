export function ReflectParams (func: any) {

    if (typeof func !== 'function') {
        throw new Error('Expected function, got ' + typeof func);
    }

    const commentsRegex = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

    let funcString = func.toString().split(commentsRegex).join('');

    let initialMatch = '(';

    if (/^class\s/.test(funcString)) {
        initialMatch = 'constructor('; // match on constructor as matching just bracket will match functions declared before constructor
    } else if (/^[A-z]*[0-9]*\s*=>\s*/.test(funcString) && !funcString.startsWith('(')) {
        return [funcString.split(/\s*=>\s*/)[0]]; // handle arrow function of type arg => return others handled below
    }

    // grab bit in brackets of function
    funcString = funcString.slice(funcString.indexOf(initialMatch) + initialMatch.length);
    funcString = funcString.slice(0, funcString.indexOf(')'));

    const argsRegex = /([^\s*,]+)/g;

    const result = funcString.match(argsRegex);

    if (result === null) {
        return [];
    }

    return result;
}
