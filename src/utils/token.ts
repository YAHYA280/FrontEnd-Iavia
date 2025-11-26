
import { TokenPayload } from "@/types/common.types";
import { jwtDecode } from "jwt-decode";



export const getTokenInfo = (token: string): TokenPayload => {
  try {
    const decodedToken = jwtDecode<TokenPayload>(token);
    const currentTime = Date.now() / 1000; 
    const isValid = decodedToken.exp > currentTime;
    return {
      exp: decodedToken.exp,
      iat: decodedToken.iat,
      name: decodedToken.name,
      email: decodedToken.email,
      realm_access: {
        roles: decodedToken.realm_access.roles,
      },
      isValid,
      sub: decodedToken.sub,
    };
  } catch (error) {
    console.error("Erreur lors de la désérialisation du token", error);
    return {
      exp: 0,
      iat: 0,
      name: '',
      email: '',
      realm_access: {
        roles: [],
      },
      isValid: false,
      sub: ''
    };
  }
};

