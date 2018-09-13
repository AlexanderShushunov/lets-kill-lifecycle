import 'rxjs/add/operator/do';

export const createMockedDisptach = () => {
    const step = jest.fn();
    const operator = jest.fn(function() {
        return this.do(value => step(value));
    });
    return {
        step,
        operator
    };
};
