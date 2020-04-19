import React from 'react';
import { reactiveView } from './reactiveView';

export { MyForm };

@reactiveView
class MyForm {
  inputed_text = 'change me';
  view() {
    // This view is reactive: when the user changes
    // the `<input>` value, this view is re-rendered.
    return <>
      <div>I'm automatically refreshed: {this.inputed_text}</div>
      <TextInput text={this.inputed_text} onTextChange={newText => this.inputed_text = newText} />
    </>;
  }
}

function TextInput({text, onTextChange}) {
  return (
    <input
      type='text'
      defaultValue={text}
      onChange={ev => onTextChange(ev.target.value)}
    />
  );
}
