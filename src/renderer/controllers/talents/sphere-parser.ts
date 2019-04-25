import * as fs from 'fs';

export enum SphereCategories {
    combat = 'combat',
    magic = 'magic',
    skills = 'skills'
}

export interface ISphereCollection {
    combat: ISphere[],
    magic: ISphere[],
    skills: ISphere[],
    [key: string]: ISphere[]
}

interface ISphere {
    name: string,
    talents: ITalent[]
}

interface ITalent {
    id: string,
    name: string,
    category: SphereCategories
    stub: string,
    prereqs: string[],
    benefits: string[],
    notes: string[] | null
}

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

            spheres[category] = spheresList.map((sphereName) => {
                return this.parseSphere(sphereName, category)
            });
        }

        return spheres;
    }

    parseSphere(sphereName: string, category: string) {
        let sphere = <ISphere>{
            name: sphereName,
            talents:<ITalent[]>[]
        };

        let talents = fs.readdirSync('./spheres/' + category + '/' + sphereName);

        talents.map((talentName) => {
            let fileContents = fs.readFileSync('./spheres/' + category + '/' + sphereName + '/' + talentName, {encoding: 'utf8'});


            const rawTalent = JSON.parse(fileContents);
            const fullTalent = <ITalent>
            {
                category,
                ...rawTalent
            };

            sphere.talents.push(fullTalent);
        });
        
        return sphere;
    }
}