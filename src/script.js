
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Lenis js
const lenisJs = () => {
  const lenis = new Lenis();

  lenis.on("scroll", (e) => {});

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 500);
  });

  gsap.ticker.lagSmoothing(0);
};
lenisJs();

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

const magneticEffect = () => {
  window.addEventListener("mousemove", function (dets) {
    gsap.to("#cursor", {
      top: dets.y,
      left: dets.x,
    });
  });
  document.querySelectorAll(".magnet-effect").forEach(function (e) {
    e.addEventListener("mouseenter", function () {
      gsap.to("#cursor", {
        scale: 1,
      });
    });
    e.addEventListener("mousemove", function (dets) {
      // for value of x
      var xStart = e.getBoundingClientRect().x;
      var xEnd = e.getBoundingClientRect().x + e.getBoundingClientRect().width;
      var valx = gsap.utils.mapRange(xStart, xEnd, -12, 12, dets.x);
      // for value of y
      var yStart = e.getBoundingClientRect().y;
      var yEnd = e.getBoundingClientRect().y + e.getBoundingClientRect().height;
      var valy = gsap.utils.mapRange(yStart, yEnd, -12, 12, dets.y);
      gsap.to(e.children[0], {
        x: valx,
        y: valy,
        duration: 0.5,
      });
    });
    e.addEventListener("mouseleave", function (dets) {
      gsap.to(e.children[0], {
        x: 0,
        y: 0,
        duration: 0.5,
      });
    });
  });
  document.querySelectorAll(".magnet-effect").forEach(function (e) {
    e.addEventListener("mouseleave", function () {
      gsap.to("#cursor", {
        scale: 0,
      });
    });
  });
  
};
magneticEffect();

// Navigation Animation
const navigation = () => {
  var navigation = document.querySelector("#navigation");
  var menutl = gsap.timeline({ paused: true });
  menutl
    .to(
      "#containermu #li1",
      {
        width: "0%",
        duration: 0.6,
        ease: "expo.out",
      },
      "a"
    )
    .to(
      "#containermu #li2",
      {
        width: "0%",
        duration: 0.6,
        ease: "expo.out",
      },
      "a"
    )
    .to(navigation, {
      right: 0,
      delay: -0.5,
      duration: 0.8,
    })
    .to(navigation, {
      backgroundColor: "rgba(0, 0, 0, 0.400)",
      duration: 0,
    })
    .from(navigation.querySelectorAll(".menu-wrap"), {
      x: 10,
      opacity: 0,
      duration: 0.2,
      stagger: 0.1,
    })
    .from(navigation.querySelectorAll("#menu-logo i"), {
      y: 2,
      opacity: 0,
    });
  document
    .querySelector(".nav-right-menu")
    .addEventListener("click", function () {
      gsap.to("#cli1", {
        height: "100%",
        duration: 0.6,
        ease: "expo.out",
      });
      gsap.to("#cli2", {
        height: "100%",
        duration: 0.6,
        ease: "expo.out",
      });
      menutl.play();
    });
  document.querySelector("#close").addEventListener("click", function () {
    gsap.to("#cli1", {
      height: "0%",
      duration: 0.6,
      ease: "expo.out",
    });
    gsap.to("#cli2", {
      height: "0%",
      duration: 0.6,
      ease: "expo.out",
    });
    menutl.reverse();
  });
};
navigation();

const navAnimation = () => {
  // Variable to store the last scroll position
  let lastScrollTop = 0;

  // Function to handle scroll event
  function handleScroll() {
    let currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    // Check if user is scrolling up or down
    if (currentScrollTop > lastScrollTop) {
      // Scrolling down

      gsap.to("nav", {
        top: "-20%",
        duration: 0.5,
      });
    } else {
      // Scrolling up
      gsap.to("nav", {
        top: "0%",
        duration: 0.5,
      });
    }
    if (window.innerHeight < lastScrollTop) {

      gsap.to(".nav-overlay", {
        backdropFilter: "blur(5px)",
      });
      gsap.to(".nav-right i", {
        color: "#000000",
        border: "1px solid #000",
      });
      gsap.to(".nav-right-menu .menu-line", {
        backgroundColor: "#000",
      });
      
      gsap.set(".nav-center img",{
        filter: "invert(1)",
      });

    } else {
      gsap.to(".nav-overlay", {
        backdropFilter: "blur(0px)",
      });
      gsap.to(".nav-right i", {
        color: "#fff",
        border: "1px solid #fff",
      });
      gsap.to(".nav-right-menu .menu-line", {
        backgroundColor: "#fff",
      });
      gsap.set(".nav-center img",{
        filter: "invert(0)",
      });
    }
    // Update last scroll position
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  }

  // Add scroll event listener
  window.addEventListener("scroll", handleScroll);
};
navAnimation();

