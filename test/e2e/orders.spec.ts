import { test, expect } from "@playwright/test"

test("list orders", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" })

  await expect(
    page.getByRole("cell", { name: "Customer 1", exact: true })
  ).toBeVisible()

  await expect(
    page.getByRole("cell", { name: "Customer 10", exact: true })
  ).toBeVisible()
})

test("paginate next page", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" })

  await page.getByRole("button", { name: "Próxima página" }).click()

  await expect(
    page.getByRole("cell", { name: "Customer 11", exact: true })
  ).toBeVisible()

  await expect(
    page.getByRole("cell", { name: "Customer 20", exact: true })
  ).toBeVisible()

  expect(page.url()).toContain("page=2")
})

test("paginate last page", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" })

  await page.getByRole("button", { name: "Última página" }).click()

  await expect(
    page.getByRole("cell", { name: "Customer 51", exact: true })
  ).toBeVisible()

  await expect(
    page.getByRole("cell", { name: "Customer 60", exact: true })
  ).toBeVisible()

  expect(page.url()).toContain("page=6")
})

test("paginate first page", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" })

  await page.getByRole("button", { name: "Última página" }).click()
  await page.getByRole("button", { name: "Primeira página" }).click()

  await expect(
    page.getByRole("cell", { name: "Customer 1", exact: true })
  ).toBeVisible()

  await expect(
    page.getByRole("cell", { name: "Customer 10", exact: true })
  ).toBeVisible()

  expect(page.url()).toContain("page=1")
})

test("paginate previous page", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" })

  await page.getByRole("button", { name: "Última página" }).click()
  await page.getByRole("button", { name: "Página anterior" }).click()

  await expect(
    page.getByRole("cell", { name: "Customer 41", exact: true })
  ).toBeVisible()

  await expect(
    page.getByRole("cell", { name: "Customer 50", exact: true })
  ).toBeVisible()

  expect(page.url()).toContain("page=5")
})

test("filter by order id", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" })

  await page.getByPlaceholder("ID do pedido").fill("order-11")
  await page.getByRole("button", { name: "Filtrar resultados" }).click()

  await expect(
    page.getByRole("cell", { name: "order-11", exact: true })
  ).toBeVisible()

  await expect(
    page.getByRole("cell", { name: "order-10", exact: true })
  ).not.toBeVisible()

  await expect(
    page.getByRole("cell", { name: "order-12", exact: true })
  ).not.toBeVisible()
})

test("filter by customer name", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" })

  await page.getByPlaceholder("Nome do cliente").fill("Customer 11")
  await page.getByRole("button", { name: "Filtrar resultados" }).click()

  await expect(
    page.getByRole("cell", { name: "Customer 11", exact: true })
  ).toBeVisible()

  await expect(
    page.getByRole("cell", { name: "Customer 12", exact: true })
  ).not.toBeVisible()
})

test("filter by status pending", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" })

  await page.getByRole("combobox").click()
  await page.getByLabel("Pendente").click()

  await page.getByRole("button", { name: "Filtrar resultados" }).click()

  const tableRows = await page.getByRole("cell", { name: "Pendente" })

  await expect(tableRows).toHaveCount(10)
})

test("filter by status canceled", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" })

  await page.getByRole("combobox").click()
  await page.getByLabel("Cancelado").click()

  await page.getByRole("button", { name: "Filtrar resultados" }).click()

  const tableRows = page.getByRole("cell", { name: "Cancelado" })

  await expect(tableRows).toHaveCount(10)
})

test("filter by status processing", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" })

  await page.getByRole("combobox").click()
  await page.getByLabel("Em preparo").click()

  await page.getByRole("button", { name: "Filtrar resultados" }).click()

  const tableRows = page.getByRole("cell", { name: "Em preparo" })

  await expect(tableRows).toHaveCount(10)
})

test("filter by status delivering", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" })

  await page.getByRole("combobox").click()
  await page.getByLabel("Em entrega").click()

  await page.getByRole("button", { name: "Filtrar resultados" }).click()

  const tableRows = page.getByRole("cell", { name: "Em entrega" })

  await expect(tableRows).toHaveCount(10)
})

test("filter by status delivered", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" })

  await page.getByRole("combobox").click()
  await page.getByLabel("Entregue").click()

  await page.getByRole("button", { name: "Filtrar resultados" }).click()

  const tableRows = page.getByRole("cell", { name: "Entregue" })

  await expect(tableRows).toHaveCount(10)
})
