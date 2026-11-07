export interface ICategory {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export interface IProduct {
  id: number;
  categoryIcon: string;
  nameBn: string;
  today: number;
  unit: string;
  change: {
    pct: number;
  };
}
