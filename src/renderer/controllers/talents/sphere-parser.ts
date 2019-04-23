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
            fs.readdir('./spheres/' + category, (error, spheresList) => {
                if (error) {
                    console.error(error);
                    throw error;
                }

                spheres[category] = spheresList.map((sphereName) => {
                    return this.parseSphere(sphereName, category)
                });
            })
        }

        return spheres;
    }

    parseSphere(sphereName: string, category: string) {
        let sphere = <ISphere>{
            name: sphereName,
            talents:<ITalent[]>[]
        };

        fs.readdir('./spheres/' + category + '/' + sphereName,
            (error, talents) => {
                if (error) {
                    console.error(error);
                }

                talents.map((talentName) => {
                    fs.readFile('./spheres/' + category + '/' + sphereName + '/' + talentName,
                        'utf8',
                        (err, fileContents) => {
                            if (err) {
                                console.error('error reading talent ' + talentName + ' in sphere ' + category + '/' + sphereName + ': ' + err);
                            }

                            const rawTalent = JSON.parse(fileContents);
                            const fullTalent = <ITalent>
                            {
                                category,
                                ...rawTalent
                            };

                            sphere.talents.push(fullTalent);
                        }
                    )
                })                
            }
        )

        return sphere;
    }
}