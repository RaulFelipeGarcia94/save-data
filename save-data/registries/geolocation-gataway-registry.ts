import type { GeoLocationGateway } from '../bondaries/geolocation-gateway';

export class GeolocationGetawayRegistry {
    private static instance?: GeolocationGetawayRegistry;
    private geolocationGateway?: GeoLocationGateway;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    public setGeolocationGateway(geolocationGateway: GeoLocationGateway) {
        this.geolocationGateway = geolocationGateway;
    }

    public getGeolocationGetaway(): GeoLocationGateway {
        if (!this.geolocationGateway) {
            throw new Error('GeolocationGateway not registered yet');
        }
        return this.geolocationGateway;
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new GeolocationGetawayRegistry();
        }
        return this.instance;
    }
}
