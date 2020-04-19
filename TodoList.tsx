import React from 'react';
import { reactiveView } from './reactiveView';

export { TodoList };

@reactiveView
class Todo {
  isCompleted: boolean = false;
  text: string;
  constructor(text: string) {
    this.text = text;
  }
  view() {
    return <>
      <div>
        {this.text}
      </div>
      <div>
        Completed: {this.isCompleted?"Yep":"Nope"}
        <button type='button' onClick={() => this.isCompleted = ! this.isCompleted}>toggle</button>
      </div>
      <br/>
    </>;
  }
}

@reactiveView
class TodoList {
  todos: Todo[] = [];
  newTodoText: string = '';
  createNewTodo(text) {
    this.todos.push(new Todo(text));
  }
  view() {
    return <>
      {this.todos.map((todo, i) =>
        <todo.view key={i} />
      )}
      <form onSubmit={ev => this.onSubmit(ev)}>
        <input type="text" value={this.newTodoText} onChange={ev => this.newTodoText = ev.target.value} />
        <button type="submit">Create To-Do</button>
      </form>
    </>;
  }
  onSubmit(ev) {
    ev.preventDefault();
    if( this.newTodoText==='' ) return;
    this.createNewTodo(this.newTodoText);
    this.newTodoText = '';
  }
}
