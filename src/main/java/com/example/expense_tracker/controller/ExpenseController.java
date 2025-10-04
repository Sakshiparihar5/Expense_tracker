package com.example.expense_tracker.controller;
import com.example.expense_tracker.model.Expense;
import com.example.expense_tracker.service.ExpenseService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
    private final ExpenseService service;

    public ExpenseController(ExpenseService service) { this.service = service; }

    @GetMapping
    public List<Expense> getAll() { return service.getAllExpenses(); }

    @PostMapping
    public Expense create(@RequestBody Expense expense) { return service.createExpense(expense); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.deleteExpense(id); }

    @PutMapping("/{id}")
    public Expense update(@PathVariable Long id, @RequestBody Expense expense) {
        Expense existing = service.getExpenseById(id);
        existing.setAmount(expense.getAmount());
        existing.setDate(expense.getDate());
        existing.setNote(expense.getNote());
        existing.setCategory(expense.getCategory());
        return service.createExpense(existing);
    }
}
