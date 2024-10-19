//============================================================================
// Author      : Andrew Brown
// Date        : August 18, 2024
// Version     : 1.0
// Description : Trip model structure
//============================================================================

export interface Trip {
    _id: string,
    code: string,
    name: string,
    length: string,
    start: Date,
    resort: string,
    perPerson: string,
    image: string,
    description: string
}