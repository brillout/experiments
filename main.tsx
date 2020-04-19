import React from 'react';
import ReactDOM from 'react-dom';
import { store, view } from "@risingstack/react-easy-state";
import assert from '@brillout/assert';

@reactiveView
class MyForm {
  inputText: string = 'change me';
  constructor() {
    setInterval(() => {
      console.log(this.inputText);
    }, 1000);
  }
  view() {
    return <>
      <div>{this.inputText}</div>
      <input
        type='text'
        defaultValue={this.inputText}
        onChange={ev => {
          this.inputText = ev.target.value;
          console.log('this.isDecorated', this.isDecorated);
        }}
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
        instance.view = (
          view(
            (...args) => {
              return cls.prototype.view.apply(instance, args);
            }
          )
        );
        const instance__observed = store(instance);
        instance__observed.isDecorated = true;
        return instance__observed;
      },
    })
  );
  return cls__proxied;
}

function main() {
  const my_form = new MyForm();
  render(<my_form.view/>);
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
