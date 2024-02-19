import React, { useState, useEffect } from "react";

const Form = () => {
    const initialValues = { items: "", price: "", region: "" };

    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [total, setTotal] = useState(0);
    const [discountApplied, setDiscountApplied] = useState(false);
    const [discountRate, setDiscountRate] = useState(0);

    const submit = () => {
        console.log(formValues);
    };

    // Input change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    // Handles Form Reset
    const handleReset = () => {
        setFormValues(initialValues);
        setFormErrors({});
        setIsSubmitting(false);
        setTotal(0);
    };

    // Form Submission Handler
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        calculateTotal();
    };

    // Calculate total
    const calculateTotal = () => {
        const { items, price } = formValues;
        let totalValue = parseInt(items) * parseFloat(price);
        setTotal(totalValue.toFixed(2));
    };

    return (
        <div className="container">
            <h1>Retail Discount Calculator</h1>
            <form onSubmit={'handleSubmit'} noValidate>
                <div className="form-row">
                    <input
                        type="number"
                        placeholder="How many items"
                        value={formValues.items}
                        onChange={handleChange}
                        name="items"
                    />
                </div>
                <div className="form-row">
                    <input
                        type="text"
                        placeholder="Price per item"
                        value={formValues.price}
                        onChange={handleChange}
                        name="price"
                    />
                </div>
                <div className="form-row">
                    <input
                        type="text"
                        placeholder="3-letter region code"
                        value={formValues.region}
                        onChange={handleChange}
                        name="region"
                    />
                </div>
                <button type="reset" className="btn--secondary" onClick={handleReset}>Reset</button>
                <div className="">
                    <button type="submit" className="btn--primary" id="breathing-button">Calculate</button>
                    <div className="total">Total: {total}</div>
                </div>

            </form>
        </div>
    );
};

export default Form;