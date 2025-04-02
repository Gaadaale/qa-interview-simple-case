import { test, expect } from '@playwright/test';

test.describe('Sign-Up Form Tests', () => {
  test('User can successfully sign up and log in', async ({ page }) => {
    await page.goto('http://localhost:8080/signup'); // Navigate to Sign-Up page

    // Fill the sign-up form
    await page.fill('input[name="username"]', 'testuser123'); 
    await page.fill('input[name="email"]', 'testuser7576@example.com');
    await page.fill('input[name="password"]', 'SecurePassword7576!');
    await page.fill('input[name="confirmPassword"]', 'SecurePassword123!');
    
    // Click the Sign-Up button
    await page.click('button[type="submit"]');

    // Verify success message or redirection
    await expect(page).toHaveURL('http://localhost:8080/login'); 
    await expect(page.locator('.success-message')).toHaveText('Account created successfully!');

    // Log in with new account
    await page.fill('input[name="username"]', 'testuser123');
    await page.fill('input[name="password"]', 'SecurePassword123!');
    await page.click('button[type="submit"]');

    // Verify successful login
    await expect(page).toHaveURL('http://localhost:8080/dashboard');
    await expect(page.locator('.welcome-message')).toContainText('Welcome, testuser123!');
  });
});