import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
import { createExpense } from "../../utils/expense-utils";

const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const {expenses = [], setExpenses} = useContext(AppContext)

  // Exercise: Create name and cost to state variables
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState<number | string>("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Exercise: Add add new expense to expenses context array
    const newExpense: Expense = {
      id: Math.random().toString(36).substr(2, 9),
      description,
      cost: Number(cost),
    }
    
    createExpense(newExpense);
    setExpenses([...expenses, newExpense]);

    setDescription("")
    setCost("")
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            data-testid="name"
            type="text"
            className="form-control"
            id="name"
            value={description}
            // HINT: onChange={}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            data-testid="cost"
            type="number"
            className="form-control"
            id="cost"
            value={cost}
            // HINT: onChange={}
            onChange={(e) => setCost(e.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
