import React, { useRef, useEffect } from "react";
import patterns from "../../validations/patterns";

const PaymentFormStep1 = ({
    register,
    handleSubmit,
    onSubmit,
    errors,
    watchMonthlyAmount,
    watchIs12Months,
    setValue,
}) => {
    const monthlyAmountRef = useRef(null);

    useEffect(() => {
        if (monthlyAmountRef.current) {
            monthlyAmountRef.current.focus();
        }
    }, []);

    const handleMonthlyAmountChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setValue("MonthlyAmount", parseFloat(value));
        }
    };

    const formatAmount = (amount) => {
        return amount.toLocaleString('en-US');
    };

    return (
        <div className="amount-info">
            <div className="amount-section">
                <div className="right-side-amount">
                    <div className="monthly-amount">
                        <p className="amount-text">תרומתך:</p>
                        <div className="monthly-amount-wrapper">
                            <input
                                type="text"
                                {...register("MonthlyAmount", {
                                    required: true,
                                    setValueAs: (value) => parseFloat(value) || 0,
                                })}
                                placeholder="סכום"
                                ref={monthlyAmountRef}
                                className="monthly-amount-input"
                                onChange={handleMonthlyAmountChange}
                                value={watchMonthlyAmount || ""}
                                maxLength={10} 
                            />
                            <div className="currency">₪</div>
                        </div>
                    </div>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            {...register("Is12Months")}
                            className="checkbox-input"
                        />
                        מאשר לחייב את כרטיס האשראי שלי כל חודש ₪{watchMonthlyAmount} כפול 12 חודשים, (סה"כ ₪{watchMonthlyAmount * 12})
                    </label>
                </div>
                <div className="left-side-amount">
                    <p className="amount-text">בית חב״ד יפו מקבל:</p>
                    <div className="for-year">₪
                        {isNaN(parseFloat(watchMonthlyAmount)) ? 0 : formatAmount(watchIs12Months ? parseFloat(watchMonthlyAmount) * 12 : parseFloat(watchMonthlyAmount))}
                    </div>
                </div>
            </div>
            <form className="payment-form" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    {...register("FirstName", { required: true, maxLength: 50 })}
                    placeholder="שם פרטי"
                    className="form-input"
                />
                {errors.FirstName && <span className="error">נא להזין שם פרטי</span>}
                <input
                    type="text"
                    {...register("LastName", { required: true, maxLength: 50 })}
                    placeholder="שם משפחה"
                    className="form-input"
                />
                {errors.LastName && <span className="error">נא להזין שם משפחה</span>}
                <input
                    type="email"
                    {...register("Mail", {
                        required: true,
                        maxLength: 50,
                        pattern: patterns.email
                    })}
                    placeholder="אימייל"
                    className="form-input"
                />
                {errors.Mail && <span className="error">נא להזין אימייל</span>}
                <input
                    type="text"
                    {...register("Phone", {
                        required: true,
                        maxLength: 20,
                        pattern: patterns.phone
                    })}
                    placeholder="טלפון"
                    className="form-input"
                />
                {errors.Phone && <span className="error">נא להזין טלפון</span>}
                <input
                    type="text"
                    {...register("Dedication", { maxLength: 300 })}
                    placeholder="הקדשה (לא חובה)"
                    className="form-input"
                />
                <button type="submit" className="payment-button">המשך</button>
            </form>
        </div>
    );
};

export default PaymentFormStep1;