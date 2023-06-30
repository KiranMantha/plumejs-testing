declare type ConstructorType<T extends {
    new (...args: any[]): T;
}> = T;
export declare function getAllByTestId(container: HTMLElement, id: string): HTMLElement[];
export declare function getByTestId(container: HTMLElement, id: string): HTMLElement;
export interface Fixture<T> {
    componentInstance: T;
    element: HTMLElement;
}
export declare class TestBed {
    static MockComponent<T>(target: ThisType<T>, mockDependencies?: Array<{
        provider: ConstructorType<any>;
        useValue: any;
    }>): Promise<Fixture<T>>;
    static MockService(klass: ConstructorType<any>, mockedInstance: any): any;
    static RemoveComponent<T>(fixture: Fixture<T>): void;
}
export declare function flushMicroTasks(): () => Promise<void>;
export * from '@testing-library/dom';
