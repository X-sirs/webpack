export default (text = "home component test") => {
    const ele = document.createElement("div");
    ele.innerText = text;
    ele.style.color = "#ff1863";
    ele.className = "bgc";
    console.log(text);
    return ele;
};