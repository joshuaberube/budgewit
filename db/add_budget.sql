INSERT INTO budgets (
    budget_name,
    budget_category,
    budget_max,
    budget_current,
    user_id
)
VALUES ($1,$2,$3,$4,$5);