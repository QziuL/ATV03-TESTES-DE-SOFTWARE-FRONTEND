# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: emprestimo.spec.js >> Gerenciamento de Emprestimos (E2E) >> Deve registrar a devolução de um livro
- Location: e2e/emprestimo.spec.js:27:5

# Error details

```
Error: page.click: Test ended.
Call log:
  - waiting for locator('button:has-text("Devolver")')

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe("Gerenciamento de Emprestimos (E2E)", () => {
  4  |     test.beforeEach(async ({ page }) => {
  5  |         await page.goto('/');
  6  |         await page.fill('input[type="email"]', 'admin@sistema.com');
  7  |         await page.fill('input[type="password"]', '123456');
  8  |         await page.click('button[type="submit"]');
  9  |         await expect(page).toHaveURL(/\/dashboard|$/);
  10 |     });
  11 | 
  12 |     test("Deve navegar para a tela de emprestimos", async ({ page }) => {
  13 |         await page.goto("/emprestimos")
  14 |         await expect(page.locator("h2")).toContainText("Empréstimos")
  15 |     });
  16 | 
  17 |     test("Deve permitir realizar um empréstimo de livro", async ({ page }) => {
  18 |         await page.goto('/emprestimos');
  19 |         await page.click('.fab');
  20 |         await page.locator('select[name="livro_id"]').selectOption({ label: 'Livro E2E 549' });
  21 |         await page.locator('select[name="usuario_id"]').selectOption({ label: 'luiz' });
  22 |         await page.fill('input[name="data_devolucao_prevista"]', '2026-06-02');
  23 |         await page.click('button[type="submit"]');
  24 |         await expect(page.getByText("Ativo")).toBeVisible();
  25 |     });
  26 | 
  27 |     test("Deve registrar a devolução de um livro", async ({ page }) => {
  28 |         await page.goto('/emprestimos');
> 29 |         await page.click('button:has-text("Devolver")');
     |                    ^ Error: page.click: Test ended.
  30 |         await page.click('button:has-text("Confirmar")');
  31 |         await expect(page.getByText("Devolução concluída.")).toBeVisible();
  32 |     });
  33 | 
  34 | 
  35 | })
```