import * as React from 'react';
import './App.css';
import {ContactForm} from '../ContactForm';

export class App extends React.Component {
    render() {
        return (
            <div className="App">
                <ContactForm />
            </div>
        );
    }
}
