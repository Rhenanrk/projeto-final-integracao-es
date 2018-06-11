export class User {
    _id: string;
    name: string;
    email: string;
    document: string;
    password: string;
    is_active: boolean;
    created_at: Date;

    token: string;
}
