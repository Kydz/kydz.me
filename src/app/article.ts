import { SafeHtml } from '@angular/platform-browser';
import { SafeScript } from '@angular/platform-browser';

export class Article {
  constructor(
    public Id: number,
    public Title: string,
    public Brief: string,
    public Content: SafeHtml,
    public Hit: number,
    public Created: string
  ) { }
}
