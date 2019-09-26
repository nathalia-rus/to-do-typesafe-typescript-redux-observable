import { RootState } from 'typesafe-actions';
import * as React from 'react';
import { connect } from 'react-redux';

import { loadTodosAsync, saveTodosAsync } from '../redux/modules/todos/actions';

const mapStateToProps = (state: RootState) => ({
  isLoading: state.todos.isLoadingTodos,
});
const dispatchProps = {
  loadTodosAsync: loadTodosAsync.request,
  saveTodosAsync: saveTodosAsync.request,
};

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

type State = {};

class TodoActions extends React.Component<Props, State> {
  render() {
    const { isLoading, loadTodosAsync, saveTodosAsync } = this.props;
    return (
      <section>
        <button
          type="button"
          onClick={() => loadTodosAsync()}
          disabled={isLoading}
        >
          Load snapshot
        </button>
        &nbsp;
        <button
          type="button"
          onClick={() => saveTodosAsync()}
          disabled={isLoading}
        >
          Save snapshot
        </button>
      </section>
    );
  }
}

export default connect(
  mapStateToProps,
  dispatchProps
)(TodoActions);
