import Sequelize from "sequelize";
import questions from "./questionModel.js";
import categories from "./categoryModel.js";
import options from "./questionOptionModel.js";
import departments from "./departmentsModel.js";
import candidate_questions from "./candidateQuestionsModel.js";
import candidate_exams from "./candidateExamsModel.js";
import candidate from "./candidateModel.js";
import campus_drive from "./campusDrivesModel.js";
import campuses from "./campusesModel.js";
import difficulty_levelModel from "./difficultyLevelModel.js";
import question_difficultyModel from "./questionDifficultyModel.js";
import dbConfig from "../../../config/config.js";
const { sequelizeDb } = dbConfig;

const sequelize = new Sequelize(
  sequelizeDb.DB,
  sequelizeDb.USER,
  sequelizeDb.PASSWORD,
  {
    host: sequelizeDb.HOST,
    dialect: sequelizeDb.dialect,
    operatorsAliases: 0,
    port: sequelizeDb.port,
    pool: {
      max: sequelizeDb.pool.max,
      min: sequelizeDb.pool.min,
      acquire: sequelizeDb.pool.acquire,
      idle: sequelizeDb.pool.idle,
    },
  }
);
sequelize
  .authenticate()
  .then(() => console.log("connection Succesfull"))
  .catch((err) => console.log("Connection Error" + err));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.questions = questions(sequelize, Sequelize);
db.categories = categories(sequelize, Sequelize);
db.departments = departments(sequelize, Sequelize);
db.question_options = options(sequelize, Sequelize);
db.candidate = candidate(sequelize, Sequelize);
db.candidate_exam_questions = candidate_questions(sequelize, Sequelize);
db.candidate_exams = candidate_exams(sequelize, Sequelize);
db.campusDrive = campus_drive(sequelize, Sequelize);
db.campus = campuses(sequelize, Sequelize);
db.difficulty_level = difficulty_levelModel(sequelize, Sequelize);
db.question_difficulty = question_difficultyModel(sequelize, Sequelize);
/**
 * campus_drive to campuses
 */
db.campus.hasOne(db.campusDrive, { foreignKey: "campus_id" });
db.campusDrive.belongsTo(db.campus, {
  foreignKey: "campus_id",
});

/**
 * candidate_exam to candidate_exam_question relation
 */
db.candidate_exams.hasMany(db.candidate_exam_questions, {
  foreignKey: "candidate_exam_id",
});
db.candidate_exam_questions.belongsTo(db.candidate_exams, {
  foreignKey: "candidate_exam_id",
});

/**
 * candidat_exam_question to question-options
 */
db.question_options.hasOne(db.candidate_exam_questions, {
  foreignKey: "question_option_id",
});
db.candidate_exam_questions.belongsTo(db.question_options, {
  foreignKey: "question_option_id",
});

/**
 * Creating one to Many relationship between questions and subjects
 */
db.departments.hasMany(db.questions, { foreignKey: "id" });
db.questions.belongsTo(db.departments, { foreignKey: "department_id" });
/************************************************************* /

/**
 * Creating one to many relationship between questions and categories
 */
db.categories.hasMany(db.questions, {
  foreignKey: "category_id",
});
db.questions.belongsTo(db.categories, { foreignKey: "category_id" });
/************************************************************* /

/**
 * Creating one to many relationship between questions and question-options
 */
db.questions.hasMany(db.question_options, {
  foreignKey: "question_id",
});
db.question_options.belongsTo(db.questions, { foreignKey: "question_id" });
/************************************************************* /
/**
 * Creating one to many relationship between questions and candidate_exam_questions
 */
db.questions.hasMany(db.candidate_exam_questions, {
  foreignKey: "question_id",
});
db.candidate_exam_questions.belongsTo(db.questions, {
  foreignKey: "id",
});

db.candidate.hasMany(db.candidate_exams, {
  foreignKey: "id",
});
db.candidate_exams.belongsTo(db.candidate, {
  foreignKey: "candidate_id",
});

db.departments.hasMany(db.candidate, {
  foreignKey: "department_id",
});
db.candidate.belongsTo(db.departments, {
  foreignKey: "department_id",
});

db.campusDrive.hasMany(db.candidate, {
  foreignKey: "campus_id",
});
db.candidate.belongsTo(db.campusDrive, { foreignKey: "campus_id" });

/**==============difficulty_level hasMany relationship with question_difficulty===================== */
db.difficulty_level.hasMany(db.question_difficulty, {
  foreignKey: "difficulty_level_id",
});
db.question_difficulty.belongsTo(db.difficulty_level, {
  foreignKey: "difficulty_level_id",
});

/**======================questionModel hasMany question_difficulty_levels============================== */
db.questions.hasMany(db.question_difficulty, {
  foreignKey: "question_id",
});
db.question_difficulty.belongsTo(db.questions, { foreignKey: "question_id" });

export const departmentsModel = db.departments;
export const questionsModel = db.questions;
export const categoriesModel = db.categories;
export const questionOptionsModel = db.question_options;
export const candidatesModel = db.candidate;
export const candidateExamQuestionsModel = db.candidate_exam_questions;
export const candidateExamsModel = db.candidate_exams;
export const campusDrivesModel = db.campusDrive;
export const campusesModel = db.campus;
export const difficulty_level = db.difficulty_level;
export const question_difficulty = db.question_difficulty;
export const sequlizeInstance = db.sequelize;

export default db;
