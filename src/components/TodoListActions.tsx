import { RootState } from 'typesafe-actions';
import * as React from 'react';
import { connect } from 'react-redux';

import { loadTodosAsync, saveTodosAsync } from '../redux/modules/todos/actions';

const mapStateToProps = (state: RootState) => ({
  isLoading: state.todos.isLoadingTodos,
});
const dispatchProps = {
  loadTodos: loadTodosAsync.request,
  saveTodos: saveTodosAsync.request,
};

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

type State = {};

class TodoActions extends React.Component<Props, State> {
  render() {
    const { isLoading, loadTodos, saveTodos } = this.props;
    return (
      <section>
        <button type="button" onClick={() => loadTodos()} disabled={isLoading}>
          Load your todos
        </button>
        &nbsp;
        <button type="button" onClick={() => saveTodos()} disabled={isLoading}>
          Save your todos entered
        </button>
      </section>
    );
  }
}

export default connect(
  mapStateToProps,
  dispatchProps
)(TodoActions);
