UPDATE budgets
 SET budget_name = $1,
    budget_category = $2,
    budget_max = $3,
    budget_current = $4
    WHERE budget_id = $5;