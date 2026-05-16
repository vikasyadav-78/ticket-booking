"use client";
import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { setVisitorInfo } from "@/redux/features/booking/bookingSlice";

export default function VisitorForm({ onSubmit, onBack, loading }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const [touched, setTouched] = useState({}); 
 
    const errors = useMemo(() => {
        const errs = {};
        if (formData.name.length > 0 && formData.name.length < 3) errs.name = "Name is too short";
        if (formData.email.length > 0 && !/^\S+@\S+\.\S+$/.test(formData.email)) errs.email = "Invalid email format";
        if (formData.phone.length > 0 && formData.phone.length !== 10) errs.phone = "Phone must be 10 digits";
        return errs;
    }, [formData]);

    const isFormValid = formData.name.length >= 3 &&
        /^\S+@\S+\.\S+$/.test(formData.email) &&
        formData.phone.length === 10;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            dispatch(setVisitorInfo(formData));
            onSubmit(formData);
        }
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setFormData({ ...formData, phone: value });
    };

    const inputClasses = (fieldName) => `w-full p-4 border-2 rounded-xl outline-none font-bold text-royal-blue bg-white transition-all duration-300 placeholder:text-gray-300 placeholder:font-normal ${touched[fieldName] && errors[fieldName] ? "border-red-400 focus:border-red-500 bg-red-50/30" : "border-jaipur-pink/20 focus:border-dotted focus:border-royal-blue focus:bg-jaipur-pink/5 focus:shadow-md"} `;

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full space-y-8">
            <div>
                <h2 className="text-3xl font-serif font-bold text-royal-blue leading-tight">Visitor Details</h2>
                <p className="text-jaipur-dark/60 text-xs font-bold uppercase tracking-widest mt-1">Guest Information for Entry</p>
                <div className="h-1 w-16 bg-jaipur-pink mt-2 rounded-full"></div>
            </div>

            <div className="space-y-5">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-jaipur-dark uppercase tracking-[2px] ml-1">Full Name</label>
                    <input
                        required
                        value={formData.name}
                        onBlur={() => setTouched({ ...touched, name: true })}
                        className={inputClasses("name")}
                        placeholder="e.g. Vikas Yadav"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {touched.name && errors.name && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-jaipur-dark uppercase tracking-[2px] ml-1">Email Address</label>
                    <input
                        required
                        type="email"
                        value={formData.email}
                        onBlur={() => setTouched({ ...touched, email: true })}
                        className={inputClasses("email")}
                        placeholder="vikas@example.com"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {touched.email && errors.email && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-jaipur-dark uppercase tracking-[2px] ml-1">Mobile Number</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-jaipur-dark/40 font-bold border-r pr-3 border-jaipur-pink/20">+91</span>
                        <input
                            required
                            type="tel"
                            maxLength={10}
                            value={formData.phone}
                            onBlur={() => setTouched({ ...touched, phone: true })}
                            className={`${inputClasses("phone")} pl-16`}
                            placeholder="7878402570"
                            onChange={handlePhoneChange}
                        />
                    </div>
                    {touched.phone && errors.phone && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.phone}</p>}
                </div>
            </div>

            <div className="bg-sandstone p-4 rounded-xl border border-jaipur-pink/10 flex gap-3 items-center">
                <span className="text-xl">📧</span>
                <p className="text-[11px] text-jaipur-dark/70 leading-relaxed italic">
                    Your e-ticket and transaction details will be sent to this email address. Please double check.
                </p>
            </div>

            <div className="flex justify-between items-center mt-10 gap-4">
                <button
                    type="button"
                    onClick={onBack}
                    className="flex-1 py-4 font-bold text-jaipur-dark hover:text-royal-blue transition-colors uppercase tracking-widest text-sm">
                    ← Edit Pass
                </button>
                <button
                    type="submit"
                    disabled={loading || !isFormValid}
                    className={`flex-[2] py-4 rounded-2xl font-serif font-bold tracking-[2px] shadow-xl transition-all duration-300 relative overflow-hidden
                        ${loading || !isFormValid
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-jaipur-dark text-white hover:bg-royal-blue active:scale-95 shadow-jaipur-pink/20"}`}>
                    <span className={loading ? "opacity-0" : "opacity-100"}>PROCEED TO PAY ➜</span>
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        </div>
                    )}
                </button>
            </div>
        </motion.form>
    );
}