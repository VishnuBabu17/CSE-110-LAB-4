import { Database } from "sqlite";
import { Expense } from "../types";
import { Request, Response } from "express";

export async function createExpenseServer(req: Request, res: Response, db: Database) {

    try {
        // Type casting the request body to the expected format.
        const { id, cost, description } = req.body as { id: string, cost: number, description: string };
 
        if (!description || !id || !cost) {
            return res.status(400).send({ error: "Missing required fields" });
        }
 
        await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
        console.log(`created expense ${description} in ${db}`)
        res.status(201).send({ id, description, cost });
 
    } catch (error) {
 
        return res.status(400).send({ error: `Expense could not be created, + ${error}` });
    };
 
 }

export async function deleteExpense(req: Request, res: Response, db: Database) {
    // TO DO: Implement deleteExpense function
    console.log(`Deleting expense with id: ${req.params.id}`)
    const { id } = req.params

    if (!id) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    try{
        await db.run('DELETE FROM expenses WHERE id = ?;',[id]);
    } catch(error){
        return res.status(400).send({ error: `Expense could not be deleted` });
    }
}

export async function getExpenses(req: Request, res: Response, db : Database) {

    try{
        const data: Expense[] = await db.all("SELECT * FROM expenses;", (err: Error | null, rows: Expense[]) => {
            if(err) throw err;
            console.log(rows);
        });

        res.status(200).send(data);
    } catch (error) {
        console.error("Error fetching expenses:", error);
        return res.status(400).send({ error: `Expenses could not be fetched` });
    }
}