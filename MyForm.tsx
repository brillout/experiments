import React from 'react';
import { reactiveView } from './reactiveView';

export { MyForm };

@reactiveView
class MyForm {
  inputText = 'change me';
  view() {
    // This view is reactive: when the user changes
    // the `<input>` value, this view is re-rendered.
    return <>
      <div>I'm automatically refreshed: {this.inputText}</div>
      <input
        type='text'
        defaultValue={this.inputText}
        onChange={ev => {
          this.inputText = ev.target.value;
        }}
      />
    </>;
  }
}

