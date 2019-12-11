import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

class RouteModule extends React.Component {
  render () {
    const { routes } = this.props;
    return (
      <Switch>
        {routes.map(item => (<Route {...item} key={item.path} />))}
      </Switch>
    );
  };
}

RouteModule.propTypes = {
  routes: PropTypes.array
};

export default RouteModule;