export interface userSessionInterface {
    login:boolean;
    token: string;
    user: {
        name: string;
        email: string;
        address: string;
        phone: string;
        orders: [];
        role: string;
        id: number
    }
}

