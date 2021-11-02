import { Model, Sequelize, DataTypes } from "sequelize";

// project imports
import { URL_MODEL_NAME, URL_TABLE_NAME } from "../constants";

function makeExpenditureModel<T extends typeof DataTypes>(
  sequelize: Sequelize,
  dataTypes: T
) {
  class UrlModel extends Model {
    public id!: string;
    public short_url!: string;
    public long_url!: string;
    public permanent!: boolean;
    public created_at!: Date;

    public toJSON(): object {
      const values = Object.assign({}, this.get());
      return values;
    }
  }

  UrlModel.init(
    {
      id: {
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      short_url: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      long_url: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      permanent: {
        type: dataTypes.BOOLEAN,
        allowNull: false,
      },
      created_at: {
        type: dataTypes.DATE,
        defaultValue: dataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: URL_MODEL_NAME,
      tableName: URL_TABLE_NAME,
      timestamps: false,
    }
  );

  return UrlModel;
}

export default makeExpenditureModel;
