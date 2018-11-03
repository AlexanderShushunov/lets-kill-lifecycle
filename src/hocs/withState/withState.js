import * as React from 'react';

export function withState(stateName, stateUpdaterName, initialState) {
    return WrappedComponent =>
        class extends React.Component {
            static displayName = `withState(${WrappedComponent.displayName ||
                WrappedComponent.name})`;

            state = {
                stateValue: initialState
            };

            setStateIsSafe = false;

            componentDidMount() {
                this.setStateIsSafe = true;
            }

            componentWillUnmount() {
                this.setStateIsSafe = false;
            }

            updateStateValue = newValue => {
                if (!this.setStateIsSafe) {
                    return;
                }
                this.setState({
                    stateValue: newValue
                });
            };

            render() {
                const newProps = {
                    ...this.props,
                    [stateName]: this.state.stateValue,
                    [stateUpdaterName]: this.updateStateValue
                };
                return <WrappedComponent {...newProps} />;
            }
        };
}
