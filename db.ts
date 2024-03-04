// db.ts
import Dexie, { Table } from "dexie";

export interface Files {
  id?: number;
  name: string;
  size: number;
  date: Date;
  url: string;
  type: string;
}

export class MySubClassedDexie extends Dexie {
  files!: Table<Files>;

  constructor() {
    super("filesDatabase");
    this.version(2).stores({
      files: "++id, name, size, date, url, type",
    });
  }
}

export const db = new MySubClassedDexie();
