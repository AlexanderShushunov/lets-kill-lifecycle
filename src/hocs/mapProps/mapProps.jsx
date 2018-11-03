import * as React from 'react';

export function mapProps(propsMapper) {
    return WrappedComponent => {
        const WithProps = props => <WrappedComponent {...propsMapper(props)} />;
        WithProps.displayName = `withMapProps(${WrappedComponent.displayName ||
            WrappedComponent.name})`;
        return WithProps;
    };
}
