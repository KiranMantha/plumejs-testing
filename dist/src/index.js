import { Injector, InjectionToken } from '@plumejs/core';
import { queryHelpers } from '@testing-library/dom';
const DATA_TESTID = 'data-testid';
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
const queryAllByTestId = queryHelpers.queryAllByAttribute.bind(null, DATA_TESTID);
export function getAllByTestId(container, id) {
    const elements = queryAllByTestId(container, id);
    if (!elements.length) {
        throw queryHelpers.getElementError(`Unable to find an element by: [${DATA_TESTID}="${id}"]`, container);
    }
    return elements;
}
export function getByTestId(container, id) {
    const elements = getAllByTestId(container, id);
    if (elements.length > 1) {
        throw queryHelpers.getElementError(`Found multiple elements with the [${DATA_TESTID}="${id}"]`, container);
    }
    return elements[0];
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
export * from '@testing-library/dom';
