import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import Store from './controllers/store';

export var store = new Store();

ReactDOM.render(<App store={store}/>, document.getElementById('app'));

