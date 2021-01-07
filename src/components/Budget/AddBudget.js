import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import "./AddBudget.scss";
import CustomRadioButton from "./CustomRadioButton";
import axios from "axios";

const AddBudget = ({ setIsAddBudget }) => {
  const [budget, setBudget] = useState({
    budget_title: "",
    budget_description: "",
    budget_amount: 0,
    budget_category: "",
  });
  const [budget_frequency, setBudgetFrequency] = useState("monthly");
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsAddBudget(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, setIsAddBudget]);

  const categories = useSelector((state) => state.plaid.categories);

  const inputsArr = [
    { type: "text", placeholder: "Title", name: "title" },
    {
      type: "text",
      placeholder: "Description (optional)",
      name: "description",
    },
    { type: "number", placeholder: "Amount", name: "amount" },
  ];

  const radioArr = [
    {
      title: "MONTHLY",
      desc: "Starts the first day of the month",
      value: "monthly",
      checked: "checked",
    },
    { title: "QUARTERLY", desc: "Follows the US Quarters", value: "quarterly" },
    {
      title: "YEARLY",
      desc: "Starts the first day of the year",
      value: "yearly",
    },
    {
      title: "ONCE",
      desc: "Starts the first day of the next month",
      value: "once",
    },
  ];

  const inputsMapped = inputsArr.map(({ type, placeholder, name }) => (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={(e) =>
        setBudget({ ...budget, [`budget_${e.target.name}`]: e.target.value })
      }
      className="rounded-5 mb-16 h-40 w-256 p-12 text-sm placeholder-gray-400 text-gray-800 bg-gray-50 font-semibold tracking-wide"
    />
  ));

  const radioMapped = radioArr.map((radio) => (
    <CustomRadioButton
      key={radio.title}
      radio={radio}
      budgetFrequency={budget_frequency}
      setBudgetFrequency={setBudgetFrequency}
    />
  ));

  const parentCategories = categories.reduce(
    (acc, { hierarchy }) =>
      hierarchy.length === 1 ? [...acc, hierarchy[0]] : acc,
    []
  );

  const categoriesMapped = parentCategories.map((category) => (
    <option key={category} value={category}>
      {category}
    </option>
  ));

  const onSumbitHandler = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/data/budgets", { ...budget, budget_frequency })
      .catch((err) => console.log(err));

    setIsAddBudget(false);
  };

  return (
    <div
      ref={ref}
      className="w-768 bg-gray-300 rounded-10 flex flex-col shadow-2xl font-proxima-nova"
    >
      <div className="mx-80 py-48">
        <div className="flex flex-row justify-between items-baseline">
          <h1 className="text-3xl text-gray-600 font-extrabold">
            Create A Budget
          </h1>
          <input
            type="reset"
            value="Cancel"
            onClick={() => setIsAddBudget(false)}
            className="bg-transparent cursor-pointer font-bold text-gray-600"
          />
        </div>
        <form
          onSubmit={onSumbitHandler}
          className="flex flex-row border-t border-gray-400 pt-16 mt-2"
        >
          <div className="flex flex-col">
            {inputsMapped}
            <select
              name="category"
              required
              onChange={(e) =>
                setBudget({
                  ...budget,
                  [`budget_${e.target.name}`]: e.target.value,
                })
              }
              className="mb-16 rounded-5 h-40 w-256 pl-12 cursor-pointer text-sm bg-gray-50 font-semibold tracking-wide"
            >
              <option value="" disabled selected>
                Select Category
              </option>
              {categoriesMapped}
            </select>
            <button
              type="submit"
              className="bg-green-500 rounded-5 h-40 w-256 text-gray-50"
            >
              Create Budget
            </button>
          </div>
          <div className="ml-16 flex flex-col justify-between">
            <h2 className="ml-16 font-bold text-2xl text-gray-600 pt-8">
              Frequency
            </h2>
            <div className="flex flex-row flex-wrap">{radioMapped}</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBudget;

//# An array of objects. Each object has the hierarchy, the [0] represents the parent category whereas [1], etc. represent sub categories.

//# But what if the data was structured like this: [{parentCategory: "Bank Fees", subCategories: ["Overdraft", "ATM", "Late Payment"]}]