const textEffect = () => {
  // Splitting the text content into individual letters and wrapping each in a span with a class
  document.querySelectorAll(".text-effect").forEach(function(e){
    [...e.children].forEach(function(h){
      var clutter = "";
      h.textContent.split("").forEach(function (l) {
        clutter += `<span>${l}</span>`;
      });
      h.innerHTML = clutter;
    })
  })
  //animation for mousemove
  document.querySelectorAll(".text-effect").forEach(function (e) {
    e.addEventListener("mouseenter", function () {
      var elem0 = e.children[0].querySelectorAll("span");
      var elem1 = e.children[1].querySelectorAll("span");
      
      gsap.to(elem0, {
        y: "-106%",
        stagger: {
          amount: 0.2,
        },
        duration: 0.4,
      });
      gsap.to(elem1, {
        y: "-100%",
        stagger: {
          amount: 0.2,
        },
        duration: 0.4,
      });
    });
  });
  
  //animation for mouseleave
  document.querySelectorAll(".text-effect").forEach(function (e) {
    e.addEventListener("mouseleave", function () {
      gsap.to(e.children[0].querySelectorAll("span"), {
        y: "0%",
        stagger: {
          amount: 0.2,
        },
      });
      gsap.to(e.children[1].querySelectorAll("span"), {
        y: "0%",
        stagger: {
          amount: 0.2,
        },
      });
    });
  });
};
textEffect();

// Page 1 Animations
const page1Animations = () => {
  // Select the circle element
  const circleElement = document.querySelector(".page1-circle");

  // Create objects to track mouse position and custom cursor position
  const mouse = { x: 0, y: 0 }; // Track current mouse position
  const previousMouse = { x: 0, y: 0 }; // Store the previous mouse position
  const circle = { x: 0, y: 0 }; // Track the circle position

  // Initialize variables to track scaling and rotation
  let currentScale = 0; // Track current scale value
  let currentAngle = 0; // Track current angle value

  // Update mouse position on the 'mousemove' event
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  // Smoothing factor for cursor movement speed (0 = smoother, 1 = instant)
  const speed = 0.17;

  // Start animation
  const tick = () => {
    // MOVE
    // Calculate circle movement based on mouse position and smoothing
    circle.x += (mouse.x - circle.x) * speed;
    circle.y += (mouse.y - circle.y) * speed;
    // Create a transformation string for cursor translation
    const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

    // SQUEEZE
    // 1. Calculate the change in mouse position (deltaMouse)
    const deltaMouseX = mouse.x - previousMouse.x;
    const deltaMouseY = mouse.y - previousMouse.y;
    // Update previous mouse position for the next frame
    previousMouse.x = mouse.x;
    previousMouse.y = mouse.y;
    // 2. Calculate mouse velocity using Pythagorean theorem and adjust speed
    const mouseVelocity = Math.min(
      Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4,
      150
    );
    // 3. Convert mouse velocity to a value in the range [0, 0.5]
    const scaleValue = (mouseVelocity / 150) * 0.5;
    // 4. Smoothly update the current scale
    currentScale += (scaleValue - currentScale) * speed;
    // 5. Create a transformation string for scaling
    const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

    // Apply all transformations to the circle element in a specific order: translate -> rotate -> scale
    circleElement.style.transform = `${translateTransform}  ${scaleTransform}`;

    // Request the next frame to continue the animation
    window.requestAnimationFrame(tick);
  };

  // Start the animation loop
  tick();

  // Mouse enter and Leave animation
  const canvas = document.querySelector(".webgl");
  canvas.addEventListener("mouseenter", () => {
    gsap.to(circleElement, {
      scale: 1,
      opacity: 1,
    });
  });

  canvas.addEventListener("mouseleave", () => {
    gsap.to(circleElement, {
      scale: 0,
      opacity: 0,
    });
  });
};
page1Animations();

var fran = document.querySelector("#fran");
fran.addEventListener("click", function () {
  window.location.href = "./franchise.html";
});

//Page 2
const page2Animations = () => {
  
};
page2Animations();

//Page 3
const page3Animations = () =>{
 var cards = document.querySelectorAll(".prodCard");

cards.forEach((card) => {
  var img = card.querySelector("img");
  var originalImg = img.src;

  card.addEventListener("mouseenter", () => {
    img.style.opacity = 0; // Start fade out
    setTimeout(() => {
      img.src = "/imgs/coffee2.png"; // Change image
      img.style.opacity = 1; // Fade in
    }, 300); // Match the CSS transition time (300ms)
  });

  card.addEventListener("mouseleave", () => {
    img.style.opacity = 0; // Fade out again
    setTimeout(() => {
      img.src = originalImg; // Revert to original
      img.style.opacity = 1; // Fade in
    }, 300);
  });
});

};
page3Animations();

//page 5 
const page5Animations = () => {

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#page5",
    start: "top top",
    end: "bottom top",
    scrub: 1,
    pin: true,
    markers: false
  }
});

tl.to(".main_img", {
  scale: 0.6,
  width: "48%",
  left: "50%",
  ease: "none"
}, "a"); 

tl.from(".col2 .imgContainer1", {
  y: -100,
  ease: "none"
}, "a");

tl.from(".col2 .imgContainer3", {
  y: -100,
  ease: "none"
}, "a");

tl.from(".col1 .imgContainer1", {
  y: 100,
  ease: "none"
}, "a");

tl.from(".col1 .imgContainer2", {
  y: 100,
  ease: "none"
}, "a");

tl.from(".col1 .imgContainer3", {
  y: 100,
  ease: "none"
}, "a");

tl.from(".col3 .imgContainer1", {
  y: 100,
  ease: "none"
}, "a");

tl.from(".col3 .imgContainer2", {
  y: 100,
  ease: "none"
}, "a");

tl.from(".col3 .imgContainer3", {
  y: 100,
  ease: "none"
}, "a");

  
};
page5Animations();