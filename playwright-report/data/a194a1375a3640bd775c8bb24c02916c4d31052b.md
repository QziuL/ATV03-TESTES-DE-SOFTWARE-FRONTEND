# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: emprestimo.spec.js >> Gerenciamento de Emprestimos (E2E) >> Deve permitir realizar um empréstimo de livro
- Location: e2e/emprestimo.spec.js:17:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Ativo')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Ativo')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - heading [level=1]
      - generic [ref=e6]:
        - button "Alternar tema" [ref=e7] [cursor=pointer]:
          - img [ref=e8]
        - button "Sair" [ref=e10] [cursor=pointer]:
          - img [ref=e11]
  - generic [ref=e15]:
    - generic [ref=e16]:
      - heading "Empréstimos" [level=2] [ref=e17]
      - paragraph [ref=e18]: Gestão de retiradas e devoluções
    - generic [ref=e19]:
      - img [ref=e20]
      - generic [ref=e22]: Erro ao salvar empréstimo.
      - button [ref=e23] [cursor=pointer]:
        - img [ref=e24]
    - generic [ref=e28]:
      - generic [ref=e29]:
        - generic [ref=e30]:
          - 'heading "Livro #9" [level=3] [ref=e31]'
          - generic [ref=e32]:
            - img [ref=e33]
            - text: "Usuário #1"
        - generic [ref=e36]: Concluído
      - generic [ref=e38]:
        - text: Prazo
        - paragraph [ref=e39]: 01 de jun.
      - button "Excluir Histórico" [ref=e41] [cursor=pointer]:
        - img [ref=e42]
        - text: Excluir Histórico
    - button [ref=e45] [cursor=pointer]:
      - img [ref=e46]
    - generic [ref=e48]:
      - generic [ref=e49]:
        - heading "Novo Empréstimo" [level=3] [ref=e50]
        - button [ref=e51] [cursor=pointer]:
          - img [ref=e52]
      - generic [ref=e55]:
        - generic [ref=e56]:
          - generic [ref=e57]:
            - generic [ref=e58]: Livro
            - combobox [ref=e59] [cursor=pointer]:
              - option "Selecione um livro"
              - option "Livro E2E 549" [selected]
              - option "Livro E2E 197"
              - option "aaa"
              - option "Livro E2E 59"
          - generic [ref=e60]:
            - generic [ref=e61]: Usuário
            - combobox [ref=e62] [cursor=pointer]:
              - option "Selecione o aluno"
              - option "luiz" [selected]
          - generic [ref=e63]:
            - generic [ref=e64]: Data de Devolução Prevista
            - textbox [ref=e65]: 2026-06-02
        - generic [ref=e66]:
          - button "Cancelar" [ref=e67] [cursor=pointer]
          - button "Confirmar" [ref=e68] [cursor=pointer]
  - navigation "Navegação principal" [ref=e69]:
    - generic [ref=e70]:
      - link "Livros" [ref=e71] [cursor=pointer]:
        - /url: /livros
        - img [ref=e73]
        - generic [ref=e75]: Livros
      - link "Empréstimos" [ref=e76] [cursor=pointer]:
        - /url: /emprestimos
        - img [ref=e78]
        - generic [ref=e81]: Empréstimos
      - link "Início" [ref=e82] [cursor=pointer]:
        - /url: /
        - img [ref=e84]
        - generic [ref=e87]: Início
      - link "Multas" [ref=e88] [cursor=pointer]:
        - /url: /multas
        - img [ref=e90]
        - generic [ref=e92]: Multas
      - link "Equipe" [ref=e93] [cursor=pointer]:
        - /url: /usuarios
        - img [ref=e95]
        - generic [ref=e100]: Equipe
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
> 24 |         await expect(page.getByText("Ativo")).toBeVisible();
     |                                               ^ Error: expect(locator).toBeVisible() failed
  25 |     });
  26 | 
  27 |     test("Deve registrar a devolução de um livro", async ({ page }) => {
  28 |         await page.goto('/emprestimos');
  29 |         await page.click('button:has-text("Devolver")');
  30 |         await page.click('button:has-text("Confirmar")');
  31 |         await expect(page.getByText("Devolução concluída.")).toBeVisible();
  32 |     });
  33 | 
  34 | 
  35 | })
```