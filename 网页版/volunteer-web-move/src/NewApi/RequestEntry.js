// import { Homedata } from "./Flymain";
const { Homedata } = require("./Flymain");


let Flydata = {
    url: "v1/school/search/",
    method: "GET",
    body: {
        p: "2",
        kw: "北京",
        s: "20",
        pv: "广东"
    },
    params: {

    }
}
// async function get() {
//     let res = await Homedata(Flydata)
//     console.log(res)

// }
// get()