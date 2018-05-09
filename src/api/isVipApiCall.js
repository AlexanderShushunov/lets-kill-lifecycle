export const isVipApiCall = str =>
    new Promise(resolve =>
        setTimeout(
            () =>
                resolve(str ? str.length % 3 === 0 : false),
            Math.random() * 1000
        )
    );
