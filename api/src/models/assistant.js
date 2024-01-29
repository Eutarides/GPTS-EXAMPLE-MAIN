module.exports = function (sequelize, DataTypes) {
  const Assistant = sequelize.define('Assistant', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    assistant: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Por favor, rellena el campo "Asistente".'
        }
      }
    },
    default: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('createdAt')
          ? this.getDataValue('createdAt').toISOString().split('T')[0]
          : null
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('updatedAt')
          ? this.getDataValue('updatedAt').toISOString().split('T')[0]
          : null
      }
    }
  },
  {
    sequelize,
    tableName: 'assistants',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' }
        ]
      },
    ]
  })

  Assistant.associate = function (models) {
    Assistant.hasMany(models.Chat, { as: 'chats', foreignKey: 'assistantId' }),
    Assistant.hasMany(models.Example, { as: 'examples', foreignKey: 'assistantId' })
  }

  return Assistant
}