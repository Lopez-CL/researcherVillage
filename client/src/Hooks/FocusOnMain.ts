const focusOnMain = () =>{
    const mainElement: HTMLElement | null = document.getElementById('main-content');
    mainElement?.focus();
}
export default focusOnMain;