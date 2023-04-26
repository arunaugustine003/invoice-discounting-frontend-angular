export interface GetCurrentUser {
    msg:              string;
    get_current_user: string;
    code:             string;
    data:             GetCurrentUserData;
}

export interface GetCurrentUserData {
    user_type: string;
    user_name: string;
    user_id:   number;
    timestamp: number;
}
