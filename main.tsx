import React from 'react';
import ReactDOM from 'react-dom';
import { MyForm } from './MyForm';
import { TodoList } from './TodoList';

main();

function main() {
  const my_form = new MyForm();
  const todo_list = new TodoList();
  ReactDOM.render(
    <>
      <my_form.view />
      <br/><br/>
      <todo_list.view />
    </>,
    document.querySelector('#react-container')
  );
}
