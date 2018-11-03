import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {mapProps} from './mapProps';

describe('mapPropsHOC', () => {
    const Component = mapProps(
        ({propToChange, propToDelete, ...otherProps}) => ({
            propToChange: propToChange + propToDelete,
            ...otherProps
        })
    )(props => <div {...props} />);

    test('should map props', () => {
        const renderer = new ShallowRenderer();
        renderer.render(
            <Component propToChange="foo" propToDelete={42} propToUntuched />
        );
        const result = renderer.getRenderOutput();
        expect(result.props.propToChange).toEqual('foo42');
        expect(result.props.propToDelete).toBeUndefined();
        expect(result.props.propToUntuched).toBeTruthy();
    });
});
