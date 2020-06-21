import gsap from "../esm/all"

//function that takes every element on the page with "moveTrans" as a classname. moves those elements laterally for a cool page transition
const moveItems = (direction, when) => {
  let items = document.body.getElementsByClassName("moveTrans")
  let dir = direction === "left" ? 1 : -1
  for (let each of items) {
    let distance = (Math.random() * 40) + 40
    let time = (Math.random() * .2) + 1
    //if the item is large, give it a small distance to give the effect of inertia
    if(each.getAttribute("weight") === "large"){
        distance = (Math.random() * 10) + 20
        time = (Math.random() * .2) + 1.3
    }
    if (when != "start") {
      gsap.set(each, {
        x: distance * dir,
      })
      gsap.to(each, time, {
        x: 0,
        ease: "easeOut",
        delay: Math.random() * 0.1,
      })
    }else{
        gsap.to(each, time, {
            x: distance * dir,
            ease: "easeIn",
            delay: Math.random() * 0.1,
          })
    }
  }
}

export default moveItems
