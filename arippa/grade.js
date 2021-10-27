import fetch from "node-fetch";
import fs from "fs";

async function submitGrading(url, data) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
}

const readFile = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    return data;
  } catch (err) {
    return;
  }
};

const execute = async (token, endpoint) => {
  const result = await readFile("report.json");
  console.log(result);
  let response = {
    results: result,
    token: token,
  };

  let gradingResponse = await submitGrading(endpoint, response);

  console.log(`Grading Response: ${gradingResponse?.status}`);
};

(async () => {
  let token = process.env.TOKEN;
  let endpoint = process.env.ENDPOINT;
  if (token && endpoint) {
    execute(process.env.TOKEN, process.env.ENDPOINT);
  } else {
    console.log("Please provide token end endpoint");
  }
})();
