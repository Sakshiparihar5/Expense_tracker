package com.example.expense_tracker.service;

import com.example.expense_tracker.model.Expense;
import com.example.expense_tracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ExpenseService {
    private final ExpenseRepository repo;

    public ExpenseService(ExpenseRepository repo) { this.repo = repo; }

    public Expense createExpense(Expense expense) { return repo.save(expense); }
    public List<Expense> getAllExpenses() { return repo.findAll(); }
    public void deleteExpense(Long id) { repo.deleteById(id); }
    public Expense getExpenseById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));
    }


}
