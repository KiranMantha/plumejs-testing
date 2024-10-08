type ConstructorType<T extends {
    new (...args: any[]): T;
}> = T;
export interface Fixture<T> {
    componentInstance: T;
    element: HTMLElement;
}
export declare class TestBed {
    static MockComponent<T>(target: ThisType<T>, mockDependencies?: Array<{
        provider: ConstructorType<any>;
        useValue: any;
    }>): Promise<Fixture<T>>;
    static MockService(klass: ConstructorType<any>, mockedInstance: any): import("@plumejs/core/dist/src/types").MetadataConstructor<any>;
    static RemoveComponent<T>(fixture: Fixture<T>): void;
}
export declare function flushMicroTasks(): () => Promise<void>;
export { waitFor, fireEvent } from '@testing-library/dom';
export { screen, within, debug } from 'shadow-dom-testing-library';
