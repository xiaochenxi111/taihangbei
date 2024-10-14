const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Students = require('./Students');

const Development = sequelize.define('Development', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Students,
      key: 'student_id',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  },
  career_type: {
    type: DataTypes.ENUM('graduate', 'public_exam', 'job', 'internship'),
    allowNull: false
  },
  internship_mentor: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  organization: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  position: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  grade: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  evaluation: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  resume: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  graduate_university: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  graduate_info: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  alternative_paths: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  public_exam_type: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  exam_status: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  interview_guidance: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  job: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  target_region: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  target: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  follow_records: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  process: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  job_evaluation: {
    type: DataTypes.TEXT,
    defaultValue: ''
  }
}, {
  freezeTableName: true,
  timestamps: false
});

module.exports = Development;