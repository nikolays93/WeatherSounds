export abstract class ElementKeeper {
    public constructor(
        protected el: Element,
    ) {
        if (!el) throw Error('Element not exists');
    }
}
