import React from 'react';
import ReactDOM from 'react-dom';

@reactiveView
class MyForm {
  view() {
    return <>
      bla
    </>;
  }
}

main();

function reactiveView(cls) {
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
