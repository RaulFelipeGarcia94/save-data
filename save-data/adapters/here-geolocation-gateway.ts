import type { Geolocation, GeoLocationGateway } from '../bondaries/geolocation-gateway';
import axios from 'axios';

export class HereGeolocationGateway implements GeoLocationGateway {
    public async getGeoLocationFromAddress(address: string): Promise<Geolocation> {
        const response = await axios.get<{
            items: {
                position: {
                    lat: number;
                    lng: number;
                };
            }[];
        }>(
            `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(address)}&apiKey=${
                process.env.HERE_API_KEY as string
            }`,
        );

        if (response.status !== 200 || response.data.items.length === 0) {
            return {
                latitude: 0,
                longitude: 0,
            };
        }
        return {
            latitude: response.data.items[0].position.lat,
            longitude: response.data.items[0].position.lng,
        };
    }
}
