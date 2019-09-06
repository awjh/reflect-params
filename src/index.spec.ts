import * as chai from 'chai';
import { ReflectParams } from '.';

const expect = chai.expect;

// tslint:disable: max-classes-per-file

describe ('ReflectParams', () => {
    it ('should error when passed a non function', () => {
        expect(() => {
            ReflectParams('some string' as any);
        }).to.throw('Expected function, got string');
    });

    it ('should handle a standard function', () => {
        // tslint:disable-next-line: no-empty
        function myFunction (someArg, anotherArg) {}

        expect(ReflectParams(myFunction)).to.deep.equal(['someArg', 'anotherArg']);
    });

    it ('should handle an empty function', () => {
        // tslint:disable-next-line: no-empty
        function myFunction () {}

        expect(ReflectParams(myFunction)).to.deep.equal([]);
    });

    it ('should handle a constructor function', () => {
        class MyClass {
            // tslint:disable-next-line: no-empty
            constructor (constructorArg, anotherConstructorArg) {}
        }

        expect(ReflectParams(MyClass.prototype.constructor)).to.deep.equal(['constructorArg', 'anotherConstructorArg']);
    });

    it ('should handle a constructor function witha  function above', () => {
        class MyClass {
            // tslint:disable-next-line: no-empty
            public static awkwardFunction () {}

            // tslint:disable-next-line: no-empty
            constructor (constructorArg, anotherConstructorArg) {}
        }

        expect(ReflectParams(MyClass.prototype.constructor)).to.deep.equal(['constructorArg', 'anotherConstructorArg']);
    });

    it ('should handle an arrow function with parentheses',  () => {
        expect(ReflectParams((arrowArgs) => arrowArgs)).to.deep.equal(['arrowArgs']);
    });

    it ('should handle a function without parentheses', () => {
        // tslint:disable-next-line: arrow-parens
        expect(ReflectParams(arrowArgs => arrowArgs)).to.deep.equal(['arrowArgs']);
    });
});
