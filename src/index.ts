import { Injector, InjectionToken } from '@plumejs/core';
import { queryHelpers } from '@testing-library/dom';

const DATA_TESTID = 'data-testid';

type ConstructorType<T extends { new (...args: any[]): T }> = T;

async function _waitForComponentToRender(tag: string) {
  const ele = document.createElement(tag);
  document.body.appendChild(ele);
  return new Promise((resolve) => {
    function requestComponent() {
      const element = document.querySelector(tag);
      if (element) {
        resolve(element);
      } else {
        window.requestAnimationFrame(requestComponent);
      }
    }
    requestComponent();
  });
}

const queryAllByTestId = queryHelpers.queryAllByAttribute.bind(null, DATA_TESTID);

export function getAllByTestId(container: HTMLElement, id: string): HTMLElement[] {
  const elements = queryAllByTestId(container, id);
  if (!elements.length) {
    throw queryHelpers.getElementError(`Unable to find an element by: [${DATA_TESTID}="${id}"]`, container);
  }
  return elements;
}

export function getByTestId(container: HTMLElement, id: string): HTMLElement {
  const elements = getAllByTestId(container, id);
  if (elements.length > 1) {
    throw queryHelpers.getElementError(`Found multiple elements with the [${DATA_TESTID}="${id}"]`, container);
  }
  return elements[0];
}

export interface Fixture<T> {
  componentInstance: T;
  element: HTMLElement;
}

export class TestBed {
  static async MockComponent<T>(
    target: ThisType<T>,
    mockDependencies: Array<{ provider: ConstructorType<any>; useValue: any }> = []
  ): Promise<Fixture<T>> {
    for (const { provider, useValue } of mockDependencies) {
      TestBed.MockService(provider, useValue);
    }
    const appRoot: any = await _waitForComponentToRender((target as any).prototype.selector);
    return { componentInstance: appRoot.getInstance(), element: appRoot.shadowRoot };
  }

  static MockService(klass: ConstructorType<any>, mockedInstance: any) {
    Injector.removeService(klass);
    return InjectionToken(klass, mockedInstance);
  }

  static RemoveComponent<T>(fixture: Fixture<T>) {
    document.body.removeChild((fixture.element as unknown as ShadowRoot).host);
  }
}

export function flushMicroTasks(): () => Promise<void> {
  return () => Promise.resolve();
}

export * from '@testing-library/dom';
