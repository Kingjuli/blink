import { Class } from '../ast/class'
import { Function } from '../ast/func'
import { SymbolTable } from './symboltable'
import { Types } from '../types/types'

export class TypeEnvironment {

    constructor() {
        this.classes = new Map();
        this.symbolTable = new SymbolTable();
        this.functions = new Map();
        this.currentClass = null;
    }

    addClass(klass) {
        this.classes.set(klass.name, klass);
        this.functions.set(klass.name, []);
    }

    hasClass(className) {
        return this.classes.has(className);
    }

    getClass(className) {
        return this.classes.get(className);
    }

    removeClass(className) {
        return this.classes.delete(className);
    }

    addMethod(className, method) {
        this.functions.get(className).push(method);
    }

    hasFunction(className, method) {
        return this.functions.get(className).some((m) => m.equals(method));
    }

    getMethod(className, methodName) {
        return this.functions.get(className).find((method) => method.name === methodName);
    }

    conform(classNameA, classNameB) {
        let classA = this.find(classNameA);
        let classB = this.find(classNameB);

        do {
            if (classA.superClass === classB.name) {
                return true;
            }

            if (classB.superClass === undefined) {
                return false;
            }

            classB = this.find(classB.superClass);

        } while (classB !== undefined);

        return false;
    }
}

export let BuiltInTypes = {
    Object: 'Object',
    Bool: 'Bool',
    Int: 'Int',
    Double: 'Double',
    String: 'String',
    Unit: 'Unit'
};