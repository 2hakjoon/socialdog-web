import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'tvn2pk',
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    env: {
      USER_REFRESH_TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTg4MzE3MjUsImV4cCI6MTY2MDA0MTMyNX0.r4EXPFwEbhVkOgXGDxlcqx84j8QOPHipOudunc9KMAI',
      USER_ACCESS_TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3ODYxOGY5LWVkMGUtNGI1MS1iNGFlLWE4NDAzN2FkYzZjNSIsImxvZ2luU3RyYXRlZ3kiOiJLQUtBTyIsImlhdCI6MTY1ODgzMTcyNSwiZXhwIjoxNjU4OTE4MTI1fQ.PZlBHTfwzuLe3c20kL808ZQGDq67JHB6jNM1VApNc9I'
    },
    setupNodeEvents(on, config) { 
      // implement node event listeners here
    },
  },
});
