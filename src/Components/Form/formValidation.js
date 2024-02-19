const validateForm = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.items) {
        errors.items = "Cannot be blank";
    }

    if (!values.price) {
        errors.price = "Cannot be blank";
    }

    if (!values.region) {
        errors.region = "Cannot be blank";
    }

    return errors;
};

export default validateForm;