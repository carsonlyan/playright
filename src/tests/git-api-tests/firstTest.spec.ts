import { expect, test } from '@playwright/test';

const REPO = 'test-repo-qun-1';
const USER = 'carsonlyan';

// test.describe.configure({ mode: 'serial' });

test.describe('git api tests', async () => {
    test.beforeAll(async ({ playwright, context, request }) => {
        // const apiContext = await playwright.request.newContext()
        const response = await request.post('/user/repos', {
            data: {
                name: REPO,
            },
        });
        expect(response.ok()).toBeTruthy();
    });

    test('should create a bug report', async ({ request }) => {
        const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
            data: {
                title: '[bug] report 1',
                body: 'bug description',
            }
        })

        expect(newIssue.ok()).toBeTruthy();

        const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
        expect(issues.ok()).toBeTruthy();
        expect(await issues.json()).toContainEqual(expect.objectContaining({
            title: '[bug] report 1',
            body: 'bug description',
        }))
    })

    test.afterAll(async ({ request }) => {
        const response = await request.delete(`/repos/${USER}/${REPO}`);
        expect(response.ok()).toBeTruthy();
    })
});
