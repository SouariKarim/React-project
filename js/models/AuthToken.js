class AuthToken
{
    constructor({token, refresh_token, user_id}) {
        this.token = token;
        this.refreshToken = refresh_token;
        this.userId = user_id;
    }

    getToken() {
        return this.token;
    }

    getRefreshToken() {
        return this.refreshToken;
    }

    getUserId() {
        return this.userId;
    }
}

export default AuthToken;