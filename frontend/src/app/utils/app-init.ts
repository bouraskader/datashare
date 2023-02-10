import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';

export function Initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> =>
    keycloak.init({
      config: {
        url: `${environment.keycloakUri}/auth`,
        realm: environment.keycloakRealm,
        clientId: environment.keycloakClient,
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
      },
      enableBearerInterceptor: true,
      bearerExcludedUrls: ['/assets', '/clients/public'],
      loadUserProfileAtStartUp: true,
    });
}
