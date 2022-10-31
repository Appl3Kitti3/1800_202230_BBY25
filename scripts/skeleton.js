//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton(){
  console.log($('#navbarPlaceholder').load('../skeletons/navBar.html'));
  console.log($('#footerPlaceholder').load('../skeletons/footer.html'));
}
loadSkeleton();  //invoke the function