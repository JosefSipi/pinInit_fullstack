export const photoIsLoaded = (e) => {
  e.preventDefault();

  let titleCondition = !!e.currentTarget.getAttribute("data-link_title");

  let imageHeight = e.currentTarget.children[1].clientHeight;
  let spanVal;

  titleCondition
    ? (spanVal = Math.trunc(imageHeight / 10 + 7))
    : (spanVal = Math.trunc(imageHeight / 10 + 2));

  e.currentTarget.style.gridRowEnd = `span ${spanVal}`;
  e.currentTarget.style.visibility = "";
  e.currentTarget.style.marginBottom = "5px";
};
