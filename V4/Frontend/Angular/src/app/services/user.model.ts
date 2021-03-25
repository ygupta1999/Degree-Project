//The model files define the structure of the incoing data from firebase 

//a simple item struct
export interface item {
    name: string;
}

//TODO
// Make user struct

export interface Users {
    uid: string;
    name: string;
    DOB: string;
    address: string;
    email: string;
    wallet: number;
}