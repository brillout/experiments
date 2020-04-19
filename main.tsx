import React from 'react';
import ReactDOM from 'react-dom';
import { store, view } from "@risingstack/react-easy-state";
import assert from '@brillout/assert';

@reactiveView
class MyForm {
  #text: string = 'change me';
  view() {
    return <>
      <div>{this.#text}</div>
      <input
        type='text'
        defaultValue={this.#text}
        onChange={ev => this.#text = ev.target.value}
        autoFocus
      />
    </>;
  }
}

main();

function reactiveView(cls) {
  const cls__proxied = (
    new Proxy(cls, {
      construct(target, args, newTarget) {
        const instance = Reflect.construct(target, args);
        assert_prototype_inheritance({instance, target, args, newTarget, cls__proxied, cls});
        instance.view = cls.__view_wrapper = (...args) => {
          return cls.prototype.view.apply(instance, args);
        };
        return instance;
      },
    })
  );
  return cls__proxied;
  /*
  return (
    new Proxy(cls, {
      construct(target, args, newTarget) {
        return Reflect.construct(store(target), args, newTarget);
      },
    })
  );
  */
}

function main() {
  const my_form = new MyForm();
  render(<my_form.view/>);
}

function App() {
  return <div>he21</div>;
}

function render(reactElement) {
  ReactDOM.render(reactElement, document.querySelector('#react-container'));
}

function assert_prototype_inheritance({instance, target, args, newTarget, cls__proxied, cls}) {
  assert(instance instanceof cls);
  assert(instance.constructor===cls);

  assert(target===cls);
  assert(newTarget===cls__proxied);

  assert('view' in instance);
  assert(!instance.hasOwnProperty('view'));
  assert(('view' in target.prototype));
  assert(!('view' in target));
  assert(target.prototype.hasOwnProperty('view'));
}
