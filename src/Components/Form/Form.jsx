import React, { useState, useEffect } from "react";
import validateForm from "./formValidation"; //form validation handler
import discountRates from "../../discountRates"; // Import discount rates
import "./Form.scss";

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

    //form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validateForm(formValues));
        setIsSubmitting(true);
        calculateTotal();
    };

    // Calculate total
    const calculateTotal = () => {
        const { items, price } = formValues;
        let totalValue = parseInt(items) * parseFloat(price);

        // Check if total is eligible for discount
        if (totalValue >= 1000) {
            for (let i = discountRates.length - 1; i >= 0; i--) {
                if (totalValue >= discountRates[i].orderValue) {
                    totalValue *= (1 - discountRates[i].discountRate);
                    setDiscountApplied(true);
                    setDiscountRate(discountRates[i].discountRate);
                    break; // Apply only the highest applicable discount
                }
            }
        } else {
            setDiscountApplied(false);
            setDiscountRate(0);
        }

        setTotal(totalValue.toFixed(2));
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submit();
        }
    }, [formErrors]);



    return (
        <div className="container">
            <h1>Retail Discount Calculator</h1>
            <form onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                    <input
                        type="number"
                        placeholder="How many items"
                        value={formValues.items}
                        onChange={handleChange}
                        className={formErrors.items && "input-error"}
                        name="items"
                    />
                    {formErrors.items && (
                        <span className="error">{formErrors.items}</span>
                    )}
                </div>
                <div className="form-row">
                    <input
                        type="text"
                        placeholder="Price per item"
                        value={formValues.price}
                        onChange={handleChange}
                        className={formErrors.price && "input-error"}
                        name="price" // Add name attribute
                    />
                    {formErrors.price && (
                        <span className="error">{formErrors.price}</span>
                    )}
                </div>
                <div className="form-row">
                    <input
                        type="text"
                        placeholder="3-letter region code"
                        value={formValues.region}
                        onChange={handleChange}
                        className={formErrors.region && "input-error"}
                        name="region" // Add name attribute
                    />
                    {formErrors.region && (
                        <span className="error">{formErrors.region}</span>
                    )}
                </div>
                <button type="reset" className="btn--secondary" onClick={handleReset}>Reset</button>

                <div className="">
                    <button type="submit" className="btn--primary" id="breathing-button">Calculate</button>
                    {total !== 0 && <div className="total">Total: ${parseFloat(total).toLocaleString("en-US", { minimumFractionDigits: total % 1 === 0 ? 0 : 2 })}             {discountApplied && (
                        <span> ({discountRate * 100}% saved)</span>
                    )}</div>}
                    {Object.keys(formErrors).length === 0 && isSubmitting && (
                        <span className="success-msg">Form submitted successfully!</span>
                    )}
                </div>

            </form>
        </div>
    );
};

export default Form;
