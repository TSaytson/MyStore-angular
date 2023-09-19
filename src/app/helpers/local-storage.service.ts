import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  set(key: string, value: any): void {
    if (this.storage)
      this.storage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    if (this.storage)
      return JSON.parse(this.storage.getItem(key)!);
  }

  remove(key: string): void {
    if (this.storage)
      this.storage.removeItem(key);
  }

  clear(): void {
    if (this.storage)
      this.storage.clear();
  }
}