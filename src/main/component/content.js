import "../style.css";
export default () => {
    const p = document.createElement("p");
    p.style.color = "#0075ff";
    p.className = "test";
    return p;
};