import * as React from 'react';

export function onChange(propNames, callback) {
    return WrappedComponent =>
        class extends React.Component {
            static displayName = `withOnChange(${WrappedComponent.displayName ||
                WrappedComponent.name})`;

            componentDidMount() {
                if (propNames.some(propName => propName in this.props)) {
                    callback(this.props);
                }
            }

            componentDidUpdate(prevProps) {
                if (
                    propNames.some(
                        propName => prevProps[propName] !== this.props[propName]
                    )
                ) {
                    callback(this.props, prevProps);
                }
            }

            render() {
                return <WrappedComponent {...this.props} />;
            }
        };
}
