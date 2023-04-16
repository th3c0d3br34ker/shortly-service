import { Model, ModelStatic, WhereOptions } from "sequelize/types";

// project imports
import { Url, UrlEntity } from "../core/entities/url";
import { generateUuid as uuid, retryableDecorator } from "../utils";
import logger from "../logger";
import CoreError from "../core/errors";
import {
  ApiError,
  InternalServerError,
  NotFoundError,
} from "../errors/api.error";
import { DB_ENTRIES_LIMIT } from "../config";

export interface UrlDTO {
  // host url is the url of the client
  host_url: string;

  original_url: Url["original_url"];
  permanent: Url["permanent"];
}

export interface IUrlService {
  findUrlById(id: Url["id"]): Promise<UrlEntity>;

  addUrl(url: UrlDTO): Promise<UrlEntity>;
  findUrls(): Promise<UrlEntity[]>;
  deleteUrl(id: Url["id"]): Promise<void>;
}

export class UrlService implements IUrlService {
  private readonly _urlModel: ModelStatic<Model>;

  constructor(model: ModelStatic<Model>) {
    this._urlModel = model;
  }

  async addUrl(url: UrlDTO): Promise<UrlEntity> {
    const self = this;

    async function tryInsert(_url: UrlDTO) {
      if ((await self._urlModel.count()) + 1 > DB_ENTRIES_LIMIT) {
        throw new InternalServerError("Database is overflow, try again later.");
      }

      const _id = await uuid(self._urlModel);
      const urlEnitity = UrlEntity.create({
        ..._url,
        id: _id,
        short_url: _url.host_url + "/" + _id,
        created_at: new Date(),
        updated_at: new Date(),
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
        if (err instanceof ApiError) {
          throw err;
        }
        throw new Error("Unable to create new Url");
      });
  }

  async findUrls(): Promise<UrlEntity[]> {
    try {
      const where: WhereOptions = {
        deleted_at: null,
      };

      const urls = await this._urlModel.findAll({ where });
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
      // if (!validate(id)) {
      //   throw new NotFoundError('Url not found!');
      // }

      const where: WhereOptions = {
        deleted_at: null,
      };

      const url = await this._urlModel.findByPk(id, where);

      if (url === null) {
        throw new NotFoundError("Url not found!");
      }

      return UrlEntity.create(url.toJSON() as Url);
    } catch (err) {
      logger.error((err as Error).message, err);
      if (err instanceof ApiError) {
        throw err;
      }
      throw new Error("Unable to fetch Url by id");
    }
  }

  async deleteUrl(id: Url["id"]): Promise<void> {
    try {
      // if (!validate(id)) {
      //   throw new NotFoundError('Url not found!');
      // }

      const url = await this._urlModel.findByPk(id);

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
