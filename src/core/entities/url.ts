import { InvalidInputError } from "../../core/errors";
import { ValidUrl } from "../../core/utility/ValidUrl";

export interface Url {
  id: string;
  short_url: string;
  original_url: string;
  permanent: boolean;
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at: string | Date | null;
}

export class UrlEntity implements Url {
  private _id: string;
  private _short_url: string;
  private _original_url: string;
  private _permanent: boolean;
  private _created_at: string | Date;
  private _updatedAt: string | Date;
  private _deletedAt: string | Date | null;

  constructor(data: Url) {
    this._id = data.id;
    this._short_url = data.short_url;
    this._original_url = data.original_url;
    this._permanent = data.permanent;
    this._created_at = data.created_at;
    this._updatedAt = data.updated_at;
    this._deletedAt = data.deleted_at;
  }

  get id(): string {
    return this._id;
  }
  get short_url(): string {
    return this._short_url;
  }
  get original_url(): string {
    return this._original_url;
  }
  get permanent(): boolean {
    return this._permanent;
  }
  get created_at(): Date | string {
    return this._created_at;
  }
  get updated_at(): Date | string {
    return this._updatedAt;
  }
  get deleted_at(): Date | string | null {
    return this._deletedAt;
  }

  /**
   * create
   *
   * Accpts the URL to shorten as a parameter and generates
   * a shortened ID for the URL.
   */
  public static create(json: any): UrlEntity {
    if (json.original_url.length === 0) {
      throw new InvalidInputError("URL not provided!");
    }

    const isValid = new ValidUrl(json.original_url).isValid();

    if (!isValid) {
      throw new InvalidInputError("Invalid Url supplied!");
    }

    return new UrlEntity({
      id: json.id,
      short_url: json.short_url,
      original_url: json.original_url,
      permanent: json.permanent,
      created_at: json.created_at,
      updated_at: json.updatedAt,
      deleted_at: json.deletedAt,
    });
  }

  public toPersistant(): Partial<Url> {
    return {
      id: this._id,
      short_url: this._short_url,
      original_url: this._original_url,
      permanent: this._permanent,
      created_at: this._created_at,
      updated_at: this._updatedAt,
      deleted_at: this._deletedAt,
    };
  }

  public toJSON(): Partial<Url> {
    return {
      id: this._id,
      short_url: this._short_url,
      original_url: this._original_url,
      permanent: this._permanent,
      created_at: this._created_at,
      updated_at: this._updatedAt,
    };
  }
}
