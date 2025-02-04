const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAim() {
    let tl = gsap.timeline();

    tl.from("nav", {
        y: -10,
        opacity: 0,
        duration: 2,
        ease: Expo.easeInOut,
    });

    tl.to(".bounding-elem", {
        y: 0,
        duration: 2,
        ease: Expo.easeInOut,
        stagger: 0.2,
        delay: -1
    });

    tl.from(".hero-footer", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -0.5,
        ease: Expo.easeInOut
    });
}

firstPageAim();

let timeout; // Declare timeout globally

function circleSkew() {
    // Define default scale values
    let xscale = 1;
    let yscale = 1;
    let xprev = 0;
    let yprev = 0;

    window.addEventListener("mousemove", function (dets) {
        clearTimeout(timeout);

        let xDiff = Math.abs(dets.clientX - xprev) * 0.01;
        let yDiff = Math.abs(dets.clientY - yprev) * 0.01;

        xscale = gsap.utils.clamp(0.8, 1.2, 1 + xDiff);
        yscale = gsap.utils.clamp(0.8, 1.2, 1 + yDiff);

        xprev = dets.clientX;
        yprev = dets.clientY;

        // Remove redundant function call
        let miniCircle = document.querySelector("#mini-circle");
        if (miniCircle) {
            miniCircle.style.transform =
                `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
        }

        timeout = setTimeout(function () {
            if (miniCircle) {
                miniCircle.style.transform =
                    `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
            }
        }, 1000);
    });
}

circleSkew();

// Fix redundant event listener
function circleMouseFollower(xscale, yscale) {
    let miniCircle = document.querySelector("#mini-circle");
    if (!miniCircle) return;

    window.addEventListener("mousemove", function (event) {
        miniCircle.style.transform =
            `translate(${event.clientX}px, ${event.clientY}px) scale(${xscale}, ${yscale})`;
    });
}




document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0; // This tracks the previous mouse position on X-axis
    var diffrot = 0; // This stores the difference for rotation

    let img = elem.querySelector("img");

    if (img) {
        img.style.position = "absolute"; // Ensure image is absolutely positioned
        img.style.top = "0";
        img.style.left = "0";
        img.style.pointerEvents = "none"; // Prevent flickering issues and avoid mouse interaction with the image

        elem.addEventListener("mouseleave", function () {
            gsap.to(img, {
                opacity: 0, // Fade out the image
                ease: "power3.out",
                duration: 0.5,
            });
        });

        elem.addEventListener("mousemove", function (dets) {
            var rect = elem.getBoundingClientRect();
            var diffY = dets.clientY - rect.top; // Get vertical distance from top of the element
            diffrot = dets.clientX - rotate; // Calculate the difference for rotation
            rotate = dets.clientX; // Update the last position

            // Calculate the image's new position
            var offsetX = dets.clientX - rect.left - img.width / 2; // Center the image on the cursor
            var offsetY = dets.clientY - rect.top - img.height / 2; // Center the image on the cursor

            // Apply the changes (position and rotation)
            gsap.to(img, {
                opacity: 1, // Make image visible
                x: offsetX, // Set the X position
                y: offsetY, // Set the Y position
                rotation: gsap.utils.clamp(-20, 20, diffrot * 0.5), // Apply rotation
                ease: "power3.out",
                duration: 0.3
            });
        });
    }
});
