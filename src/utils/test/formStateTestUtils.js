export const createFormState = formName => (
    values = {},
    fields = {}
) => ({
    form: {
        [formName]: {
            values,
            fields
        }
    }
});

export const changeFormState = formName => (
    {
        form: {
            ContactForm: {
                values: prevValues,
                fields: prevFields
            }
        }
    },
    values = {},
    fields = {}
) => ({
    form: {
        [formName]: {
            values: {
                ...prevValues,
                ...values
            },
            fields: {
                ...prevFields,
                ...fields
            }
        }
    }
});
