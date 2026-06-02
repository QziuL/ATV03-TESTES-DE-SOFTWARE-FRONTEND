import { test, expect } from '@playwright/test';

test.describe("Gerenciamento de Emprestimos (E2E)", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.fill('input[type="email"]', 'admin@sistema.com');
        await page.fill('input[type="password"]', '123456');
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL(/\/dashboard|$/);
    });

    test("Deve navegar para a tela de emprestimos", async ({ page }) => {
        await page.goto("/emprestimos")
        await expect(page.locator("h2")).toContainText("Empréstimos")
    });

    test("Deve permitir realizar um empréstimo de livro", async ({ page }) => {
        await page.goto('/emprestimos');
        await page.locator('.fab').click();
        await page.locator('select[name="livro_id"]').selectOption({ label: 'aaa' });
        await page.locator('select[name="usuario_id"]').selectOption({ label: 'luiz' });
        await page.fill('input[name="data_devolucao_prevista"]', '2026-07-02');
        await page.locator('button[type="submit"]').click();
        await expect(page.locator('span:has-text("Ativo")')).toBeVisible();
    });

    test("Deve registrar a devolução de um livro", async ({ page }) => {
        await page.goto('/emprestimos');
        await page.locator('button:has-text("Devolver")').click();
        await page.locator('button:has-text("Confirmar")').click();
        await expect(page.getByText("Devolução concluída.")).toBeVisible();
    });


})