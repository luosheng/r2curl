import isEmpty from './isEmpty';

export class BodyHelper {
  private contentType: string | null;
  private body: string | null = null;

  constructor(
    private readonly _headers: { [key in string]: string },
    private readonly _rawBody: { [key in string]: any } | Array<{ [key in string]: any }>,
  ) {
    this.contentType = this.getContentType();
    this.body = this.parseBody();
  }

  public toString(): string {
    if (isEmpty(this.body)) {
      return '';
    }
    return this.body;
  }

  private getContentType(): string | null {
    if (isEmpty(this._headers)) {
      return null;
    }
    const lowerHeaderArray = Object.entries(this._headers);
    const [contentTypePair] = lowerHeaderArray.filter(header => header[0].toLowerCase() === 'content-type');

    if (isEmpty(contentTypePair)) {
      return null;
    }
    return contentTypePair[1];
  }

  private parseBody(): string | null {
    if (isEmpty(this._rawBody)) {
      return null;
    }
    if (
      !isEmpty(this.contentType) &&
      this.contentType.includes('application/x-www-form-urlencoded') &&
      !isEmpty(this._rawBody) &&
      typeof this._rawBody === 'object'
    ) {
      return this.getFormBody();
    }
    return this.getTextBody();
  }

  private getFormBody(): string {
    return Object.entries(this._rawBody)
      .map(([key, value]) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join('&');
  }
  private getTextBody(): string | null {
    return typeof this._rawBody === 'object' || Array.isArray(this._rawBody) ? JSON.stringify(this._rawBody) : null;
  }
}
