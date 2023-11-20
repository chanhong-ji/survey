export default () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: String(process.env.DATABASE_PASSWORD),
    name: process.env.DATABASE_NAME,
  },
  constants: {
    surveys: {
      pageSize: parseInt(process.env.SURVEYS_PER_PAGE) || 5,
    },
    answerSheets: {
      pageSize: parseInt(process.env.ANSWER_SHEETS_PER_PAGE) || 10,
    },
  },
});
