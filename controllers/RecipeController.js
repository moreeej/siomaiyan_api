const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash", responseMimeType: "application/json",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: {
      "type": "object",
      "properties": {
        "dishes": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "title": { "type": "string" },
              "ingredients": { "type": "string" },
              "steps": { "type": "array", "items": { "type": "string" } }
            },
            "required": ["title", "ingredients", "steps"]
          }
        },
      },
      "required": ["dishes"]
    },
  }
}
);

async function getRecipe(req, res) {
  try {
    
    const prompt = `With these given ingredients: ${req.query.ingredients}
    Suggest multiple dishes with these ingredients and provide step by steps instructions how to cook it
    `
    if(!req.query.ingredients){
      res.json({error: "No Ingredients"})
      return;
    }
    const result = await model.generateContent(prompt);
    
    const response = result.response.text();
    console.log(response);
    const recipe = JSON.parse(response);
    
    res.json(recipe)
  } catch (error) {
    res.json({ error: "Error: " + error  })
  }

}

module.exports = { getRecipe };