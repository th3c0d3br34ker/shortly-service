import { InvalidInputError } from "../../core/errors";
import { ValidUrl } from "../../core/utility/ValidUrl";

export interface Url {
  id: string;
  short_url: string;
  long_url: string;
  permanent: boolean;
  created_at: Date | string;
}

export class UrlEntity implements Url {
  private _id: string;
  private _short_url: string;
  private _long_url: string;
  private _permanent: boolean;
  private _created_at: Date | string;

  constructor(data: Url) {
    this._id = data.id;
    this._short_url = data.short_url;
    this._long_url = data.long_url;
    this._permanent = data.permanent;
    this._created_at = data.created_at;
  }

  get id(): string {
    return this._id;
  }
  get short_url(): string {
    return this._short_url;
  }
  get long_url(): string {
    return this._long_url;
  }
  get permanent(): boolean {
    return this._permanent;
  }
  get created_at(): Date | string {
    return this._created_at;
  }

  /**
   * create
   *
   * Accpts the URL to shorten as a parameter and generates
   * a shortened ID for the URL.
   */
  public static create(data: Url): UrlEntity {
    if (data.long_url.length === 0) {
      throw new InvalidInputError("URL not provided!");
    }

    const isValid = new ValidUrl(data.long_url).isValid();

    if (!isValid) {
      throw new InvalidInputError("Invalid Url supplied!");
    }

    return new UrlEntity({
      id: data.id,
      short_url: data.short_url,
      long_url: data.long_url,
      permanent: data.permanent,
      created_at: data.created_at,
    });
  }

  public toPersistant(): Url {
    return {
      id: this._id,
      short_url: this._short_url,
      long_url: this._long_url,
      permanent: this._permanent,
      created_at: this._created_at,
    };
  }

  public toJSON(): any {
    return {
      id: this._id,
      short_url: this._short_url,
      long_url: this._long_url,
      permanent: this._permanent,
      created_at: this._created_at,
    };
  }
}
