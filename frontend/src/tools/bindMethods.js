export default function bindMethods(instance) {
    const names = Object.getOwnPropertyNames(instance.__proto__)
    for (let name of names) {
        if (typeof instance[name] == 'function') {
            instance[name] = instance[name].bind(instance)
        }
    }
}