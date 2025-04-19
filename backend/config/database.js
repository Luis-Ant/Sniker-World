import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || "development";
const configPath = path.resolve(__dirname, "../config/config.js");
const config = (await import(pathToFileURL(configPath))).default[env];

const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

const db = {};
const modelsPath = path.resolve(__dirname, "../models");

const modelFiles = fs
  .readdirSync(modelsPath)
  .filter((file) => file.endsWith(".js") && !file.startsWith("."));

for (const file of modelFiles) {
  const filePath = pathToFileURL(path.join(modelsPath, file));
  const modelModule = await import(filePath);
  const model = modelModule.default(sequelize, DataTypes);
  db[model.name] = model;
}

for (const modelName of Object.keys(db)) {
  if (typeof db[modelName].associate === "function") {
    db[modelName].associate(db);
  }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
