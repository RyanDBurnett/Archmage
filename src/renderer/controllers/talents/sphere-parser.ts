import * as fs from 'fs';
import { ISphereCollection, ISphere, ITalent, SphereCategories } from './talent-library';

export default class SphereParser {
    constructor() {
    }

    parseSpheres() {
        let spheres: ISphereCollection = {
            combat: <ISphere[]>[],
            magic: <ISphere[]>[],
            skills: <ISphere[]>[]
        };

        for(const category in SphereCategories) {
            let spheresList =  fs.readdirSync('./spheres/' + category);

            spheres[category] = spheresList.map((sphereId) => {
                return this.parseSphere(sphereId, category)
            });
        }

        return spheres;
    }

    parseSphere(sphereId: string, category: string) {
        let sphere = {
            id: sphereId,
            coreTalent: <ITalent | null>null,
            talents:<ITalent[]>[]
        };

        let talents = fs.readdirSync('./spheres/' + category + '/' + sphereId);

        talents.map((talentName) => {
            let fileContents = fs.readFileSync('./spheres/' + category + '/' + sphereId + '/' + talentName, {encoding: 'utf8'});

            const rawTalent = JSON.parse(fileContents);
            const fullTalent = <ITalent>
            {
                category,
                sphereId,
                ...rawTalent
            };

            console.error(fullTalent.id);
            if (fullTalent.id === sphere.id || fullTalent.id === 'core') {
                sphere.coreTalent = fullTalent;
            } else {
                sphere.talents.push(fullTalent);
            }
        });
        
        return <ISphere>sphere;
    }
}