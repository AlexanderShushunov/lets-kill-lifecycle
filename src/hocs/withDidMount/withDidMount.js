import * as React from 'react';

export const withDidMount = hook => WrappedComponent =>
    class extends React.Component {
        static displayName = `withDidMount(${WrappedComponent.displayName ||
            WrappedComponent.name})`;

        componentDidMount() {
            hook(this.props);
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
