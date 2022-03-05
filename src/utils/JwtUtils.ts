import jwtDecode from "jwt-decode";

export class jwtUtils {
  static isAuth(token: any) {
    if (!token) {
      return false;
    }
    const decoded: any = jwtDecode(token);
    if (decoded.exp > new Date().getTime() / 1000) {
      return true;
    } else {
      return false;
    }
  }

  static getId(token: any) {
    if (!token) {
      return false;
    }
    const decoded: any = jwtDecode(token)
    return decoded.jti;
  }

  static getRole(token: any){
    const decoded: any = jwtDecode(token);
    return decoded.roles[0]
  }


}