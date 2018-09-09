export const createFormState = (
    values = {},
    fields = {}
) => ({
    form: {
        ContactForm: {
            values,
            fields
        }
    }
});

export const changeFormState = (
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
        ContactForm: {
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
