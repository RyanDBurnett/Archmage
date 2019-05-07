import { ISpherePlaceholder } from "./talent-collection";

/* 
 *  The Talent Library (really should be a singleton, hence 'the') is intended to be used as a single authoritative 
 *  reference for talents & spheres, with constant time lookups for both by ID.  Once instantiated, it is readonly.
 *  Collections of talents which grow or shrink in use (such as those selected for the character) should be kept as
 *  collections of IDs (possibly nested inside sphere and category constructions, based on use case), and those ids
 *  should be used for lookup from the library.  
 */

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

export interface ISphere {
    id: string,
    coreTalent: ITalent,
    talents: ITalent[]
}

export interface ITalent {
    id: string,
    name: string,
    category: SphereCategories,
    sphereId: string,
    stub: string,
    prereqs: string[],
    benefits: string[],
    notes: string[] | null
}

export default class TalentLibrary {
    private spheresByCategory: ISphereCollection;
    private spheresById: {[key: string]: ISphere}
    private talentsById: {[key: string]: ITalent};

    constructor(spheres: ISphereCollection) {
        this.spheresByCategory = spheres;
        const allSpheres =
            Array.prototype.concat(
                this.spheresByCategory[SphereCategories.combat],
                this.spheresByCategory[SphereCategories.magic],
                this.spheresByCategory[SphereCategories.skills]
            );

        this.spheresById = {};
        allSpheres.forEach((sphere) => {
            this.spheresById[sphere.id] = sphere;
        });

        this.talentsById = {};
        Object.keys(this.spheresById).forEach((sphereId) => {
            this.spheresById[sphereId].talents.forEach((talent) => {
                this.talentsById[talent.id] = talent;
            });
        });
    }

    getSpheresInCategory(category: SphereCategories) {
        return this.spheresByCategory[category];
    }

    getSphereById(sphereId: string) {
        return this.spheresById[sphereId];
    }

    getTalentById(talentId: string) {
        return this.talentsById[talentId];
    }

    convertSphereToSpherePlaceholder(sphere: ISphere): ISpherePlaceholder {
        return {
            id: sphere.id,
            coreTalent: sphere.coreTalent.id,
            talents: sphere.talents.map((talent) => talent.name)
        }
    }
}