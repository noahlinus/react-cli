import React from 'react'

import { Switch, Route } from 'react-router-dom'
import Welcome from '@/modules/Welcome';

const Routers = () => (
  <Switch>
    <Route exact path="/" component={Welcome} />
  </Switch>
)

export default Routers
