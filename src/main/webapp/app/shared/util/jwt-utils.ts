
export class JwtUtils {

  static decodeJwt(jwt: string): any {
    const [ header, payload, signature ] = jwt.split('.');
    return JSON.parse(atob(payload));
  }
}
