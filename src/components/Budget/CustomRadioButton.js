const CustomRadioButton = ({radio: {title, desc, value}, budgetFrequency, setBudgetFrequency}) => {
    return (
        <div 
            onClick={() => setBudgetFrequency(value)} 
            className={`w-152 h-96 bg-gray-50 rounded-10px ml-16px mt-16px cursor-pointer ${budgetFrequency === value ? "border-2 border-green-500" : ""}`}
        >
            <div className={`flex flex-col ${budgetFrequency === value ? "p-10" : "p-12"}`}>
                <span className="font-bold text-gray-800 text-sm tracking-wide">{title}</span>
                <span className="text-gray-400 text-sm">{desc}</span>
            </div>
        </div>
    )
}

export default CustomRadioButton