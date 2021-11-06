import { v4 as uuidv4 } from "uuid";
import validator from "validator";
import { Model, ModelCtor, WhereOptions } from "sequelize/types";

// project imports
import { Url, UrlEntity } from "../core/entities/url";
import { retryableDecorator } from "../utils";
import logger from "../logger";
import CoreError from "../core/errors";
import { NotFoundError } from "../errors/api.error";

export interface UrlDTO {
  original_url: string;
  long_url: Url["long_url"];
  permanent: Url["permanent"];
}

export interface IUrlService {
  findUrlById(id: Url["id"]): Promise<UrlEntity>;

  addUrl(url: UrlDTO): Promise<UrlEntity>;
  findUrls(): Promise<UrlEntity[]>;
  deleteUrl(id: Url["id"]): Promise<void>;
}

export class UrlService implements IUrlService {
  private readonly _urlModel: ModelCtor<Model>;

  constructor(model: ModelCtor<Model>) {
    this._urlModel = model;
  }

  addUrl(url: UrlDTO): Promise<UrlEntity> {
    const self = this;

    function tryInsert(_url: UrlDTO) {
      const _id = uuidv4();
      const urlEnitity = UrlEntity.create({
        ..._url,
        id: _id,
        short_url: _url.original_url + "/" + _id,
        created_at: new Date(),
      });
      return self._urlModel.create(urlEnitity.toPersistant(), {
        isNewRecord: true,
      });
    }
    function errorCheck(err: Error) {
      if (err.name === "SequelizeUniqueConstraintError") {
        return true;
      }
      return false;
    }

    const createFunc = retryableDecorator(tryInsert, errorCheck, 10);

    return createFunc(url)
      .then((res: any) => {
        return UrlEntity.create({ ...res.dataValues } as Url);
      })
      .catch((err) => {
        logger.error(err);

        if (err instanceof CoreError) {
          throw err;
        }

        throw new Error("Unable to create new Url");
      });
  }

  async findUrls(): Promise<UrlEntity[]> {
    try {
      const urls = await this._urlModel.findAll({});
      const urlEntities = urls.map((url) =>
        UrlEntity.create(url.toJSON() as Url)
      );

      return urlEntities;
    } catch (err) {
      logger.error((err as Error).message, err);
      throw new Error("Unable to fetch Urls");
    }
  }

  async findUrlById(id: Url["id"]): Promise<UrlEntity> {
    try {
      if (!validator.isUUID(id)) {
        throw new NotFoundError("Url not found!");
      }

      const whereOptions: WhereOptions = { id };

      const url = await this._urlModel.findOne({
        where: whereOptions,
      });

      if (url === null) {
        throw new NotFoundError("Url not found!");
      }

      return UrlEntity.create(url.toJSON() as Url);
    } catch (err) {
      logger.error((err as Error).message, err);
      throw new Error("Unable to fetch Urls");
    }
  }

  async deleteUrl(id: Url["id"]): Promise<void> {
    try {
      if (!validator.isUUID(id)) {
        throw new NotFoundError("Url not found!");
      }

      const whereOptions: WhereOptions = { id };

      const url = await this._urlModel.findOne({ where: whereOptions });

      if (url === null) {
        throw new NotFoundError("Url not found!");
      }

      await url.destroy();
    } catch (err) {
      logger.error((err as Error).message, err);
      throw new Error("Unable to delete Url");
    }
  }
}
