//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton(){
  console.log($('#navbarPlaceholder').load('../skeletons/navBar.html'));
  console.log($('#footerPlaceholder').load('../skeletons/footer.html'));
  console.log($('#navbarMainPlaceholder').load('../skeletons/navBarMain.html'));
  console.log($('#titlePlaceHolder').load('../skeletons/title.html'));
}
loadSkeleton();  //invoke the function
/**
 * Called when the log out option is clicked.
 */
function logOut() {
  localStorage.removeItem("userID");
}