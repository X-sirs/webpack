export default (text = "home component +++ test") => {
    const ele = document.createElement("div");
    ele.innerText = text;
    ele.style.color = "#22f863";
    ele.className = "bgc";
    return ele;
};