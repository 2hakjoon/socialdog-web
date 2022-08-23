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
      USER_REFRESH_TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTkzMjMzNTcsImV4cCI6MTY2MDUzMjk1N30.SVfz7loh3Fi4kW0F_Y4cKb43MQjusuMNBGZSa3Uvl3s',
      USER_ACCESS_TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3ODYxOGY5LWVkMGUtNGI1MS1iNGFlLWE4NDAzN2FkYzZjNSIsImxvZ2luU3RyYXRlZ3kiOiJLQUtBTyIsImlhdCI6MTY1OTMyMzM1NywiZXhwIjoxNjU5NDA5NzU3fQ.bMw4Sk5Uo0aTP3l7b535UNXxI3oaOxdbaVopcIyXcjo'
    },
    setupNodeEvents(on, config) { 
      // implement node event listeners here
    },
  },
});
