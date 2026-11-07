export interface ICategory {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

export interface IProduct {
    id: number;
    categoryIcon: string;
    slug: string;
    image: string;
    nameBn: string;
    today: number;
    yesterday: number;
    unit: string;
    change: {
        pct: number;
    };
}

export interface IProductDetails extends IProduct {
    description?: string;
    categoryNameBn: string;
    category: string;
   
    change: {
        dir: "up" | "down";
        pct: number;
    };
    markets: {
        market: string;
        division: string;
        min: number;
        max: number;
    }[];
}