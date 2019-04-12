// import * as D from '@shared/debug';

import Store from '@controllers/store';

import * as React from 'react';
import { observer } from 'mobx-react';
import { configure } from 'mobx';

import './App.scss';
import { CharacterEditor } from 'view/containers/character-editor';

export interface AppProps {
    store: Store;
}

const App = observer(
    class App extends React.Component<AppProps> {
        // Action Handlers
        render() {
            configure({
              enforceActions: true
            });

            return (
                <div>
                    <link href="https://fonts.googleapis.com/css?family=Tangerine" rel="stylesheet"></link>
                    <CharacterEditor store={this.props.store} />
                </div>
            );
        }
    }
);

export default App;
