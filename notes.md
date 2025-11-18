Ctrl + Shift + V (Windows / Linux) => preview

#IDEAS:

- Put closed and open eyes on top of each other and use CSS animation when opening the eyes

#TODO:

## CSS

- fix the game-mode DIVs to be centered
- Issue when clicking X without choosing where to navigate. on the big screen there are no menu elements
- Make nav sticky so it stays to the upper part
- Make a different cursor (?)
- when difficulty level open, and nav is open, the levels stays, and the nav menu is not visible
- fix the size of the modal (small/big screen). Maybe put full background so items below can't be pressed
- fix the on hover for mods. Currently paragraph doesn't change the color
- hover/focus
- check secondary font-family
- check how to correctly add material icons (currently might be loading everything)
- remove copy on qwerty (otherwise it offers word to search by Google)
- use for qwerty absolute/relative/fixed ???
- screen height 100vh ???

#HELPERS:

- If on the load there are variables which are not in current index page
  use below to do something with that variable if it's in the specific page

<pre> ```js 
const aboutContainer = document.querySelector(".about"); 
if (aboutContainer) { 
    do something 
} 
``` </pre>
