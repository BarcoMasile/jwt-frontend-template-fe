import {ADMIN} from 'app/shared/constants/auth.constants';

export class Account {
  constructor(
    public activated: boolean,
    public authorities: string[],
    public email: string,
    public firstName: string | null,
    public langKey: string,
    public lastName: string | null,
    public login: string,
    public imageUrl: string | null
  ) {}

  isAdmin(): boolean {
    return (this.authorities || []).includes(ADMIN) ?? false;
  }

  static fromClaims(claims: any): Account {

    const authorities = (claims['scope'] as string)?.split(/\s+/) ?? [];

    const firstName = claims['name'] as string;
    const lastName = claims['family_name'] as string;
    const email = claims['email'] as string | null;
    const login = claims['fiscal_number'] as string;

    return new Account(
      false,
      authorities,
      email ? email! : '',
      firstName,
      'it',
      lastName,
      login,
      null
    );
  }
}

/*"jti": "faeefa4d-908f-4f57-ae7d-66377ae67afb",
  "sub": "b9454054-681d-4e47-868a-5f7c9f2e1624",
  "azp": "arpa-data-reader",
  "scope": "profile arpa-data-reader/admin default",
  "fiscal_number": "TINIT-BSLMRC89H29D643L",
  "auth_type": "CNS",
  "auth_level": "4",
  "name": "MARCO",
  "spid_code": "arpa-bslmrc89h29d643l",
  "authTS": "1617895872449",
  "preferred_username": "BSLMRC89H29D643L",
  "family_name": "BASILE",
  "authID": "01_test10_1617895872161_04333"*/
