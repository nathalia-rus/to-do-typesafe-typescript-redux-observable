import * as React from 'react';
import { connect } from 'react-redux';

import { addTodo } from '../redux/modules/todos/actions';

const dispatchProps = {
  addTodo: (title: string) => addTodo({ title }),
};

type Props = {
  addTodo: (title: string) => void;
};

type State = {
  title: string;
};

class AddTodoForm extends React.Component<Props, State> {
  readonly state = { title: '' };

  handleTitleChange: React.ReactEventHandler<HTMLInputElement> = ev => {
    this.setState({ title: ev.currentTarget.value });
  };

  handleAddClick = () => {
    this.props.addTodo(this.state.title);
    this.setState({ title: '' });
  };

  render() {
    const { title } = this.state;

    return (
      <form
        onSubmit={ev => {
          ev.preventDefault();
        }}
      >
        <input
          style={{ width: 450 }}
          type="text"
          placeholder="Enter new item"
          value={title}
          onChange={this.handleTitleChange}
        />
        &nbsp;
        <button type="submit" onClick={this.handleAddClick} disabled={!title}>
          Add
        </button>
      </form>
    );
  }
}

export default connect(
  null,
  dispatchProps
)(AddTodoForm);
