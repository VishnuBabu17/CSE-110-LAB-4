import { fireEvent, render, screen } from '@testing-library/react';
import { AppProvider } from './context/AppContext';
import { MyBudgetTracker } from './views/MyBudgetTracker';

describe('Expense Creation, Expense Deletion, Budget Balance Verification', () => {

  // Test for creating an expense and checking the totals.
  test('Expense Creation', () => {
    const { getByLabelText, getByText } = render(
      <AppProvider><MyBudgetTracker /></AppProvider>
    );

    const expenseName = screen.getByTestId('name')
    const expenseCost = screen.getByTestId('cost')

    // Filling out the expense form with name and cost
    fireEvent.change(expenseName, { target: { value: 'Movie Tickets' } });
    fireEvent.change(expenseCost, { target: { value: '87' } });
    fireEvent.click(getByText('Save'));

    // Checking that the expense is added
    expect(getByText('Movie Tickets')).toBeInTheDocument();
    expect(getByLabelText('Cost')).toBeInTheDocument();

    // Checking that totals are updated, budget remains unchanged
    expect(getByText(/spent so far/i)).toHaveTextContent('$87');
    expect(getByText(/remaining/i)).toHaveTextContent('$913');
  })

  // Test to delete an expense and check the totals
  test('Expense Deletion', () => {
    const { getByText } = render(
      <AppProvider><MyBudgetTracker /></AppProvider>
    );

    const expenseName = screen.getByTestId('name')
    const expenseCost = screen.getByTestId('cost')

    // Filling out the expense form with name and cost
    fireEvent.change(expenseName, { target: { value: 'Cricket Bats' } });
    fireEvent.change(expenseCost, { target: { value: '700' } });
    fireEvent.click(getByText(/save/i));

    // Deleting the expense
    fireEvent.click(getByText('x'));

    // Checking the totals
    expect(getByText(/spent so far/i)).toHaveTextContent('$0'); // Updated total
    expect(getByText(/remaining/i)).toHaveTextContent('$1000');
  
    // Check that the expense is removed, budget remains unchanged
    expect(screen.queryByText('Cricket Bats')).not.toBeInTheDocument();
  });

  // Test to verify the budget balance and checking the totals
  test('Budget Balance Verification', () => {
    const { getByLabelText, getByText, getByTestId } = render(
      <AppProvider><MyBudgetTracker /></AppProvider>
    );

    // Adding some expenses
    fireEvent.change(getByLabelText(/name/i), { target: { value: 'Badminton Rackets' } });
    fireEvent.change(getByLabelText(/cost/i), { target: { value: '400' } });
    fireEvent.click(getByText(/save/i));

    fireEvent.change(getByLabelText(/name/i), { target: { value: 'Sneakers' } });
    fireEvent.change(getByLabelText(/cost/i), { target: { value: '150' } });
    fireEvent.click(getByText(/save/i));

    // Calculating totals for verification
    const totalExpenditure = 400 + 150; // Total expenses
    const budget = 1000;
    const remaining = budget - totalExpenditure;

    // Verifying that the equation budget = remaining + expenditure holds
    expect(getByText(/remaining/i)).toHaveTextContent(`$${remaining}`);
    expect(getByText(/spent so far/i)).toHaveTextContent(`$${totalExpenditure}`);
    expect(getByTestId(/budget/i)).toHaveTextContent("$1000");
  })

})
