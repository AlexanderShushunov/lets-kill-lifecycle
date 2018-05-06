import * as React from 'react';
import './FormLabel.css';

export const FormLabel = ({text, children}) => (
    <div className="FormLabel">
        <label>
            <span className="FormLabel__text">
                {text}
            </span>
            {children}
        </label>
    </div>
);
