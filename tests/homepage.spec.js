// tests/homepage.spec.js
import { test, expect } from '@playwright/test';
import en from '../assets/lang/en.json';

test.describe('اختبارات الصفحة الرئيسية', () => {

  test.beforeEach(async ({ page }) => {
    // الانتقال إلى الصفحة الرئيسية قبل كل اختبار
    // نفترض أن الموقع يعمل على خادم محلي على المنفذ 3000. قم بتعديل الرابط إذا لزم الأمر
    await page.goto('http://localhost:3000');
  });

  test('يجب أن يكون عنوان الصفحة صحيحاً', async ({ page }) => {
    // التحقق من أن عنوان الصفحة (title) يطابق ما هو موجود في ملف en.json
    await expect(page).toHaveTitle(en.meta_title);
  });

  test('يجب عرض العنوان الرئيسي بشكل صحيح', async ({ page }) => {
    // البحث عن عنصر h1 داخل قسم hero والتحقق من أن النص يطابق العنوان من en.json
    const heroTitle = page.locator('section#hero h1');
    await expect(heroTitle).toHaveText(en.hero_title);
  });

  test('يجب الانتقال إلى قسم "من نحن" عند النقر على رابط التنقل', async ({ page }) => {
    // البحث عن رابط "About Us" في شريط التنقل والنقر عليه
    await page.getByRole('link', { name: en.nav_about }).click();
    
    // انتظار تغيير الرابط ليحتوي على #about
    await page.waitForURL('**/#about');

    // التحقق من أن قسم "من نحن" أصبح مرئياً الآن
    const aboutSection = page.locator('section#about');
    await expect(aboutSection).toBeInViewport();
  });

});