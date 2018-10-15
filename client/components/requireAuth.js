import React, { Component } from 'react';
import query from '../queries/CurrentUser';
import { graphql } from 'react-apollo';
import PropTypes from "prop-types";

export default WrappedComponent => {
  class RequireAuth extends Component {
    static contextTypes = {
      router: PropTypes.object
    };

    componentWillUpdate(nextProps) {
      if (!nextProps.data.loadin && !nextProps.data.user) {
        this.context.router.history.replace("/login");
      }
    }

    render(){
      return <WrappedComponent {...this.props} />
    }
  }
  return graphql(query)(RequireAuth);
}
