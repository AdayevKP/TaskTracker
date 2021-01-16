import AuthUi from './authUi'


class Auth{
    constructor(path, server){
        this.path = path;
        this._server = server;
        this.ui = new AuthUi(this, path)
    }
}

export default Auth;
