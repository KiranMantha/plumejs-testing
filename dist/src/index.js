import { Injector, InjectionToken } from '@plumejs/core';
async function _waitForComponentToRender(tag) {
    const ele = document.createElement(tag);
    document.body.appendChild(ele);
    return new Promise((resolve) => {
        function requestComponent() {
            const element = document.querySelector(tag);
            if (element) {
                resolve(element);
            }
            else {
                window.requestAnimationFrame(requestComponent);
            }
        }
        requestComponent();
    });
}
export class TestBed {
    static async MockComponent(target, mockDependencies = []) {
        for (const { provider, useValue } of mockDependencies) {
            TestBed.MockService(provider, useValue);
        }
        const appRoot = await _waitForComponentToRender(target.prototype.selector);
        return { componentInstance: appRoot.getInstance(), element: appRoot.shadowRoot };
    }
    static MockService(klass, mockedInstance) {
        Injector.removeService(klass);
        return InjectionToken(klass, mockedInstance);
    }
    static RemoveComponent(fixture) {
        document.body.removeChild(fixture.element.host);
    }
}
export function flushMicroTasks() {
    return () => Promise.resolve();
}
export { waitFor, fireEvent } from '@testing-library/dom';
export { screen, within, debug } from 'shadow-dom-testing-library';
