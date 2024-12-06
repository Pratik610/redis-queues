import { createClient } from "redis";

const client = createClient();

const resolver = async () => {
  await client.connect();

  while (true) {
    try {
      const response = await client.rPop("submissions");

      const { problemId, code, language } = JSON.parse(response);

      console.log(`Processing submission for problemId ${problemId}...`);
      console.log(`Code: ${code}`);
      console.log(`Language: ${language}`);

      //  Run Actual Code
      await new Promise((resolve) => setInterval(resolve, 1000));
    } catch (error) {}
  }
};

resolver();
