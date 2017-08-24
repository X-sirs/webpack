import component2 from "./component/main.js";
import contentP from "./component/content.js";
import inputshow from "./component/input.js";
document.getElementById("main").appendChild(component2());
document.getElementById("box").appendChild(contentP());
document.getElementById("text").appendChild(inputshow());