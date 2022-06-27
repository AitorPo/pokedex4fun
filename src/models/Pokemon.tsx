import internal from "stream";

class Pokemon {
    id!: internal;
    name!: string;
    url!: string;
    image!: string;
    stats!: [];

    constructor(name:string, image:string){
        this.name=name;
        this.image=image
    }
}

export default Pokemon