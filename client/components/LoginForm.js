import React, { Component } from 'react';
import AuthForm from './AuthForm';
import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';
import { graphql } from 'react-apollo';

class Loginform extends Component {
  constructor(props){
    super(props);

    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps){
    // this.props // the old, current set of props
    // nextProps // the next set of props
    if (!this.props.data.user && nextProps.data.user){
      this.props.history.push('/dashboard');
    }
  }


  onSubmit = ({ email, password }) => {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [ { query } ]
    })
    .catch((e) => {
      const errors = e.graphQLErrors.map(error => error.message);
      this.setState({ errors });
    });
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm errors={this.state.errors} onSubmit={this.onSubmit}></AuthForm>
      </div>
    )
  }
}

export default graphql(mutation)(graphql(query)(Loginform));