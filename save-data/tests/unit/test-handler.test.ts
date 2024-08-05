import { HereGeolocationGateway } from './../../adapters/here-geolocation-gateway';
import { SQSEvent } from 'aws-lambda';
import { lambdaHandler } from '../../app';
import { describe, expect, it } from '@jest/globals';

describe('Unit test for app handler', function () {
    it('verifies successful response', async () => {
        const event: SQSEvent = {
            Records: [
                {
                    messageId: '059f36b4-87a3-44ab-83d2-661975830a7d',
                    receiptHandle: 'AQEBwJnKyrHigUMZj6rYigCgxlaS3SLy0a...',
                    body: '{"nfeId": "31-24/07-17.155.342/0005-07-65-056-000.095.467-100.886.5999","supermarketName": "LOJA ELETRICA LTDA","cnpj": "17.155.342/0005-07","address": "AV Nossa Senhora do Carmo, 1202, Carmo, 3106200 - Belo Horizonte, MG","date": "2024-07-12T13:01:33.000Z","items": [{"name": "PLACA ARIA 4X4 CEGA 57203/021 TRA","code": "2324406630271","price": 5.2},{"name": "CADEADO 25MM","code": "2550201160020","price": 20.19}]}',
                    attributes: {
                        ApproximateReceiveCount: '1',
                        SentTimestamp: '1545082649183',
                        SenderId: 'AIDAIENQZJOLO23YVJ4VO',
                        ApproximateFirstReceiveTimestamp: '1545082649185',
                    },
                    messageAttributes: {},
                    md5OfBody: 'e4e68fb7bd0e697a0ae8f1bb342846b3',
                    eventSource: 'aws:sqs',
                    eventSourceARN: 'arn:aws:sqs:us-east-2:123456789012:my-queue',
                    awsRegion: 'us-east-2',
                },
            ],
        };
        await expect(lambdaHandler(event)).resolves.toBeUndefined();
    });

    it.skip('HereGeolocationGateway', async () => {
        const sut = new HereGeolocationGateway();
        const response = await sut.getGeoLocationFromAddress(
            'AV Nossa Senhora do Carmo, 1202, Carmo, 3106200 - Belo Horizonte, MG',
        );
        expect(response.latitude).toBe(-19.95057);
        expect(response.longitude).toBe(-43.93672);
    });
});
