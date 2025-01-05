import { jwtDecode } from 'jwt-decode';
import {Injectable} from "@angular/core"; // Use a named import

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token); // Use the named function
    } catch (Error) {
      return null;
    }
  }
  getUserRole(token: string): string | null {
    const decodedToken = this.getDecodedAccessToken(token);
    return decodedToken?.role || null;
  }

  getUserPermissions(token: string): string[] {
    const decodedToken = this.getDecodedAccessToken(token);
    return decodedToken?.permissions.map((perm: any) => perm.authority) || [];
  }

}
