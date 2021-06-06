import {ADMIN} from 'app/shared/constants/auth.constants';
import {UserInfo} from 'angular-oauth2-oidc/types';
import {Observable, ReplaySubject} from 'rxjs';
import {RTRoleUtils} from 'app/shared/util/rtrole-utils';

export interface RTRole {
  name: string,
  attributes: {[nomeAttributo: string]: string[] },
  parent?: string
}

export interface RTRoleOriginal {
  name: string,
  attributes: {[nomeAttributo: string]: { values: string[]} },
  parent?: string
}

export class Account {
  rtRolesInfoEmitter = new ReplaySubject<RTRole[]>(1);

  constructor(
    public authorities: string[],
    public firstName: string | null,
    public langKey: string,
    public lastName: string | null,
    public login: string,
    public preferredUsername: string,
    public rtRoles: string[],
    public email: string | null,
    public phone?: string | null,
    public authType?: string | null,
    public rtRolesInfo?: RTRole[]
  ) {}

  isAdmin(): boolean {
    return (this.authorities || []).includes(ADMIN) ?? false;
  }

  canEditContacts(): boolean {
    return (!!this.authType) && this.authType === 'CNS';
  }

  enhanceUserInfo(obs: Observable<UserInfo>) {
    obs.subscribe(userInfo => {
      this.rtRolesInfo = RTRoleUtils.prettyAttributes(userInfo['rt_roles'] as RTRoleOriginal[] || []);
      this.rtRolesInfoEmitter.next(this.rtRolesInfo);
    });

    return this;
  }

  static fromClaims(claims: any): Account {
    const authorities = (claims['scope'] || '').split(/\s+/);

    const firstName = claims['name'] as string;
    const lastName = claims['family_name'] as string;
    const email = claims['email'] as string || null;
    const login = claims['fiscal_number'] as string;
    const preferredUsername = claims['preferred_username'] as string;
    const phone = claims['phone'] as string || null;
    const rtRoles = claims['rt_roles'] as string[] || [];
    const authType = claims['auth_type'] as string || undefined;

    return new Account(
      authorities,
      firstName,
      'it',
      lastName,
      login,
      preferredUsername,
      rtRoles,
      email,
      phone,
      authType
    );
  }
}
