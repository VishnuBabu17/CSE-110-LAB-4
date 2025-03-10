import { Response } from 'express';

// Function to get the budget
export function getBudget(res: Response, budget: number) {
    res.status(200).send({ "data": budget });
}

// Function to update the budget
export function updateBudget(res: Response, body: any, budget: { amount: number }) {
    // TO DO: Implement updateBudget function

    const { budget: newBudget } = body;

    // Update the budget amount
    budget.amount = newBudget;

    // Send the updated budget
    res.status(200).send({ budget: budget.amount });
}
