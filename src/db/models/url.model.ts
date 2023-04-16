import { Model, Sequelize, DataTypes, Optional } from "sequelize";

// project imports
import { URL_MODEL_NAME, URL_TABLE_NAME } from "../constants";
import { Url } from "../../core/entities/url";

type UrlCreationAttributes = Optional<Url, "id">;

function makeUrlModel<T extends typeof DataTypes>(
  sequelize: Sequelize,
  dataTypes: T
) {
  class UrlModel extends Model<Url, UrlCreationAttributes> implements Url {
    public id!: string;
    public short_url!: string;
    public original_url!: string;
    public permanent!: boolean;
    public created_at!: Date;
    public updated_at!: string | Date;
    public deleted_at!: string | Date | null;

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
      original_url: {
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
        allowNull: false,
      },
      updated_at: {
        type: dataTypes.DATE,
        defaultValue: dataTypes.NOW,
        allowNull: false,
      },
      deleted_at: {
        type: dataTypes.DATE,
        allowNull: true,
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

export default makeUrlModel;
