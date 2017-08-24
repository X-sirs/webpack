export default (text = "hmr test update nodejs ===") => {
    const div = document.createElement("div");
    div.innerText = text;
    div.style.color = "#23ff00";
    console.log(text);
    return div;
};